import { NextResponse } from "next/server";

interface ResponseData {
    message: string;
}

export async function GET() {
    const response: ResponseData = { message: "Hello World" };
    return NextResponse.json(response);
}