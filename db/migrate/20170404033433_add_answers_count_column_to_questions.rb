class AddAnswersCountColumnToQuestions < ActiveRecord::Migration[5.0]
  def change
  	add_column :questions, :answers_count, :integer, default: 0
  end
end
