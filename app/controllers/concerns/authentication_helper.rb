module AuthenticationHelper
  extend ActiveSupport::Concern

  included do
    skip_before_action :require_no_authentication, only: [:create]
  end

  def handle_create_success(resource, success_message, status = :created)
    if resource.persisted?
      render json: { message: success_message, user: resource }, status: status
      return
    end
  end

  def handle_create_error(exception, error_message, status = :unprocessable_entity)
    render json: { error: exception.message || error_message }, status: status
  end
end
