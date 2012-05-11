class SlotsController < ApplicationController
  def index
    @slots = Slot.all
  end

  def show
    @slot = Slot.find(params[:id])
  end

  def new
    @slot = Slot.new
  end

  def create
    @slot = Slot.new(params[:slot])
    if @slot.save
      redirect_to @slot, :notice => "Successfully created slot."
    else
      render :action => 'new'
    end
  end

  def edit
    @slot = Slot.find(params[:id])
  end

  def update
    @slot = Slot.find(params[:id])
    if @slot.update_attributes(params[:slot])
      redirect_to @slot, :notice  => "Successfully updated slot."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @slot = Slot.find(params[:id])
    @slot.destroy
    redirect_to slots_url, :notice => "Successfully destroyed slot."
  end
end
