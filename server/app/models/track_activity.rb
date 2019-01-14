class TrackActivity < ApplicationRecord
  belongs_to :car_division
  belongs_to :circuit_variant
  belongs_to :race_weekend
end
