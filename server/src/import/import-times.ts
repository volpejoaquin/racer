// libs
import * as express from 'express';
import * as fs from 'fs';

import * as CsvReadableStream from  'csv-reader';


export class ImportTimes {
  private app: express.Application;
  private filename = '';

  constructor() {
    this.createApp();
    this.config();
    this.importFile();
  }

  public getApp(): express.Application {
    return this.app;
  }

  // Private methods
  private createApp(): void {
    this.app = express();
  }

  private config(): void {
    this.filename = process.env.FILE_NAME || '/Users/joaco/Proyectos/angular/racer-server/files/datos-solo.csv';
  }

  private importFile(): void {
    console.log('Importing file...');
    
    if (!this.filename) {
      console.log('ERROR: INVALID FILE.');
      return;
    }

    const dummyFile = 'times.json';

    var inputStream = fs.createReadStream(this.filename, 'utf8');
 
    inputStream
      .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
      .on('data', function (row) {
          console.log('A row arrived: ', row);
      })
      .on('end', function (data) {
          console.log('No more rows!');
      });

    console.log('Dummy file created: ' + dummyFile);
  }
}
