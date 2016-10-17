class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
  belongs_to :teacher
  validates :body, presence: true,
            length: { maximum: 500 }
end
