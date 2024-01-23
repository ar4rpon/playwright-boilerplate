import { chromium, Browser, Page } from "playwright";
import { writeToCSV } from "../lib/csvWriter";

async function run() {
  // ブラウザを起動
  const browser: Browser = await chromium.launch({ headless: true });
  const page: Page = await browser.newPage();

  // 特定のURLにアクセス
  await page.goto("https://example.com");

  // 要素を選択して値を入力
  await page.fill('input[name="username"]', "your_username");
  await page.fill('input[name="password"]', "your_password");

  // ボタンをクリック
  await page.click('button[type="submit"]');

  // テキストの取得
  const text = await page.textContent(".some-class");

  // 指定した時間（ミリ秒）だけ待機する
  await page.waitForTimeout(5000); // 5秒待機

  // スクリーンショットを撮影
  await page.screenshot({ path: "screenshot.png" });

  // 特定の要素が表示されるまで待機
  await page.waitForSelector(".some-other-class");

  // ページ遷移を待機
  await page.waitForNavigation();

  // ドロップダウンから項目を選択
  await page.selectOption('select[name="dropdown"]', "option_value");

  // ブラウザを閉じる
  await browser.close();
}

run();

// csv出力のサンプルコード
// 使用するデータとヘッダー
const data = [
  { column2: "value1", column1: "value2" },
  { column1: "value1", column2: "value2" },
  { column1: "value1", column2: "value2" }
];
const headers = [
  { id: "column1", title: "COLUMN1" },
  { id: "column2", title: "COLUMN2" }
  // 他のヘッダー情報
];

// CSVファイルに書き込み
writeToCSV(data, headers, "tmp/output.csv")
  .then(() => {
    console.log("CSVファイルが生成されました");
  })
  .catch((error) => {
    console.error("CSVファイルの生成中にエラーが発生しました", error);
  });
