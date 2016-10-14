class Assignment < ApplicationRecord

  belongs_to :course

  #many to many relationship for students through submissions
  has_many :submissions
  has_many :students

end
