require 'rails_helper'

RSpec.describe Api::V1::Users::ReferralsController, type: :controller do
  include Devise::Test::ControllerHelpers

  let(:user) { create(:user) }

  before do
    sign_in user
  end

  describe 'POST #create' do
    context 'when a valid email is provided' do
      it 'sends a referral email and returns a success message' do
        recipient_email = 'test@example.com'

        allow(ReferralMailer).to receive(:referral_email).with(recipient_email).and_return(double(deliver_now: true))

        post :create, params: { recipient_email: recipient_email }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['message']).to eq('Referral email sent successfully')
        expect(ReferralMailer).to have_received(:referral_email).with(recipient_email)
      end
    end

    context 'when an invalid email is provided' do
      it 'returns an error message' do
        post :create, params: { recipient_email: '' }

        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)['error']).to eq('Invalid email')
      end
    end
  end
end
