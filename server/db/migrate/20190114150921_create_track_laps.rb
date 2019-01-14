class CreateTrackLaps < ActiveRecord::Migration[5.2]
  def change
    create_table :track_laps do |t|
      t.boolean :partial_lap
      t.integer :time

      t.timestamps
    end
  end
end
