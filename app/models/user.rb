class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :courses
  has_many :course_connections, class_name: 'CourseConnection', foreign_key: 'student_id', dependent: :destroy

  has_many :assisted_courses, through: :course_connections, source: :course
end
