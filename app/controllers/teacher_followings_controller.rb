class TeacherFollowingsController < ApplicationController

  def index
    if params[:follower_id]
      @teachers = TeacherFollowing.where("follower_id = ?", params[:follower_id]).map{|tf| Teacher.find(tf.followed_id)}
    elsif params[:followed_id]
      @teachers = TeacherFollowing.where("followed_id = ?", params[:followed_id]).map{|tf| Teacher.find(tf.follower_id)}
    end
    @currentUser = current_teacher
    respond_to do |format|
      format.json {render "index.json.jbuilder"}
    end
  end

  def create
    @following = TeacherFollowing.new(following_params)
    respond_to do |format|
      if @following.save
        format.json {render json: @following}
      else
        format.json{render json: {errors: @following.errors.full_messages, :status => 422}}
      end
    end
  end

  def destroy
    @following = TeacherFollowing.find(params[:id])
    @following.destroy
  end

  private
  def following_params
    params.require("following").permit(:follower_id, :followed_id)
  end
end
