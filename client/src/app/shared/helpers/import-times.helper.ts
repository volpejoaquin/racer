// libs
import * as lodash from 'lodash';

// models
import {
  TrackLap,
  TrackPartialLap,
  RaceParticipantTrackActivity,
  RaceParticipantTrackActivityState,
  TrackActivity,
  RaceParticipant
} from '../model';

// helpers
import { LogHelper } from './log.helper';
import { TimingHelper } from './timing.helper';
import { TP_C1_RACE_PARTICIPANTS, TP_C2_RACE_PARTICIPANTS, TP_C3_RACE_PARTICIPANTS } from '../dummy';

const CDA_HEADERS = ['Auto', 'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Tie.Vta.'];
const HEADERS = CDA_HEADERS;
const PARTICIPANT_COLS_COUNT = CDA_HEADERS.length;
const TIME_REGEX = /(?:(\d*)?:)?(?:(\d*)?:)?(\d*).(\d{3})/;

export class ImportTimesHelper {
  private logHelper: LogHelper = new LogHelper(true);
  private timingHelper: TimingHelper = new TimingHelper();

  constructor() {
  }

  importCDAData(rows: any, trackActivity: TrackActivity): RaceParticipantTrackActivity[] {
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
        this.logHelper.log('Parsing row:' + row);
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
              raceParticipantTrackActivities = this.parseRow(leftRow, raceParticipantTrackActivities, trackActivity);
            }

            // parse right row
            rightRow = row.slice(PARTICIPANT_COLS_COUNT + 1, row.length);
            this.logHelper.log('Right row: ' + JSON.stringify(rightRow));

            if (rightRow && rightRow.length > 0 && !this.isEmptyRow(rightRow)) {
              raceParticipantTrackActivities = this.parseRow(rightRow, raceParticipantTrackActivities, trackActivity);
            }
          }
        }
      }
    });

    const response: RaceParticipantTrackActivity[] = this.parseRaceParticipantTrackActivities(raceParticipantTrackActivities);

    response.forEach((row: any, index: number) => {
      row.id = index + 1;
    });

    // this.logHelper.log(JSON.stringify(response));

    this.logHelper.log('Finished !');

    return response;
  }

  private getRowValue(row: any, index: number) {
    return row[index] ? lodash.trim(row[index]) : null;
  }

  private isEmptyRow(row: any) {
    const parsedRow = lodash.compact(row);
    const isEmpty = parsedRow.length < PARTICIPANT_COLS_COUNT;

    if (isEmpty) {
      this.logHelper.log('WARGNING ! Empty row');
    }

    return isEmpty;
  }

  private parseRow(row: any[], raceParticipantTrackActivities: any, trackActivity: TrackActivity): any {
    this.logHelper.log('Parsing row.. # ' + row[0]);

    // create partials
    const rowPartials = row.slice(1, row.length - 1);
    const partials: TrackPartialLap[] = [];
    let partialTime;
    let partialsTotalTime = 0;
    let isPartialLap = false;
    let invalidLapTime = false;

    rowPartials.forEach((col: any, index: number) => {
      partialTime = this.calculateTime(col);

      if (partialTime && partialTime > 0) {

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

    const rowLapTime = this.extractRowLapTime(row);

    if (!rowLapTime || rowLapTime === 0) {
      isPartialLap = true;
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

    let raceParticipantTrackActivity: RaceParticipantTrackActivity;
    // check base object
    if (!raceParticipantTrackActivities[raceParticipantNumber]) {
      raceParticipantTrackActivity = {
        state: RaceParticipantTrackActivityState.on_pit,
        race_participant: this.findRaceParticipant(raceParticipantNumber, trackActivity),
        laps: [
          trackLap
        ],
        laps_count: 0,
        best_lap: null,
        last_lap: null,
        total_time: trackLap.partial_lap ? 0 : trackLap.time
      };

      raceParticipantTrackActivities[raceParticipantNumber] = raceParticipantTrackActivity;
    } else {
      raceParticipantTrackActivity = raceParticipantTrackActivities[raceParticipantNumber];

      raceParticipantTrackActivity.laps.push(trackLap);
      if (!isPartialLap) {
        raceParticipantTrackActivity.total_time += trackLap.time;
      }
    }

    return raceParticipantTrackActivities;
  }

  private findRaceParticipant(raceParticipantNumber: number, trackActivity: TrackActivity) {
    let raceParticipants: RaceParticipant[];

    if (trackActivity.car_division && trackActivity.car_division.short_name === 'C1') {
      raceParticipants = TP_C1_RACE_PARTICIPANTS;
    } else if (trackActivity.car_division && trackActivity.car_division.short_name === 'C2') {
      raceParticipants = TP_C2_RACE_PARTICIPANTS;
    } else if (trackActivity.car_division && trackActivity.car_division.short_name === 'C3') {
      raceParticipants = TP_C3_RACE_PARTICIPANTS;
    }

    const raceParticipant: RaceParticipant =
      lodash.find(raceParticipants, (rParticipant: RaceParticipant) => rParticipant.number === raceParticipantNumber);
    return raceParticipant ? raceParticipant : {
      team: {
        name: ''
      },
      car: {
        name: ''
      },
      driver: {
        name: '',
        last_name: ''
      },
      number: raceParticipantNumber
    };
  }

  private extractRowLapTime(row: any): number {

    const timeString = lodash.last(row);
    if (!lodash.isString(timeString)) {
      return null;
    }

    return this.calculateTime(timeString);
  }

  private parseRaceParticipantTrackActivities(raceParticipantTrackActivities): RaceParticipantTrackActivity[] {
    const response: RaceParticipantTrackActivity[] = lodash.toArray(raceParticipantTrackActivities);
    // complete race participant activities
    response.forEach(raceParticipantTrackActivity => {
      this.timingHelper.completeRaceParticipantTrackActivity(raceParticipantTrackActivity);
    });

    return response;
  }

  private calculateTime(colString: string) {
    let time;

    this.logHelper.log('Parsing time... ' + colString);

    // remove invalid characters
    colString = lodash.trim(colString).replace(';', ':').replace(',', '.');

    this.logHelper.log('Trimmed time... ' + colString);
    const regexResult = colString.match(TIME_REGEX);

    if (regexResult && regexResult.length === 5) {

      if (regexResult[1] && !regexResult[2]) {
        regexResult[2] = regexResult[1];
        regexResult[1] = undefined;
      }

      let hours = 0,
        mins = 0,
        seconds = 0,
        miliseconds = 0;

      if (regexResult[1]) {
        hours = lodash.toNumber(regexResult[1]);
      }
      if (regexResult[2]) {
        mins = lodash.toNumber(regexResult[2]);
      }
      if (regexResult[3]) {
        seconds = lodash.toNumber(regexResult[3]);
      }
      if (regexResult[4]) {
        miliseconds = lodash.toNumber(regexResult[4]);
      }

      if (!lodash.isNaN(hours) && !lodash.isNaN(mins) && !lodash.isNaN(mins) && !lodash.isNaN(mins)) {
        time = (hours * 3600 + mins * 60 + seconds) * 1000 + miliseconds;
      } else {
        this.logHelper.log('WARNING ! Invalid number conversion ');
      }
    } else {
      this.logHelper.log('WARNING ! Regex does not match ' + colString);

      const colStringSplitted = colString.split('.');

      if (colStringSplitted.length >= 2) {
        const mili = colStringSplitted[1];

        if (mili.length === 1) {
          colString += '00';
        } else if (mili.length === 2) {
          colString += '0';
        }
        time = this.calculateTime(colString);
      }
    }

    return time;
  }
}
