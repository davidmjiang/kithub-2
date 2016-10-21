json.merge! @lesson.attributes

json.forks (@lesson.forked_plans.length)
json.parent_plan_id (@lesson.parent_plan_id)
if @lesson.parent_plan
  json.parent_plan_title (@lesson.parent_plan.title)
end
json.stars (@lesson.teachers_who_starred.length)

json.additional_materials @lesson.additional_materials do |am|
	json.id (am.id)
	json.file_name (am.material_file_name)
	json.image_url (am.material.url())
end

json.pull_requests_sent @lesson.pull_requests_sent do |pr|
  json.id (pr.id)
end

json.pull_requests_received @lesson.pull_requests_received do |pr|
  json.id (pr.id)
  json.status (pr.status)
end