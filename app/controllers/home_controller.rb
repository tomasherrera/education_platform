class HomeController < ApplicationController
  layout false, only: [:profile, :index]

  def welcome
  end

  def index
    @courses = current_user.courses.order(:title) if user_signed_in?
    @assisted_courses = current_user.assisted_courses if user_signed_in?
    respond_to do |format|
      format.html # index.html.haml
      format.json
    end
  end

  def profile
    @profile = current_user
  end

  def get_students
    @students = User.where.not(id: current_user.id)
  end
end
