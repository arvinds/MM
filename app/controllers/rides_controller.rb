class RidesController < ApplicationController


  # GET /rides
  # GET /rides.json
  def search
    @rides = Ride.find_best_routes params[:from_lat].to_f, params[:from_lng].to_f, params[:to_lat].to_f, params[:to_lng].to_f
    #@rides = @rides[0,1]
    @request = params

=begin
	# incoming parameters
	@from_string = params[:from_string]
	@to_string = params[:to_string]
	
	@from_lat = params[:from_lat]
	@from_lng = params[:from_lng]
	@to_lat = params[:to_lat]
	@to_lng = params[:to_lng]
=end

    respond_to do |format|
      format.html { render :layout => false }
#      format.json { render json: @rides, :layout => false  }
    end
	
  end

  # GET /rides/1
  # GET /rides/1.json
  def show
    @ride = Ride.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @ride }
    end
  end

  # GET /rides/new
  # GET /rides/new.json
  def new
    @ride = Ride.new
	@request = params

    respond_to do |format|
      format.html { render :layout => false }
      format.json { render json: @ride }
    end
  end

  # GET /rides/1/edit
  def edit
    @ride = Ride.find(params[:id])
  end

  # POST /rides
  # POST /rides.json
  def create

    @ride = Ride.new(params[:ride])

    respond_to do |format|
      if @ride.save
        format.html { redirect_to @ride, notice: 'Ride was successfully created.' }
        format.json { render json: @ride, status: :created, location: @ride }
      else
        format.html { render action: "new" }
        format.json { render json: @ride.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /rides/1
  # PUT /rides/1.json
  def update
    @ride = Ride.find(params[:id])

    respond_to do |format|
      if @ride.update_attributes(params[:ride])
        format.html { redirect_to @ride, notice: 'Ride was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @ride.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rides/1
  # DELETE /rides/1.json
  def destroy
    @ride = Ride.find(params[:id])
    @ride.destroy

    respond_to do |format|
      format.html { redirect_to rides_url }
      format.json { head :no_content }
    end

  end
end
