class AdditionalMaterial < ApplicationRecord
	belongs_to :lesson_plan
	has_attached_file :material
	validates_attachment_file_name :material, :matches => [/png\Z/, /jpe?g\Z/, /gif\Z/, /pdf\Z/, /doc\Z/, /xls\Z/]
end
