require 'rails_helper'

describe Comment do

  it { should validate_presence_of(:body)}
  
  it { should belong_to(:teacher)}

  it { should belong_to(:commentable)}

  it { should validate_length_of(:body).is_at_most(500)}

end