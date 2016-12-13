# Krdz Proto.

## Where to start?

First, clone the repository:

    git clone git@github.com:des0ps/react-krdz.git
    cd react-krdz

The repository contains two applications:
- The client, that is powered by React
- The server, that uses Express and will serve the static files of the client in production

You should not really care of the server for now.
It is configured to work with the deployment server, but we don't need to use it when developping.

To run the project, you will need to install the dependencies of the client:

    cd client
    npm install
    
The last command will populate the `packages.json` file in your current directory and create a `node_modules` directory.

Once you installed the project dependencies, you can start the project:

    npm start

Webpack will take care of updating the browser for you, you should have the application launched automagically :)
