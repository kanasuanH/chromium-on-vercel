import puppeteer, { Browser, Page } from 'puppeteer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { htmlContent } = req.body;

  if (!htmlContent) {
    return res.status(400).json({ error: 'HTML content is required' });
  }

  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      args: ['--use-gl=angle', '--use-angle=swiftshader', '--single-process', '--no-sandbox'],
      headless: true,
    });

    const page: Page = await browser.newPage();

    // Set content
    await page.setContent(htmlContent, { waitUntil: 'load' });
    await page.emulateMediaType('print');

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await page.close();
    await browser.close();

    // Send PDF as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (browser) {
      await browser.close();
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
