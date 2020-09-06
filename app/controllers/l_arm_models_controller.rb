class LArmModelsController < ApplicationController
  before_action :set_l_arm_model, only: [:show, :edit, :update, :destroy]

  # GET /l_arm_models
  # GET /l_arm_models.json
  def index
    @l_arm_models = LArmModel.all
    respond_to do |format|
      format.html { redirect_to new_l_arm_model_path}
      format.json { render json: @l_arm_models }
    end
  end

  # GET /l_arm_models/1
  # GET /l_arm_models/1.json
  def show
    @l_arm_models = LArmModel.all
    respond_to do |format|
      format.html #defaults to rendering the /view/coordinates/show template
      format.json { render json: @l_arm_models }
    end
    # redirect_to new_l_arm_model_path
  end

  # GET /l_arm_models/new
  def new
    @l_arm_model = LArmModel.new
  end

  # GET /l_arm_models/1/edit
  def edit
    redirect_to new_l_arm_model_path
  end

  # POST /l_arm_models
  # POST /l_arm_models.json
  def create
    @l_arm_model = LArmModel.new(l_arm_model_params)

    respond_to do |format|
      if @l_arm_model.save
        format.html { redirect_to pages_upload_model_path, notice: 'L arm model was successfully uploaded.' }
        format.json { render :show, status: :created, location: @l_arm_model }
      else
        format.html { render :new }
        format.json { render json: @l_arm_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /l_arm_models/1
  # PATCH/PUT /l_arm_models/1.json
  def update
    respond_to do |format|
      if @l_arm_model.update(l_arm_model_params)
        format.html { redirect_to @l_arm_model, notice: 'L arm model was successfully updated.' }
        format.json { render :show, status: :ok, location: @l_arm_model }
      else
        format.html { render :edit }
        format.json { render json: @l_arm_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /l_arm_models/1
  # DELETE /l_arm_models/1.json
  def destroy
    @l_arm_model.destroy
    respond_to do |format|
      format.html { redirect_to l_arm_models_url, notice: 'L arm model was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_l_arm_model
      @l_arm_model = LArmModel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def l_arm_model_params
      params.require(:l_arm_model).permit(:l_arm_file, :tp)
    end
end
