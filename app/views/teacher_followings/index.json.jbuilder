json.teachers @teachers do |teacher|
	json.id (teacher.id)
	json.image (teacher.avatar.url(:profile))
	json.first_name (teacher.first_name)
	json.last_name (teacher.last_name)
  json.email (teacher.email)
	json.state (teacher.state)
  json.created_at (teacher.created_at)
	json.avatar_file_name (teacher.avatar_file_name)
end