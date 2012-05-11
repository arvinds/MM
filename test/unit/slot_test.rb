require 'test_helper'

class SlotTest < ActiveSupport::TestCase
  def test_should_be_valid
    assert Slot.new.valid?
  end
end
