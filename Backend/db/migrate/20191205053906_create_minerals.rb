class CreateMinerals < ActiveRecord::Migration[6.0]
  def change
    create_table :minerals do |t|
      t.string :name
      t.string :url
      t.string :description
      t.integer :likes

      t.timestamps
    end
  end
end
