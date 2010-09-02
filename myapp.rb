require 'rubygems'
require 'sinatra'
require 'json'

def create_item name
    {:name => name}
end

def create_items
    result = [
        create_item("foo"),
        create_item("bar"),
        create_item("baz"),
        create_item("john"),
        create_item("paul"),
        create_item("george"),
        create_item("ringo")
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