puts 'wiping database'
Teacher.destroy_all
Course.destroy_all
Assignment.destroy_all
Student.destroy_all
Submission.destroy_all



teachers = ['mike@gmail.com', 'matt@gmail.com', 'graham@gmail.com', 'david@gmail.com', 'hannah@gmail.com', 'alex@gmail.com', 'dylan@gmail.com', 'leo@gmail.com', 'phil@gmail.com']
assignment_type = ['test', 'quiz', 'homework', 'project']

puts 'creating teachers'
teachers.each do |person|

t = Teacher.create(email: person,
                   password: 'password123',
                   first_name: Faker::Name.first_name,
                   last_name: Faker::Name.last_name)

c = t.courses.create(name: Faker::Educator.course)
  5.times do
    c.assignments.create(title: Faker::Space.star,
                         type: assignment_type.sample,
                         total_points: rand(10..100))
  end
end
