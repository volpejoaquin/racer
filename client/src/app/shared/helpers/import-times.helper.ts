// libs
import * as lodash from 'lodash';

// models
import {
  TrackLap,
  TrackPartialLap,
  RaceParticipantTrackActivity,
  RaceParticipantTrackActivityState
} from '../model';

// helpers
import { LogHelper } from './log.helper';

// dummy data
import {
  CHAMPIONSHIP
} from './../dummy';

const CDA_HEADERS = ['Auto', 'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Tie.Vta.'];
const HEADERS = CDA_HEADERS;
const PARTICIPANT_COLS_COUNT = CDA_HEADERS.length;

export class ImportTimesHelper {
  private logHelper: LogHelper = new LogHelper(true);

  constructor() {
  }

  importCDAData(rows: any): RaceParticipantTrackActivity[] {
    this.logHelper.log('Parsing file...');

    let insideTimes = false;
    let firstColValue: any;
    let leftRow: any[];
    let rightRow: any[];

    let trackLaps: any = {};

    rows.forEach((row: []) => {
      // check if row is not empty
      if (!lodash.isEmpty(row)) {
        firstColValue = this.getRowValue(row, 0);
        // check first column
        if (!insideTimes && firstColValue && firstColValue === HEADERS[0]) { // TODO: compare all headers values
          insideTimes = true;

          this.logHelper.log('Importing times...');
        } else {
          // check if inside times rows, then parse each row
          if (insideTimes) {
            this.logHelper.log('Parsing row...');

            // parse left row
            leftRow = row.slice(0, PARTICIPANT_COLS_COUNT);
            this.logHelper.log('Left row: ' + JSON.stringify(leftRow));

            if (leftRow && leftRow.length > 0) {
              trackLaps = this.parseRow(leftRow, trackLaps);
            }

            // parse right row
            rightRow = row.slice(PARTICIPANT_COLS_COUNT + 1, row.length);
            this.logHelper.log('Right row: ' + JSON.stringify(rightRow));

            if (rightRow && rightRow.length > 0) {
              trackLaps = this.parseRow(leftRow, trackLaps);
            }
          }
        }
      }
    });

    this.logHelper.log('Finished !');

    return lodash.toArray(trackLaps);
  }

  private getRowValue(row: any, index: number) {
    return row[index] ? lodash.trim(row[index]) : null;
  }

  private parseRow(row: any[], trackLaps: any): any {
    this.logHelper.log('Parsing row.. # ' + row[0]);

    // create partials
    const partials: TrackPartialLap[] = [];
    let partialTime;
    let time = 0;

    row.slice(1, row.length - 1).forEach((col: any, index: number) => {

      if (lodash.isNumber(col)) {
        partialTime = parseInt(col, 10);

        partials.push({
          time: partialTime,
          sector: index
        });

        time += partialTime;
      }
    });

    const timeString = lodash.last(row); // TODO: PARSE LAP TIME
    this.logHelper.log('TODO: Parse lap time string: ' + timeString);

    const trackLap: TrackLap = {
      time: time,
      ref_lap: false,
      partials: partials
    };

    this.logHelper.log('New track lap... ' + JSON.stringify(trackLap));

    let raceParticipantNumber;

    // check number
    if (lodash.isNumber(row[0])) {
      raceParticipantNumber = parseInt(row[0], 10);
    } else {
      raceParticipantNumber = 0;
    }

    // check base object
    if (!trackLaps[raceParticipantNumber]) {
      trackLaps[raceParticipantNumber] = {
        state: RaceParticipantTrackActivityState.on_pit,
        race_participant: { // TODO: find race participant insde app data
          team: {
            name: 'DUMMY'
          },
          car: {
            name: 'DUMMY'
          },
          driver: {
            name: 'DUMMY',
            last_name: 'DUMMY'
          },
          number: raceParticipantNumber,
          championship: CHAMPIONSHIP
        },
        laps: [
          trackLap
        ],
        laps_count: 0,
        best_lap: null,
        last_lap: null
      };
    } else {
      trackLaps[raceParticipantNumber].laps.push(trackLap);
    }

    return trackLaps;
  }
}
