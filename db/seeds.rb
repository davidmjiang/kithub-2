
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

teachers = ['graham@gmail.com', 'mike@gmail.com', 'matt@gmail.com', 'david@gmail.com', 'hannah@gmail.com', 'alex@gmail.com', 'dylan@gmail.com', 'leo@gmail.com', 'phil@gmail.com']
assignment_type = ['Test', 'Quiz', 'Homework', 'Project', 'Essay']
subjects = ['Geometry', 'Home Economics', 'English', 'Spanish', 'Physics', 'Chemistry', 'Trigonometry', 'Art', 'Computer Science']

assignments = [
  {title: 'Homework #1', type: 'Homework', score: 20},
  {title: 'Pop Quiz', type: 'Quiz', score: 50},
  {title: 'Homework #2', type: 'Homework', score: 20},
  {title: 'Quiz #1', type: 'Quiz', score: 50},
  {title: 'Homework #3', type: 'Homework', score: 20},
  {title: 'Midterm Paper', type: 'Essay', score: 100},
  {title: 'Midterm Exam', type: 'Test', score: 100},
  {title: 'Homework #4', type: 'Homework', score: 20},
  {title: 'Quiz #2', type: 'Quiz', score: 50},
  {title: 'Homework #5', type: 'Homework', score: 20},
  {title: 'Class Project', type: 'Project', score: 100},
  {title: 'Final Exam', type: 'Test', score: 100}
]

lesson_plans = [
  {title: "Addition and Subtraction of Decimals", subject: 'Math', grade: "6"},
  {title: "Fractions", subject: 'Math', grade: "5"},
  {title: "Multiplying and Dividing Decimals", subject: 'Math', grade: "6"},
  {title: "Introduction to Decimals", subject: 'Math', grade: "7"},
  {title: "Graphs of Linear Equations", subject: 'Math', grade: "7"},
  {title: "Biology Quiz", subject: 'Science', grade: "8"},
  {title: "Molecular Biology", subject: 'Science', grade: "11"},
  {title: "Human Biology", subject: 'Science', grade: "11"},
  {title: "Biology Crosswords", subject: 'Science', grade: "9"},
  {title: "Present and Past Tense", subject: 'English', grade: "5"},
  {title: "Introducing Shakespeare", subject: 'English', grade: "6"},
  {title: "Shakespeare's World", subject: 'English', grade: "8"},
  {title: "Shakespeare Quiz", subject: 'English', grade: "8"},
  {title: "French", subject: 'Foreign Language', grade: "6"},
  {title: "Beginning French", subject: 'Foreign Language', grade: "6"},
  {title: "French Quiz", subject: 'Foreign Language', grade: "8"},
  {title: "The French Revolution", subject: 'History', grade: "8"},
  {title: "The Civil War", subject: 'History', grade: "8"},
  {title: "Road to the Civil War", subject: 'History', grade: "8"},
  {title: "Civil War Battles", subject: 'History', grade: "8"},
  {title: "African Art", subject: 'Art', grade: "5"}
]

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
    c.identifier = SecureRandom.hex(4) + c.id.to_s
    12.times do |i|
      assignment = c.assignments.create(title: assignments[i][:title],
                           assignment_type: assignments[i][:type],
                           possible_score: assignments[i][:score])
    end
    15.times do |i|
      first = Faker::Name.first_name
      last = Faker::Name.last_name
      s = Student.create(first_name: first,
                         last_name: last,
                         email: "#{first[0].downcase}#{last.downcase}@gmail.com")
      s.courses << c;
      c.assignments.each do |assignment| 
        mean = rand(50..100)
        deviation = 101 - mean
        norm = Rubystats::NormalDistribution.new(mean, deviation)
        raw_percent = norm.rng
        raw_percent = 100 if raw_percent > 100
        raw_percent = 0 if raw_percent < 0
        raw_score = (raw_percent/100 * assignment.possible_score).floor
        if assignment.title == "Pop Quiz" then
          s.submissions.create(assignment_id: assignment.id,
                            raw_score: (raw_score/2))
        else
          s.submissions.create(assignment_id: assignment.id,
                            raw_score: raw_score)
        end
      end
    end
  end

  lesson_plans.each do |lp|
    l = t.lesson_plans.create!(title: lp[:title],
                          content: Faker::Lorem.sentence,
                          hours: rand(1..10),
                          version: 1,
                          state: t.state,
                          grade: lp[:grade],
                          subject: lp[:subject],
                          lesson_type: LESSON_TYPES.sample
                          )
    l.taggings(tag_id: Tag.all.sample.id )
  end

