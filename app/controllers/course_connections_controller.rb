class CourseConnectionsController < ApplicationController
  respond_to :json

  def index
    course = Course.find(params[:course_id])
    @students = course.students
    respond_to do |format|
      format.json
    end
  end

  def create
    @course_connection = CourseConnection.create!(course_connection_params)
    respond_to do |format|
      format.json
    end
  end

  def destroy
    course_conn = CourseConnection.find_by_course_id_and_student_id(params[:course_id], params[:student_id])
    if(course_conn.destroy)
			render json: course_conn, status: :ok
    end
  end

  private

	def course_connection_params
		params.require(:course_connection).permit(:student_id, :course_id)
	end
end
