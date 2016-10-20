json.merge! @lesson.attributes

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