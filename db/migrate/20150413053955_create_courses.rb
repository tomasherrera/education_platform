class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :title, null: false
      t.string :category, null: false
      t.text :description, null: false
      t.boolean :free, null: false, default: true
      t.decimal :price, :precision => 8, :scale => 2
      t.references :user

      t.timestamps
    end
  end
end
