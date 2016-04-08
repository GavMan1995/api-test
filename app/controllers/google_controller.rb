class GoogleController < ApplicationController
  before_action :client
    def index
    end

    def search
      @spots = @client.spots_by_query(params["search"])
      render json: @spots
    end

    private

    def client
      @client = GooglePlaces::Client.new(ENV['API_KEY'])
    end
end

# , :types => ['restaurant', 'food', 'meal_takeaway', 'meal_delivery', 'cafe', 'bakery']
