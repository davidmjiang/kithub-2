class Course < ApplicationRecord

  validates :title, presence: true

  belongs_to :teacher

  #one to many relationship for assignments
  has_many :assignments, dependent: :destroy

  #many to many relationship for students
  has_many :student_courses, dependent: :destroy
  has_many :students, through: :student_courses




  def points_possible
    points = 0
    self.assignments.each do |assignment|
      points += assignment.possible_score
    end
    points
  end

end
