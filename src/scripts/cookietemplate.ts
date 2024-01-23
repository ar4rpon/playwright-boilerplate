import { chromium, Cookie } from "playwright-core";
import { readJsonFile } from "../lib/readJson"; // JSONファイルを読み込む関数をインポート

const jsonFilePath = "./tmp/sf.json"; // Cookie情報が格納されたJSONファイルのパスを指定

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  try {
    // JSONファイルからCookie情報を読み込む
    const cookies: Cookie[] = await readJsonFile(jsonFilePath);

    // Cookie情報をブラウザコンテキストに追加
    await context.addCookies(cookies);

    // 特定のサイトに移動
    const page = await context.newPage();
    await page.goto("https://example.com"); // サイトのURLを指定

    // ここでサイト上での操作を追加できます
    await page.waitForTimeout(10000);

    // ページを閉じる
    await page.close();
  } catch (error) {
    console.error("エラー:", error);
  } finally {
    // ブラウザを閉じる
    await browser.close();
  }
}

// メインプログラムを実行
main();
