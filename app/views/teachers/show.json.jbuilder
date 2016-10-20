json.(@teacher, :id, :email, :first_name, :last_name, :created_at, :state, :avatar_file_name)

json.image (@teacher.avatar.url(:profile))

json.lesson_plans @teacher.lesson_plans do |lesson_plan|
  json.id (lesson_plan.id)
  json.title (lesson_plan.title)
  json.first_name (lesson_plan.teacher.first_name)
  json.last_name (lesson_plan.teacher.last_name)
  json.forks (lesson_plan.forked_plans.length)
  json.subject (lesson_plan.subject)
  json.hours (lesson_plan.hours)
  json.grade (lesson_plan.grade)
  json.lesson_type (lesson_plan.lesson_type)
  json.stars (lesson_plan.teachers_who_starred.length)
  if lesson_plan.parent_plan
    json.parent_plan_id (lesson_plan.parent_plan_id)
    json.parent_plan_title (lesson_plan.parent_plan.title)
  end
  if lesson_plan.standards
    json.standards lesson_plan.standards do |standard|
      json.title (standard.title)
      json.state (standard.state)
    end
  end
  json.created_at (lesson_plan.created_at)
  json.updated_at (lesson_plan.updated_at)
end

json.followed_by (@teacher.followed_by.length)
json.following (@teacher.following.length)
json.starred_lesson_plans (@teacher.starred_lesson_plans)
json.lesson_plans_contributed_to (@teacher.lesson_plans_contributed_to.length)
json.num_lessons (@teacher.lesson_plans.length)
json.states (@states)
json.lesson_types (@lesson_types)
json.subjects (@subjects)
