class Submission < ApplicationRecord

  #join table between assignments and students
  belongs_to :assignment
  belongs_to :student

end
