FactoryGirl.define do

  factory :teacher do

    sequence(:email) do |n|
      "abcde#{n}@abcd.com"
    end

    password "password"
    first_name "adrian"
    last_name "mui"

  end

  factory :course do
    title "History of the Dark Arts"
    teacher

    trait :without_title do
      title nil
    end
  end

  factory :assignment do
    title "Dark Arts Final"
    assignment_type "Test"
    possible_score 100
    course

    trait :without_title do
      title nil
    end
  end

  factory :student do
    sequence(:email) do |n|
      "xyz#{n}@abcd.com"
    end

    first_name "adrian"
    last_name "mui"

    trait :without_email do
      email nil
    end
  end

  factory :submission do
    student
    assignment
  end

end