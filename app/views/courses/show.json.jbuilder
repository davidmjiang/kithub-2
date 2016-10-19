json.(@course, :id, :title, :teacher_id, :points_possible)

json.students @course.students do |student|
  json.id student.id
  json.first_name student.first_name
  json.last_name student.last_name
  json.email student.email
  json.notes student.notes

  json.submissions student.course_submissions(@course)
end

json.assignments @course.assignments do |assignment|
  json.id assignment.id
  json.title assignment.title
  json.assignment_type assignment.assignment_type
  json.possible_score assignment.possible_score

  json.submissions assignment.submissions

  json.has_curve assignment.has_curve
  json.flat_curve assignment.flat_curve
  json.linear_curve assignment.linear_curve
end