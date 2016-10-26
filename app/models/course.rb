require 'securerandom'

class Course < ApplicationRecord
  before_save :create_identifier

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

  def assignment_ids
    self.assignments.map{|assignment|assignment.id}.join(", ")
  end

  def create_identifier
    self.identifier = SecureRandom.hex(4) + self.id.to_s
  end

end
