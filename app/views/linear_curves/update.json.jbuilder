json.(@linear_curve, :id, :rawA, :rawB, :curvedA, :curvedB, :assignment_id)

json.assignment do 
  json.id @linear_curve.assignment.id
  json.title @linear_curve.assignment.title
  json.possible_score @linear_curve.assignment.possible_score
  json.assignment_type @linear_curve.assignment.assignment_type
  json.has_curve @linear_curve.assignment.has_curve
  json.linear_curve @linear_curve.assignment.linear_curve
  json.flat_curve @linear_curve.assignment.flat_curve
end