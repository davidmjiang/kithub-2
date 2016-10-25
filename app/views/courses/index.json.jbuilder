json.array! @courses do |course|
  json.id course.id
  json.title course.title
  json.teacher_id course.teacher_id
  json.created_at course.created_at
  json.updated_at course.updated_at
  json.start_date course.start_date
  json.end_date course.end_date
  json.meeting_days course.meeting_days
  json.course_days course.course_days do |course_day|
    json.date course_day.date
  end

  json.assignments course.assignments do |assignment|
    json.title assignment.title
    json.assignment_type assignment.assignment_type
    json.possible_score assignment.possible_score
    json.course_id assignment.course_id
    json.created_at assignment.created_at

    json.has_curve assignment.has_curve
    json.flat_curve assignment.flat_curve
    json.linear_curve assignment.linear_curve

    json.submissions assignment.submissions do |submission|
      json.assignment_id submission.assignment_id
      json.student_id submission.student_id
      json.raw_score submission.raw_score
      json.created_at submission.created_at
    end
  end
end