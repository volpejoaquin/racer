// libs
import * as express from 'express';

export abstract class BaseImporter {
  protected app: express.Application;
  protected filePath = '';
  protected destPath = '';

  constructor(fPath: string, dPath: string) {
    this.filePath = fPath;
    this.destPath = dPath;

    this.createApp();
  }

  public getApp(): express.Application {
    return this.app;
  }

  protected createApp(): void {
    this.app = express();
  }
}