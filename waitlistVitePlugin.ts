import type { Plugin } from 'vite'
import { waitlistConnectMiddleware } from './lib/waitlist-middleware.js'

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
