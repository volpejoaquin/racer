class CreateCarDivisions < ActiveRecord::Migration[5.2]
  def change
    create_table :car_divisions do |t|
      t.string :name
      t.string :short_name
      t.references :car_category, foreign_key: true

      t.timestamps
    end
  end
end
