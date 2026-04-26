/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http'
import { runWaitlist } from '../lib/waitlistResendService.js'

/**
 * Vercel Node.js function: POST /api/waitlist
 * (Vite dev still uses lib/waitlist-middleware.ts — do not import this file in the Vite plugin.)
 */
function sendJson(res: ServerResponse, status: number, body: object) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

type VercelStyleRequest = IncomingMessage & { body?: unknown }

function parseVercelJsonBody(req: VercelStyleRequest): unknown {
  const b = req.body
  if (b == null) return {}
  if (Buffer.isBuffer(b)) {
    const s = b.toString('utf8')
    return s ? (JSON.parse(s) as unknown) : {}
  }
  if (typeof b === 'string') {
    return b ? (JSON.parse(b) as unknown) : {}
  }
  if (typeof b === 'object') {
    return b
  }
  return {}
}

export default async function handler(
  req: VercelStyleRequest,
  res: ServerResponse,
) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  let body: unknown
  try {
    body = parseVercelJsonBody(req)
  } catch {
    return sendJson(res, 400, { error: 'Invalid request body.' })
  }

  const result = await runWaitlist(body)
  if (result.ok) {
    return sendJson(res, 200, { ok: true })
  }
  return sendJson(res, result.status, { error: result.error })
}
