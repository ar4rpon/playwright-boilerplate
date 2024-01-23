import * as fs from "fs";

// JSONファイルを読み込む関数
export async function readJsonFile(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonObject = JSON.parse(data);
        resolve(jsonObject); // JSONをJavaScriptオブジェクトに変換して解決する
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}
