import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RaceWeekendSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  start_date: {
    type: String
  },
  end_date: {
    type: String
  }
});

export const RaceWeekend = mongoose.model('RaceWeekend', RaceWeekendSchema);
