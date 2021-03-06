# spaceX-Launch-Program
Develop a front-end application which would help users list and browse all launches by SpaceX program.


DEMO URL : [SpaceX Launch Program](https://space-launch-program-app.herokuapp.com)

# Demonstration 

  The application required to use SSR(Server Side Rendering) and I'm going to use express (Server) and react (Client).

## File Structure

  ### Client Flow
  ![Client Flow](https://github.com/mrpant/spaceX-Launch-Program/blob/develop/screenshot/client-flow.png?raw=true)
  
  ### Server Flow
  ![Server Flow](https://github.com/mrpant/spaceX-Launch-Program/blob/develop/screenshot/server-flow.png?raw=true)
    
  ### Global Flow  
  ![Server Flow](https://github.com/mrpant/spaceX-Launch-Program/blob/develop/screenshot/global-file.png?raw=true)

## Design 

I have created design as per below screens.

### Mobile Screen
![Mobile Screen](https://github.com/mrpant/spaceX-Launch-Program/blob/develop/screenshot/Mobile.jpg?raw=true)
### Tablet Screen
![Tablet Screen](https://github.com/mrpant/spaceX-Launch-Program/blob/develop/screenshot/Tablet.jpg?raw=true)
### Desktop Screen
![Desktop Screen](https://github.com/mrpant/spaceX-Launch-Program/blob/e625fa489a69eb6aa61861c9870d9b0e601c1340/screenshot/Desktop.png)

No third-party library being used, compete CSS code has been written in custom CSS (Flex-Layout | Media Query) 

    The design layout devided into two sections - LEFT(Filter Section) and RIGHT (Cards Section)

In the Left section, We have respective filters and in the right section, displaying the cards listing section.
And both of the sections behaving as per the respective above screens.

  ## STEP 1 - Configure Webpack.config.json
  
  
        // TODO : External plugin to use here.
          const PLUGINS = [
              new FriendlyErrorsWebpackPlugin(),
              new MiniCssExtractPlugin({
                  filename: "styles.css",
              }),
              new webpack.DefinePlugin({
                  'process.env': {
                      // TODO : Set Environment variable for react app.
                  }
              })
          ];

          // TODO : Webpack Configuration  
          module.exports = {
              mode: process.env.NODE_ENV || 'development',
              context: path.join(__dirname, "src"),
              devtool: "source-map",
              entry: {
                  app: "./client/index",
              },
              resolve: {
                  modules: [
                      path.resolve("./src"),
                      "node_modules",
                  ],
              },
              module: {
                  rules: [
                      {
                          test: /\.jsx?$/,
                          exclude: /(node_modules)/,
                          loader: "babel-loader"
                      }, {
                          test: /\.css$/,
                          use: [
                              {
                                  loader: MiniCssExtractPlugin.loader,
                              },
                              "css-loader",
                          ],
                      },
                  ],
              },
              output: {
                  path: path.resolve(__dirname, "build"),
                  filename: "[name].bundle.js",
              },
              plugins: PLUGINS
          }
     





 ## STEP 2 - Create Server root file. (path : /src/server/index.js)
                  

                        // TOOD : Get ref of express in app for globel use.
                        const app = express();
                        // TODO : Port not setted in .env then default port will be 3000.
                        const PORT = process.env.PORT || 8080;

                        // TODO : Get build file from dir.
                        app.use(express.static(path.resolve(__dirname, "../../build")));

                        // TODO : Common Request Handler.
                        app.get("/*", (req, res) => {
                            const { params } = req;
                            let inputParams = {};
                            // TODO : Get filter params.
                            if (params) inputParams = getParamsFromUrl(params[0]);
                            let context = {};
                            // TODO : Create store.
                            let store = createStore();

                            // TODO : Get routes promises on change every request.
                            const routesPromis = routes
                                .filter(route => {
                                    return matchPath(req.url, route);
                                })
                                .map(route => {
                                    return route.component;
                                })
                                .filter(comp => {
                                    return comp.serverFetch;
                                })
                                .map(comp => {
                                    return store.dispatch(comp.serverFetch(inputParams));
                                });

                            // TODO : Resolve routes promis.
                            Promise.all(routesPromis).then((data) => {
                                let jsx = (
                                    <Provider store={store}>
                                        <StaticRouter context={context} location={req.url}>
                                            <App />
                                        </StaticRouter>
                                    </Provider>
                                );

                                // TODO : Get Store State.
                                const reduxState = store.getState();

                                // TODO : Parse JSX to string to render in client side.
                                const reactDOM = renderToString(jsx);
                                // TODO : Helmet to render all head section stuff on client side for SEO.
                                const helmetData = Helmet.renderStatic();
                                res.writeHead(200, { "Content-Type": "text/html" });
                                // TOOD : Send Result to client.
                                return res.end(serverHtmlTemplate(reactDOM, reduxState, helmetData))
                            });
                        });

                        // TODO : Set Port to Server.
                        app.listen(PORT, () => {
                            console.log("Server is Running on port", PORT)
                        });






          
  ## STEP 3 - Create Client root file. (path : /src/client/index.js)
               // TODO : Update initial values on store.
                const store = createStore(window.REDUX_DATA);

                const jsx = (
                    <Provider store={store}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </Provider>
                );

                // TODO : Process for rehydrate
                const app = document.getElementById("app");
                ReactDOM.hydrate(jsx, app);






      
  ## STEP 4 - Setup Server as main.js using babel-register.
          
                // TODO : Babel register to set entry point and allows to node ES6
                require("babel-register")({
                    presets: ["env"],
                    plugins: [
                        [
                            "css-modules-transform",
                            {
                                camelCase: true,
                                extensions: [".css", ".scss"],
                            },
                        ],
                        "dynamic-import-node",
                    ],
                });

                // TODO : entry point of server file.
                require("./src/server/index");






  ## STEP 5 - Setup Script in package.json to run application.
  
                   "scripts": {
                      "build": "webpack --progress",
                      "start": "npm run build && nodemon main.js",
                      "dev": "npm-run-all --parallel server client",
                      "server": "nodemon main.js",
                      "client": "webpack --watch --progress",
                      "lint": "eslint src",
                      "clean": "rd /s /q  build",
                      "heroku-prebuild": "npm install --dev",
                      "heroku-postbuild": "webpack --progress"
                    },
                    
                    
                    
                    
                    
     
  ## STEP 6 -  Create Sharable Component.

  I have created 3 sharable components which is reusable.
  
  
  

  ### Card Component

                        
                // TODO : Common Card Component.
                
                const CardComponent = ({ title, mission, launchYear, isSuccessLaunch, isSuccessLanding, imgUrl, ...props }) => {
                    return (
                        <div className="item" tabIndex="0">
                            <div className="img-container" style={{ "background": `url(${imgUrl}) no-repeat center center`, "backgroundSize": "contain", "backgroundColor":       "#ebeaea" }}></div>
                            <p><strong>{title}</strong></p>
                            <p><strong className="heading">Mission Id : </strong> {mission && mission.length === 0 ? '---' : ''}</p>
                            {
                                mission && mission.length > 0 && <ul>
                                    {mission.map((x, i) => <li key={i}>{x}</li>)}
                                </ul>
                            }
                            <p><strong className="heading">Launch Year :</strong> {launchYear} </p>
                            <p><strong className="heading">Successful Launch :</strong> {isSuccessLaunch}</p>
                            <p><strong className="heading">Successful Landing :</strong> {isSuccessLanding}</p>
                        </div >
                    )
                }
                export default CardComponent;
                
                
                
                
                
                
  ### Filter Component
                            
                            // TODO : Common Filter Component.
                        const FilterComponent = ({ title, list, onClickHandler, filterType, selectedItem, ...props }) => {
                            return (
                                <div className="filter-container">
                                    <p><strong>{title}</strong></p>
                                    <hr />
                                    <div className="filter-list-container">
                                        {list && list.map((item, index) => {
                                            return <button style={{ background: item === selectedItem ? '#8bc457' : '#8bc4578c' }} key={index} title={item} onClick={(e) =>   onClickHandler(e, item, filterType)}>{capitalizeFirstLetter(item)}</button>
                                        })}
                                    </div>
                                </div >
                            )
                        }

                        export default FilterComponent;
                        
                        
                        
                        
                        
                        
  ### LoadingComponent

                // TODO : Common Loading Component.
                        const LoadingComponent = ({ ...props }) => {
                           return (
                                 <div className="loading">
                                         <div className='uil-ring-css' style={{ transform: 'scale(0.79)' }}>
                              <div></div>
                              </div>
                          </div>
                      )
                  }
                  export default LoadingComponent;
    


  
