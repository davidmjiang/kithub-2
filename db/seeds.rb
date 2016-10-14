puts 'wiping database'
Teacher.destroy_all
Course.destroy_all
Assignment.destroy_all
Student.destroy_all
Submission.destroy_all
Student.destroy_all
LessonPlan.destroy_all
Standard.destroy_all
Submission.destroy_all
StudentCourse.destroy_all

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
    c = t.courses.create(title: Faker::Educator.course)
    5.times do
      c.assignments.create(title: Faker::Space.star,
                           possible_score: rand(10..100))
    end
  end

  puts 'creating lesson plans'
  t.lesson_plans.create(title: Faker::Space.nasa_space_craft,
                        content: Faker::Lorem.sentence,
                        hours: rand(1..10),
                        version: 1,
                        state: Faker::Address.state,
                        grade: rand(1..12),
                        subject: subjects.sample,
                        lesson_type: Faker::Company.buzzword
                        )

end

puts 'creating students'
200.times do |i|
  s = Student.create(first_name: Faker::Name.first_name,
                     last_name: Faker::Name.last_name,
                     email: Faker::Internet.safe_email)
  randCourse = Course.all.sample
  s.student_courses.create(course_id: randCourse.id)
  randAssignment = Assignment.where(course_id: randCourse.id).sample
  s.submissions.create(assignment_id: randAssignment.id,
                      raw_score: rand(0..randAssignment.possible_score ))
end


puts 'creating standards'

4.times do
  Standard.create(title: Faker::Hipster.word,
                  state: Faker::Address.state,
                  subject: subjects.sample)
end
