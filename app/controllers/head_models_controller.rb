class HeadModelsController < ApplicationController
  before_action :set_head_model, only: [:show, :edit, :update, :destroy]

  # GET /head_models
  # GET /head_models.json
  def index
    # @head_models = HeadModel.all
    @head_models = HeadModel.all
    respond_to do |format|
      format.html { redirect_to new_head_model_path}
      format.json { render json: @head_models }
    end
  end

  # GET /head_models/1
  # GET /head_models/1.json
  def show
    @head_models = HeadModel.all
    respond_to do |format|
      format.html #defaults to rendering the /view/coordinates/show template
      format.json { render json: @head_models }
    end
    # redirect_to new_head_model_path
  end

  # GET /head_models/new
  def new
    @head_model = HeadModel.new
  end

  # GET /head_models/1/edit
  def edit
    redirect_to new_head_model_path
  end

  # POST /head_models
  # POST /head_models.json
  def create
    @head_model = HeadModel.new(head_model_params)

    respond_to do |format|
      if @head_model.save
        format.html { redirect_to pages_upload_model_path, notice: 'Head model was successfully uploaded.' }
        format.json { render :show, status: :created, location: @head_model }
      else
        format.html { render :new }
        format.json { render json: @head_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /head_models/1
  # PATCH/PUT /head_models/1.json
  def update
    respond_to do |format|
      if @head_model.update(head_model_params)
        format.html { redirect_to @head_model, notice: 'Head model was successfully updated.' }
        format.json { render :show, status: :ok, location: @head_model }
      else
        format.html { render :edit }
        format.json { render json: @head_model.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /head_models/1
  # DELETE /head_models/1.json
  def destroy
    @head_model.destroy
    respond_to do |format|
      format.html { redirect_to head_models_url, notice: 'Head model was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_head_model
      @head_model = HeadModel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def head_model_params
      params.require(:head_model).permit(:head_file, :tp, :head_image, :model_type)
    end
end
