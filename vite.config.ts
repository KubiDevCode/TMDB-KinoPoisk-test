import { Agent } from 'node:https'
import type { LookupFunction } from 'node:net'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

type DnsGoogleResponse = {
  Answer?: Array<{
    type: number
    data: string
    TTL?: number
  }>
}

type DnsCacheRecord = {
  address: string
  expiresAt: number
}

const dnsCache = new Map<string, DnsCacheRecord>()

const createLookupError = (hostname: string): NodeJS.ErrnoException => {
  const error = new Error(`Could not resolve ${hostname} via DNS-over-HTTPS`) as NodeJS.ErrnoException
  error.code = 'ENOTFOUND'

  return error
}

const dohLookup: LookupFunction = (hostname, options, callback) => {
  const completeLookup = (address: string) => {
    if (options.all) {
      callback(null, [{ address, family: 4 }])
      return
    }

    callback(null, address, 4)
  }

  const cached = dnsCache.get(hostname)

  if (cached && cached.expiresAt > Date.now()) {
    completeLookup(cached.address)
    return
  }

  fetch(`https://dns.google/resolve?name=${encodeURIComponent(hostname)}&type=A`)
    .then((response) => response.json() as Promise<DnsGoogleResponse>)
    .then((data) => {
      const answer = data.Answer?.find((item) => item.type === 1 && /^\d+\.\d+\.\d+\.\d+$/.test(item.data))

      if (!answer) {
        callback(createLookupError(hostname), '', 4)
        return
      }

      dnsCache.set(hostname, {
        address: answer.data,
        expiresAt: Date.now() + (answer.TTL ?? 60) * 1000,
      })
      completeLookup(answer.data)
    })
    .catch(() => callback(createLookupError(hostname), '', 4))
}

const tmdbProxyAgent = new Agent({ lookup: dohLookup })

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    svgr()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/app/styles/helpers" as *;`,
      },
    },
  },
  server: {
    host: true,
    proxy: {
      '/tmdb-api': {
        target: 'https://api.themoviedb.org',
        changeOrigin: true,
        secure: true,
        agent: tmdbProxyAgent,
        rewrite: (path) => path.replace(/^\/tmdb-api/, ''),
      },
      '/tmdb-image': {
        target: 'https://image.tmdb.org',
        changeOrigin: true,
        secure: true,
        agent: tmdbProxyAgent,
        rewrite: (path) => path.replace(/^\/tmdb-image/, ''),
      },
    },
  }
})
