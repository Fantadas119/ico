class CiberSecController < ApplicationController
  def index
    # data = File.read("D:/ISCTE/2018_2019/1S/ICO/ico-2018-grupo7/i1co/i1co/BEST_HV_VAR.tsv")
    # split_alternatives = data.to_s.split("\n")
    # @array_alternatives = split_alternatives.map { |array|  array.split(//).map {|char| char.to_s}}
    @alternativas = get_file_data("D:/ISCTE/2018_2019/1S/ICO/ico-2018-grupo7/i1co/i1co/BEST_HV_VAR.tsv");
    # @custo_sim_risco = get_file_data("D:/ISCTE/2018_2019/1S/ICO/ico-2018-grupo7/i1co/i1co/BEST_HV_FUN.tsv");
  end

  def get_file_data(data)
    data = File.read(data)
    split_alternatives = data.to_s.split("\n")
    split_alternatives.map { |array|  array.split(//).map {|char| char.to_s}}
  end
end