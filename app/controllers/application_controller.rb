class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

   def configure_permitted_parameters
     devise_parameter_sanitizer.permit(:login, keys: [:username, :email, :password, :remember_me])
     devise_parameter_sanitizer.permit(:sign_up) do |u|
       u.permit(:name, :username, :first_name, :last_name,
         :email, :password, :password_confirmation)
      devise_parameter_sanitizer.permit(:edit) do |u|
        u.permit(:name, :username, :first_name, :last_name,
          :email, :password, :password_confirmation)
     end
   end


end
