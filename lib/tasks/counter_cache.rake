desc 'Counter cache for question has many answers'

task counter_reset: :environment do
	Question.reset_column_information
	Question.find_each do |p|
		Question.reset_counters p.id, :answers
		Question.reset_counters p.id, :comments
	end
end

