class Assignment < ApplicationRecord

  validates :title, presence: true

  belongs_to :course

  #many to many relationship for students through submissions
  has_many :submissions, dependent: :destroy
  has_many :students, through: :submissions

end