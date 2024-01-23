import { createObjectCsvWriter } from "csv-writer";

interface CsvHeader {
  id: string;
  title: string;
}

export async function writeToCSV(data: any[], headers: CsvHeader[], filePath: string) {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: headers
  });

  await csvWriter.writeRecords(data);
}
