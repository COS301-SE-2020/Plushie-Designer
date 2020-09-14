class RLegModelsController < ApplicationController
  before_action :set_r_leg_model, only: [:show, :edit, :update, :destroy]

  # GET /r_leg_models
  # GET /r_leg_models.json
  def index
    @r_leg_models = RLegModel.all
    respond_to do |format|
      format.html { redirect_to new_r_leg_model_path}
      format.json { render json: @r_leg_models }
    end
  end

  # GET /r_leg_models/1
  # GET /r_leg_models/1.json
  def show
    @r_leg_models = RLegModel.all
    respond_to do |format|
      format.html #defaults to rendering the /view/coordinates/show template
      format.json { render json: @r_leg_models }
    end
    # redirect_to new_r_leg_model_path
  end

  # GET /r_leg_models/new
  def new
    @r_leg_model = RLegModel.new
  end

  # GET /r_leg_models/1/edit
  def edit
    redirect_to new_r_leg_model_path
  end

  # POST /r_leg_models
  # POST /r_leg_models.json
  def create
    @r_leg_model = RLegModel.new(r_leg_model_params)

    respond_to do |format|
      if @r_leg_model.save
        format.html { redirect_to pages_upload_model_path, notice: 'R leg model was successfully uploaded.' }
        format.json { render :show, status: :created, location: @r_leg_model }
      else
        format.html { render :new }
        format.json { render json: @r_leg_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /r_leg_models/1
  # PATCH/PUT /r_leg_models/1.json
  def update
    respond_to do |format|
      if @r_leg_model.update(r_leg_model_params)
        format.html { redirect_to @r_leg_model, notice: 'R leg model was successfully updated.' }
        format.json { render :show, status: :ok, location: @r_leg_model }
      else
        format.html { render :edit }
        format.json { render json: @r_leg_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /r_leg_models/1
  # DELETE /r_leg_models/1.json
  def destroy
    @r_leg_model.destroy
    respond_to do |format|
      format.html { redirect_to r_leg_models_url, notice: 'R leg model was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_r_leg_model
      @r_leg_model = RLegModel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def r_leg_model_params
      params.require(:r_leg_model).permit(:r_leg_file, :tp, :r_leg_image)
    end
end
