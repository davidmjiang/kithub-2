class PullRequestsController < ApplicationController
  authenticate_user!

  def index
    @pull_requests = Teacher.find_by_id(params[:id]).pull_requests

    respond_to do |format|
       format.json { render  json: @pull_requests.to_json(include: :comments, status: 200) }
    end
  end

end
