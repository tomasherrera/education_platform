class CourseConnectionsController < ApplicationController
  respond_to :json

  def index
    course = Course.find(params[:course_id])
    @students = course.students
    respond_to do |format|
      format.json
    end
  end
end
