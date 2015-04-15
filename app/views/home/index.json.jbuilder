json.courses @courses do |course|
  json.id course.id
  json.title course.title
  json.description course.description
  json.created_at course.created_at
  json.students_number course.students.count
end
json.assisted_courses @assisted_courses
