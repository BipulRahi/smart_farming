'use client'

import { ReactNode } from 'react'
import SolanaWalletProvider from './SolanaWalletProvider'
import '../lib/polyfills'

export default function WalletClientWrapper({ children }: { children: ReactNode }) {
  return <SolanaWalletProvider>{children}</SolanaWalletProvider>
}
