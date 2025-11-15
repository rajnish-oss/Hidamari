// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const body = await req.json();

//   if (!body) {
//     return new NextResponse("No body", { status: 400 });
//   }

//   try {
//     const filter = body.filter;

//     // 1️⃣ Create list (same as your existing code)
//     const listResp = await fetch(
//       "https://api.phantombuster.com/api/v2/org-storage/lists/save",
//       {
//         method: "POST",
//         headers: {
//           "X-Phantombuster-Key": process.env.PHANTOMBUSTER_API_KEY!,
//           "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify({
//           name: body.name,
//           filter,
//           description: body.description ?? "",
//           tags: body.tags ?? [],
//           value: {}, // REQUIRED by Phantombuster validator
//         }),
//       }
//     );

//     const listData = await listResp.json();
//     console.log(listData)

//     // 2️⃣ Fetch leads using `/leads/search`
//     const leadResp = await fetch(
//       `https://api.phantombuster.com/api/v2/org-storage/leads/by-list/${listData.id}`,
//       {
//         method: "GET",
//         headers: {
//           "X-Phantombuster-Key": process.env.PHANTOMBUSTER_API_KEY!,
//           "Content-Type": "application/json;charset=utf-8",
//         }
//       }
//     );

//     const leadData = await leadResp.json();
//     console.log(leadData)

//     // 3️⃣ Final combined response
//     return NextResponse.json({
//       status: "success",
//       list: listData,
//       leads: leadData.items ?? [],
//     });
//   } catch (error: any) {
//     console.log("internal error", error.message);
//     return new NextResponse("Something went wrong", { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';


export async function POST(req: Request) {
   const {cookie} = await req.json();
    console.log(cookie)
   const safeCookie = JSON.stringify(cookie)
   console.log(safeCookie)


    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
  })

  await browser.setCookie({
    name: 'li_at',
    value: safeCookie,
    domain:'.linkedin.com',
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "None"
  })
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com", { waitUntil: "domcontentloaded" });
  


  if(page.url().includes('login')){
    return NextResponse.json("Not logged in, wrong cookies")
  }
  

  return NextResponse.json("Done")
}