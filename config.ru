require 'rubygems'
require 'myapp'
set :run, false
set :environment, :production
run Sinatra::Application