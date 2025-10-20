'use client'

import { SessionProvider } from 'next-auth/react'
import { CinematicCursor } from './CinematicCursor'
import React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CinematicCursor>
        {children}
      </CinematicCursor>
    </SessionProvider>
  )
}

