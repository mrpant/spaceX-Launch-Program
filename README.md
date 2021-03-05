# spaceX-Launch-Program
Develop a front-end application which would help users list and browse all launches by SpaceX program.


DEMO URL : [SpaceX Launch Program](https://space-launch-program-app.herokuapp.com)

# Demonstration 

  The application required to use SSR(Server Side Rendering) and I'm going to use express (Server) and react (Client).
  ![File Structure](/images/logo.png)

## Design 

I have created design as per below screens.

### Mobile Screen
![GitHub Logo](/images/logo.png)
### Tablet Screen
![GitHub Logo](/images/logo.png)
### Desktop Screen
![GitHub Logo](/images/logo.png)

No third-party library being used, compete CSS code has been written in custom CSS (Flex-Layout | Media Query) 

    The design layout devided into two sections - LEFT(Filter Section) and RIGHT (Cards Section)

In the Left section, We have respective filters and in the right section, displaying the cards listing section.
And both of the sections behaving as per the respective above screens.

  ## STEP 1 - Configure Webpack.config.json
    ![GitHub Logo](/images/logo.png)

  ## STEP 2 - Create Server root file. (path : /src/server/index.js)
    ![GitHub Logo](/images/logo.png)
  
  ## STEP 3 - Create Client root file. (path : /src/client/index.js)
      ![GitHub Logo](/images/logo.png)
      
  ## STEP 4 - Setup Client entry point in Webpack and Server in main.js using babel-register.
  
  ## STEP 5 - Setup Script in package.json to run application.
     
  ## STEP 6 -  Create Sharable Component.

  I have created 3 sharable components which is reusable.

  1. Card Component
  ![GitHub Logo](/images/logo.png)
  1. Filter Component
  ![GitHub Logo](/images/logo.png)
  1. LoadingComponent
  ![GitHub Logo](/images/logo.png)
    


  
