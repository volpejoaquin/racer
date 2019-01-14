class RaceParticipantTrackActivity < ApplicationRecord
  belongs_to :track_activity
  belongs_to :race_participant
end
