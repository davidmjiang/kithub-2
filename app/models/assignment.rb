class Assignment < ApplicationRecord

  validates :title, presence: true

  belongs_to :course

  #many to many relationship for students through submissions
  has_many :submissions, dependent: :destroy
  has_many :students, through: :submissions

  has_one :flat_curve
  # has_one :linear_curve


  def has_curve
    return true if self.flat_curve # || self.linear_curve
  end

end
