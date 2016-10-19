json.array! @pull_requests do |pr|
  json.id pr.id
  json.title pr.title
  json.description pr.description
  json.status pr.status
  json.accept_reject_time pr.accept_reject_time

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

