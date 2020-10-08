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



  def is_number? string
    true if Float(string) rescue false
  end
  ####MAKE PAYMENT####
  def make_payment
    @toy = toys.find(params[:id])
    save_info = params[:save_info]
    valid = true
    error_message = ""

    #doing card validation here
    # cardholder name
    if params[:ch_name] == ""
      error_message = "Please insert cardholder name"
      valid = false
    end
  
  
    # cardholder surname
    sSurname = params[:ch_surname]
    if params[:ch_surname] == '' && valid == true
      error_message = "Please insert cardholder surname"
      valid = false
    end

  
    # cell no
    sCellNo = params[:cell_no]
    if valid == true
      if sCellNo == ''
        error_message = "Please insert cardholder cellphone number"
        valid = false
      end
      if sCellNo.length < 10
        error_message = "Please insert valid cellphone number"
        valid = false
      end
    end


    # payment method
    if params[:payment_method] == '' && valid == true
      error_message = "Please select payment method"
      valid = false
    end


    # card no
    sCardNo = params[:card_no]
    if valid == true
      if sCardNo == ''
          error_message = "Please insert card number"
          valid = false
      end
      sActualCardNo = ""
      for i in 0..(sCardNo.length-1)
        if sCardNo[i] != ' '
          sActualCardNo += sCardNo[i]
        end
      end

      if sActualCardNo.length != 16
        error_message = "Please insert card number of length 16"
        valid = false
      end

      unless is_number?(sActualCardNo)
        error_message = 'Please insert valid card number'
        valid = false
      end
    end


    # expiration month
    sExpMonth = params[:expiration_month].to_i
    if valid == true
      if sExpMonth < 1 || sExpMonth > 12
        error_message = "Enter expiration month between 1 and 12"
        valid = false
      end
      if sExpMonth == ''
        error_message = "Please select expiration month"
        valid = false
      end
    end

    # expiration year
    if params[:expiration_year] == '' && valid == true
      error_message = "Please insert expiration year"
      valid = false
    end

    # security code
    if valid == true
      if params[:security_code] == ''
        error_message = 'Please insert security code'
        valid = false
      end
      if params[:security_code].length != 3
        error_message = 'Please insert valid security code (length 3)'
        valid = false
      end
      unless is_number?(params[:security_code])
        error_message = 'Please insert valid security code (the 3 digit number at the back of the card)'
        valid = false
      end
    end

    # postal code
    if valid == true
      if params[:postal_code] == ''
        error_message = "Please insert postal code"
        valid = false
      end
      if params[:postal_code].length != 4
        error_message = 'Please insert valid postal code (length 4)'
        valid = false
      end
      unless is_number?(params[:postal_code])
        error_message = 'Please insert valid postal code (number)'
        valid = false
      end
    end

    # address line 1
    if params[:address_line1] == '' && valid == true
      error_message = 'Please insert address line 1'
      valid = false
    end

    # address line 2
    if params[:address_line2] == '' && valid == true
      error_message = 'Please insert address line 2'
      valid = false
    end

    # city
    if params[:city] == '' && valid == true
      error_message = 'Please insert city'
      valid = false
    end

    # country
    if params[:country] == '' && valid == true
      error_message = 'Please insert country'
      valid = false
    end

    # end of card validation
    if valid == true
      if save_info
        @payment_information = current_user.payment_informations.build(payment_information_params)
        @payment_information.save
      end
      redirect_to displayPDF_path(@toy.id)
    end
    if valid == false
      respond_to do |format|
        format.html{ redirect_to payment_url, alert: error_message }
      end
    end
end

  def payment
    @payment_information = current_user.payment_informations.build(payment_information_params)
    @toy = toys.find(params[:id])
    @found = false

    #card details
    #



    card_details.each do |n|
      if n.user_id == current_user.id
        @cardHolder = n
        @found = true
      end
    end
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

  def toys
    ::Toy.all
  end

  def card_details
    ::PaymentInformation.all
  end
end
