class Users::RegistrationsController < Devise::RegistrationsController
  include AuthenticationHelper

  def create
    super do |resource|
      handle_create_success(resource, 'Signed up successfully')
      return
    end
  rescue ActiveRecord::RecordInvalid => e
    handle_create_error(e, 'Invalid record')
  end

  protected

  def after_sign_up_path_for(resource)
    nil
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
