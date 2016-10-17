json.array! @pull_requests do |pr|
  json.title pr.title
  json.description pr.description
  json.status pr.status
  json.accept_reject_time pr.accept_reject_time

  json.parent_plan do
    json.title pr.parent_plan.title
    json.content pr.parent_plan.content
    json.version pr.parent_plan.version
  end

  json.forked_plan do
    json.title pr.parent_plan.title
    json.content pr.parent_plan.content
    json.version pr.parent_plan.version
  end

  json.comments pr.comments do |comment|
    json.body (comment.body)
    json.created_at (comment.created_at)
    json.updated_at (comment.updated_at)

    json.teacher do
      json.first_name comment.teacher.first_name
      json.last_name comment.teacher.last_name
    end
  end
end

