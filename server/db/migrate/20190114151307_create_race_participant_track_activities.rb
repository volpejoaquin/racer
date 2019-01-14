class CreateRaceParticipantTrackActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :race_participant_track_activities do |t|
      t.string :state
      t.integer :laps_count
      t.integer :total_time
      t.references :track_activity, foreign_key: true
      t.references :race_participant, foreign_key: true

      t.timestamps
    end
  end
end
