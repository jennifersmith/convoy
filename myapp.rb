require 'rubygems'
require 'sinatra'
require 'json'

def create_item id, name, image
    {:name => name, :id => id , :imagePath=>image}
end

def create_items
    result = [
        create_item("stobart","Eddie Stobart", "http://upload.wikimedia.org/wikipedia/en/7/74/Eddie_Stobart_logo.png"),
        create_item("salveson","Christian Salveson","http://upload.wikimedia.org/wikipedia/en/f/f0/Salvesen.png"),
        create_item("maersk","Maersk","http://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Maersk_logo.svg/125px-Maersk_logo.svg.png"),
        create_item("rankhovis","Rank Hovis","http://www.rankhovis.co.uk/images/logo.gif"),
        create_item("sainsburies","Sainsburies","http://www.sainsburys.co.uk/support_files/style_images/common/header/header-logo.gif"),
        create_item("tescos","Tescos","http://www.jutexpo.co.uk/IMAGES/Tesco_logo.png"),
        create_item("warburtons","Warburtons","http://www.eurowaxpack.org/files/pictures%20logos/Warburtons-Logo.jpg"),
        create_item("royalmail","Royal Mail","http://www.royalmail.com/images/royalmail/paarch/pa_rmlogo.gif")
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