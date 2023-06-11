class ApplicationController < ActionController::API
  def encode_token(payload)
    JWT.encode(payload, "rebirth")
  end

  # method to check if the request has authorization header
  def auth_header
    request.headers["Authorization"]
  end

  # methid for decdoing the JWT token
  def decoded_token
    if auth_header
      token = auth_header.split(" ")[1]
      begin
        JWT.decode(token, "rebirth", true, algorithm: "HS256")
      rescue JWT::DecodeError
        nil
      end
    end
  end

  # method to find the current admin
  def current_admin
    if decoded_token
      admin_id = decoded_token[0]["admin_id"]
      @aid = Admin.find_by(id: admin_id)
    end
  end

  # method to find the if admin is logged in
  def logged_in?
    !!current_admin
  end

  # method to authorize logged in admin
  def authorized_admin
    render json: { message: "Please login" }, status: :unauthorized unless logged_in?
  end

  ## Now Its Staff Time

  # method to find the current Staff
  def current_staff
    if decoded_token
      staff_id = decoded_token[0]["staff_id"]
      @sid = staff_id.find_by(id: staff_id)
    end
  end

  # method to find the if Staff is logged in
  def logged_in?
    !!current_staff
  end

  # method to authorize logged in Staff
  def authorized_staff
    render json: { message: "Please login" }, status: :unauthorized unless logged_in?
  end

end
