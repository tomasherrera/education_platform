class CreateCourseConnections < ActiveRecord::Migration
  def change
    create_table :course_connections do |t|
      t.integer :course_id
      t.integer :student_id

      t.timestamps
    end
    add_index :course_connections, :course_id
    add_index :course_connections, :student_id
    add_index :course_connections, [:course_id, :student_id], unique: true  
  end
end
