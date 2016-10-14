class Student < ApplicationRecord

  #many to many relationship for courses
  has_many :student_courses
  has_many :courses, through: :student_courses

  #many to many relationship for assignments
  has_many :submissions
  has_many :assignments, through: :submissions

end
