class SeatsController < ApplicationController
  # GET /seats
  # GET /seats.json
  def index
    @ride = Ride.find(params[:ride_id])
    @seats = @ride.seats

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @seats }
    end
  end

  # GET /seats/1
  # GET /seats/1.json
  def show
    @seat = Ride.find(params[:ride_id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @seat }
    end
  end

  # GET /seats/new
  # GET /seats/new.json
  def new
    @seat = Ride.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @seat }
    end
  end

  # GET /seats/1/edit
  def edit
    @seat = Ride.find(params[:id])
  end

  # POST /seats
  # POST /seats.json
  def create
    @seat = Ride.new(params[:seat])

    respond_to do |format|
      if @seat.save
        format.html { redirect_to @seat, notice: 'Ride was successfully created.' }
        format.json { render json: @seat, status: :created, location: @seat }
      else
        format.html { render action: "new" }
        format.json { render json: @seat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /seats/1
  # PUT /seats/1.json
  def update
    @seat = Ride.find(params[:id])

    respond_to do |format|
      if @seat.update_attributes(params[:seat])
        format.html { redirect_to @seat, notice: 'Ride was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @seat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /seats/1
  # DELETE /seats/1.json
  def destroy
    @seat = Ride.find(params[:id])
    @seat.destroy

    respond_to do |format|
      format.html { redirect_to seats_url }
      format.json { head :no_content }
    end
  end
end
