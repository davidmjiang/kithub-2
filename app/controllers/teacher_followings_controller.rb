class TeacherFollowingsController < ApplicationController

  def index
    if params[:follower_id]
      @teachers = TeacherFollowing.where("follower_id = ?", params[:follower_id]).map{|tf| Teacher.find(tf.followed_id)}
    elsif params[:followed_id]
      @teachers = TeacherFollowing.where("followed_id = ?", params[:followed_id]).map{|tf| Teacher.find(tf.follower_id)}
    end
    respond_to do |format|
      format.json {render json: @teachers, status: 200}
    end
  end

  def create

  end

  def destroy

  end
end
