// libs
import * as XLSX from 'xlsx';

export class FileReaderHelper {
  constructor() {
  }

  convertXLSXToJson(file: any, onload: (e: any) => void) {
    // this.readFile(file, (data: any) => {
    this.readFileByUrl(file, (data: any) => { // TODO: REVIEW THIS
      if (!data) {
        onload(null);
        return;
      }
      const wb: XLSX.WorkBook = XLSX.read(data, {type: 'binary'});

      // read first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // convert to json
      onload(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    });
  }

  readFile(file: any, onload: (e: any) => void) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      // check result validity
      if (e && e.target && e.target.result) {
        onload(e.target.result);
      }
    };
    reader.readAsBinaryString(file);
  }

  readFileByUrl(fileUrl: string, onload: (e: any) => void) {
    const request = new XMLHttpRequest();

    request.open('GET', fileUrl, true);
    request.responseType = 'blob';
    request.onload = ()  => {
      // check response validity
      if (request && request.response) {
        this.readFile(request.response, onload);
      }
    };
    request.send();
  }
}
