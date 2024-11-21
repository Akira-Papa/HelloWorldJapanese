import { connectDB } from '@/lib/mongodb';
import { Memo } from '@/models/Memo';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const memos = await Memo.find().sort({ createdAt: -1 });
    return NextResponse.json(memos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch memos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { content } = await request.json();
    const memo = await Memo.create({ content });
    return NextResponse.json(memo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create memo' }, { status: 500 });
  }
}
