class ChangeSubmissionScoresToFloats < ActiveRecord::Migration[5.0]

  def up
    change_table :submissions do |t|
      t.change :raw_score, :float
      t.change :real_score, :float
    end
  end

  def down
    change_table :submissions do |t|
      t.change :raw_score, :integer
      t.change :real_score, :integer
    end
  end

end
