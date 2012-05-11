require 'test_helper'

class SlotsControllerTest < ActionController::TestCase
  def test_index
    get :index
    assert_template 'index'
  end

  def test_show
    get :show, :id => Slot.first
    assert_template 'show'
  end

  def test_new
    get :new
    assert_template 'new'
  end

  def test_create_invalid
    Slot.any_instance.stubs(:valid?).returns(false)
    post :create
    assert_template 'new'
  end

  def test_create_valid
    Slot.any_instance.stubs(:valid?).returns(true)
    post :create
    assert_redirected_to slot_url(assigns(:slot))
  end

  def test_edit
    get :edit, :id => Slot.first
    assert_template 'edit'
  end

  def test_update_invalid
    Slot.any_instance.stubs(:valid?).returns(false)
    put :update, :id => Slot.first
    assert_template 'edit'
  end

  def test_update_valid
    Slot.any_instance.stubs(:valid?).returns(true)
    put :update, :id => Slot.first
    assert_redirected_to slot_url(assigns(:slot))
  end

  def test_destroy
    slot = Slot.first
    delete :destroy, :id => slot
    assert_redirected_to slots_url
    assert !Slot.exists?(slot.id)
  end
end
