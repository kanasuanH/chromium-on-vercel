import puppeteer from "puppeteer";
import { NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try{
    // const install = require(`puppeteer/internal/node/install.js`).downloadBrowser;
    // await install();
  
    // const browser = await puppeteer.launch({
    //   args: ["--use-gl=angle", "--use-angle=swiftshader", "--single-process", "--no-sandbox"],
    //   headless: true,
    // });
  
    // const page = await browser.newPage();
  
    // const url = `https://news.ycombinator.com`;
    // await page.goto(url);
  
    // const [image, title] = await Promise.all([page.screenshot(), page.title()]);
  
    // await page.close();
    // await browser.close();

    return NextResponse.json({ error: 'It run' }, { status: 200 });
    

    // const install = require(`puppeteer/internal/node/install.js`).downloadBrowser;
    // await install();
  
    // const browser = await puppeteer.launch({
    //   args: ["--use-gl=angle", "--use-angle=swiftshader", "--single-process", "--no-sandbox"],
    //   headless: true,
    // });
  
    // const page = await browser.newPage();

    // const htmlContent = `<html><body><h1>Your PDF Content</h1></body></html>`
  
    // await page.setContent(htmlContent, { waitUntil: 'load' });

    // const pdfBuffer = await page.pdf({
    //   format: 'A4',
    //   printBackground: true,
    // });
  
    // await page.close();
    // await browser.close();

    //   const response = new NextResponse(pdfBuffer, {
    //     status: 200,
    //     headers: {
    //       'Content-Type': 'application/pdf',
    //       'Content-Disposition': 'attachment; filename=output.pdf',
    //     },
    //   });

    //   return response;

      
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }
  // try {
  //   const { htmlContent } = await req.json();

  //   if (!htmlContent) {
  //     return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
  //   }
  //     const install = require(`puppeteer/internal/node/install.js`).downloadBrowser;
  //     await install();
    
  //     const browser = await puppeteer.launch({
  //       args: ["--use-gl=angle", "--use-angle=swiftshader", "--single-process", "--no-sandbox"],
  //       headless: true,
  //     });
    
  //     const page = await browser.newPage();
  //     await page.setContent(htmlContent, { waitUntil: 'load' });
  //     await page.emulateMediaType('print');

  //     const pdfBuffer = await page.pdf({
  //       format: 'A4',
  //       printBackground: true,
  //     });

  //     await page.close();
  //     await browser.close();

  //     const response = new NextResponse(pdfBuffer, {
  //       status: 200,
  //       headers: {
  //         'Content-Type': 'application/pdf',
  //         'Content-Disposition': 'attachment; filename=output.pdf',
  //       },
  //     });

  //     return response;
  // } catch (error) {
  //   return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  // }
}

