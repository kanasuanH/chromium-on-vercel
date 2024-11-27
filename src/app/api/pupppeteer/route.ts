import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { htmlContent } = await req.json();

    if (!htmlContent) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    let browser = null;
    try {
      browser = await puppeteer.launch({
        executablePath: await chrome.executablePath,
        args: chrome.args,
        headless: chrome.headless,
      });

      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'load' });
      await page.emulateMediaType('print');

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      await page.close();
      await browser.close();

      const response = new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=output.pdf',
        },
      });

      return response;
    } catch (error) {
      console.error('Error generating PDF:', error);
      if (browser) {
        await browser.close();
      }
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }
}
