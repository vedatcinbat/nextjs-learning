import { NextResponse } from "next/server";
import {usersData} from "../datas/usersData";

// GET /api/users
export async function GET() {
    return NextResponse.json(usersData);
}

// POST /api/users
export async function POST(req) {
    const {name, surname, age} = await req.json();

    const newUser = { id: (usersData.length + 1).toString(), name, surname, age };

    usersData.push(newUser);
    return NextResponse.json(newUser);
}