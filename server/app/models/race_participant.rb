class RaceParticipant < ApplicationRecord
  belongs_to :team
  belongs_to :car
  belongs_to :driver
end
