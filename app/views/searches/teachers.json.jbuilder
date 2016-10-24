json.array! @teachers do |teacher|
  json.id (teacher.id)
  json.image (teacher.avatar.url(:profile))
  json.first_name (teacher.first_name)
  json.last_name (teacher.last_name)
  json.state (teacher.state)
  json.avatar_file_name (teacher.avatar_file_name)
  if @currentUser.following.map{ |e| e.id}.include?(teacher.id)
    json.following (@currentUser.initiated_follows.where("followed_id = ?", teacher.id))
  end
end