class ToysController < ApplicationController
  before_action :set_toy, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :edit, :update, :destroy, :new]
  # GET /toys
  # GET /toys.json
  def index
    @toys = Toy.all
    @num = 0
  end

  # GET /toys/1
  # GET /toys/1.json
  def show
    @toy = scope.find(params[:id])

    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "Invoice No. #{@toy.id}",
               page_size: 'A4',
               template: "toys/displayPDF.html.erb",
               layout: "pdf.html",
               orientation: "Landscape",
               lowquality: true,
               zoom: 1,
               dpi: 75
      end
    end
  end

  def displayPDF
    @toy = scope.find(params[:id])

    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "Invoice No. #{@toy.id}",
               page_size: 'A4',
               template: "toys/displayPDF.html.erb",
               layout: "pdf.html",
               orientation: "Landscape",
               lowquality: true,
               zoom: 1,
               dpi: 75
      end
    end
  end

  # GET /toys/new
  def new
    @toy = current_user.toys.build
  end

  # GET /toys/1/edit
  def edit
  end

  # POST /toys
  # POST /toys.json
  def create
    @toy = current_user.toys.build(toy_params)

    respond_to do |format|
      if @toy.save
        format.html { redirect_to @toy, notice: 'Toy was successfully created.' }
        format.json { render :show, status: :created, location: @toy }
      else
        format.html { render :new }
        format.json { render json: @toy.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /toys/1
  # PATCH/PUT /toys/1.json
  def update
    respond_to do |format|
      if @toy.update(toy_params)
        format.html { redirect_to @toy, notice: 'Toy was successfully updated.' }
        format.json { render :show, status: :ok, location: @toy }
      else
        format.html { render :edit }
        format.json { render json: @toy.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /toys/1
  # DELETE /toys/1.json
  def destroy
    @toy.destroy
    respond_to do |format|
      format.html { redirect_to toys_url, notice: 'Toy was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_toy
      @toy = Toy.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def toy_params
      params.require(:toy).permit(:name, :head, :arms, :torso, :legs, :rating, :head_pos, :head_posx, :torso_posy, :torso_posx, :larm_posy, :larm_posx, :rarm_posy, :rarm_posx, :lleg_posy, :lleg_posx, :rleg_posy, :rleg_posx, :shared, :image, :head_posz, :torso_posz, :larm_posz, :rarm_posz, :lleg_posz, :rleg_posz)
    end

    def scope
      ::Toy.all
    end
end
