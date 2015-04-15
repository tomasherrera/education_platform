class Course < ActiveRecord::Base
  belongs_to :user
  has_many :student_connections, class_name: 'CourseConnection', foreign_key: 'course_id', dependent: :destroy

  has_many :students, through: :student_connections, source: :student
end
