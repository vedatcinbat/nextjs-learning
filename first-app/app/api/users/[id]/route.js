import { NextResponse } from 'next/server';
import {usersData} from '../../datas/usersData';

export function GET(res, {params}) {
    const { id } = params;

    const user = usersData.find(user => user.id === parseInt(id));

    if (!user) {
        return NextResponse.json([]);
    }
    
    return NextResponse.json(user);
}