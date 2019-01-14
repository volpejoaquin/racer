FactoryBot.define do
  factory :track_lap do
    partial_lap { false }
    time { 1 }
  end
end
