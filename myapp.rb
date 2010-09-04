require 'rubygems'
require 'sinatra'
require 'json'

def create_item id, name, image, score
    {:name => name, :id => id , :imagePath=>image, :score=> score}
end

def create_items
    result = [
        create_item("stobart","Eddie Stobart", "http://upload.wikimedia.org/wikipedia/en/7/74/Eddie_Stobart_logo.png", 40),
        create_item("salveson","Christian Salveson","http://upload.wikimedia.org/wikipedia/en/f/f0/Salvesen.png", 35),
        create_item("maersk","Maersk","http://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Maersk_logo.svg/125px-Maersk_logo.svg.png", 30),
        create_item("rankhovis","Rank Hovis","http://www.rankhovis.co.uk/images/logo.gif", 40),
        create_item("sainsburies","Sainsburies","http://www.sainsburys.co.uk/support_files/style_images/common/header/header-logo.gif", 25),
        create_item("tescos","Tescos","http://www.jutexpo.co.uk/IMAGES/Tesco_logo.png", 25),
        create_item("warburtons","Warburtons","http://www.eurowaxpack.org/files/pictures%20logos/Warburtons-Logo.jpg", 40),
        create_item("royalmail","Royal Mail","http://www.royalmail.com/images/royalmail/paarch/pa_rmlogo.gif", 35)
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