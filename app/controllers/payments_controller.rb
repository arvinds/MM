class PaymentsController < ApplicationController
    include ActiveMerchant::Billing

    def checkout
    #TODO: Use value from @local_gateway["amount"]
    @local_gateway = { "ride_uid" => params[:ride_uid], "amount" => 5000 }
    setup_response = gateway.setup_purchase(5000,
      :ip                => request.remote_ip,
      :return_url        => url_for(:action => 'confirm', :only_path => false),
      :cancel_return_url => url_for(:action => 'index', :only_path => false)
    )
    redirect_to gateway.redirect_url_for(setup_response.token)
    end

    def index
    end

    def confirm
    redirect_to :action => 'index' unless params[:token]
  
    details_response = gateway.details_for(params[:token])
  
    if !details_response.success?
        @message = details_response.message
        render :action => 'error'
        return
    end
    
    @address = details_response.address
    end

    def complete
    #TODO: Use value from @local_gateway["amount"]
    purchase = gateway.purchase(5000,
        :ip       => request.remote_ip,
        :payer_id => params[:payer_id],
        :token    => params[:token]
    )
  
    if !purchase.success?
        @message = purchase.message
        render :action => 'error'
        return
    end
    end

    private
    def gateway
    @gateway ||= PaypalExpressGateway.new(
        :login => "00001_1339354449_biz_api1.gmail.com",
        :password => "1339354474",
        :signature => "AQU0e5vuZCvSg-XJploSa.sGUDlpAyVvJg5TwOT.LeaIFwxeO8Bqbvzy"
    )
    end


#  def confirm
#  end

#  def complete
#  end
end
