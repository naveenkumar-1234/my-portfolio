// app/api/createPreference/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const key_id = "rzp_test_RAG1WIHfDsximq";     // Your Razorpay Test Key
    const key_secret = "dqxp8ieYYLTOA060ANEv7RDv"; // Your Razorpay Test Secret

    const res = await fetch(
      "https://api.razorpay.com/v2/standard_checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + Buffer.from(`${key_id}:${key_secret}`).toString("base64"),
        },
        body: JSON.stringify({
          currency: "INR",
          amount: body.amount,      // Amount in paise (₹1 = 100 paise)
          qr_required: true,
          notes: body.notes || { plan: "Weekly Bronze" },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Razorpay API error:", data);
      return NextResponse.json({ error: data });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json({ error: err.message });
  }
}
