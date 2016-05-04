import React, { PropTypes } from 'react';
import Navigation from 'containers/Navigation';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import colors from 'material-ui/lib/styles/colors';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.green500,
    primary2Color: colors.green700,
    primary3Color: colors.green100,
    textColor: colors.fullWhite
  },
}, {
  userAgent: 'all'
});

class Main extends React.Component {
  render() {
    return (
      <div>Hello world</div>
    );
  }
}

const App = ({children}) => {
  return (
    <div>
      <Navigation />
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default themeDecorator(muiTheme)(App);
