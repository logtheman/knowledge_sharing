class AddViewsToQuestions < ActiveRecord::Migration[5.0]
  def change
  	add_column :questions, :views_count, :integer, default: 0

  end
end
