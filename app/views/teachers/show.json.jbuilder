json.(@teacher, :id, :email, :first_name, :last_name, :created_at, :state, :avatar_file_name)

json.image (@teacher.avatar.url(:profile))

json.lesson_plans @teacher.lesson_plans do |lesson_plan|
  json.id (lesson_plan.id)
  json.title (lesson_plan.title)
  json.first_name (lesson_plan.teacher.first_name)
  json.last_name (lesson_plan.teacher.last_name)
  json.created_at (lesson_plan.created_at)
  json.updated_at (lesson_plan.updated_at)
end

json.followed_by (@teacher.followed_by.length)
json.following (@teacher.following.length)
json.starred_lesson_plans (@teacher.starred_lesson_plans.length)
json.lesson_plans_contributed_to (@teacher.lesson_plans_contributed_to.length)
json.num_lessons (@teacher.lesson_plans.length)
json.states (@states)


