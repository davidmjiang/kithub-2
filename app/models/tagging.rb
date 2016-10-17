class Tagging < ApplicationRecord

  validates :lesson_plan_id, presence: true
  validates :tag_id, presence: true

  #join table between lesson plans and tags
  belongs_to :lesson_plan
  belongs_to :tag
end
