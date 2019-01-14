class CreateRaceParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :race_participants do |t|
      t.integer :car_number
      t.references :team, foreign_key: true
      t.references :car, foreign_key: true
      t.references :driver, foreign_key: true

      t.timestamps
    end
  end
end
