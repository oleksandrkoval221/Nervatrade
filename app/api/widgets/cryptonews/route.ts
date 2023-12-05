import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const currentPage = searchParams.get('currentPage');

  const API_KEY = process.env.CRYPTOPANIC_API_KEY || "";
  const API_URL = 'https://cryptopanic.com/api/v1/posts/';

  try {
    const response = await axios.get(API_URL, {
      params: {
        auth_token: API_KEY,
        public: true,
        page: currentPage
      },
    });

    return NextResponse.json(response.data)
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}