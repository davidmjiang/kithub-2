json.(@flat_curve, :id, :flat_rate, :assignment_id)

json.assignment do 
  json.id @flat_curve.assignment.id
  json.title @flat_curve.assignment.title
  json.possible_score @flat_curve.assignment.possible_score
  json.assignment_type @flat_curve.assignment.assignment_type
  json.has_curve @flat_curve.assignment.has_curve
  json.linear_curve @flat_curve.assignment.linear_curve
  json.flat_curve @flat_curve.assignment.flat_curve
end