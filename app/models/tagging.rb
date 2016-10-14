class Tagging < ApplicationRecord

  #join table between lesson plans and tags
  belongs_to :lesson_plan
  belongs_to :tag
end
