class CreateAddNotesToStudentModels < ActiveRecord::Migration[5.0]
  def change
    create_table :add_notes_to_student_models do |t|
      add_column :students, :notes, :text
      t.timestamps
    end
  end
end