1.times do
  t = Teacher.find_by(email: "dylan@gmail.com")
  c = t.courses.create(title: Faker::Educator.course)
  c.identifier = SecureRandom.hex(4) + c.id.to_s
  5.times do |i|
    assignment = c.assignments.create(title: assignments[i][:title],
                         assignment_type: assignments[i][:type],
                         possible_score: assignments[i][:score])
  end
  10.times do |i|
    first = Faker::Name.first_name
    last = Faker::Name.last_name
    s = Student.create(first_name: first,
                       last_name: last,
                       email: "#{first[0].downcase}#{last.downcase}@gmail.com")
    s.courses << c;
    c.assignments.each do |assignment| 
      mean = rand(50..100)
      deviation = 101 - mean
      norm = Rubystats::NormalDistribution.new(mean, deviation)
      raw_percent = norm.rng
      raw_percent = 100 if raw_percent > 100
      raw_percent = 0 if raw_percent < 0
      raw_score = (raw_percent/100 * assignment.possible_score).floor
      if assignment.title == "Pop Quiz" then
        s.submissions.create(assignment_id: assignment.id,
                          raw_score: (raw_score/2))
      else
        s.submissions.create(assignment_id: assignment.id,
                          raw_score: raw_score)
      end
    end
  end
end

productive_teacher = Teacher.first
#creating fake dates
t.lesson_plans.each_with_index do |item, index|
  if index < 4
    item.created_at = rand(20..30).days.ago
  elsif index < 7
    item.created_at = rand(10..20).days.ago
  elsif index < 9
    item.created_at = rand(0..5).days.ago
  else
    item.created_at = rand(5..10).days.ago
  end
  item.save
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
15.times do
  l = LessonPlan.all.sample
  puts l
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
15.times do
  l = LessonPlan.all.sample
  l2 = LessonPlan.all.sample
  pr = PullRequest.create(title: Faker::Hipster.word, parent_plan_id: l.id, forked_plan_id: l2.id, status: "accepted")
  #creating fake dates
  pr.created_at = (rand*30).days.ago
  pr.save
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
    assign_students_to_courses
    create_assignments_for_courses
    create_submissions_for_assignments
    distribute_assignment_dates
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

  def assign_students_to_courses
    @students = []
    @all_courses.each do |course|
      NUM_STUDENTS.times do |i|
        student = course.students.create(first_name: Faker::Name.first_name,
                       last_name: Faker::Name.last_name,
                       email: Faker::Internet.safe_email)    
        @students.push(student)
      end
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

  # scores follow a gaussian (normal) distribution with a mean of 78
  def create_submissions_for_assignments
    @all_courses.each do |course|
      course.assignments.each do |assignment|
        mean = rand(50..100)
        deviation = 101 - mean
        course.students.each do |student|
          norm = Rubystats::NormalDistribution.new(mean, deviation)
          raw_percent = norm.rng
          raw_percent = 100 if raw_percent > 100
          raw_percent = 0 if raw_percent < 0
          raw_score = (raw_percent/100 * assignment.possible_score).floor
          student.submissions.create(assignment_id: assignment.id,
                      raw_score: raw_score)
        end
      end
    end
  end

  def distribute_assignment_dates
    @all_courses.each do |course|
      course.assignments.each_with_index do |assignment, index|
        new_date = Date.today - (180 * index/course.assignments.length).days
        assignment.created_at = new_date
        assignment.save
      end
    end
  end

end


Gradebook.new.fake_gradebook_data




