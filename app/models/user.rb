class User < ActiveRecord::Base
  geocoded_by :ip_address,
  :latitude => :lat, :longitude => :lon
  after_validation :geocode
end
