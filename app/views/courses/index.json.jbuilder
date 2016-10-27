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

  json.students course.students do |student|
    json.first_name student.first_name
    json.last_name student.last_name
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