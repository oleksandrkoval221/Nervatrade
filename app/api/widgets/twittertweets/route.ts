import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';


export async function GET(request: NextRequest) {
  // const { searchParams } = new URL(request.url)
  // const currentPage = searchParams.get('currentPage');

  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent/";
  const params = {};
  const credentials = `${process.env.API_KEY}:${process.env.API_SECRET_KEY}`;
  const base64Credentials = btoa(credentials);
  const config = {
    headers: {
      "authorization": `Bearer ${base64Credentials}`
    }
  };
  try {
    const response = await axios.get(endpointUrl, { params, headers: config.headers });

    return NextResponse.json(response)
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}