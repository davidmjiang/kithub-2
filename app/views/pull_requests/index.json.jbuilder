json.array! @pull_requests do |pr|
  json.id pr.id
  json.title pr.title
  json.description pr.description
  json.status pr.status
  json.accept_reject_time pr.accept_reject_time
  json.created_at pr.created_at

  json.parent_plan do
    json.id pr.parent_plan.id
    json.title pr.parent_plan.title
    json.content pr.parent_plan.content
    json.version pr.parent_plan.version
  end

  json.forked_plan do
    json.id pr.forked_plan.id
    json.title pr.forked_plan.title
    json.content pr.forked_plan.content
    json.version pr.forked_plan.version
    json.teacher_id pr.forked_plan.teacher_id
    json.teacher do
      json.first_name pr.forked_plan.teacher.first_name
      json.last_name pr.forked_plan.teacher.last_name
      json.avatar_file_name pr.forked_plan.teacher.avatar_file_name
      json.avatar pr.forked_plan.teacher.avatar.url(:profile)
    end
  end

  json.comments pr.comments do |comment|
    json.id (comment.id)
    json.body (comment.body)
    json.created_at (comment.created_at)
    json.updated_at (comment.updated_at)

    json.teacher do
      json.id comment.teacher.id
      json.first_name comment.teacher.first_name
      json.last_name comment.teacher.last_name
    end
  end
end

