class Parent < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :students, through: :student_parents
  has_many :student_parents
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
