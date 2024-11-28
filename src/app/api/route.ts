
import { NextResponse } from 'next/server';
import { generatePDFBlob } from ./generatePDFBlob;

export const maxDuration = 60;
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try{

  const pdfBuffer = await generatePDFBlob();

  const response = new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=output.pdf',
    },
  });

  return response;

  } catch (error) {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }
}

