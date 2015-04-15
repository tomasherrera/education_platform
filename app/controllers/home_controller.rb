class HomeController < ApplicationController
  def index
    @courses = current_user.courses.order(:title) if user_signed_in?
    @assisted_courses = current_user.assisted_courses if user_signed_in?
    respond_to do |format|
      format.html # index.html.haml
      format.json
    end
  end
end
