require 'rails_helper'

describe Course do

  let(:course){ create(:course) }

  it "is valid with default attributes" do
    expect(course).to be_valid
  end

end