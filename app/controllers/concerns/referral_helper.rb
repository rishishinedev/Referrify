module ReferralHelper
  extend ActiveSupport::Concern

  def handle_referral_success(success_message, status = :ok)
    render json: { message: success_message }, status: status
  end

  def handle_referral_error(error_message, status = :not_found)
    render json: { error: error_message }, status: status
  end

  def send_referral_email(recipient_email)
    ReferralMailer.referral_email(recipient_email).deliver_now
  rescue StandardError => e
    raise "Failed to send referral email: #{e.message}"
  end
end
