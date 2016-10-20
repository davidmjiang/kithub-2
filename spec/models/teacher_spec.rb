require 'rails_helper'

describe Teacher do

  let (:teacher){create(:teacher)}

  it "is valid with default attributes" do
    expect(teacher).to be_valid
  end

  it { should validate_presence_of(:email)}
  it { should validate_presence_of(:password)}
  it { should validate_presence_of(:first_name)}
  it { should validate_presence_of(:last_name)}
  it { should validate_inclusion_of(:state).in_array(STATES)}

  it { should have_many(:lesson_plans)}
  it { should have_many(:comments)}
  it { should have_many(:courses)}

  it { should have_many(:initiated_follows).
      with_foreign_key(:follower_id).
      class_name("TeacherFollowing")
  }
  it { should have_many(:following).
      through(:initiated_follows).
      source(:followed)
  }
  it { should have_many(:received_follows).
      with_foreign_key(:followed_id).
      class_name("TeacherFollowing")
  }
  it { should have_many(:followed_by).
      through(:received_follows).
      source(:follower)
  }

  it { should have_many(:lesson_plan_stars)}
  it { should have_many(:starred_lesson_plans).
      through(:lesson_plan_stars).
      source(:lesson_plan).class_name('LessonPlan')
  }

  it { should have_many(:lesson_plan_contributors)}
  it { should have_many(:lesson_plans_contributed_to).
      through(:lesson_plan_contributors).
      source(:lesson_plan).class_name('LessonPlan')
  }
  
  
  


end