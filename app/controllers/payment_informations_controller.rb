class PaymentInformationsController < ApplicationController
  before_action :set_payment_information, only: [:show, :edit, :update, :destroy]

  # GET /payment_informations
  # GET /payment_informations.json
  def index
    @payment_informations = PaymentInformation.all
  end

  # GET /payment_informations/1
  # GET /payment_informations/1.json
  def show
  end

  # GET /payment_informations/new
  def new
    @payment_information = current_user.payment_informations.build(payment_information_params)
  end

  # GET /payment_informations/1/edit
  def edit
  end

  # POST /payment_informations
  # POST /payment_informations.json
  def create
    @payment_information = PaymentInformation.new(payment_information_params)

    respond_to do |format|
      if @payment_information.save
        format.html { redirect_to @payment_information, notice: 'Payment information was successfully created.' }
        format.json { render :show, status: :created, location: @payment_information }
      else
        format.html { render :new }
        format.json { render json: @payment_information.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /payment_informations/1
  # PATCH/PUT /payment_informations/1.json
  def update
    respond_to do |format|
      if @payment_information.update(payment_information_params)
        format.html { redirect_to @payment_information, notice: 'Payment information was successfully updated.' }
        format.json { render :show, status: :ok, location: @payment_information }
      else
        format.html { render :edit }
        format.json { render json: @payment_information.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /payment_informations/1
  # DELETE /payment_informations/1.json
  def destroy
    @payment_information.destroy
    respond_to do |format|
      format.html { redirect_to payment_informations_url, notice: 'Payment information was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def make_payment
    respond_to do |format|
      format.html{ redirect_to new_toy_path }
      format.json { render 'toys/new' }
      puts "entered"
    end
  end

  def payment
    @payment_information = current_user.payment_informations.build(payment_information_params)
    render :payment
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment_information
      @payment_information = PaymentInformation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def payment_information_params
      params.permit(:ch_name, :ch_surname, :cell_no, :payment_method, :card_no, :expiration_month, :expiration_year, :security_code, :address_line1, :address_line2, :city, :postal_code, :country, :user_id)
    end
end
