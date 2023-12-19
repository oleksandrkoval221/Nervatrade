import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || "";
  const limit = Number(searchParams.get('limit')) || 0;
  const id_only = searchParams.get('id_only') === 'true';
  const since_secs = searchParams.get('since_secs') || null;

  const endpointUrl = `https://dev.alfablox.com/api/v1/twitter/query`;

  let data = JSON.stringify({
    params: {
      search,
      limit,
      id_only
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endpointUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);

    return NextResponse.json(response.data)
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}