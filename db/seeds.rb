
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
Tagging.destroy_all
TeacherFollowing.destroy_all
LessonPlanContributor.destroy_all
LessonPlanStar.destroy_all
PullRequest.destroy_all
LessonPlanStandard.destroy_all

teachers = ['mike@gmail.com', 'matt@gmail.com', 'graham@gmail.com', 'david@gmail.com', 'hannah@gmail.com', 'alex@gmail.com', 'dylan@gmail.com', 'leo@gmail.com', 'phil@gmail.com']
assignment_type = ['test', 'quiz', 'homework', 'project']
subjects = ['Geometry', 'Home Economics', 'English', 'Spanish', 'Physics', 'Chemistry', 'Trigonometry', 'Art', 'Computer Science']


puts 'creating tags'
5.times do
  Tag.create(name: Faker::Music.instrument)
end

puts 'creating teachers'
teachers.each do |person|
t = Teacher.create(email: person,
                   password: 'password123',
                   first_name: Faker::Name.first_name,
                   last_name: Faker::Name.last_name,
                   state: Faker::Address.state)
  2.times do
    c = t.courses.create(title: Faker::Educator.course)
    15.times do
      assignment = c.assignments.create(title: Faker::Space.star,
                           assignment_type: assignment_type.sample,
                           possible_score: rand(10..100))
    end
    15.times do |i|
      s = Student.create(first_name: Faker::Name.first_name,
                         last_name: Faker::Name.last_name,
                         email: Faker::Internet.safe_email)
      s.courses << c;
      c.assignments.each do |assignment| 
        s.submissions.create(assignment_id: assignment.id,
                            raw_score: rand(0..assignment.possible_score))
      end
    end
  end

  15.times do
    l = t.lesson_plans.create(title: Faker::Space.nasa_space_craft,
                          content: Faker::Lorem.sentence,
                          hours: rand(1..10),
                          version: 1,
                          state: STATES.sample,
                          grade: GRADES.sample,
                          subject: SUBJECTS.sample,
                          lesson_type: LESSON_TYPES.sample
                          )
    l.taggings(tag_id: Tag.all.sample.id )
  end
end

puts 'creating follows'
15.times do
  t1 = Teacher.all.sample
  t2 = Teacher.all.sample
  while (t2 === t1 || t1.following.include?(t2))
    t2 = Teacher.all.sample
  end
  puts "#{t1.first_name} following #{t2.first_name}"
  t1.following << t2
end

puts 'creating stars'
10.times do
  l = LessonPlan.all.sample
  t = Teacher.all.sample
  while ( l.teachers_who_starred.include?(t) )
    t = Teacher.all.sample
  end
  l.lesson_plan_stars.create(teacher_id: t.id)
end

puts 'creating contributor'
10.times do
  l = LessonPlan.all.sample
  t = Teacher.all.sample
  while ( l.contributors.include?(t) )
    t = Teacher.all.sample
  end
  l.lesson_plan_contributors.create(teacher_id: t.id)
end

# pull request
puts 'creating pull requests'
5.times do
  l = LessonPlan.all.sample
  l2 = LessonPlan.all.sample
  pr = PullRequest.create(title: Faker::Hipster.word, parent_plan_id: l.id, forked_plan_id: l2.id)
  t = Teacher.all.sample
  pr.comments.create(body: Faker::Company.catch_phrase, teacher_id: t.id)
end


puts 'creating standards'

4.times do
  st = Standard.create(title: Faker::Hipster.word,
                  state: STATES.sample,
                  subject: SUBJECTS.sample)
  4.times do
    l = LessonPlan.all.sample
    while (st.lesson_plans.include?(l))
      l = LessonPlan.all.sample
    end
    l.standards << st
  end
end






puts 'creating sample gradebook'

class Gradebook 

  MAX_CLASS_SIZE = 28
  NUM_STUDENTS = 40
  @@assignment_type = ['test', 'quiz', 'homework', 'project']


  def fake_gradebook_data 
    create_teacher
    create_teacher_courses
    create_students
    assign_students_to_courses
    create_assignments_for_courses
    create_submissions_for_assignments
  end


  private 

  def create_teacher
    @teacher = Teacher.create(email: "matthew.hinea@gmail.com",
                          password: "password",
                          first_name: "Matthew", 
                          last_name: "Hinea", 
                          state: "Washington", 
                          )
  end

  def create_teacher_courses
    @algebra = @teacher.courses.create(title: "Algebra")
    @history = @teacher.courses.create(title: "American History")
    @biology = @teacher.courses.create(title: "Biology")
    @flight_simulator = @teacher.courses.create(title: "Flight Simulator")
    @gym = @teacher.courses.create(title: "Gym")
    @all_courses = [@algebra, @history, @biology, @flight_simulator, @gym]
  end

  def create_students
    @students = []
    NUM_STUDENTS.times do |i|
      student = Student.create(first_name: Faker::Name.first_name,
                     last_name: Faker::Name.last_name,
                     email: Faker::Internet.safe_email)    
      @students.push(student)
    end
  end

  def assign_students_to_courses
    @all_courses.each do |course|
      course.students = @students.dup.shuffle[0..rand(18..MAX_CLASS_SIZE)]
    end
  end

  def create_assignments_for_courses
    @all_courses.each do |course|
      num_assignments = rand(8..16)
      num_assignments.times do |idx|
        type = @@assignment_type.sample
        assignment = course.assignments.create(title: "Assignment #{idx}: #{type}",
                           assignment_type: type,
                           possible_score: rand(40..100))
      end
    end
  end

  def create_submissions_for_assignments
    @all_courses.each do |course|
      course.assignments.each do |assignment|
        course.students.each do |student|
          # if rand(0..100) < 90  
            student.submissions.create(assignment_id: assignment.id,
                      raw_score: rand(0..assignment.possible_score ))
          # end
        end
      end
    end
  end

end

Gradebook.new.fake_gradebook_data
