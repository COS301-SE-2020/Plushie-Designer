class PagesController < ApplicationController
  def index
    if !HeadModel.first.nil?
      if !BodyModel.first.nil?
        if !LArmModel.first.nil?
          if !RArmModel.first.nil?
            if !LLegModel.first.nil?
              if !RLegModel.first.nil?
                if current_user
                  redirect_to new_toy_path
                end
              else
                pages_upload_model_path
              end
            else
              pages_upload_model_path
            end
          else
            pages_upload_model_path
          end
        else
          pages_upload_model_path
        end
      else
        pages_upload_model_path
      end
    else
      pages_upload_model_path
    end
  end

  def contact
  end

  def about
  end
end
