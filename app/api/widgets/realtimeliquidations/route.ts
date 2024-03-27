import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base");
  const exchange = searchParams.get("exchange");
  const min_amount = searchParams.get("min_amount");

  const API_KEY = process.env.XYPHER_API_KEY || "";
  const API_URL = "https://api-v2.xypher.io/api/liquidations";

  try {
    const response = await axios.get(API_URL, {
      params: {
        api_key: API_KEY,
        min_amount: min_amount,
        max_amount: 0,
        exchange: exchange,
        market: "All",
        base: base,
        side: "All",
        start_date: 0,
        end_date: 0,
        min_rate: 0,
        max_rate: 0,
        page: 0,
      },
    });

    return NextResponse.json(response.data);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
