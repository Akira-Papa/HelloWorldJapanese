import { connectDB } from '@/app/lib/mongodb';
import { Memo } from '@/app/models/Memo';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { content } = await request.json();
    const memo = await Memo.findByIdAndUpdate(params.id, { content }, { new: true });
    return NextResponse.json(memo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update memo' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Memo.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Memo deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete memo' }, { status: 500 });
  }
}
