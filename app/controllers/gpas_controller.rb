class GpasController < ApplicationController
  def index
    @gpas = get_teacher_gpas
    respond_to do |format|
      format.json { render json: @gpas, status: 200 }
    end  
  end


  private 

  def get_teacher_gpas
    @courses = current_teacher.courses
    @courses.each do |course|
      course.students.each do |student|
        submissions = student.submissions.where("assignment_id IN (#{course_assignment_ids(course)})")
        raw_score_sum(submissions)
      end
    end
  end

  def course_assignment_ids(course)
    course.assignments.map{|assignment|assignment.id}.join(", ")
  end

  def raw_score_sum(submissions)
    total = 0
    submissions.each do |submission|
      total += submission.raw_score
    end
  end

end
