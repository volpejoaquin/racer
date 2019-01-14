FactoryBot.define do
  factory :track_activity do
    name { "MyString" }
    short_name { "MyString" }
    date { "MyString" }
    duration { 1 }
    laps { 1 }
    state { "MyString" }
    type { "" }
    car_division { nil }
    circuit_variant { nil }
    race_weekend { nil }
  end
end
