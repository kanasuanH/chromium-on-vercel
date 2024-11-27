import puppeteer from "puppeteer";

export default function Home() {
  const downloadPdf = async () => {
    const blob = await getPDF(); // This is the Blob returned from your getPDF function

    // Create an object URL from the Blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.pdf';
    
    // Append the link, trigger the click, and remove the link afterward
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Download your PDF</h1>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

async function getPDF() {
  const install = require(`puppeteer/internal/node/install.js`).downloadBrowser;
  await install();

  const browser = await puppeteer.launch({
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--single-process", "--no-sandbox"],
    headless: true,
  });

  const page = await browser.newPage();

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <style>
        body {
          font-family: "Noto Sans Thai", sans-serif;
          margin: 0;
          padding-left: 20px;
          padding-right: 20px;
          line-height: 1.6;
          background: #f9f9f9;
        }
  
        ul {
          list-style-position: inside; /* Ensure the bullet aligns with text */
          margin:0;
          padding:0;
        }
  
        @page {
          padding-top: 20px;
        }
  
        @media print {
          .Frame2 {
            page-break-inside: avoid; /* Prevent breaking inside the Frame */
            page-break-after: always; /* Force a new page after each Frame */
            margin-top: 50px; /* Add top margin after page break */
          }
  
          .Frame2:last-child {
            page-break-after: auto; /* Prevent unnecessary blank pages */
          }
        }
  
        .Frame {
          max-width: 800px;
          margin: auto;
          padding: 24px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
  
        .Frame2 {
          max-width: 800px;
          margin: auto;
          padding: 24px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
  
  
        .header {
          font-size: 22px;
          font-weight: 700;
          color: #090e10;
        }
  
        .details {
          display: flex;
          align-items: center; /* Vertically aligns content in the center */
          gap: 16px;
        }
  
        .avatar {
          width: 150px;
          height: 150px; /* Defines the height of the container */
        }
  
        .avatar img {
          width: 100%;
          height: 100%;
        }
  
        .personal-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
  
        .content {
          font-size: 15px;
          font-weight: 400;
          color: #000000;
          line-height: 1.5;
          word-wrap: break-word;
        }
  
        .table_1 {
          width: 100%;
          border-collapse: collapse;
        }
  
        .table_1 th,
        .table_1 td {
          word-wrap: break-word;
          white-space: normal;
          padding: 8px;
          text-align: left;
        }
  
        .table_1 th {
          background: rgba(33, 150, 243, 0.1);
          font-weight: 700;
        }
  
        .table_2 {
          width: 100%;
          border-collapse: collapse;
        }
  
        .table_2 th,
        .table_2 td {
          word-wrap: break-word;
          white-space: normal;
          border-top: 1px solid #e0e0e0;
          border-bottom: 1px solid #e0e0e0;
          padding: 8px;
          text-align: left;
        }
  
        /* Apply border only to the first column (leftmost cells) */
        .table_2 th:first-child,
        .table_2 td:first-child {
          border-left: 1px solid #e0e0e0;
        }
  
        /* Apply border only to the last column (rightmost cells) */
        .table_2 th:last-child,
        .table_2 td:last-child {
          border-right: 1px solid #e0e0e0;
        }
  
        .table_2 th {
          background: rgba(33, 150, 243, 0.1);
          font-weight: 700;
        }
  
        .table {
          width: 100%;
          border-collapse: collapse;
        }
  
        .table th,
        .table td {
          word-wrap: break-word;
          white-space: normal;
          border: 1px solid #e0e0e0;
          padding: 8px;
          text-align: left;
        }
  
        .table th {
          background: rgba(33, 150, 243, 0.1);
          font-weight: 700;
        }
      </style>
    </head>
    <body>
      <div class="Frame">
        <div class="header">ข้อมูลส่วนตัว</div>
        <div class="details">
          <div class="avatar">
            <img src="https://i.pravatar.cc/150?img=5" alt="Avatar" />
          </div>
          <div class="personal-info">
            <div class="content">
              <table class="table_1">
                <tbody>
                  <tr>
                    <td style="font-weight: bold">ชื่อ - นามสกุล :</td>
                    <td colspan="3">John Doe</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold">อายุ :</td>
                    <td>72 ปี</td>
                    <td style="font-weight: bold">เลขบัตรประชาชน :</td>
                    <td>0000000000000</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold">เพศ :</td>
                    <td>หญิง</td>
                    <td style="font-weight: bold">โทรศัพท์ :</td>
                    <td>0000000000</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold">น้ำหนัก :</td>
                    <td>53 กิโลกรัม</td>
                    <td style="font-weight: bold">ส่วนสูง :</td>
                    <td>160 เซ็นติเมตร</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold">อุปกรณ์ที่เชื่อมต่อ :</td>
                    <td>แท็ก ( 001 )</td>
                    <td style="font-weight: bold">ห้องพัก :</td>
                    <td>0000000000000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="header">ญาติที่สามารถติดต่อได้ยามฉุกเฉิน</div>
        <div class="content">
          <table class="table_2">
            <thead>
              <tr>
                <th>ลำดับที่</th>
                <th>ชื่อ - นามสกุล</th>
                <th>ความสัมพันธ์</th>
                <th>โทรศัพท์</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>บุตร</td>
                <td>0000000000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>น้องสาว</td>
                <td>1111111111</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="Frame2" style="margin-top:10px;">
        <div class="header">ประวัติการเจ็บป่วย</div>
        <div class="content">
          <p><strong>แพ้ยา:</strong> ไม่มี</p>
          <p><strong>แพ้อาหาร:</strong> ไม่มี</p>
          <p><strong>โรคประจำตัว:</strong> ความดันโลหิตสูง</p>
          <p><strong>ประวัติการผ่าตัด:</strong> ไม่มี</p>
          <p><strong>ยาประจำตัว:</strong> ยาลดความดัน</p>
        </div>
      </div>
      <div class="Frame">
        <div class="header">ผลการติดตามการทำกิจกรรรม</div>
        <div class="content">
          <p><strong>ความเสี่ยงโรคกล้ามเนื้ออ่อนแรง :</strong> ไม่มีความเสี่ยง</p>
          <p><strong>ความเสี่ยงภาวะนอนไม่หลับ :</strong> ไม่มีความเสี่ยง</p>
          <table class="table">
            <thead>
              <tr>
                <th>กิจกรรม</th>
                <th>สถานะ</th>
                <th>คำแนะนำเพิ่มเติมเบื้องต้น</th>
              </tr>
            </thead>
            <tbody style="vertical-align:top">
              <tr>
                <td>
                  <strong>การทำกิจกรรมโดยรวม</strong>
                  <p>
                    ผู้สูงอายุควรมีกิจกรรมทางกายที่ระดับเหนื่อยปานกลางสะสม
                    อย่างน้อย 150 - 300 นาทีต่อสัปดาห์ หรือ 30 นาทีต่อวัน
                    อย่างน้อย 5 วันต่อสัปดาห์ โดยกิจกรรมทางกายสามารถเป็นได้ทั้ง
                    การเดิน การขึ้นลงบันได การทำงานบ้าน ปั่นจักรยาน และ
                    การออกกำลังกายสะสมเพิ่มเติม
                  </p>
                </td>
                <td>
                  <strong>ดี</strong>
                  <ul>
                    <li>
                      มีกิจกรรมทางกายที่ระดับเหนื่อยปานกลางสะสมได้ 180
                      นาทีต่อสัปดาห์
                    </li>
                  </ul>
                </td>
                <td>
                  <p>
                    การทำกิจกรรมประจำวันสามารถช่วยให้ร่างกายแข็งแรงขึ้นได้
                    ควรเพิ่มเวลาในการเดินออกกำลังกายอย่างสม่ำเสมอ
                    เพื่อเพิ่มประสิทธิภาพในการเผาผลาญพลังงาน
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>การออกกำลังกายสะสมเพิ่มเติม</strong>
                  <p>
                    ผู้สูงอายุควรมีการออกกำลังกายสะสมเพิ่มเติม เช่น เดินเร็ว
                    ปั่นจักรยาน วิ่งเหยาะ เต้นแอโรบิก เต้นบาสโลบ ครั้งละ 10 - 15
                    นาที หรือสะสม ก้าวเดิน ให้ได้ 5,000 ก้าวขึ้นไป เป็นต้น
                  </p>
                </td>
                <td>
                  <strong>ดี</strong>
                  <ul>
                    <li>มีการออกกำลังกายสะสมเพิ่มเติม</li>
                    <li>ก้าวเดินสะสมเฉลี่ย 5190 ก้าว</li>
                  </ul>
                </td>
                <td>
                  <p>
                    การออกกำลังกายต่อเนื่องจะช่วยพัฒนาความทนทานของกล้ามเนื้อ
                    และเพิ่มการไหลเวียนของโลหิตไปยังอวัยวะต่างๆ
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>การนอนหลับ</strong>
                  <p>
                    ตามคู่มือแผนส่งเสริมสุขภาพดี ผู้สูงอายุควรนอนประมาณวันละ 7-8
                    ชั่วโมง โดยเข้านอนอย่างเป็นเวลา ไม่นับการงีบหลับในเวลา กลางวัน
                  </p>
                </td>
                <td>
                  <strong>ดี</strong>
                  <ul>
                    <li>นอนหลับครบ 7 - 8 ชั่วโมงเป็นประจำ</li>
                  </ul>
                </td>
                <td>
                  <p>
                    ควรนอนหลับให้ครบ 7-8 ชั่วโมงต่อวัน
                    และหลีกเลี่ยงการใช้โทรศัพท์มือถือก่อนนอน
                    เพื่อให้ร่างกายได้พักผ่อนอย่างเต็มที่
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="Frame2">
        <div class="header">สถิติการหกล้ม</div>
        <div class="content">
          <p>
            <strong>จำนวนครั้งการหกล้ม:</strong>
            <span style="color: red">3 ครั้ง</span>
          </p>
  
          <p>
            <strong>คำแนะนำเพิ่มเติมเบื้องต้น :</strong>
            มีความเสี่ยงเป็นโรคกล้ามเนื้ออ่อนแรง ควรเฝ้าสังเกตอย่างใกล้ชิด
            หากยังคงมีการหกล้มบ่อย ควรปรึกษาแพทย์
          </p>
          <table class="table_2">
            <thead>
              <tr>
                <th>วันที่แจ้งเตือน</th>
                <th>ตำแหน่งที่ล้ม</th>
                <th>ผู้รับผิดชอบดูแล</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>11/09/2024, 11:00</td>
                <td>Room1</td>
                <td>Steevee</td>
              </tr>
              <tr>
                <td>11/09/2024, 11:00</td>
                <td>Room1</td>
                <td>Steevee</td>
              </tr>
              <tr>
                <td>11/09/2024, 11:00</td>
                <td>Room1</td>
                <td>Steevee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </body>
  </html>`

  await page.setContent(htmlContent, { waitUntil: "load" });

  await page.emulateMediaType("print");

  const pdfBuffer = await page.pdf({
    path: "output.pdf",
    format: "A4",
    printBackground: true,
  });

  await page.close();
  await browser.close();

  const arrayBuffer = pdfBuffer.buffer.slice(pdfBuffer.byteOffset, pdfBuffer.byteOffset + pdfBuffer.byteLength);

  return new Blob([arrayBuffer], { type: 'application/pdf' });

}
