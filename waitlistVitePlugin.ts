import type { Plugin } from 'vite'
import { waitlistConnectMiddleware } from './api/waitlist.mjs'

const middleware = waitlistConnectMiddleware()

export function waitlistVitePlugin(): Plugin {
  return {
    name: 'responza-waitlist',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}
