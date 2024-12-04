require 'rails_helper'

RSpec.describe 'User Registrations', type: :request do
  let(:valid_params) do
    {
      user: {
        email: 'test@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }
    }
  end

  describe 'POST /api/v1/users' do
    context 'when the parameters are valid' do
      it 'creates a new user and returns a success message' do
        expect do
          post '/api/v1/users', params: valid_params
        end.to change(User, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)['message']).to eq('Signed up successfully')
        expect(JSON.parse(response.body)['user']['email']).to eq('test@example.com')
      end
    end
  end
end
