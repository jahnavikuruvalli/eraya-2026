import { NextRequest, NextResponse } from "next/server"
import { createOrder } from "@/lib/server/controllers/payments-controller"

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED !== "true") {
    return NextResponse.json(
      { error: "Payments not enabled yet" },
      { status: 503 }
    )
  }

  // real logic (kept intact)
  return createOrder(request)
}


