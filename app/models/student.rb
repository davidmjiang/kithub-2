class Student < ApplicationRecord

  # validates :email, presence: true, uniqueness: true

  #many to many relationship for courses
  has_many :student_courses, dependent: :destroy
  has_many :courses, through: :student_courses

  #many to many relationship for assignments
  has_many :submissions, dependent: :destroy
  has_many :assignments, through: :submissions

  def course_submissions(course)
    self.submissions.where("assignment_id IN (#{course.assignment_ids})")
  end

end
