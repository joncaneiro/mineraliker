class CommentsController < ApplicationController

    def index
        @comments = Comment.all
        render json: @comments
    end

    def new
        @comment = Comment.new
        render json: @comment
    end

    def create 
        @comment = Comment.create(new_comment_params)
        render json: @comment
    end

    def destroy
        Comment.find(params[:id]).destroy
    end


    private

    def new_comment_params
        params.permit(:mineral_id, :comment)
    end
    
end
