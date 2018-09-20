export class LogHelper {

  private enabled = true;

  constructor(enable: boolean) {
    this.enabled = enable;
  }

  log(content: any) {
    if (!this.enabled) {
      return;
    }

    console.log(content);
  }
}
