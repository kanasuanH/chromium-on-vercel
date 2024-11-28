import puppeteer from "puppeteer";

export const maxDuration = 60;

export default async function generatePDFBlob() {
    const install = require(`puppeteer/internal/node/install.js`).downloadBrowser;
    await install();
  
    const browser = await puppeteer.launch({
      args: ["--use-gl=angle", "--use-angle=swiftshader", "--single-process", "--no-sandbox"],
      headless: true,
    });
  
    const page = await browser.newPage();

    const htmlContent = `<html><body><h1>Your PDF Content</h1></body></html>`
  
    await page.setContent(htmlContent, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });
  
    await page.close();
    await browser.close();

    return pdfBuffer
}