import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { cookie } = await req.json();
  
    // Save cookie in database
    await db.cookies.upsert({ userId: "user1", cookie });
  
    return NextResponse.json({ status: "success" });
  }
  