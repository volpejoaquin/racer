class CreateCircuitVariants < ActiveRecord::Migration[5.2]
  def change
    create_table :circuit_variants do |t|
      t.string :name
      t.integer :length
      t.references :circuit, foreign_key: true

      t.timestamps
    end
  end
end
