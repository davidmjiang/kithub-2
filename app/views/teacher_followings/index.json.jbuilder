json.teachers @teachers do |teacher|
	json.id (teacher.id)
	json.image (teacher.avatar.url(:profile))
	json.first_name (teacher.first_name)
	json.last_name (teacher.last_name)
	json.state (teacher.state)
	json.avatar_file_name (teacher.avatar_file_name)
end

json.followings (@currentUser.following)