class Tag < ApplicationRecord

  validates :name, presence: true

  #many to many relationship with lesson plans
  has_many :taggings
  has_many :lesson_plans, through: :taggings
end
