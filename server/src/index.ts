// libs
import { TimesImporter } from './import/import-times';
import { SoloImporter } from './import/import-solo';
import { TimingServer } from './timing-server';

const filePath = '/Users/joaco/Proyectos/angular/racer-server/files/datos-solo.kml',
  destPath = '/Users/joaco/Proyectos/angular/racer-server/server/src/data/solo-data.ts';

// let app = new TimingServer().getApp(); // TODO: REVERT THIS
// let app = new TimesImporter().getApp();
let app = new SoloImporter(filePath, destPath).getApp();
export { app };