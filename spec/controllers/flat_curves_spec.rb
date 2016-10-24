require 'rails_helper'

describe FlatCurvesController do 

  let(:assignment){create :assignment}
  let(:flat_curve){create :flat_curve}

  describe "POST #create" do 

    it "returns a successful response with valid params" do 
      process :create, method: :post, params: { flat_curve: attributes_for(:flat_curve, :assignment_id => assignment.id) }, format: :json
      expect(response).to be_success
    end

    it "returns an invalid response with invalid params" do 
      process :create, method: :post, params: { flat_curve: attributes_for(:flat_curve, :without_rate, :assignment_id => assignment.id) }, format: :json
      expect(response).to_not be_success
    end

    it "increments flat_curves count by 1 after successful post" do 
      expect{
      process :create, method: :post, params: { assignment_id: flat_curve.assignment.id,
        flat_curve: attributes_for(:flat_curve) }, format: :json
      }.to change{FlatCurve.count}.by(1)
    end
  end

  it ""

end