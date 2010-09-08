require 'rubygems'
require 'sinatra'
require 'json'

def create_item name, score
    {:name => name, :id => name.gsub(' ', '-').downcase , :imagePath=>'images/thelorrygame/' + name.gsub(' ', '-').downcase + '.png', :score=> score}
end




def create_items
    result = [
        create_item('Sainsbury' , 90),
        create_item('Tesco', 95),
        create_item('Asda' , 95),
        create_item('Morrisons', 100),

        create_item('Iceland' , 100),
        create_item('Waitrose', 110),
        create_item('Marks and Spencer' , 110),
        create_item('Co-operative', 120),


        create_item('Fowler Welch' , 140),
        create_item('Norman Dentressangle', 160),
        create_item('Christian Salveson' , 160),
        create_item('Eddie Stobart', 180),


        create_item('Warburtons' , 200),
        create_item('Kingsmill', 220),
        create_item('Robert Wiseman Dairies' , 240)

        ];
end

get '/data' do 
  content_type :json
  result = {
    :items =>create_items()
  };

  json_result = result.to_json;
  callback = params[:callback];
  "#{callback}(#{json_result})"
end