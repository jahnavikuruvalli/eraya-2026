import { NextRequest, NextResponse } from "next/server"
import { webhook } from "@/lib/server/controllers/payments-controller"

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED !== "true") {
    return NextResponse.json({ ok: true })
  }

  return webhook(request)
}


