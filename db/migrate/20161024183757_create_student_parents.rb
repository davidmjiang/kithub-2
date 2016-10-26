class CreateStudentParents < ActiveRecord::Migration[5.0]
  def change
    create_table :student_parents do |t|
      t.references :parent, foreign_key: true
      t.references :student, foreign_key: true

      t.timestamps
    end
  end
end
