// libs
import { ImportTimes } from './import/import-times';
import { TimingServer } from './timing-server';

// let app = new TimingServer().getApp(); // TODO: REVERT THIS
let app = new ImportTimes().getApp();
export { app };