require 'test_helper'

class OffersControllerTest < ActionController::TestCase
  def test_index
    get :index
    assert_template 'index'
  end

  def test_show
    get :show, :id => Offer.first
    assert_template 'show'
  end

  def test_new
    get :new
    assert_template 'new'
  end

  def test_create_invalid
    Offer.any_instance.stubs(:valid?).returns(false)
    post :create
    assert_template 'new'
  end

  def test_create_valid
    Offer.any_instance.stubs(:valid?).returns(true)
    post :create
    assert_redirected_to offer_url(assigns(:offer))
  end

  def test_edit
    get :edit, :id => Offer.first
    assert_template 'edit'
  end

  def test_update_invalid
    Offer.any_instance.stubs(:valid?).returns(false)
    put :update, :id => Offer.first
    assert_template 'edit'
  end

  def test_update_valid
    Offer.any_instance.stubs(:valid?).returns(true)
    put :update, :id => Offer.first
    assert_redirected_to offer_url(assigns(:offer))
  end

  def test_destroy
    offer = Offer.first
    delete :destroy, :id => offer
    assert_redirected_to offers_url
    assert !Offer.exists?(offer.id)
  end
end
