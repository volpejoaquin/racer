// libs
import * as lodash from 'lodash';
import * as moment from 'moment';

// models
import {
  TrackLap,
  TrackPartialLap,
  RaceParticipantTrackActivity,
  RaceParticipantTrackActivityState
} from '../model';

// helpers
import { LogHelper } from './log.helper';
import { TimingHelper } from './timing.helper';

// dummy data
import {
  CHAMPIONSHIP
} from './../dummy';

const CDA_HEADERS = ['Auto', 'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Tie.Vta.'];
const HEADERS = CDA_HEADERS;
const PARTICIPANT_COLS_COUNT = CDA_HEADERS.length;
const PARTIALS_COUNT = 4;

export class ImportTimesHelper {
  private logHelper: LogHelper = new LogHelper(true);
  private timingHelper: TimingHelper = new TimingHelper();

  constructor() {
  }

  importCDAData(rows: any): RaceParticipantTrackActivity[] {
    this.logHelper.log('Parsing file...');

    let insideTimes = false;
    let firstColValue: any;
    let leftRow: any[];
    let rightRow: any[];

    let raceParticipantTrackActivities: any = {};

    rows.forEach((row: any[]) => {
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

            if (leftRow && leftRow.length > 0 && !this.isEmptyRow(leftRow)) {
              raceParticipantTrackActivities = this.parseRow(leftRow, raceParticipantTrackActivities);
            }

            // parse right row
            rightRow = row.slice(PARTICIPANT_COLS_COUNT + 1, row.length);
            this.logHelper.log('Right row: ' + JSON.stringify(rightRow));

            if (rightRow && rightRow.length > 0 && !this.isEmptyRow(rightRow)) {
              raceParticipantTrackActivities = this.parseRow(rightRow, raceParticipantTrackActivities);
            }
          }
        }
      }
    });

    const response: RaceParticipantTrackActivity[] = this.parseRaceParticipantTrackActivities(raceParticipantTrackActivities);

    this.logHelper.log('Finished !');

    return response;
  }

  private getRowValue(row: any, index: number) {
    return row[index] ? lodash.trim(row[index]) : null;
  }

  private isEmptyRow(row: any) {
    let empty = false;

    row.forEach((col: any) => {
      empty = empty && lodash.isEmpty(col);
    });

    if (empty) {
      this.logHelper.log('WARGNING ! Empty row');
    }

    return empty;
  }

  private parseRow(row: any[], raceParticipantTrackActivities: any): any {
    this.logHelper.log('Parsing row.. # ' + row[0]);

    // create partials
    const rowPartials = row.slice(1, row.length - 1);
    const partials: TrackPartialLap[] = [];
    let partialTime;
    let partialsTotalTime = 0;
    let isPartialLap = false;
    let invalidLapTime = false;

    rowPartials.forEach((col: any, index: number) => {
      partialTime = lodash.toNumber(col);

      if (lodash.isNumber(partialTime)) {

        partials.push({
          time: partialTime,
          sector: index
        });

        partialsTotalTime += partialTime;
      } else {
        isPartialLap = true;
        partials.push({
          time: 0,
          sector: index
        });
      }
    });

    isPartialLap = partials.length !== PARTIALS_COUNT;

    const rowLapTime = this.extractRowLapTime(row);

    if (!rowLapTime || rowLapTime === 0) {
      invalidLapTime = true;

      this.logHelper.log('WARNING ! Invalid lap time... ' + rowLapTime);
    } else {
      if (rowLapTime !== partialsTotalTime) {
        this.logHelper.log(
          'WARNING ! Inconsistency on row lap time and total time based on partials... ' + rowLapTime + ' ' + partialsTotalTime
        );
      } else {
        isPartialLap = false; // has final time
      }
    }

    // exit if has not partials and invalid lap time
    if (partialsTotalTime === 0 && invalidLapTime) {
      this.logHelper.log('WARNING ! Invalid lap, partials are empty and lap time is not set ' + JSON.stringify(row));

      return raceParticipantTrackActivities;
    }

    const trackLap: TrackLap = {
      time: !isPartialLap ? partialsTotalTime : undefined,
      ref_lap: false,
      partial_lap: isPartialLap,
      partials: partials
    };

    this.logHelper.log('New track lap... ' + JSON.stringify(trackLap));

    let raceParticipantNumber = lodash.toNumber(row[0]);

    // check number is not set
    if (!lodash.isNumber(raceParticipantNumber)) {
      raceParticipantNumber = 0;
      this.logHelper.log('WARNING ! Invalid race participant number: ' + JSON.stringify(row));
    }

    // check base object
    if (!raceParticipantTrackActivities[raceParticipantNumber]) {
      raceParticipantTrackActivities[raceParticipantNumber] = {
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
      raceParticipantTrackActivities[raceParticipantNumber].laps.push(trackLap);
    }

    return raceParticipantTrackActivities;
  }

  private extractRowLapTime(row: any): number {
    let rowLapTime: number;

    let timeString = lodash.last(row);
    if (!lodash.isString(timeString)) {
      return rowLapTime;
    }

    this.logHelper.log('Parsing lap time... ' + timeString);

    // remove invalid characters
    timeString = lodash.trim(timeString).replace(';', ':').replace(',', '.');

    this.logHelper.log('Trimmed lap time... ' + timeString);

    const regexResult = timeString.match(/(\d*):(\d*).(\d*)/);

    if (regexResult.length === 4) {
      const mins = lodash.toNumber(regexResult[1]),
        seconds = lodash.toNumber(regexResult[2]),
        miliseconds = lodash.toNumber(regexResult[3]);

      if (!lodash.isNaN(mins) && !lodash.isNaN(mins) && !lodash.isNaN(mins)) {
        rowLapTime = (mins * 60 + seconds) * 1000 + miliseconds;
      } else {
        this.logHelper.log('WARNING ! Invalid number conversion ');
      }
    } else {
      this.logHelper.log('WARNING ! Regex does not match ' + timeString);
    }

    return rowLapTime;
  }

  private parseRaceParticipantTrackActivities(raceParticipantTrackActivities): RaceParticipantTrackActivity[] {
    const response: RaceParticipantTrackActivity[] = lodash.toArray(raceParticipantTrackActivities);
    // complete race participant activities
    response.forEach(raceParticipantTrackActivity => {
      this.timingHelper.completeRaceParticipantTrackActivity(raceParticipantTrackActivity);
    });

    return response;
  }
}