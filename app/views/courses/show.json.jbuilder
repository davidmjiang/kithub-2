json.(@course, :id, :title, :teacher_id)

json.students @course.students do |student|
  json.id student.id
  json.first_name student.first_name
  json.last_name student.last_name
  json.email student.email

  json.submissions student.course_submissions(@course)
end

json.assignments @course.assignments