class BagsController < ApplicationController
  before_action :set_bag, only: %i[ show update destroy ]

  # GET /bags
  def index
    @bags = Bag.all

    render json: @bags
  end

  # GET /bags/1
  def show
    render json: @bag
  end

  # POST /bags
  def create
    @bag = Bag.new(bag_params)
    puts @bag
    if @bag.save
      render json: @bag, status: :created
    else
      render json: @bag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bags/1
  def update
    if @bag.update(bag_params)
      render json: @bag
    else
      render json: @bag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bags/1
  def destroy
    @bag.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bag
      @bag = Bag.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def bag_params
      params.permit(:name, :sold, :stored, :shop_id, :category_id, :image, :price, :sold_at, :secret_shop_key)
    end
end
