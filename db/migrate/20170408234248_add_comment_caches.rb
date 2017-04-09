class AddCommentCaches < ActiveRecord::Migration[5.0]
  def change
  	add_column :questions, :comments_count, :integer, default: 0
  	add_column :answers, :comments_count, :integer, default: 0
  end
end
