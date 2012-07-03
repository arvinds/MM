require 'json'
require 'mechanize'
require 'digest'

class UserSessionsController < ApplicationController
  helper :all
  before_filter :require_no_user, :only => [:new, :create]
  before_filter :require_user, :only => :destroy
  
  def new
    @user_session = UserSession.new
  end
  
  def create
    @user_session = UserSession.new(params[:user_session])
    # uses a block to prevent double render error...
    # because oauth and openid use redirects
    @user_session.save do |result|
      if result
        #flash[:notice] = "Login successful!"
        redirect_to current_user ? profile_url(current_user) : login_url
      else
        if @user_session.errors.on(:user)
          # if we set error on the base object, likely it's because we didn't find a user
          render :action => :confirm
        else
          render :action => :new
        end
      end
    end
  end

  def fb
    app_id = "394401523931734"
    app_secret = "af45369fa25fd1684832427b971787a8"
    callback_url = "http://localhost:3000/fb"


    code = params[:code] 
    error = params[:error] 

    if error
      redirect_to root_path
    elsif code.nil? || code.empty? #init code request
      redirect_to "https://www.facebook.com/dialog/oauth?client_id=#{app_id}&redirect_uri=#{callback_url}&scope=email"
    else #token request
      code = CGI::escape code
      uri = "https://graph.facebook.com/oauth/access_token?"+
      "client_id=#{app_id}&redirect_uri=#{callback_url}&"+
      "client_secret=#{app_secret}&code=#{code}"

      agent = Mechanize.new
      agent.agent.http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      token_data = agent.get(uri).body
      token_part,expire_part = token_data.match(/(.+)&(.+)/).captures
      token = token_part.match(/.+=(.+)/)[1]
      access_token = "?access_token=" + CGI::escape(token)
    
      get_user_uri = "https://graph.facebook.com/me" + access_token
      user_data_txt = agent.get(get_user_uri).body
      user_data = JSON.parse(user_data_txt)
      puts user_data.inspect
      fname = user_data["first_name"]
      lname = user_data["last_name"]
      email = user_data["email"]
      fbid = user_data["id"]
      user = User.find_by_email(email)
       
      success = false
      if user.nil? # if user is new
        new_id = User.create_user(fbid,fname,lname,email)
        redirect_to url_for(:controller =>:users, :action => :edit, :id=>new_id)
      else # create session for user
        session = UserSession.create(user,true)  
        #flash[:notice] = "Login successful!"
        if user.id.blank?
          redirect_to url_for(:controller =>:users, :action => :edit, :id=>user.id)
        else
          redirect_to root_path
        end
      end
    end
  end

  
  def destroy
    current_user_session.destroy
    flash[:notice] = "Logout successful!"
    redirect_to root_path
  end
end

