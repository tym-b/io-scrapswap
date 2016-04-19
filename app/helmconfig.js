import favicon from 'images/favicon.png';

const config = {
  link: [
    // Add to homescreen for Chrome on Android
    { 'rel': 'icon', 'href': favicon },
    { 'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Roboto+Condensed', 'type': 'text/css' },
    { 'rel': 'stylesheet', 'href': '/assets/styles/main.css' },
    { 'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Roboto:400,300,500', 'type': 'text/css'}
  ],
  meta: [
    { 'charset': 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
    { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' }
  ]
};

export default config;
