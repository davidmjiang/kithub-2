class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy if @comment
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :teacher_id, :commentable_id, :commentable_type)
  end
end
