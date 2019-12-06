class MineralsController < ApplicationController

    def index
        @minerals = Mineral.all
        render json: @minerals
    end

    def create 
        @mineral = Mineral.create(new_mineral_params)
        render json: @mineral
    end

    def update
        @mineral = Mineral.find(params[:id])
        @mineral.update(edit_mineral_params)
        render json: @mineral
    end

    def destroy
        Mineral.find(params[:id]).destroy
    end


    private

    def new_mineral_params 
            params.permit(:name, :url, :description, :likes)
    end

    def edit_mineral_params 
        params.permit(:name, :url, :description, :likes)
    end
end
