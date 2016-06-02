import React from 'react';
import Immutable from 'immutable';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router'
import axios from 'axios';
import { Provider } from 'react-redux';
import createRoutes from 'routes.jsx';
import configureStore from 'store/configureStore';
import headconfig from 'components/Meta';
import { fetchComponentDataBeforeRender } from 'api/fetchComponentDataBeforeRender';
import _ from 'lodash';

import scrapswapMuiThemeProvider from './scrapswapMuiThemeProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import moment from 'moment';
moment.locale('pl');

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;

function renderFullPage(renderedContent, initialState, head={
  title: 'ScrapSwap',
  meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
  link: '<link rel="stylesheet" href="/assets/styles/main.css"/>'
}) {
  return `
  <!doctype html>
    <html lang="">
    <head>
      ${head.title}
      ${head.meta}
      ${head.link}
      <style>
        * {
          box-sizing: border-box;
          font-family: 'Roboto', sans-serif;
        }

        a {
          color: inherit;
          cursor: pointer;
          text-decoration: inherit;
        }

        @keyframes mark {
          from {
            transform: scale(0.9);
          }
          to {
            transform: scale(1.0);
          }
        }

        .marked {
          animation-name: mark;
          animation-duration: 100ms;
          animation-timing-function: ease-in-out;
        }

        .advert-enter {
          opacity: 0;
          transition: all 0.3s ease-in-out;
        }

        .advert-enter.advert-enter-active {
          opacity: 1;
        }

        .advert-leave {
          opacity: 1;
          transform: scale(1);
          transition: all 0.3s ease-in-out;
        }

        .advert-leave.advert-leave-active {
          opacity: 0;
          transform: scale(0.95);
        }

        .advert-edit-box {
          width: 0px;
        }

        @media screen and (max-width: 768px) {
          .advert-edit-box {
            width: 60px !important;
          }
        }

        .advert:hover .advert-edit-box {
          width: 60px !important;
        }

        .badge {
          padding: 0px !important;
          margin-right: 8px !important;
        }
      </style>
    </head>
    <body style="margin: 0px; padding: 0px;">
    <div id="app">${renderedContent}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
    </body>
    </html>

  `;
}

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const history = createMemoryHistory();

  const authState = Immutable.fromJS({
    user: {
      pending: false,
      authenticated: req.isAuthenticated(),
      loginError: null,
      registerError: null
    }
  });

  const store = configureStore(authState.mergeIn(['user'], req.user), history);
  const routes = createRoutes(store);
 
  const muiTheme = scrapswapMuiThemeProvider(false);

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const InitialView = (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        </MuiThemeProvider>
      );
      //This method waits for all render component promises to resolve before returning to browser
      fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
      .then(html => {
        const componentHTML = renderToString(InitialView);
        const initialState = store.getState();
        res.status(200).end(renderFullPage(componentHTML, initialState, {
          title: headconfig.title,
          meta: headconfig.meta,
          link: headconfig.link
        }));
      })
      .catch(err => {
        console.log(err);
        res.end(renderFullPage("",{}));
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
}
