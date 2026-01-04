import { ReactNode } from "react"

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  // Auth is currently disabled; layout kept for future use
  return <>{children}</>
}

