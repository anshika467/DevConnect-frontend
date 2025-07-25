# DevTinder

 - Create React App - Config Tailwind 
 - Install DaisyUI - NavBar (Seperate Component)
 - NavBar.jsx
 - Installed React Router Dom
 - Creater Browser Router > Routes > Route > Body > RouteChildren
 - Create an Outle in your Body component
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
 - 

 401 => Unauthorised