class StudentCourse < ApplicationRecord
  #join table between students and courses
  belongs_to :student
  belongs_to :course
end
