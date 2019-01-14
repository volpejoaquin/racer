class CreateTrackActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :track_activities do |t|
      t.string :name
      t.string :short_name
      t.string :date
      t.integer :duration
      t.integer :laps
      t.string :type
      t.references :car_division, foreign_key: true
      t.references :circuit_variant, foreign_key: true
      t.references :race_weekend, foreign_key: true

      t.timestamps
    end
  end
end
