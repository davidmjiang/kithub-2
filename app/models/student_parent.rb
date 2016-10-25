class StudentParent < ApplicationRecord
	#join table between parent and student
  belongs_to :parent
  belongs_to :student
end
