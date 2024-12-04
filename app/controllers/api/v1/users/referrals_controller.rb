class Api::V1::Users::ReferralsController < ApplicationController
  include ReferralHelper

  before_action :authenticate_api_v1_user!

  def create
    recipient_email = params[:recipient_email]

    if recipient_email.present?
      begin
        send_referral_email(recipient_email)
        handle_referral_success('Referral email sent successfully')
      rescue StandardError => e
        handle_referral_error(e.message)
      end
    else
      handle_referral_error('Invalid email')
    end
  end
end
