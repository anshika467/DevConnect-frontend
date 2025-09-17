# DevConnect

 - Create React App - Config Tailwind 
 - Install DaisyUI - NavBar (Seperate Component)
 - NavBar.jsx
 - Installed React Router Dom
 - Creater Browser Router > Routes > Route > Body > RouteChildren
 - Create an Outlet in your Body component
 - Create a Footer Component

Body
  NavBar
  Route=/ => Feed
  Route=/login => Login
  Route=/connections => Connections
  Route=/profile => Profile
  

Outlet => Any children routes of body will be rendered over here.

**Node - 16**
-------------

 - Create a login page
 - Install Axios
 - CORS - Install cors in backend => add middleware with configurations: origin, credentials: true
 - Whenever you're making API call so pass axois => {withCredentials : true}
 - { Get cookie in Application - Browser:
    Backend  : cors configuration - origin, credentials : true
    Frontend : withCredential : true }
  
 - Install redux Toolkit - https://redux-toolkit.js.org/tutorials/quick-start
 - configureStore => Provider => createSlice => add reducer to store
 - Add redux devTools in chrome
 - Login and see if your data is coming properly in the store
 - NavBar should update as soon as user logs in
 - Refactor our code to add constants file + create a components folder
 - You should not be able to access other routes without login
 - If token is not present, redirect user to login page
 - Logout
 - FGet the feed and add the feed in the store
 - Build the user card on feed
 - Gender : Dropdown (H.W.)
 - Edit Profile Feature
 - Show Toast on save of profile
 - Create Connections Page
 - See all my Connection Requests
 - Accept/Reject Request
 - Send/Ignore the user from the feed

 - Remaining:
  - Signup New User
  - E2E Testing

 401 => Unauthorised

**Node - 17**
-------------

 - Changed Feed UI -> One Slide at a time
 - Deletion Functionality Implemented

## Deployment
 - Signup on AWS
 - Launch the instance
 - `chmod 400 <secret>.pem` Command for Powershell 
   > icacls "devConnect-secret.pem" /inheritance:r

   > icacls "devConnect-secret.pem" /grant:r "$($env:USERNAME):(R)"

 - **Command to log into the Ubuntu machine:** 
   > `ssh -i "devConnect-secret.pem" ubuntu@ec2-13-221-85-116.compute-1.amazonaws.com`
 - Install Node version *22.18.0* - Version of Backend
   > curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

   > nvm install 22.18.0
 - Git clone - DevConnect-backend & DevConnect-frontend - *HTTPS*
 - **Frontend - NGINX**
    - `npm install` -> dependencies install -> Remote and here
    - `npm run build` -> creates the dist folder
    - `sudo apt update` -> Updates the Ubuntu version... => in *root*
    - `sudo apt install nginx` => In *DevConnect-frontend*
    - `sudo systemctl start nginx`
    - `sudo systemctl enable nginx`
    - Copy code from dist(build files) to /var/www/html/
    - `sudo scp -r dist/* /var/www/html/` (Dist folder copied into this folder; /* means all files)
    - Enable port:80 on your instance - *Security -> Add rule -> Port:80 -> Allow from everywhere*
    <!-- - Public IP Address : 13.221.85.116 -->
 - **Backend - PM2**
    - `npm install`
    - Copy `.env` file into Ubuntu Machine
      > scp -i "C:\Users\anshi\Downloads\devConnect-secret.pem" .env ubuntu@13.221.85.116:~/DevConnect-backend/
    - Allowed *EC2 Instance Public IP* on MongoDB Server
    - Enable *Port:7777* on your instance.
    - **Install pm2:**
      > Allows the machine to be running in the background foreever even after the system is closed.
    - `npm install pm2 -g`
    - `pm2 start npm -- start`
    - `pm2 start npm --name "DevConnect-backend" -- start` : Start with a custom name
    - `pm2 logs` : For any errors
    - `pm2 flush npm` : Clear the logs
    - `pm2 list`, `pm2 stop <name>`, `pm2 delete <name>`
    - **nginx config** - Mapping to /api from :7777 : *See below*⬇️ 
    - **Restart ngnix** : `sudo systemctl restart nginx` : * Do it on root*
    - Modify the BASEURL in frontend project to `/api`. : `contants.js`

 - **Nginx Config - MAPPING CONCEPT :**
    - It is the upper surface of the server - front-view.
    - We want to map `13.221.85.116:7777` to `13.221.85.116/api`.

    - Frontend = http://13.221.85.116/  <br>
    - Backend = http://13.221.85.116:7777/

    - Domain Name = devconnect.com => 13.221.85.116

    - **Mapping :** <br>
      Frontend = devconnect.com <br>
      Backend = devconnect.com/api
   
    - **Change nginx config** :  `sudo nano /etc/nginx/sites-available/default` - *Do it in root*
    
      ```
      server_name 13.221.85.116;

      location /api/ {
         proxy_pass http://localhost:7777/;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
      }
      ```