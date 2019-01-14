class CreateRaceWeekends < ActiveRecord::Migration[5.2]
  def change
    create_table :race_weekends do |t|
      t.string :name
      t.datetime :start_date
      t.datetime :end_date
      t.integer :race_number
      t.references :car_category, foreign_key: true

      t.timestamps
    end
  end
end
