import serialize from "serialize-javascript";

// TODO : Common server template rendered by node
const serverHtmlTemplate = (reactDom, reduxState, helmetData) => {
    return `<!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <link rel="stylesheet" type="text/css" href="/styles.css" />
        </head>
        <body>
          <header>
             <h1 tabIndex="0">SpaceX Launch Program</h1>
         </header>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${serialize(reduxState, { isJSON: true })}
            </script>
            <script src="/app.bundle.js"></script>
        <footer>
            <p tabIndex="0">Developed by <strong>Mukesh Pant</strong></p>
        </footer>
        </body>
        </html>`;
}

module.exports = serverHtmlTemplate
