require 'rubygems'
require 'sinatra'
require 'json'

def create_item name, score, category
    {:name => name, :category=>category, :id => name.gsub(' ', '-').downcase , :imagePath=>'images/thelorrygame/' + name.gsub(' ', '-').downcase + '.png', :score=> score}
end


def create_combos
    result = [
        {
            :id=>'4Set',
            :name=>'Set of four',
            :evaluation=>'Convoy.Combos.setOf4("category")',
            :displayTpl=>'Set of four: {category}',
            :score=>250
        }
    ]
end


def create_items
    result = [
        create_item('Morrisons', 100, 'Supermarkets'),
        create_item('Sainsbury' , 90, 'Supermarkets'),
        create_item('Asda' , 95, 'Supermarkets'),
        create_item('Tesco', 95, 'Supermarkets'),

        create_item('Iceland' , 100, 'Supermarkets'),
        create_item('Waitrose', 110, 'Supermarkets'),
        create_item('co-operative', 120, 'Supermarkets'),
        create_item('Marks and Spencer' , 110, 'Supermarkets'),


        create_item('Fowler Welch' , 140, 'Distribution'),
        create_item('Norbert Dentressangle', 160, 'Distribution'),
        create_item('Christian Salvesen' , 160, 'Distribution'),
        create_item('Eddie Stobart', 180, 'Distribution'),

        create_item('Warburtons' , 200, 'Bread and Milk'),
        create_item('Robert Wiseman' , 240, 'Bread and Milk') ,  
        create_item('Kingsmill', 220, 'Bread and Milk'),

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


get '/combos' do 
  content_type :json
  result = {
    :combos =>create_combos()
  };

  json_result = result.to_json;
  callback = params[:callback];
  "#{callback}(#{json_result})"
end