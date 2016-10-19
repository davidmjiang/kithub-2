json.merge! @lesson.attributes

json.additional_materials @lesson.additional_materials do |am|
	json.file_name (am.material_file_name)
	json.image_url (am.material.url())
end