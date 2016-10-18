json.(@comment, :body, :created_at, :updated_at, :id)

json.teacher do
    json.first_name @comment.teacher.first_name
    json.last_name @comment.teacher.last_name
    json.id @comment.teacher.id
end


