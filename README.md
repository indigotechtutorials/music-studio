Make sure you have Ruby installed and download version 3.3.0 thats what im using. 
![Screenshot 2024-04-01 235354](https://github.com/indigotechtutorials/music-studio/assets/63070125/431a5f81-f671-47e5-9628-d1b151a7bb1c)

#### Steps to get running

###### 1. Install Ruby on Rails
Install ruby on rails for your computer either Mac, or windows if your on windows I recommend you use WSL and then follow the guide for Ubuntu.
When your following the guide when you get to Database choose the PostgreSQL database.
https://gorails.com/setup/macos/14-sonoma

###### 2. Download code

###### 3. Bundle Install to install gems
In the terminal go inside the code of the app and run
`bundle install`

###### 4. Migrate the database
In the terminal go inside the code of the app and run
`rails db:setup`

###### 5. Start the server
Now you can start the app in the terminal by typing
`bin/dev`

###### 6. View the app
Now the app is running you can go to localhost:3000 in your browser and you will see the music making app
