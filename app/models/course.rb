class Course < ApplicationRecord

  belongs_to :teacher

  #one to many relationship for assignments
  has_many :assignments

  #many to many relationship for students
  has_many :student_courses
  has_many :students, through: :student_courses

end
