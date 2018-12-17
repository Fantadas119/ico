class CiberSecController < ApplicationController
  def index
    data = File.read("data.txt")
    split_alternatives = data.to_s.split("\n")
    @array_alternatives = split_alternatives.map { |array|  array.split(//).map {|char| char.to_s}}
  end
end