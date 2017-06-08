class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

   def configure_permitted_parameters
     devise_parameter_sanitizer.permit(:login, keys: [:username, :email, :password, :remember_me])
     devise_parameter_sanitizer.permit(:sign_up) do |u|
       u.permit(:name, :username, :first_name, :last_name,
         :email, :password, :password_confirmation)
      end
      devise_parameter_sanitizer.permit(:edit) do |u|
        u.permit(:name, :username, :first_name, :last_name,
          :email, :password, :password_confirmation)
     end
   end


end
