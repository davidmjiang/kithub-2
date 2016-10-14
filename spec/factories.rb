FactoryGirl.define do

  factory :teacher do

    sequence(:email) do |n|
      "abcde#{n}@abcd.com"
    end

    password "asdfasdf"
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

end