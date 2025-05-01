'use client'

import { Buffer } from 'buffer'

if (typeof window !== 'undefined') {
  if (!window.Buffer) {
    window.Buffer = Buffer
  }

  if (!window.process) {
    window.process = {
      env: {
        NODE_ENV: 'development', // 👈 required to fix TS error
      },
    } as NodeJS.Process
  }
}
