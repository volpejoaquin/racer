FactoryBot.define do
  factory :race_participant_track_activity do
    state { "MyString" }
    laps_count { 1 }
    total_time { 1 }
    track_activity { nil }
    race_participant { nil }
  end
end
