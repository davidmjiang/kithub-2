class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment && @comment.destroy
      respond_to do |format|
        format.json { render json: @comment, status: 200 }
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :teacher_id, :commentable_id, :commentable_type)
  end
end
