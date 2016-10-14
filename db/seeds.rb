puts 'wiping database'
Teacher.destroy_all
Course.destroy_all
Assignment.destroy_all
Student.destroy_all
Submission.destroy_all
Student.destroy_all



teachers = ['mike@gmail.com', 'matt@gmail.com', 'graham@gmail.com', 'david@gmail.com', 'hannah@gmail.com', 'alex@gmail.com', 'dylan@gmail.com', 'leo@gmail.com', 'phil@gmail.com']
assignment_type = ['test', 'quiz', 'homework', 'project']
subjects = ['Geometry', 'Home Economics', 'English', 'Spanish', 'Physics', 'Chemistry', 'Trigonometry', 'Art', 'Computer Science']


puts 'creating teachers'
teachers.each do |person|

t = Teacher.create(email: person,
                   password: 'password123',
                   first_name: Faker::Name.first_name,
                   last_name: Faker::Name.last_name)
  2.times do
    c = t.courses.create(name: Faker::Educator.course)
    5.times do
      c.assignments.create(title: Faker::Space.star,
                           type: assignment_type.sample,
                           total_points: rand(10..100))
    end
  end
end

puts 'creating students'
40.times do |i|
  s = Student.create(first_name: Faker::Name.first_name,
                     last_name: Faker::Name.last_name,
                     email: Faker::Internet.safe_email( '#{i}' ))
  randCourse = Course.all.sample
  randAssignment = Assignment.where(course_id: randCourse.id).sample
  s.Submission.create(assignment_id: randAssignment.id,
                      raw_score: rand(0..randAssignment.total_points ))
end


puts 'creating standards'

4.times do
  Standard.create(title: Faker::Hipster.word,
                  state: Faker::Address.state,
                  subject: subjects.sample)
end
