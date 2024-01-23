import { chromium, BrowserContext, Cookie } from "playwright";
import * as dotenv from "dotenv";
dotenv.config();

async function getLoginCookies(): Promise<Cookie[]> {
  const GOOGLE_MAIL: string = process.env.GOOGLE_MAIL as string;
  const GOOGLE_PASS: string = process.env.GOOGLE_PASS as string;
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const page = await context.newPage();

  // ログイン処理
  await page.goto(
    "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=ASKXGp3rBOusEiLjMz3qGy-PAv3EmT7Ihn2RGkfVD7Em4mcG9NZEJRTvnjzlkLB8qRyw3jwkhu7i&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1006312191%3A1705934146232978&theme=glif#inbox"
  );
  await page.getByLabel("Email or phone").click();
  await page.getByLabel("Email or phone").fill(GOOGLE_MAIL);
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Enter your password").click();
  await page.getByLabel("Enter your password").fill(GOOGLE_PASS);
  await page.getByRole("button", { name: "Next" }).click();
  await page.waitForTimeout(10000);
  // Cookieを取得
  const cookies = await context.cookies();

  await browser.close();

  return cookies;
}

// CookieのSameSite属性をLaxに書き換えて保存する非同期関数
async function saveCookiesWithLaxAttribute(cookies: Cookie[]): Promise<void> {
  // CookieのSameSite属性をすべてLaxに書き換える
  const cookiesWithLaxAttribute = cookies.map((cookie) => {
    cookie.sameSite = "Lax";
    return cookie;
  });

  // CookieをJSON形式で保存
  const fs = require("fs");
  const jsonFilePath = "./tmp/google.json"; // 保存するJSONファイルのパスを指定
  fs.writeFileSync(
    jsonFilePath,
    JSON.stringify(cookiesWithLaxAttribute, null, 2)
  );

  console.log("CookieをLaxに書き換えて保存しました。");
}

async function main() {
  try {
    const cookies = await getLoginCookies();
    await saveCookiesWithLaxAttribute(cookies);
  } catch (error) {
    console.error("エラー:", error);
  }
}

// メインプログラムを実行
main();
