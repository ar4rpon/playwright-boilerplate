import { chromium, BrowserContext, Cookie } from "playwright";
import * as dotenv from "dotenv";
dotenv.config();

async function getLoginCookies(): Promise<Cookie[]> {
  const SALESFORCE_LOGIN_URL: string = process.env
    .SALESFORCE_LOGIN_URL as string;
  const SALESFORCE_MAIL: string = process.env.SALESFORCE_MAIL as string;
  const SALESFORCE_PASS: string = process.env.SALESFORCE_PASS as string;
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const page = await context.newPage();

  // ログイン処理
  await page.goto(SALESFORCE_LOGIN_URL);
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").fill(SALESFORCE_MAIL);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(SALESFORCE_PASS);
  await page.getByRole("button", { name: "Log In" }).click();

  // 任意の要素でログイン完了可否を確認（iframe内要素はうまく検知できないのでそれ以外の要素を指定する）
  await page.waitForSelector(".slds-truncate");

  // Cookieを取得
  const cookies = await context.cookies();

  await browser.close();

  return cookies;
}

// CookieのSameSite属性をLaxに書き換えて保存する非同期関数
async function saveCookies(cookies: Cookie[]): Promise<void> {
  // CookieをJSON形式で保存
  const fs = require("fs");
  const jsonFilePath = "./tmp/sf.json"; // 保存するJSONファイルのパスを指定
  fs.writeFileSync(jsonFilePath, JSON.stringify(cookies, null, 2));
}

async function main() {
  try {
    const cookies = await getLoginCookies();
    await saveCookies(cookies);
  } catch (error) {
    console.error("エラー:", error);
  }
}

// メインプログラムを実行
main();
