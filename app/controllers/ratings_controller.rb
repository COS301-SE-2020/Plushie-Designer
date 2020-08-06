class RatingsController < ApplicationController
    before_action :authenticate_user!
    def create
        @toy = Toy.find(params[:toy_id])
        @rating = @toy.ratings.create(params[:rating].permit(:description, :value))
        @rating.user_id = current_user.id if current_user

        if @rating.save
            redirect_to toy_path(@toy), notice: "Your rating has been saved."
        else
            redirect_to "new"
        end
    end

    def update
        @toy = Toy.find(params[:toy_id])
        @rating = @toy.ratings.find(params[:id])

        if @rating.update(params[:rating].permit(:description, :value))
            redirect_to toy_path(@toy), notice: "Your rating has been updated."
        else
            render "edit"
        end
    end

    def edit
        @toy = Toy.find(params[:toy_id])
        @rating = @toy.ratings.find(params[:id])

        respond_to do |format|
            format.js {}
         end
    end

    def destroy
        @toy = Toy.find(params[:toy_id])
        @rating = @toy.ratings.find(params[:id])
        @rating.destroy
        redirect_to toy_path(@toy), notice: "Your rating has been removed"
    end
end