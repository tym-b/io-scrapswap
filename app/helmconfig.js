/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: 'link' | 'meta',
 *  sizes: 'widthxheight',
 *  rel: 'rel value'
 *  filename: <Name of your file'
 * }
 */

// Import all your needed files first (webpack will grab the url)
import favicon from 'images/favicon.png';

const config = {
  link: [
    { rel: 'icon', href: favicon },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,300,500', type: 'text/css'},
    { rel: 'stylesheet', href: '/assets/styles/main.css' }
  ],
  meta: [
    { charset: 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
};

export default config;