class PagesController < ApplicationController
  def index
    if current_user
      redirect_to new_toy_path
    end
  end

  def contact
  end

  def about
  end
end
