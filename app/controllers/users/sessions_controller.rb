class Users::SessionsController < Devise::SessionsController
  include AuthenticationHelper

  def create
    user = User.find_by(email: params[:user][:email])

    if user && user.valid_password?(params[:user][:password])
      sign_in user
      render json: { user: user }, status: :ok
    else
      render json: { message: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    super
  end
end
