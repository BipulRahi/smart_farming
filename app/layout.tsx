import './globals.css'
import type { Metadata } from 'next'
import WalletClientWrapper from '../components/WalletClientWrapper'

export const metadata: Metadata = {
  title: 'Farmer-Buyer App',
  description: 'Solana-powered marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletClientWrapper>
          {children}
        </WalletClientWrapper>
      </body>
    </html>
  )
}
