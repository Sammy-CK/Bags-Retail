class AuthController < ApplicationController
    # skip_before_action :authorized, only: [:create]

    # method to login staff
    def create
      @staff = Staff.find_by(name: staff_login_params[:name])
      if @staff&.authenticate(staff_login_params[:password])
        token = encode_token({ staff_id: @staff.id })
        render json: { staff: StaffSerializer.new(@staff), jwt: token }, status: :accepted
      else
        render json: { message: "Invalid username or password" }, status: :unauthorized
      end
    end
  
    private
  
    def staff_login_params
      params.permit(:name, :password)
    end
  end