class RArmModelsController < ApplicationController
  before_action :set_r_arm_model, only: [:show, :edit, :update, :destroy]

  # GET /r_arm_models
  # GET /r_arm_models.json
  def index
    @r_arm_models = RArmModel.all
    redirect_to new_r_arm_model_path
  end

  # GET /r_arm_models/1
  # GET /r_arm_models/1.json
  def show
    @r_arm_models = RArmModel.all
    respond_to do |format|
      format.html #defaults to rendering the /view/coordinates/show template
      format.json { render json: @r_arm_models }
    end
    # redirect_to new_r_arm_model_path
  end

  # GET /r_arm_models/new
  def new
    @r_arm_model = RArmModel.new
  end

  # GET /r_arm_models/1/edit
  def edit
    redirect_to new_r_arm_model_path
  end

  # POST /r_arm_models
  # POST /r_arm_models.json
  def create
    @r_arm_model = RArmModel.new(r_arm_model_params)

    respond_to do |format|
      if @r_arm_model.save
        format.html { redirect_to pages_upload_model_path, notice: 'R arm model was successfully created.' }
        format.json { render :show, status: :created, location: @r_arm_model }
      else
        format.html { render :new }
        format.json { render json: @r_arm_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /r_arm_models/1
  # PATCH/PUT /r_arm_models/1.json
  def update
    respond_to do |format|
      if @r_arm_model.update(r_arm_model_params)
        format.html { redirect_to @r_arm_model, notice: 'R arm model was successfully updated.' }
        format.json { render :show, status: :ok, location: @r_arm_model }
      else
        format.html { render :edit }
        format.json { render json: @r_arm_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /r_arm_models/1
  # DELETE /r_arm_models/1.json
  def destroy
    @r_arm_model.destroy
    respond_to do |format|
      format.html { redirect_to r_arm_models_url, notice: 'R arm model was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_r_arm_model
      @r_arm_model = RArmModel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def r_arm_model_params
      params.require(:r_arm_model).permit(:r_arm_file, :tp)
    end
end
