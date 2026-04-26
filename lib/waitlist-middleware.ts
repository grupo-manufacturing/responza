/// <reference types="node" />
import 'dotenv/config'
import type { IncomingMessage, ServerResponse } from 'http'
import { runWaitlist } from './waitlistResendService.js'

type NextFn = (err?: unknown) => void

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const body: Buffer[] = []
    req.on('data', (c) => body.push(c))
    req.on('end', () => {
      try {
        const s = Buffer.concat(body).toString('utf8')
        resolve(s ? (JSON.parse(s) as Record<string, unknown>) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

/**
 * Vite / Connect: handles POST /api/waitlist on the same port as the dev/preview server.
 */
export function waitlistConnectMiddleware() {
  return (req: IncomingMessage, res: ServerResponse, next: NextFn) => {
    const path = (req.url ?? '').split('?')[0] ?? ''
    if (path !== '/api/waitlist' || req.method !== 'POST') {
      return next()
    }

    void (async () => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      let body: Record<string, unknown>
      try {
        body = await readJsonBody(req)
      } catch {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Invalid request body.' }))
        return
      }
      const result = await runWaitlist(body)
      if (result.ok) {
        res.statusCode = 200
        res.end(JSON.stringify({ ok: true }))
        return
      }
      res.statusCode = result.status
      res.end(JSON.stringify({ error: result.error }))
    })().catch((e) => {
      console.error('waitlist unhandled error:', e)
      if (!res.headersSent) {
        res.statusCode = 500
        res.end(JSON.stringify({ error: 'Server error.' }))
        return
      }
      res.destroy()
    })
  }
}
