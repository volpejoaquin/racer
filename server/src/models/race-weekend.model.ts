import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RaceWeekendSchema = new Schema({
  name: {
    type: String
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    default: Date.now
  }
});

export const RaceWeekend = mongoose.model('RaceWeekend', RaceWeekendSchema);
