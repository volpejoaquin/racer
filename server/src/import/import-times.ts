// // libs
// import * as fs from 'fs';
// import * as CsvReadableStream from  'csv-reader';

// // models
// import { BaseImporter } from './base-import';

// export class TimesImporter extends BaseImporter {

//   constructor(filePath: string, destPath: string) {
//     super(filePath, destPath);

//     this.importFile();
//   }
  
//   // private methods
//   private importFile(): void {
//     console.log('Importing file...');
    
//     if (!this.filePath) {
//       console.log('ERROR: INVALID FILE.');
//       return;
//     }

//     const dummyFile = 'times.json';

//     var inputStream = fs.createReadStream(this.filePath, 'utf8');
 
//     inputStream
//       .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
//       .on('data', function (row: any) {
//           console.log('A row arrived: ', row);
//       })
//       .on('end', function (data: any) {
//           console.log('No more rows!');
//       });

//     console.log('Dummy file created: ' + dummyFile);
//   }
// }
