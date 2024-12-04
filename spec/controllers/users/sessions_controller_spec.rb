require 'rails_helper'

RSpec.describe 'User Sessions', type: :request do
  let!(:user) { create(:user, email: 'test@example.com', password: 'password123') }

  describe 'POST /api/v1/users/sign_in' do
    context 'when the email and password are correct' do
      it 'signs in the user and returns a user object' do
        post '/api/v1/users/sign_in', params: { user: { email: 'test@example.com', password: 'password123' } }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['user']['email']).to eq('test@example.com')
      end
    end

    context 'when the email or password is incorrect' do
      it 'does not sign in the user and returns an error message' do
        post '/api/v1/users/sign_in', params: { user: { email: 'test@example.com', password: 'wrongpassword' } }

        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)['message']).to eq('Invalid email or password')
      end
    end
  end
end
