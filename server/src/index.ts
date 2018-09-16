// libs
import { ImportTimes } from './import/import-times';
import { ImportSolo } from './import/import-solo';
import { TimingServer } from './timing-server';

// let app = new TimingServer().getApp(); // TODO: REVERT THIS
// let app = new ImportTimes().getApp();
let app = new ImportSolo().getApp();
export { app };