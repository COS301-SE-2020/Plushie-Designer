class ToysController < ApplicationController
  before_action :set_toy, only: [:show, :edit, :update, :destroy, :contribute]
  before_action :authenticate_user!, only: [:create, :edit, :update, :destroy, :new, :contribute]
  # GET /toys
  # GET /toys.json
  def index
    @toys = Toy.search(params[:search])
      if @toys == 0
        @toys = Toy.all
        flash.now[:alert] = 'Your plushie was not found!'
      else
        @temp = false
        @toys.each do |toy|
          if toy.shared || current_user == toy.user
            @temp = true
          end
        end

        if !@temp 
          @toys = Toy.all
          flash.now[:alert] = 'Your plushie was not found!'
        end
      end
    @num = 0
  end

  # GET /toys/1
  # GET /toys/1.json
  def show
    @toy = scope.find(params[:id])

    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "Toy id: #{@toy.id}",
               page_size: 'A4',
               template: "toys/displayPDF.html.erb",
               layout: "pdf.html",
               orientation: "Portrait",
               zoom: 1
      end
    end
  end

  def displayPDF
    @toy = scope.find(params[:id])
    
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "Toy id: #{@toy.id}",
               page_size: 'A4',
               template: "toys/displayPDF.html.erb",
               layout: "pdf.html",
               orientation: "Portrait",
               zoom: 1
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
        format.html { redirect_to @toy, notice: "Plushie successfully created" }
        format.json { render :show, status: :created, location: @toy }
      else
        format.html { render :new }
        format.json { render json: @toy.errors, status: :unprocessable_entity }
      end
    end
  end


  def contribute
    render :contribute
  end

  def submitcontribution
    @toy = current_user.toys.build(toy_params)
    
    respond_to do |format|
      if @toy.save
        format.html { redirect_to @toy, notice: "Plushie successfully created" }
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
        format.html { redirect_to @toy, notice: 'Plushie was successfully updated.' }
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
      format.html { redirect_to toys_url, notice: 'Plushie was successfully destroyed.' }
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
      params.require(:toy).permit(:name, :head, :arms, :r_arm, :torso, :legs, :r_leg, :rating, :head_pos, :head_posx, :torso_posy, :torso_posx, :larm_posy, :larm_posx, :rarm_posy, :rarm_posx, :lleg_posy, :lleg_posx, :rleg_posy, :rleg_posx, :shared, :image, :head_posz, :torso_posz, :larm_posz, :rarm_posz, :lleg_posz, :rleg_posz, :head_uv, :torso_uv, :larm_uv, :rarm_uv, :lleg_uv, :rleg_uv, :search, :head_tex, :torso_tex, :larm_tex, :rarm_tex, :lleg_tex, :rleg_tex)
    end

    def scope
      ::Toy.all
    end


    $logo = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjEyLjg3OXB4IiBoZWlnaHQ9IjIxMC4wNHB4IiB2aWV3Qm94PSIwIDAgMjEyLjg3OSAyMTAuMDQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIxMi44NzkgMjEwLjA0Ig0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiNFM0E2NjgiIGQ9Ik0xMDYuMTEsMjQuNDg3YzQ3Ljg0NiwwLDg2LjYzMiwzOC40ODksODYuNjMyLDg1Ljk2OGMwLDQ3LjQ3OS0zOC43ODYsODUuOTY3LTg2LjYzMiw4NS45NjcNCgkJcy04Ni42MzEtMzguNDg4LTg2LjYzMS04NS45NjdDMTkuNDc5LDYyLjk3Niw1OC4yNjUsMjQuNDg3LDEwNi4xMSwyNC40ODciLz4NCgk8cGF0aCBmaWxsPSIjMjMyMjIyIiBkPSJNMTA2LjExLDIxLjYwNmMyNC42OTgsMCw0Ny4wODQsOS45NDMsNjMuMjk3LDI2LjAyOGMxNi4yMTEsMTYuMDg1LDI2LjIxOCwzOC4yODIsMjYuMjE4LDYyLjgyMQ0KCQljMCwyNC41MDctMTAuMDA3LDQ2LjczNC0yNi4yMTgsNjIuODJjLTE2LjIxMywxNi4wNTQtMzguNTk5LDI2LjAyNy02My4yOTcsMjYuMDI3Yy0yNC42OTgsMC00Ny4wODQtOS45NzQtNjMuMjk2LTI2LjAyNw0KCQljLTE2LjIxMS0xNi4wODYtMjYuMjE3LTM4LjMxMy0yNi4yMTctNjIuODJjMC0yNC41NCwxMC4wMDYtNDYuNzM2LDI2LjIxNy02Mi44MjFDNTkuMDI2LDMxLjU0OSw4MS40MTMsMjEuNjA2LDEwNi4xMSwyMS42MDYNCgkJIE0xNjUuMzU0LDUxLjcxOGMtMTUuMTY4LTE1LjA0LTM2LjA5OC0yNC4zNDktNTkuMjQ0LTI0LjM0OWMtMjMuMTQ2LDAtNDQuMDc3LDkuMzA5LTU5LjI0MiwyNC4zNDkNCgkJYy0xNS4xMzYsMTUuMDA5LTI0LjUwOSwzNS43ODEtMjQuNTA5LDU4LjczN2MwLDIyLjkyMyw5LjM3Myw0My42OTYsMjQuNTA5LDU4LjczNWMxNS4xNjYsMTUuMDQsMzYuMDk3LDI0LjMxNyw1OS4yNDIsMjQuMzE3DQoJCWMyMy4xNDYsMCw0NC4wNzYtOS4yNzcsNTkuMjQ0LTI0LjMxN2MxNS4xMzUtMTUuMDM5LDI0LjUwNi0zNS44MTMsMjQuNTA2LTU4LjczNUMxODkuODYsODcuNDk5LDE4MC40ODksNjYuNzI3LDE2NS4zNTQsNTEuNzE4Ii8+DQoJPHBhdGggZmlsbD0iI0UzQTY2OCIgZD0iTTEzOS40ODMsMTAzLjU2OWMwLjY5Ni0wLjQ3NCwyMC42NDUsMzIuNTQ5LDI1Ljk2Niw1MC4yODNjNS4zMTgsMTcuNzMxLTEuMzk1LDIwLjc3LTYuNzEzLDIyLjc5OA0KCQljLTUuMzIsMi4wMjUtOC44NjYtMC41MDctOC44NjYtMC41MDdsLTIwLjAxMi02Ny4xMjhMMTM5LjQ4MywxMDMuNTY5eiIvPg0KCTxwYXRoIGZpbGw9IiNDNDg3NEIiIGQ9Ik0xMzkuNDgzLDEwMy41NjljMC42OTYtMC40NzQsMjAuNjQ1LDMyLjU0OSwyNS45NjYsNTAuMjgzYzUuMzE4LDE3LjczMS0xLjM5NSwyMC43Ny02LjcxMywyMi43OTgNCgkJYy01LjMyLDIuMDI1LTguODY2LTAuNTA3LTguODY2LTAuNTA3bC0wLjc5Mi0yLjYyOGMxLjIwMy0wLjI1NCwyLjY5MS0wLjY5NywzLjgzMS0xLjQ1NmMyLjI3OS0xLjU4NCwxMC40OC03Ljc5LDcuMDI5LTE3LjUwOQ0KCQljLTMuNDItOS43MjItMTcuMzE5LTMzLjAyNi0xNy4zMTktMzMuMDI2cy0yLjYyNywyLjIxNi03LjY2Myw0LjU5MWwtNS4wOTgtMTcuMUwxMzkuNDgzLDEwMy41Njl6Ii8+DQoJPHBhdGggZmlsbD0iIzIzMjIyMiIgZD0iTTEzOC41MzQsMTAxLjcwMUwxMzguNTM0LDEwMS43MDFsMC4xODktMC4wOTVjMS4yMDQtMC40NDMsMy4xNjcsMS4zMyw1LjMxOSw0LjcxOA0KCQljMS41ODMsMi41MDEsMy43MzcsNi4wNzksNi4xNDQsMTAuMzIxYzYuMzAxLDExLjA4MiwxNC4xODYsMjYuMzEyLDE3LjI1NywzNi42MDRjMi44NDksOS40NjcsMi4zNzUsMTUuMTk5LDAuNDc1LDE4Ljg0DQoJCWMtMi4wMjUsMy45MjYtNS40NDYsNS4zNTEtOC40NTQsNi41MjFjLTYuMzY1LDIuNDA2LTEwLjc2Ni0wLjc2MS0xMC43OTgtMC43NjFsLTAuODIxLTEuMTA2bC0xOS45OC02Ny4xNTlsLTAuNDc3LTEuNTgzDQoJCWwxLjQ1Ny0wLjgyM2w5LjU5NS01LjQ0NkwxMzguNTM0LDEwMS43MDF6IE0xNDAuNTI5LDEwOC41NzJjLTAuOTgyLTEuNTIxLDAuMzgxLTMuMTk4LTAuMTg5LTMuMTA0bC04LjAxMSw0LjUyOGwxOS4yODIsNjQuNzUzDQoJCWMxLjAxMywwLjQ0MiwzLjI2MSwxLjE0LDYuMzYzLTAuMDY0YzIuMzEzLTAuODg3LDQuOTA4LTEuOTYyLDYuMjM5LTQuNTI3YzEuNDU2LTIuNzg2LDEuNzEtNy40NzMtMC43OTItMTUuNzA0DQoJCWMtMi45NzctOS45NDMtMTAuNjctMjQuODU2LTE2Ljg3Ny0zNS43NTFDMTQ0LjIzNCwxMTQuNjUsMTQyLjExMiwxMTEuMTA1LDE0MC41MjksMTA4LjU3MiIvPg0KCTxwYXRoIGZpbGw9IiNFM0E2NjgiIGQ9Ik03Ni42MzEsMTM3LjEwMmMtMC45ODEsMC40NDItMjguMDg1LTMxLjgyMy0zNS4zMDUtNDkuMTc0Yy03LjI1LTE3LjM1MiwxLjg5OS0yMC4zMjksOS4xMTgtMjIuMjkyDQoJCWM3LjI1My0xLjk5NSwxMi4wNjYsMC40NzcsMTIuMDY2LDAuNDc3bDI3LjE5OSw2NS42NjlMNzYuNjMxLDEzNy4xMDJ6Ii8+DQoJPHBhdGggZmlsbD0iI0M0ODc0QiIgZD0iTTY1Ljk5MiwxMjUuMTMxYy0wLjk4Mi0xLjIwMi0xLjk5NS0yLjUtMy4wNC0zLjc5OGMtMC4yNTMtMy42NzMsNC43MTktMTQuMzQ1LDQuNzE5LTE0LjM0NQ0KCQlzLTQuNzgxLTcuNDcyLTEwLjYwNy0yMy4zMzZjLTMuMzU3LTkuMDg3LTMuOC0xNS4xMzUtMy41NzktMTguNjVjNS41MDktMC42NjQsOS4wMjUsMS4xMDgsOS4wMjUsMS4xMDhsMjUuODM3LDYyLjM3OQ0KCQljLTE0LjA5Mi00Ljk3Mi0xNy4xLTE0LjAyNy0xNy4xLTE0LjAyN0w2NS45OTIsMTI1LjEzMXoiLz4NCgk8cGF0aCBmaWxsPSIjMjMyMjIyIiBkPSJNNzcuNDI0LDEzOS4wNjRjLTEuMTcyLDAuMzgtOS4wNTYtNy4zMTQtMTcuMS0xNy43MzFjLTcuNi05Ljg3OS0xNi4xMTYtMjIuMDM4LTIwLjIzMy0zMS4wMzENCgkJYy0wLjI4NC0wLjYwMi0wLjUwNS0xLjEwNy0wLjY5Ni0xLjU4M2MtMy45NTgtOS40NjYtMy4zMjUtMTUuMTk4LTAuNjMzLTE4LjkzNGMyLjY5MS0zLjcwNiw3LjE4OC01LjA5OSwxMS4xNDYtNi4xNzUNCgkJYzguMDEtMi4xODUsMTMuNTIsMC42MzQsMTMuNTUxLDAuNjM0bDAuOTgyLDEuMDc1TDkxLjY0LDEzMC45OWwwLjc5LDEuOTMzbC0xLjk2MSwwLjc5TDc3LjQyNCwxMzkuMDY0eiBNNjMuNjE4LDExOC43NjgNCgkJYzYuOTk4LDkuMDU2LDEyLjA2NCwxNi40NjYsMTIuMjIzLDE2LjQwMmwxMS4xMTMtNC41MjdsLTI2LjA2LTYyLjkxN2MtMS4zOTMtMC41MDYtNC45NzEtMS40MjUtOS45MS0wLjA5NA0KCQljLTMuMjYxLDAuOTE5LTYuOTY3LDIuMDI2LTguODM0LDQuNTkxYy0xLjksMi42MjctMi4xODUsNy4wMywxLjEwNywxNC45MTNjMC4yMjEsMC41MzksMC40MTIsMS4wMTMsMC42MzMsMS40NTgNCgkJQzQ3Ljg0OCw5Ny4yMzcsNTYuMTc2LDEwOS4xMTEsNjMuNjE4LDExOC43NjgiLz4NCgk8cGF0aCBmaWxsPSIjMjMyMjIyIiBkPSJNNjEuOTM5LDE0OS4yMjljMC45MTgtMTguOTY3LDUuOTg0LTM3LjU4NiwxNC42MjgtNDcuNjIzbDEuMjY2LTAuNzU5bDI4LjYyNS01LjQ3OWgwLjg1NGwyOC42MjYsNS40NzkNCgkJbDEuMjk2LDAuNzU5YzguNjQ2LDEwLjAzNywxMy43MSwyOC42NTYsMTQuNjI5LDQ3LjYyM2MwLjg4NywxOC42ODEtMi4yMTUsMzcuODcxLTkuODc4LDQ5LjY4MWwtMC40MTIsMC40NzQNCgkJYy0wLjAzMiwwLjAzMi0zLjEwNCwyLjgxOS0xNS40NTIsMi42OTNjLTEyLjMxNy0wLjEyOC0xNi4yNzUtMy42NzQtMTYuMjc1LTMuNzA1bC0wLjc1OS0xLjQ1N2wtMS4wMTUtOS42ODhsLTEuMTcxLTAuMDMzDQoJCWwtMS4xNzEsMC4wMzNsLTEuMDQ3LDkuNjg4bC0wLjcyOCwxLjQ1N2MtMC4wMywwLjAzMS0zLjk1NywzLjU3Ny0xNi4yNzQsMy43MDVjLTEyLjM1LDAuMTI2LTE1LjQ1Mi0yLjY2MS0xNS40NTItMi42OTMNCgkJbC0wLjQxMi0wLjQ3NEM2NC4xNTUsMTg3LjEsNjEuMDIyLDE2Ny45MDksNjEuOTM5LDE0OS4yMjkiLz4NCgk8cGF0aCBmaWxsPSIjRTNBNjY4IiBkPSJNNzkuNDgxLDEwNS4wODljLTcuNjk1LDkuNDM3LTEyLjIyMiwyNi42NjEtMTMuMDc3LDQ0LjM2Yy0wLjg1NCwxNy42NjgsMS45NjMsMzUuNjU1LDguOTYsNDYuNjczDQoJCWMwLjY2NiwwLjQxMiwzLjQyLDEuNTUyLDEyLjI1MywxLjQ4OWM3Ljg4Ni0wLjA5NywxMS40MzMtMS40NTgsMTIuNzMtMi4xODZsMC45MTktOC41NDljLTguNTItMS44MzYtMTQuOTc5LTguODY2LTE0Ljk3OS04Ljg2Ng0KCQljMTMuNzc1LDYuMDc5LDI3Ljg2NCw3LjI1MSw0MC40OTktMi41OTdjMCwwLTUuOTg1LDcuMjgzLTE0LjM0NSwxMC40NWwxLjAxNCw5LjU2MmMxLjI5OCwwLjcyOCw0LjgxMywyLjA4OSwxMi42OTcsMi4xODYNCgkJYzguODM0LDAuMDYzLDExLjU5LTEuMDc3LDEyLjI4Ni0xLjQ4OWM2Ljk2Ny0xMS4wMTgsOS43ODMtMjkuMDA1LDguOTI5LTQ2LjY3M2MtMC44NTQtMTcuNjk5LTUuMzgyLTM0LjkyNC0xMy4wNDQtNDQuMzYNCgkJbC0yNy40MjMtNS4yNTZMNzkuNDgxLDEwNS4wODl6Ii8+DQoJPHBhdGggZmlsbD0iI0M0ODc0QiIgZD0iTTc0LjY2OSwxOTUuMDE0YzAuMjIxLDAuMzgsMC40NDIsMC43NjEsMC42OTUsMS4xMDhjMC42NjYsMC40MTIsMy40MiwxLjU1MiwxMi4yNTMsMS40ODkNCgkJYzcuODg2LTAuMDk3LDExLjQzMy0xLjQ1OCwxMi43My0yLjE4NmwwLjkxOS04LjU0OWMtOC41Mi0xLjgzNi0xNC45NzktOC44NjYtMTQuOTc5LTguODY2YzEzLjc3NSw2LjA3OSwyNy44NjQsNy4yNTEsNDAuNDk5LTIuNTk3DQoJCWMwLDAtNS45ODUsNy4yODMtMTQuMzQ1LDEwLjQ1bDAuMjg2LDIuNjU4YzAsMCwwLjc5MiwwLjcyOSw3Ljg4NC0zLjYwOWM3LjA5My00LjMzNyw4LjQ1Ni0xMS41ODksOC40NTYtMTEuNTg5DQoJCXMtMTEuMDg0LDYuODcyLTIxLjc1NSw3LjUzN2MtMTAuNzAzLDAuNjYzLTIzLjE3OC00Ljg0Ni0yMy4xNzgtNC44NDZzMS4wNDYsNC40MDEsNS4wNjcsOC4wNzRjNC4wNTMsMy42NzIsNS4xNiw0LjAyMiw1LjE2LDQuMDIyDQoJCWwtMC44ODYsNi4xNDJjMCwwLTUuODI3LDEuNjQ2LTkuMzQxLDEuNjQ2QzgxLjYzNSwxOTUuOSw3Ny4xMzgsMTk1LjMzLDc0LjY2OSwxOTUuMDE0IE03OS40ODEsMTA1LjA4OQ0KCQljLTIuNjI3LDMuMjI5LTQuOTA5LDcuMzc4LTYuNzc2LDEyLjE1OWMyLjgxOCw0LjMwNiwxMC41NDQsMTIuMzgsMjkuMzU0LDE0LjEyMmMxNi42NTQsMS41MjEsMjguNTkxLTIuOTE0LDM1LjAxOC02LjMzNA0KCQljMS45MzQsNS4zNTIsNS41NzMsMTguNTU3LDMuODY1LDM4LjAyOWMtMi4yMTgsMjUuODY5LTUuOTU0LDMwLjk2OC01Ljk1NCwzMC45NjhzLTkuMzcyLDEuNDI1LTEzLjgzNiwxLjA0NA0KCQljLTMuMjYyLTAuMjg1LTYuMzY1LTAuODIzLTcuODUzLTEuMTA3bDAuMTU3LDEuNDU2YzEuMjk4LDAuNzI4LDQuODEzLDIuMDg5LDEyLjY5NywyLjE4NmM4LjgzNCwwLjA2MywxMS41OS0xLjA3NywxMi4yODYtMS40ODkNCgkJYzYuOTY3LTExLjAxOCw5Ljc4My0yOS4wMDUsOC45MjktNDYuNjczYy0wLjQ3Ni05Ljg3OC0yLjA5LTE5LjU5OS00Ljc0OS0yNy45MjhsLTAuMDYyLTAuMTI3bC0wLjAzMy0wLjA5NA0KCQljLTAuMDY0LTAuMTg5LTAuMDk2LTAuMzQ5LTAuMTU4LTAuNTA4bC0wLjAzMi0wLjA5M2MtMC4wNjMtMC4xNTktMC4wOTUtMC4zMTctMC4xNTctMC40NzdsLTAuMDMzLTAuMDk1DQoJCWMtMC4xMjYtMC4zNDgtMC4yNTQtMC43MjktMC4zNzktMS4wNzR2LTAuMDM0Yy0xLjk5Ni01LjUwOS00LjQ5Ny0xMC4yOTEtNy40NC0xMy45MzJsLTI3LjQyMy01LjI1Nkw3OS40ODEsMTA1LjA4OXoiLz4NCgk8cGF0aCBmaWxsPSIjRENEREREIiBkPSJNMTAyLjA1OSwxMzEuMzdjNS4yODUsMC40NzYsMTAuMTAyLDAuMzgsMTQuNDA1LTAuMTI1bDYuNTU2LTExLjU5Yy01LjUxMiwxLjI5Ny0xMS4zMzYsMS42NzgtMTcuMjU3LDEuMDEzDQoJCWMtNS4wOTgtMC41NjktOS45NDMtMS44Ny0xNC40MzgtMy43NjhsNS43MywxMy44MDVDOTguNjM4LDEzMC45OSwxMDAuMzE1LDEzMS4yMTEsMTAyLjA1OSwxMzEuMzciLz4NCgk8cGF0aCBmaWxsPSIjRTNBNjY4IiBkPSJNMTUyLjkwOSwxNzIuMDU5YzEuNjE1LTEuMTA3LDYuMjA2LTQuNTYyLDcuNTM2LTkuOTc2Yy0xLjUxOSwwLjk1LTIuOTc1LDEuODA2LTQuMjc0LDIuNDcxDQoJCWMtMi4xMjIsMS4wNzYtMy42MSwxLjY3OC00LjY1NCwxLjk5NWMtMC4xNTksMS45LTAuMzgxLDMuOC0wLjY2NCw1LjYzNmwwLjI1MiwwLjc2MQ0KCQlDMTUxLjczOCwxNzIuNzIzLDE1Mi4zNzEsMTcyLjQzOCwxNTIuOTA5LDE3Mi4wNTkiLz4NCgk8cGF0aCBmaWxsPSIjQzQ4NzRCIiBkPSJNMTYwLjQ0NSwxNjIuMDg0Yy0xLjMzLDUuNDE1LTUuOTIxLDguODY2LTcuNTM2LDkuOTc1Yy0wLjUzOCwwLjM3OS0xLjE3MSwwLjY2NC0xLjgwNCwwLjg4NWwwLjUwNiwxLjgwNw0KCQljMS4wMTQsMC40NDIsMy4yNjEsMS4xNCw2LjM2NS0wLjA2NGMyLjMxMS0wLjg4Nyw0LjkwOC0xLjk2Myw2LjIzNy00LjUyOGMxLjE0MS0yLjE4NSwxLjUyLTUuNTM5LDAuNDQzLTEwLjg1OQ0KCQlDMTYzLjI2NCwxNjAuMjQ4LDE2MS44MzksMTYxLjIyOSwxNjAuNDQ1LDE2Mi4wODQiLz4NCgk8cGF0aCBmaWxsPSIjMjMyMjIyIiBkPSJNMTUwLjQwOCwxNjQuODcxYzAsMCwwLjg1NCwwLDYuMDE2LTIuMzQ0YzUuMTYyLTIuMzEyLDguMTA2LTUuODI3LDguMTA2LTUuODU4bDIuNzU0LDIuMzEzDQoJCWMtMC4wMzEsMC0zLjQ4Miw0LjE0Ny05LjM3MSw2LjgwNmMtNS44OSwyLjY2Mi03LjUwNSwyLjY2Mi03LjUwNSwyLjY2MlYxNjQuODcxeiIvPg0KCTxwYXRoIGZpbGw9IiNFNjIxMjkiIGQ9Ik0xMTAuMjU5LDEyMS42NWMwLDAsMTEuNjItNi40MjksMTIuNDEyLTMuMjk0YzAuNzkxLDMuMTM1LDEuODY4LDEzLjM2MS0xLjk2NCwxNC41OTcNCgkJYy0zLjgzMSwxLjIzNS0xMS4zNjctNS41MDktMTEuMzY3LTUuNTA5TDExMC4yNTksMTIxLjY1eiIvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik0xMDkuNjI1LDEyMC41MDhjMC4wMzItMC4wMywxMy4wNzgtNy4yOCwxNC4zMTMtMi40NjhjMC41MDYsMS45OTQsMS4xMDcsNi43NDQsMC42MzMsMTAuNDQ5DQoJCWMtMC4zOCwyLjc1NC0xLjM5Myw1LjAzMy0zLjQ4Miw1LjY5OGMtNC41MjksMS40NTgtMTIuNjAzLTUuNzMxLTEyLjYwMy01LjczMWwtMC41MzgtMC41MDZsMS4xMDgtNy4xNTVMMTA5LjYyNSwxMjAuNTA4eg0KCQkgTTEyMS4zNzMsMTE4LjY3M2MtMC4zMTctMS4yMzQtNy43OSwyLjY2LTkuOTEyLDMuODMybC0wLjY5Niw0LjQzMmMxLjY3OSwxLjQyNiw2LjkzNSw1LjYwNCw5LjUzMSw0Ljc4MQ0KCQljMC45MTgtMC4zMTYsMS40MjUtMS43NCwxLjY3OS0zLjU0NkMxMjIuNDE4LDEyNC43ODQsMTIxLjg0NywxMjAuNDc4LDEyMS4zNzMsMTE4LjY3MyIvPg0KCTxwYXRoIGZpbGw9IiNFNjIxMjkiIGQ9Ik0xMDMuNDE5LDEyMS4zNjRjMCwwLTExLjA1MS03LjMxNC0xMi4wOTUtNC4yNDNjLTEuMDE0LDMuMDQtMi45MTUsMTMuMTcxLDAuNzkyLDE0LjY5Mg0KCQljMy43MzcsMS41MjEsMTEuNzc5LTQuNTYsMTEuNzc5LTQuNTZMMTAzLjQxOSwxMjEuMzY0eiIvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik0xMDIuMTg1LDEyMi4xMjNjLTIuMDU5LTEuMzMtOS4xODItNS43OTMtOS41OTMtNC41OWMtMC42MDIsMS43NzItMS41MjEsNi4wMTYtMS4zMzEsOS40MDQNCgkJYzAuMDk1LDEuODM1LDAuNDc0LDMuMjkzLDEuMzYyLDMuNjcyYzIuNTMyLDEuMDQ2LDguMTA1LTIuNzIyLDkuOTEtMy45ODhMMTAyLjE4NSwxMjIuMTIzeiBNOTAuMDg4LDExNi43MDkNCgkJYzEuNTg0LTQuNzE4LDE0LjAyOCwzLjU0OSwxNC4wNTksMy41NzlsMC41MzgsMC4zNDhsMC41NjksNy4yMmwtMC41NjksMC40NDRjLTAuMDMxLDAtOC42NDQsNi41NTQtMTMuMDQ1LDQuNzUNCgkJYy0yLjAyNi0wLjg1Ni0yLjg1LTMuMTk5LTMuMDA4LTUuOTg1Qzg4LjQ0MiwxMjMuMzI3LDg5LjQyNCwxMTguNjQzLDkwLjA4OCwxMTYuNzA5Ii8+DQoJPHBhdGggZmlsbD0iI0U2MjEyOSIgZD0iTTEwNS4wMSwxMTguOTE3bDMuNTYsMC4xNGMxLjM4NCwwLjA1NywyLjQ2MSwxLjIyMiwyLjQwNywyLjYwNWwtMC4yMTksNS41NA0KCQljLTAuMDU1LDEuMzgzLTEuMjIyLDIuNDYtMi42MDUsMi40MDdsLTMuNTYtMC4xNDNjLTEuMzg1LTAuMDU0LTIuNDYyLTEuMjItMi40MDctMi42MDRsMC4yMi01LjUzOA0KCQlDMTAyLjQ1OSwxMTkuOTQsMTAzLjYyNSwxMTguODYxLDEwNS4wMSwxMTguOTE3Ii8+DQoJPHBhdGggZmlsbD0iIzIzMjIyMiIgZD0iTTEwNS4wNjYsMTE3LjU5NmwzLjU0NSwwLjE1OWMxLjA3NywwLjAzMiwxLjk5NCwwLjUwNywyLjY2LDEuMjM1YzAuNjY1LDAuNzI4LDEuMDc2LDEuNjc4LDEuMDQ2LDIuNzIzDQoJCWwtMC4yMjIsNS41MDljLTAuMDY0LDEuMDQ1LTAuNTA5LDEuOTk1LTEuMjM1LDIuNjZjLTAuNzI4LDAuNjY1LTEuNzEsMS4wNzgtMi43NTYsMS4wMTRsLTMuNTQ1LTAuMTI3DQoJCWMtMS4wNDUtMC4wMy0xLjk5Ni0wLjUwNy0yLjY2LTEuMjM1Yy0wLjY2Ni0wLjcyOS0xLjA3OC0xLjcxLTEuMDE0LTIuNzU1bDAuMTkxLTUuNTA5YzAuMDYzLTEuMDQ2LDAuNTM2LTEuOTk1LDEuMjM1LTIuNjYxDQoJCUMxMDMuMDM4LDExNy45NDUsMTA0LjAxOSwxMTcuNTYzLDEwNS4wNjYsMTE3LjU5NiBNMTA4LjUxNywxMjAuMzgzbC0zLjU0Ni0wLjE1OWMtMC4zMTYsMC0wLjYzNSwwLjEyOS0wLjg1NCwwLjMxNw0KCQljLTAuMjIzLDAuMjIyLTAuMzgxLDAuNTA2LTAuNDEyLDAuODU1bC0wLjE4OSw1LjQ3N2MtMC4wMzIsMC4zNDksMC4wOTQsMC42MzQsMC4zMTYsMC44ODhjMC4xODgsMC4yMjIsMC41MDUsMC4zNDgsMC44MjMsMC4zNzkNCgkJbDMuNTQ1LDAuMTI3YzAuMzUsMC4wMzMsMC42MzYtMC4wOTQsMC44NTYtMC4zMTZjMC4yNTQtMC4xODksMC4zOC0wLjUwNywwLjQxMS0wLjgyM2wwLjIyMi01LjUxMWMwLTAuMzE1LTAuMTI3LTAuNjMyLTAuMzE2LTAuODU0DQoJCWgtMC4wMzJDMTA5LjE1LDEyMC41NDEsMTA4LjgzNSwxMjAuMzgzLDEwOC41MTcsMTIwLjM4MyIvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik0xMDYuMDE2LDEzMi42NjhjMS4xMzcsMCwyLjA1OCwwLjkyMSwyLjA1OCwyLjA1OXMtMC45MjEsMi4wNTktMi4wNTgsMi4wNTlzLTIuMDU5LTAuOTIxLTIuMDU5LTIuMDU5DQoJCVMxMDQuODc5LDEzMi42NjgsMTA2LjAxNiwxMzIuNjY4Ii8+DQoJPHBhdGggZmlsbD0iIzIzMjIyMiIgZD0iTTEwNi4wNzgsMTQyLjY3NGMxLjEzOCwwLDIuMDU5LDAuOTIxLDIuMDU5LDIuMDU5YzAsMS4xMzctMC45MjEsMi4wNi0yLjA1OSwyLjA2DQoJCWMtMS4xMzYsMC0yLjA1Ny0wLjkyMy0yLjA1Ny0yLjA2QzEwNC4wMjEsMTQzLjU5NSwxMDQuOTQyLDE0Mi42NzQsMTA2LjA3OCwxNDIuNjc0Ii8+DQoJPHBhdGggZmlsbD0iI0UzQTY2OCIgZD0iTTU1LjM1NCw3OC40OTJjLTEuMzkzLTQuODc2LTEuODY3LTguNjQ1LTEuOS0xMS4zNjhjLTAuNzU5LDAuMTI3LTEuNTgzLDAuMjg2LTIuNDcsMC41MDcNCgkJYy0zLjI2MSwwLjkxOS02Ljk2NywyLjAyNi04LjgzNCw0LjU5MWMtMS43NDIsMi40MDYtMi4xMjMsNi4zLDAuMzQ4LDEzLjAxNGMzLjE5OC0yLjE1Myw3LjA5Mi00LjQwMSwxMS4zOTktNi4xNzQNCgkJQzU0LjM3Miw3OC44NzIsNTQuODc4LDc4LjY1LDU1LjM1NCw3OC40OTIiLz4NCgk8cGF0aCBmaWxsPSIjQzQ4NzRCIiBkPSJNNTMuNDU0LDY3LjEyNGMwLjAzMSwyLjcyNCwwLjUwNyw2LjQ5MSwxLjkwMSwxMS4zNjhjMS43NzItMC42NjYsMy40ODItMS4xNzIsNS4xMjktMS41ODMNCgkJYy0wLjQ3Ny0zLjEwNC0wLjY2NS02LjI3MS0wLjU3MS05LjVDNTguNTIsNjcuMDI4LDU2LjMwMyw2Ni43MTIsNTMuNDU0LDY3LjEyNCIvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik0zOS43NzUsODUuNDI2YzAuMDMxLDAsMi41OTYtMi43NTUsOC45OTItNS45NTNjNi4yNy0zLjE2NSwxMi42MzQtNC42MjMsMTIuNjY2LTQuNjIzbDAuNzkyLDMuNDg0DQoJCWMtMC4wMzEsMC01Ljk4NCwxLjM2MS0xMS44NzUsNC4zMzdjLTUuNzk0LDIuOTE0LTcuOTc4LDUuMjI2LTcuOTc4LDUuMjI2TDM5Ljc3NSw4NS40MjZ6Ii8+DQoJPHBhdGggZmlsbD0iIzIzMjIyMiIgZD0iTTg1LjAyMiwyMC4wNzFjLTIuNjI3LTMuMzU3LTYuNDU5LTUuNjk5LTEwLjk1NS02LjIwNmMtNC40OTctMC40NzUtOC43NzEsMC45NTEtMTIuMDM0LDMuNjcyDQoJCWMtMy4yOTIsMi43MjQtNS41NzMsNi43MTMtNi4xMTEsMTEuMzY4Yy0wLjUwNSw0LjY1NSwwLjg1NSw5LjA1NSwzLjQ4MywxMi40NDRjMi41OTYsMy4zNTYsNi40NTgsNS43LDEwLjkyNCw2LjE3NQ0KCQljNC40OTYsMC41MDcsOC43Ny0wLjkxOSwxMi4wMzItMy42NDJjMy4yOTItMi43MjMsNS41NzMtNi43MTQsNi4xMS0xMS4zNjdDODguOTgsMjcuODYxLDg3LjYxOSwyMy40MjgsODUuMDIyLDIwLjA3MSIvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik0xNjMuNDUzLDI5LjE1OWMtMi41OTctMy4zNTctNi40NTgtNS42OTktMTAuOTU2LTYuMTc0Yy00LjQ2NC0wLjUwNi04LjczOCwwLjkxOC0xMi4wMzIsMy42NDENCgkJYy0zLjI2MSwyLjcyNC01LjU3Myw2LjcxNC02LjA3OCwxMS4zNjdjLTAuNTA3LDQuNjU2LDAuODU0LDkuMDg5LDMuNDUxLDEyLjQ0NGMyLjU5NiwzLjM1Nyw2LjQ1OCw1LjcsMTAuOTU2LDYuMjA2DQoJCWM0LjQ2NCwwLjQ3Niw4LjczOC0wLjk1MSwxMi4wMzItMy42NzJjMy4yOTItMi42OTEsNS41NzMtNi43MTMsNi4wNzktMTEuMzY4QzE2Ny40NDMsMzYuOTQ4LDE2Ni4wODIsMzIuNTQ3LDE2My40NTMsMjkuMTU5Ii8+DQoJPHBhdGggZmlsbD0iI0UzQTY2OCIgZD0iTTczLjQyOCwxOS42MzRjNS45MjgsMC42NTYsMTAuMTg1LDYuMTQ2LDkuNTA5LDEyLjI2NGMtMC42NzcsNi4xMTctNi4wMzMsMTAuNTQzLTExLjk2Myw5Ljg4Ng0KCQljLTUuOTI5LTAuNjU3LTEwLjE4Ny02LjE0Ny05LjUwOC0xMi4yNjRDNjIuMTQzLDIzLjQwMyw2Ny40OTksMTguOTc3LDczLjQyOCwxOS42MzQiLz4NCgk8cGF0aCBmaWxsPSIjRTNBNjY4IiBkPSJNNzMuNDM0LDE5LjYyOGM0LjkzOSwwLjUzOSw4LjcwOCw0LjQzMyw5LjQzNiw5LjI3N2MtMy4xNjctMy40NTItNy4wOTItNi41ODYtMTAuOTU3LTYuOTM0DQoJCWMtOC43Ny0wLjc5Mi0xMC40NDksOC4wMTEtMTAuNTEyLDguMjk1YzAuMDMyLTAuMjUzLDAuMDMyLTAuNTA1LDAuMDYzLTAuNzZDNjIuMTI4LDIzLjM5Nyw2Ny41MTEsMTguOTY0LDczLjQzNCwxOS42MjgiLz4NCgk8cGF0aCBmaWxsPSIjRTNBNjY4IiBkPSJNMTUxLjg3NywyOC43MjljNS45MjgsMC42NTcsMTAuMTg2LDYuMTQ3LDkuNTA4LDEyLjI2NGMtMC42NzksNi4xMTctNi4wMzQsMTAuNTQzLTExLjk2Myw5Ljg4Ng0KCQljLTUuOTMtMC42NTYtMTAuMTg3LTYuMTQ4LTkuNTA3LTEyLjI2NEMxNDAuNTksMzIuNDk5LDE0NS45NDgsMjguMDcyLDE1MS44NzcsMjguNzI5Ii8+DQoJPHBhdGggZmlsbD0iI0M0ODc0QiIgZD0iTTE1NS40MSwyOS43NjFjMy45OTEsMS45NjMsNi40OTIsNi4zOTYsNS45ODQsMTEuMjQxYy0wLjQxLDMuNjcxLTIuNTMyLDYuNzc2LTUuNDQ1LDguNDg1bC0zLjcwNC01LjEyOQ0KCQlDMTU4Ljc5OSw0MC4zMzcsMTU4LjI2MSwzNS4wNDksMTU1LjQxLDI5Ljc2MSIvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik0xNDguNTcsMzUuMjcxYy04LjIzMS0xMC4zODctMjAuNDIzLTE3LjYwNS0zNC41NzUtMTkuMTg5Qzk5Ljg0MSwxNC41MzEsODYuMzUzLDE4LjksNzYuMDYzLDI3LjI1OQ0KCQljLTEwLjM1NCw4LjMyNy0xNy41MTIsMjAuNjc3LTE5LjA5NSwzNC45OWMtMS41ODMsMTQuMzEyLDIuNzI0LDI3LjkyNiwxMC45NTcsMzguMzEzYzguMjMyLDEwLjQxNywyMC40MjMsMTcuNjM4LDM0LjU3NywxOS4yMg0KCQljMTQuMTg2LDEuNTUyLDI3LjY0My0yLjgxOCwzNy45NjUtMTEuMTc3YzEwLjMyMi04LjM2LDE3LjUwOS0yMC42NzcsMTkuMDkzLTM0Ljk4OUMxNjEuMTQyLDU5LjI3MiwxNTYuODM2LDQ1LjY4OCwxNDguNTcsMzUuMjcxIg0KCQkvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik03MS45MTMsMzAuOTY0YzUuOTUzLTcuMjgyLDE2LjI3NS0xMS41ODksMjUuMDE1LTE0LjM3NWM2LjUyMi0yLjA4OSwxMy4xNDEtMy42NDEsMTkuNzktNS4yNTYNCgkJYzEuNjc4LTAuMzgsNy4yNTEtMS42NzgsOS41OTMtMi42OWMwLDAsNC41OTItMS4zOTQsNi40MzEtMi43MjRsMS4zOTIsMi4xMjJjMi41NjQsMy43OTgsNC4wMjIsOS4zMDksMi42NiwxMy43NzMNCgkJYy0wLjIyMSwwLjY5OC0wLjQ0MiwxLjM5My0wLjcyOSwyLjA1OWMxLjY3OSwxLjA3NywzLjI5NCwyLjI0OCw0LjgxMywzLjUxNGMwLjMxNywwLjI1MiwwLjYwMiwwLjQ3NSwwLjkxOSwwLjc2DQoJCWMxMy4xMDksMTEuMjcyLDE5LjcyNywyOC4yNzUsMTcuODI1LDQ1LjQ3Yy0xLjc3MSwxNi4wODQtMTEuMTQ1LDMwLjMzMy0yNC44NTQsMzguNzg4Yy05LjYyNiw1LjkyMS0yMC45OTQsOC42NDQtMzIuMjY2LDcuMzc4DQoJCWMtMTIuNjk4LTEuMzkzLTI0LjI4Ni03LjQ0Mi0zMi43NzItMTcuMDA0Yy05Ljg0OC0xMS4wODItMTQuNDctMjUuODA1LTEyLjg1NS00MC41Mjl2LTAuMDYzbDAuMDMxLTAuMDY1DQoJCUM1OC40ODgsNTAuNTMyLDYzLjc3NiwzOS40MTgsNzEuOTEzLDMwLjk2NCIvPg0KCTxwYXRoIGZpbGw9IiNFM0E2NjgiIGQ9Ik0xNTUuMzQ4LDczLjE0YzEuODA1LTE2LjQzMy00LjgxMy0zMS44MjItMTYuNDAxLTQxLjc2NGMtMC4yMjMtMC4xOS0wLjQ3Ni0wLjQxMS0wLjc2LTAuNjMzDQoJCWMtMS41ODMtMS4yOTktMy4yMy0yLjQ3MS00Ljk3Mi0zLjU3OGMtMS4zNjEsMC41MzctMy44NjIsMS4xNzItNy40NzIsMS4wNDRjLTUuNzk1LTAuMjIyLTguMzYtMS42NDYtOC4zNi0xLjY0Ng0KCQlzOS40OTksMC41NywxMi4zNTEtMS4zNjJjMC42OTUtMC40NzcsMS4yMzItMC45ODEsMS42MTMtMS41MjFjMC40MTEtMC42NjQsMC44NTQtMS42NzcsMS4yOTgtMy4xMzQNCgkJYzEuNDg4LTQuNzgyLTIuMDkxLTEwLjEzMy0yLjA5MS0xMC4xMzNjLTAuMjUzLDUuMzUxLTQyLjI2OSw3LjA2Mi01NS40MSwyMy40MzFjLTcuNTY4LDcuNzkxLTEyLjQ3NiwxOC4xMTItMTMuOTY1LDI4Ljg3OA0KCQljLTIuOTEyLDI2LjI4MSwxNS44MDEsNDkuOTAyLDQxLjc5Nyw1Mi43ODNDMTI4LjQ5NiwxMTguMzI0LDE1Mi40NjYsOTkuMDA5LDE1NS4zNDgsNzMuMTQiLz4NCgk8cGF0aCBmaWxsPSIjQzQ4NzRCIiBkPSJNMTM1LjM2NywyOC41ODljLTAuNjk1LTAuNDc0LTEuNDI1LTAuOTUxLTIuMTUzLTEuNDI1Yy0xLjM2MSwwLjUzOS0zLjg2MiwxLjE3Mi03LjQ3MywxLjA0NA0KCQljLTUuNzk0LTAuMjIxLTguMzU5LTEuNjQ2LTguMzU5LTEuNjQ2czkuNSwwLjU3LDEyLjM1LTEuMzYyYzAuNjk2LTAuNDc0LDEuMjM0LTAuOTgyLDEuNjE1LTEuNTE5DQoJCWMwLjQxMS0wLjY2NiwwLjg1NC0xLjY3OSwxLjI5OC0zLjEzNWMxLjQ4OC00Ljc4Mi0yLjA5MS0xMC4xMzMtMi4wOTEtMTAuMTMzczEuNDU4LDguODAyLTIuNTAxLDExLjc3OQ0KCQljLTMuOTU3LDMuMDA4LTE1LjM1NiwzLjk5LTE1LjM1NiwzLjk5czUuNjk5LDIuODE4LDEzLjM5NSwzLjM1NkMxMzAuMzMyLDI5Ljg1NSwxMzMuNDM2LDI5LjIyMiwxMzUuMzY3LDI4LjU4OSIvPg0KCTxwYXRoIGZpbGw9IiNGMUQ1QkEiIGQ9Ik0xMDcuNjkxLDY0Ljg1NmMxNC42MjksMS4wMDcsMjUuNzc3LDEyLjE0MiwyNC45MDEsMjQuODcyYy0wLjg3NSwxMi43MzEtMTMuNDQyLDIyLjIzNS0yOC4wNzIsMjEuMjI5DQoJCWMtMTQuNjI3LTEuMDA2LTI1Ljc3Ni0xMi4xNDMtMjQuOTAxLTI0Ljg3MkM4MC40OTYsNzMuMzU0LDkzLjA2NCw2My44NTEsMTA3LjY5MSw2NC44NTYiLz4NCgk8cGF0aCBmaWxsPSIjQzQ4NzRCIiBkPSJNMTMxLjI1MiwxMDkuNTIxYzEuMTM5LTAuNjAxLDIuMjQ4LTEuMjAyLDMuMzIzLTEuODY3YzExLjIxMS03LjYsMTkuMTU2LTE5LjkxNywyMC43NzItMzQuNTE1DQoJCWMxLjY3OC0xNS4yNjItMy45MjYtMjkuNjM2LTE0LjAyNS0zOS41NDhjNy40NzIsOS45NzUsMTEuMzM0LDIyLjk4OSw5Ljg0NSwzNi43MzFjLTEuNTIsMTQuMDU5LTguNzA3LDI2LjI4MS0xOC44MzgsMzQuNDE4DQoJCWMtMi44ODMsMi40MzgtNi4wOCw0LjQzMi05LjUzMSw2LjAxNmMtNS44OSwyLjgxNy0xMi4zMTgsNC40MDEtMTguOTY2LDQuNDY0Yy0wLjc5MiwwLjAzMy0xLjU4NSwwLjA2NS0yLjQwOSwwLjA2NQ0KCQljMC41MDcsMC4wOTMsMS4wNDcsMC4xNTgsMS41NTIsMC4yMmM1LjUxLDAuNjAyLDEwLjg2MSwwLjIyMywxNS45NTktMC45OGMyLjQwNy0wLjc5Miw0Ljc4LTEuNjQ2LDcuMDkzLTIuNjI5aDAuMDYzbDAuMDMyLTAuMDMNCgkJYzEuNzQyLTAuNjY2LDMuNDItMS40NTcsNS4wNjYtMi4zMTNMMTMxLjI1MiwxMDkuNTIxeiIvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik04Ny42OTIsNTIuNjZjMy4yNDMsMC4yMjIsNS42NDIsMy43Niw1LjM1Niw3Ljg5OWMtMC4yODQsNC4xNDEtMy4xNDYsNy4zMTUtNi4zODksNy4wOTMNCgkJYy0zLjI0My0wLjIyMy01LjYzOS0zLjc1OS01LjM1Ni03LjlDODEuNTg5LDU1LjYxMSw4NC40NDksNTIuNDM3LDg3LjY5Miw1Mi42NiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik05MC4wMzMsNTQuNjQ5YzEuMTQsMC4wNzksMS45ODcsMS4yMzIsMS44OTQsMi41NzljLTAuMDkxLDEuMzQ0LTEuMDksMi4zNzItMi4yMjgsMi4yOTUNCgkJYy0xLjEzOS0wLjA3OS0xLjk4Ny0xLjIzNC0xLjg5Ni0yLjU4Qzg3Ljg5Nyw1NS41OTksODguODk0LDU0LjU3MSw5MC4wMzMsNTQuNjQ5Ii8+DQoJPHBhdGggZmlsbD0iIzIzMjIyMiIgZD0iTTEzMS4wMTcsNTUuMjU3YzMuMjQzLDAuMjIzLDUuNjQxLDMuNzYxLDUuMzU2LDcuOWMtMC4yODQsNC4xNC0zLjE0NSw3LjMxNC02LjM4OSw3LjA5Mg0KCQljLTMuMjQyLTAuMjIzLTUuNjQtMy43NTktNS4zNTQtNy44OTlDMTI0LjkxNCw1OC4yMDksMTI3Ljc3NCw1NS4wMzUsMTMxLjAxNyw1NS4yNTciLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTMzLjM1OCw1Ny4yNDdjMS4xNCwwLjA3OSwxLjk4NywxLjIzMiwxLjg5NSwyLjU3OGMtMC4wOTMsMS4zNDUtMS4wOTEsMi4zNzMtMi4yMjksMi4yOTUNCgkJcy0xLjk4Ni0xLjIzMy0xLjg5NS0yLjU3OUMxMzEuMjIzLDU4LjE5NiwxMzIuMjE5LDU3LjE2OCwxMzMuMzU4LDU3LjI0NyIvPg0KCTxwYXRoIGZpbGw9IiNGRUZFRkUiIGQ9Ik0xMDguNjI2LDczLjE4N2MxLjUwMy0wLjAxOSwyLjcxNiwwLjU4OSwyLjcxMiwxLjM1OWMtMC4wMDIsMC43Ny0xLjIyNCwxLjQwOS0yLjcyNCwxLjQyOA0KCQljLTEuNSwwLjAxOC0yLjcxNy0wLjU5LTIuNzEzLTEuMzU5QzEwNS45MDQsNzMuODQ1LDEwNy4xMjUsNzMuMjA1LDEwOC42MjYsNzMuMTg3Ii8+DQoJPHBvbHlnb24gZmlsbD0iIzIzMjIyMiIgcG9pbnRzPSIxMDcuNTk4LDgwLjM2IDEwNy42OTUsODcuODY1IDEwNS42MzQsODcuODk2IDEwNS41NDEsODAuMzkxIAkiLz4NCgk8cGF0aCBmaWxsPSIjMjMyMjIyIiBkPSJNMTA2LjY0OCw4Mi43MzVjMCwwLTguOTkyLTQuMjEyLTcuNDczLTcuOTQ4QzEwMS44OTksNjguMDQzLDEyNi4yOCw3MS40NjIsMTA2LjY0OCw4Mi43MzUiLz4NCgk8cGF0aCBmaWxsPSIjRkVGRUZFIiBkPSJNMTA5LjQ4LDcyLjE2N2MxLjYyNiwwLjI2MSwyLjg0NywwLjk4LDIuNzI4LDEuNjA3Yy0wLjExNywwLjYyOC0xLjUzMSwwLjkyNC0zLjE1NSwwLjY2NA0KCQlzLTIuODQ1LTAuOTc5LTIuNzI3LTEuNjA3QzEwNi40NDQsNzIuMjA0LDEwNy44NTYsNzEuOTA2LDEwOS40OCw3Mi4xNjciLz4NCgk8cGF0aCBmaWxsPSIjRjA4OTE4IiBkPSJNODguNjMyLDIzLjk5OEw4OC42MzIsMjMuOTk4YzUuNjY3LTEuNTgzLDEzLjM2Mi0yLjc4NywyMy42MjEtMS4wNzgNCgkJQzEwMS45OTQsMjEuMjExLDk0LjI5OSwyMi40MTUsODguNjMyLDIzLjk5OCBNMTEyLjI1MywyMi45MmgwLjA2M0gxMTIuMjUzeiBNMTEyLjMxNiwyMi45MmMwLDAsMC4wMzMsMCwwLjA2MywwLjAzMw0KCQlDMTEyLjM1LDIyLjkyLDExMi4zMTYsMjIuOTIsMTEyLjMxNiwyMi45MiBNMTEyLjM4LDIyLjk1M2gwLjA2M0gxMTIuMzh6IE0xMTIuNDc1LDIyLjk1M2gwLjA2M0gxMTIuNDc1eiBNMTEyLjUzNywyMi45NTMNCgkJYzAuMDMzLDAuMDMyLDAuMDMzLDAuMDMyLDAuMDY0LDAuMDMyQzExMi41NywyMi45ODUsMTEyLjU3LDIyLjk4NSwxMTIuNTM3LDIyLjk1MyBNMTEyLjYzNCwyMi45ODVoMC4wNjNIMTEyLjYzNHogTTExMi42OTYsMjIuOTg1DQoJCWMwLjAzMiwwLDAuMDMyLDAsMC4wNjMsMC4wMzFDMTEyLjcyOSwyMi45ODUsMTEyLjcyOSwyMi45ODUsMTEyLjY5NiwyMi45ODUgTTExMi43NiwyMy4wMTdoMC4wNjNIMTEyLjc2eiBNMTEyLjg1NCwyMy4wMTdoMC4wNjMNCgkJSDExMi44NTR6IE0xMTIuOTE3LDIzLjAxN2MwLjAzMywwLjAzMSwwLjAzMywwLjAzMSwwLjA2NCwwLjAzMUMxMTIuOTUsMjMuMDQ4LDExMi45NSwyMy4wNDgsMTEyLjkxNywyMy4wMTcgTTExMy4wMTQsMjMuMDQ4aDAuMDYzDQoJCUgxMTMuMDE0eiBNMTEzLjA3NiwyMy4wNDhjMC4wMzIsMCwwLjAzMiwwLjAzMSwwLjA2MywwLjAzMUMxMTMuMTA4LDIzLjA3OSwxMTMuMTA4LDIzLjA0OCwxMTMuMDc2LDIzLjA0OCBNMTEzLjEzOSwyMy4wNzloMC4wNjQNCgkJSDExMy4xMzl6IE0xMTMuMjM0LDIzLjA3OWMwLDAsMC4wMzIsMCwwLjA2MywwLjAzMkMxMTMuMjY3LDIzLjA3OSwxMTMuMjM0LDIzLjA3OSwxMTMuMjM0LDIzLjA3OSBNMTEzLjI5OCwyMy4xMTFoMC4wNjNIMTEzLjI5OHoNCgkJIE0xMTMuMzYxLDIzLjExMWgwLjA5NUgxMTMuMzYxeiBNMTEzLjQ1NiwyMy4xNDRoMC4xMjdIMTEzLjQ1NnogTTExMy42MTUsMjMuMTQ0YzAsMC4wMzEsMC4wMzIsMC4wMzEsMC4wNjMsMC4wMzENCgkJQzExMy42NDcsMjMuMTc1LDExMy42MTUsMjMuMTc1LDExMy42MTUsMjMuMTQ0IE0xMTMuNjc4LDIzLjE3NWMwLjA2MywwLDAuMDk2LDAsMC4xNTksMC4wMzINCgkJQzExMy43NzMsMjMuMTc1LDExMy43NCwyMy4xNzUsMTEzLjY3OCwyMy4xNzUgTTExMy44MzcsMjMuMjA3YzUuOTUzLDEuMTA3LDExLjUyNCwyLjk3NywxNi4zMDcsNC41OTINCgkJQzEyNS4zNjEsMjYuMTgzLDExOS43OSwyNC4zMTMsMTEzLjgzNywyMy4yMDciLz4NCgk8cGF0aCBmaWxsPSIjRjZBQTAzIiBkPSJNMTMwLjE0NCwyNy43OThMMTMwLjE0NCwyNy43OThjNC43ODIsMS42MTQsOC43MzgsMi45NzYsMTEuMzk5LDMuMTAyDQoJCUMxMzguODgyLDMwLjc3NCwxMzQuOTI2LDI5LjQxMywxMzAuMTQ0LDI3Ljc5OCIvPg0KCTxwYXRoIGZpbGw9IiMzMzJDMkIiIGQ9Ik04OS43NCw4My41MjZjMC4xNTktMC42OTYsMC43Ni0xLjE0LDEuMzYxLTAuOTVjMC41NzEsMC4xODksMC45MTcsMC45NSwwLjc2LDEuNjQ2DQoJCWMtMC42MzQsMi45MTQsMi42OSw0LjgxNCw0LjU2LDUuMzgzYzMuMzI1LDEuMDQ2LDcuODg0LDAuMzgxLDkuMDU0LTQuMjc0YzAuMTktMC42OTYsMC43OTMtMS4xMDksMS4zOTQtMC44ODYNCgkJYzAuNTcsMC4yMjEsMC44ODgsMC45OCwwLjY5OCwxLjY3N0MxMDQuNzQ4LDk3LjMzMiw4Ny43NDUsOTIuNjQ2LDg5Ljc0LDgzLjUyNiIvPg0KCTxwYXRoIGZpbGw9IiMzMzJDMkIiIGQ9Ik0xMjMuMzAzLDgzLjU4OWMtMC4xNTctMC43MjktMC43NTktMS4xNC0xLjMyOS0wLjk1cy0wLjkxOCwwLjkxOS0wLjc5MSwxLjY0Nw0KCQljMC4zNDgsMS41NTItMC41MDcsMi45NzYtMS44NjksNC4wMjJjLTAuNzU5LDAuNTY4LTEuNjc3LDEuMDQ0LTIuNjU5LDEuMzZjLTEuMDE0LDAuMjg1LTIuMDU5LDAuNDQ0LTMuMTAyLDAuNDEyDQoJCWMtMi42NjEtMC4wOTUtNS4xNjItMS40ODgtNS45ODUtNC42ODdjLTAuMTU5LTAuNzI3LTAuNzkxLTEuMTA4LTEuMzYyLTAuODg2Yy0wLjU2OSwwLjIyMi0wLjg4NywwLjk0OS0wLjcyOCwxLjY3Nw0KCQljMS4xNzEsNC41MjksNC40OTYsNi40MjksOC4wMTEsNi41NTVjMS4yMzQsMC4wNjMsMi41MDEtMC4xMjYsMy43MDQtMC40NzZjMS4xNzItMC4zOCwyLjMxMy0wLjk0OSwzLjI2Mi0xLjY3OA0KCQlDMTIyLjYzOSw4OC45NDEsMTIzLjkzOCw4Ni40NywxMjMuMzAzLDgzLjU4OSIvPg0KCTxwYXRoIGZpbGw9IiMzMzJDMkIiIGQ9Ik05OC4yOSw5MC4wODFjMS4xMDgsMi45MTMsMi41NjQsNC45NCw0LjE3OSw2LjE0M2MxLjIzNSwwLjkxNywyLjU2NSwxLjMyOSwzLjg2MywxLjMyOQ0KCQljMS4yOTktMC4wMzEsMi41OTYtMC41MDYsMy43NjktMS4zOTNjMS41NTEtMS4xNywyLjg4MS0zLjA0LDMuNzY4LTUuNTQxbDIuNTMyLDAuODU1Yy0xLjA3NiwzLjAzOS0yLjcyMyw1LjM1MS00LjY4Nyw2LjgwNw0KCQljLTEuNjEzLDEuMjM1LTMuNDUsMS45MDEtNS4zMTgsMS45MzNjLTEuOSwwLjAzMS0zLjc2OC0wLjU3MS01LjUxLTEuODM4Yy0xLjk5NS0xLjQ4OC0zLjc5OS0zLjkyNi01LjA5Ny03LjM3N0w5OC4yOSw5MC4wODF6Ii8+DQoJPHBhdGggZmlsbD0iI0E1MzAzMyIgZD0iTTk5LjQ5Myw5Mi42NzdjMC40NzUsMC44NTQsMC45OCwxLjU4MywxLjU1MSwyLjE4NWMwLjQ0MiwwLjUzOSwwLjk1LDAuOTgyLDEuNDI0LDEuMzYyDQoJCWMxLjIzNSwwLjkxNywyLjU2NSwxLjMyOSwzLjg2MiwxLjMyOWMxLjMtMC4wMzEsMi41OTctMC41MDYsMy43Ny0xLjM5M2MwLjE4OC0wLjE1NywwLjM4LTAuMjg0LDAuNTM4LTAuNDQzDQoJCWMwLjg1NC0wLjc1OSwxLjY0Ni0xLjc3MywyLjMxMi0zLjAwOGMtMi41NjQtMC4yMjEtNC45NzEtMS40NTYtNi40MjktMy45NThDMTA0LjkzOCw5MS4zNzksMTAyLjI0Nyw5Mi41ODEsOTkuNDkzLDkyLjY3NyIvPg0KCTxwYXRoIGZpbGw9IiNFNjIxMjkiIGQ9Ik0xMDAuOTgsOTQuODNsMC4wNjQsMC4wMzJjMC40NDIsMC41MzksMC45NSwwLjk4MSwxLjQyNCwxLjM2MWMxLjIzNSwwLjkxOCwyLjU2NSwxLjMzMSwzLjg2NCwxLjMzMQ0KCQljMS4yOTgtMC4wMzMsMi41OTUtMC41MDgsMy43NjktMS4zOTRjMC4xODktMC4xNTksMC4zNzgtMC4yODUsMC41MzYtMC40NDJjMC4yODYtMC4yNTUsMC41Ny0wLjUzOSwwLjg1Ni0wLjg1Ng0KCQljLTEuNTIxLTAuODU0LTMuMzI1LTEuMzI5LTUuMjg5LTEuMzI5QzEwNC4zMDYsOTMuNTMzLDEwMi41MDEsOTQuMDA3LDEwMC45OCw5NC44MyIvPg0KCTxwYXRoIGZpbGw9IiMyMzIyMjIiIGQ9Ik03NC41NDIsNjcuMTU3Yy02LjMwMi02Ljg0MS01LjYzNi0xOC42ODMsNC4zMzktMjAuMTA4YzEuNjQ2LTAuMjUyLDMuNzA0LTAuMzgsNS44ODktMC4zOA0KCQljNC40MDEsMCw5LjI0NSwwLjUwOCwxMS45MzgsMS40ODljMC45MTcsMC4zNDksMS42NDYsMC43NjEsMi4yNzgsMS4yNjZjMS43NzIsMS40MjUsMi40MzgsMy4zNTYsMi41NjQsNC44MTMNCgkJYzAuMDMyLDAuMjUzLDAuMDMyLDAuNTA3LDAuMDMyLDAuNzZjMCw4LjE2OS01LjM4MywxNC45NzctMTIuNTM4LDE2LjU5MmMtMS4wNDUsMC4yNTItMi4xNTUsMC4zNzktMy4yNjIsMC4zNzkNCgkJQzgwLjk2OSw3MS45NjgsNzcuMTM4LDY5Ljk3NCw3NC41NDIsNjcuMTU3IE02Ni44MTYsNTUuNzU3YzAsMy44OTQsMS4yMzMsNy41MDQsMy4zMjQsMTAuNTEyDQoJCWM1LjczMiwxMC40OCwyMy45NywxMC45NTYsMzEuMjUyLDAuNzkyYzEuNDU3LTEuODM2LDIuNTY0LTMuOTU4LDMuMjMtNi4yMzdjMS4wMTMtMi44MTgsMS40MjMtNS4wOTksMS41ODItNS41NzMNCgkJYzAuNTM4LTEuNDg4LDIuNTAxLTEuNzczLDIuNTAxLTEuNzczczEuOTMyLDAuMjg1LDIuNDcxLDEuNzczYzAuMTksMC40NzQsMC41NjksMi43NTUsMS42MTUsNS41NzMNCgkJYzAuNjY0LDIuMjc4LDEuNzcyLDQuNDAxLDMuMTk3LDYuMjM3YzcuMzEzLDEwLjE2NCwyNS41NTMsOS42ODksMzEuMjU0LTAuNzkyYzIuMTItMy4wMDgsMy4zNTQtNi42MTgsMy4zNTQtMTAuNTEyDQoJCWMwLTAuNzkyLTAuMDYzLTEuNjE1LTAuMTU3LTIuNDA3YzAuMjUzLTAuMzQ5LTAuMDY0LTAuMTg5LDEuMTA3LTEuMDc3bDAuMjUzLTAuMTg5YzAuMTI4LTAuMDk1LDAuMjg1LTAuMTksMC40NDQtMC4yODUNCgkJYzAuNTM3LTAuNDEyLDEuMjAzLTEuMDc2LDEuNDU2LTEuOTMyYzAuNDEyLTEuMjM0LDAuMTg5LTQuMDUyLDAuMTI2LTQuOTcxYy0zLjMyNCwwLjAzMy04LjYxMi0wLjA2My0xMi41MzgtMC45MTcNCgkJYy02LjE3NC0xLjMzMS0xNi4zMzctMC45MTktMjIuNTEzLDEuNTUyYy02LjIwNiwyLjQ3LTguMzI4LDMuNTc4LTguOTMsMy41NzhoLTEuMTQxaC0xLjEzOWMtMC42MDMsMC0yLjc1NS0xLjEwOC04LjkyOS0zLjU3OA0KCQljLTYuMTc1LTIuNDcxLTE2LjMzOC0yLjg4Mi0yMi41MTMtMS41NTJjLTYuMTc1LDEuMzI5LTEyLjg1NywwLjgyMy0xMi44NTcsMC44MjNzLTEuNzA4LDQuMjExLDAuNjk4LDYuMDQ3DQoJCWMwLjE5LDAuMTU5LDAuMzgsMC4zNDksMC41MzgsMC41MzljMC4zODEsMC4xOSwwLjc1OSwwLjQ0MywxLjEwOSwwLjY5N2MwLjYzMiwwLjUwNywxLjA3NiwwLjg4NywxLjM2MSwxLjI2Nw0KCQlDNjYuODc5LDU0LjE0Myw2Ni44MTYsNTQuOTY1LDY2LjgxNiw1NS43NTcgTTExNS44MzEsNTQuOTk3di0wLjc2YzAuMTktMS45MzEsMS4yOTgtNC43ODIsNC44NDUtNi4wNzkNCgkJYzEuODk5LTAuNjk4LDQuNzgxLTEuMTQsNy44NTMtMS4zMzFjMy41NDYtMC4yNTMsNy4zMTUtMC4xNTksOS45NzUsMC4yMjJjMS44NjcsMC4yNTMsMy40MTksMC44ODgsNC42NTMsMS44MDUNCgkJYzcuODIxLDUuNzAxLDMuMDQxLDIyLjA3LTEwLjI5LDIzLjA1MmMtMC40MTEsMC4wMzEtMC44MjMsMC4wNjMtMS4yNjYsMC4wNjNjLTUuMDM2LDAtOS41LTIuNTMzLTEyLjM4MS02LjQ5MQ0KCQlDMTE3LjA5OSw2Mi41OTcsMTE1LjgzMSw1OC45NTYsMTE1LjgzMSw1NC45OTciLz4NCjwvZz4NCjwvc3ZnPg0K"
end
