// libs
import * as express from 'express';
import * as fs from 'fs';
import * as kml2svg from 'kml2svg';

import * as CsvReadableStream from  'csv-reader';


export class ImportSolo {
  private app: express.Application;
  private filePath = '';

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
    this.filePath = process.env.FILE_NAME || '/Users/joaco/Proyectos/angular/racer-server/files/datos-solo.kml';
  }

  private importFile(): void {
    console.log('Importing file...');
    
    if (!this.filePath) {
      console.log('ERROR: INVALID FILE.');
      return;
    }

    const dummyFile = 'datos-solo.svg',
      svgObj = kml2svg(this.filePath);

    console.log(svgObj);

    console.log('Dummy file created: ' + dummyFile);
  }
}
