'use client'

import dynamic from 'next/dynamic'

// Dynamically import to prevent SSR issues
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function ConnectWalletButton() {
  return (
    <div className="">
      <WalletMultiButton  />
    </div>
  )
}
