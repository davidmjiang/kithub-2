class GpasController < ApplicationController
  def index
    @gpas = get_teacher_gpas
    respond_to do |format|
      format.json { render json: @gpas, status: 200 }
    end  
  end


  private 

  def get_teacher_gpas
    # iterate through each course's students
    # for each student, calculate sum of their submissions to assignments whose course is that course
    # divide that by total number of points possible in that course to get that students GPA
    # add that GPA to array of GPAs for that course
    # get average value of that array to get average GPA in course
    # add that as the value on an object with that course's name as the key

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
