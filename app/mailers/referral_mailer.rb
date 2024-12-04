class ReferralMailer < ApplicationMailer
  default from: "contact@gmail.com"

  def referral_email(recipient_email)
    @recipient_email = recipient_email
    mail(to: @recipient_email, subject: 'You have been invited to join our platform!')
  end
end
