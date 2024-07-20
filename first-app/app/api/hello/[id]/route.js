import { NextResponse } from "next/server";

export async function GET(res, {params}) {
    const { id } = params;

    const data = {id, message: `Hello ${id}`};

    return NextResponse.json(data);
}