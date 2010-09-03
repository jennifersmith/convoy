require 'rubygems'
require 'sinatra'
require 'json'

def create_item name, image
    {:name => name,:imagePath=>image}
end

def create_items
    result = [
        create_item("foo", "images/redcar.png"),
        create_item("bar","images/redcar.png"),
        create_item("baz","images/redcar.png"),
        create_item("john","images/redcar.png"),
        create_item("paul","images/redcar.png"),
        create_item("george","images/redcar.png"),
        create_item("ringo","images/redcar.png")
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