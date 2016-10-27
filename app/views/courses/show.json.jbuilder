json.(@course, :id, :title, :teacher_id, :points_possible, :start_date, :end_date, :meeting_days)


json.students @course.students do |student|
  json.id student.id
  json.first_name student.first_name
  json.last_name student.last_name
  json.email student.email
  json.notes student.notes

  json.submissions student.submissions
end

json.course_days @course.course_days do |course_day|
  json.date course_day.date
  json.id course_day.id
  json.lesson_plans course_day.lesson_plans do |lesson_plan|
    json.id lesson_plan.id
    json.title lesson_plan.title
    json.subject lesson_plan.subject
    json.lesson_type lesson_plan.lesson_type
    json.subject lesson_plan.subject
    json.grade lesson_plan.grade
    json.hours lesson_plan.hours
  end
end

json.assignments @course.assignments do |assignment|
  json.id assignment.id
  json.title assignment.title
  json.assignment_type assignment.assignment_type
  json.possible_score assignment.possible_score
  json.updated_at assignment.updated_at

  json.submissions assignment.submissions
  json.flat_curve assignment.flat_curve
  json.linear_curve assignment.linear_curve
  json.has_curve assignment.has_curve
end

