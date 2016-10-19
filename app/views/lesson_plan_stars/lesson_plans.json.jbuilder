json.array! @lesson_plans do |lesson_plan|

  json.id lesson_plan.id 
  json.title lesson_plan.title 
  json.hours lesson_plan.hours 
  json.version lesson_plan.version 
  json.forks lesson_plan.forked_plans.length
  json.stars lesson_plan.teachers_who_starred.length
  json.state lesson_plan.state 
  json.grade lesson_plan.grade 
  json.subject lesson_plan.subject 
  json.lesson_type lesson_plan.lesson_type 
  json.created_at lesson_plan.created_at 
  json.updated_at lesson_plan.updated_at

  json.teacher do 
    json.id lesson_plan.teacher.id
    json.first_name lesson_plan.teacher.first_name
    json.last_name lesson_plan.teacher.last_name
  end

end