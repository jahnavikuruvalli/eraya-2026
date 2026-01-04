import { NextResponse } from "next/server"

export async function GET() {
  // Auth confirmation disabled
  return NextResponse.json(
    { message: "Auth disabled" },
    { status: 410 }
  )
}
