require 'test_helper'

class OfferTest < ActiveSupport::TestCase
  def test_should_be_valid
    assert Offer.new.valid?
  end
end
