class CreateTrackPartialLaps < ActiveRecord::Migration[5.2]
  def change
    create_table :track_partial_laps do |t|
      t.integer :time
      t.integer :sector
      t.references :track_lap, foreign_key: true

      t.timestamps
    end
  end
end
