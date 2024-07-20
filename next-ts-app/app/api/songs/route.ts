import { NextResponse } from "next/server";
import { Song } from "../types/types";

const songs: Song[] = [
    {
        id: 1,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        year: 1975,
    },
]

export async function GET() {
    return NextResponse.json(songs);
}