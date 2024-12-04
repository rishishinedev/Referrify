class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  before_create :generate_referral_code

  def generate_referral_code
    self.referral_code = SecureRandom.hex(10)
  end
end
