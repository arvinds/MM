=begin
  def fb_new
    app_id = "394401523931734"
    app_secret = "af45369fa25fd1684832427b971787a8"
    callback_url = "http://saucers.cups.cs.cmu.edu:3000/fb"


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
      guid = nil
       
      success = false
      if user.nil? # if user is new
        new_id = User.create_user(guid,fname,lname,email,fbid)
        redirect_to url_for(:controller =>:users, :action => :edit, :id=>new_id)
      else # create session for user
        session = UserSession.create(user,true)  
        flash[:notice] = "Login successful!"
        if user.guid.blank?
          redirect_to url_for(:controller =>:users, :action => :edit, :id=>user.id)
        else
          redirect_to root_path
        end
      end
    end
  end
=end

class UsersController < ApplicationController
  before_filter :require_no_user, :only => [:new, :create]
  before_filter :require_user, :only => [:show, :edit, :update]
  before_filter :admin_only, :only => :detonate
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    # block! see user_sessions_controller.rb for description
    @user.save do |result|
      if result
        flash[:notice] = "Account registered!"
        redirect_back_or_default profile_url(@user)
      else
        redirect_to login_url
      end
    end
  end

  def show
   # puts "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
    puts "SESSION: #{session.inspect}"
   # puts @current_user.access_tokens.inspect
    @user = @current_user
    #@profile = @user.profile
  end

  def edit
    @user = @current_user
  end

  def update
    @user = @current_user 
    if @user.update_attributes(params[:user])
      flash[:notice] = "Account updated!"
      redirect_to user_path @user
    else
      flash[:notice] = "There was an error updating your profile!"
      render :action => :edit
    end
  end

end  

