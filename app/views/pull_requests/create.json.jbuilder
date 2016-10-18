json.(@pull_request, :title, :description, :status, :accept_reject_time)

  json.parent_plan do
    json.title @pull_request.parent_plan.title
    json.content @pull_request.parent_plan.content
    json.version @pull_request.parent_plan.version
  end

  json.forked_plan do
    json.title @pull_request.parent_plan.title
    json.content @pull_request.parent_plan.content
    json.version @pull_request.parent_plan.version
  end

  json.comments @pull_request.comments do |comment|
    json.body (comment.body)
    json.created_at (comment.created_at)
    json.updated_at (comment.updated_at)

    json.teacher do
      json.first_name comment.teacher.first_name
      json.last_name comment.teacher.last_name
    end
  end
