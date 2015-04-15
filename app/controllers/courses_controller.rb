class CoursesController < ApplicationController

	respond_to :json

	def index
		@courses = current_user.courses
		render json: @courses
	end

	def show
		@course = Course.find(params[:id])
		render json: @course
	end

	def new
		@course = Course.new
	end

	def create
		@course = Course.new(course_params)
		@course.user = current_user
		p "*" * 100
		p params
		if @course.save
			redirect_to root_path
		end
	end

	def edit
		@course = Course.find(params[:id])
	end

	def update
		course = Course.find(params[:id])
    if(course.update_attributes(course_params))
			render json: course, status: :ok
    end
	end

	def destroy
		course = Course.find(params[:id])
    if(course.destroy)
			render json: course, status: :ok
    end
	end

	private

	def course_params
		params.require(:course).permit(:title, :description, :category)
	end

end
