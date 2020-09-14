class LLegModelsController < ApplicationController
  before_action :set_l_leg_model, only: [:show, :edit, :update, :destroy]

  # GET /l_leg_models
  # GET /l_leg_models.json
  def index
    @l_leg_models = LLegModel.all
    respond_to do |format|
      format.html { redirect_to new_l_leg_model_path}
      format.json { render json: @l_leg_models }
    end
  end

  # GET /l_leg_models/1
  # GET /l_leg_models/1.json
  def show
    @l_leg_models = LLegModel.all
    respond_to do |format|
      format.html #defaults to rendering the /view/coordinates/show template
      format.json { render json: @l_leg_models }
    end
    # redirect_to new_l_leg_model_path
  end

  # GET /l_leg_models/new
  def new
    @l_leg_model = LLegModel.new
  end

  # GET /l_leg_models/1/edit
  def edit
    redirect_to new_l_leg_model_path
  end

  # POST /l_leg_models
  # POST /l_leg_models.json
  def create
    @l_leg_model = LLegModel.new(l_leg_model_params)

    respond_to do |format|
      if @l_leg_model.save
        format.html { redirect_to pages_upload_model_path, notice: 'L leg model was successfully uploaded.' }
        format.json { render :show, status: :created, location: @l_leg_model }
      else
        format.html { render :new }
        format.json { render json: @l_leg_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /l_leg_models/1
  # PATCH/PUT /l_leg_models/1.json
  def update
    respond_to do |format|
      if @l_leg_model.update(l_leg_model_params)
        format.html { redirect_to @l_leg_model, notice: 'L leg model was successfully updated.' }
        format.json { render :show, status: :ok, location: @l_leg_model }
      else
        format.html { render :edit }
        format.json { render json: @l_leg_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /l_leg_models/1
  # DELETE /l_leg_models/1.json
  def destroy
    @l_leg_model.destroy
    respond_to do |format|
      format.html { redirect_to l_leg_models_url, notice: 'L leg model was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_l_leg_model
      @l_leg_model = LLegModel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def l_leg_model_params
      params.require(:l_leg_model).permit(:l_leg_file, :tp, :l_leg_image, :model_type)
    end
end
