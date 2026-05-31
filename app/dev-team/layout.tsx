import ConvexClientProvider from '@/components/convexclientprovider'
import { ReactNode } from 'react'

export default function DevTeamLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider>
      {children}
    </ConvexClientProvider>
  )
}
