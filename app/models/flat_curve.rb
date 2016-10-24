class FlatCurve < ApplicationRecord

  belongs_to :assignment

  validates :flat_rate, :numericality => { :greater_than => 0, :less_than_or_equal_to => 100 }, presence: true

end
