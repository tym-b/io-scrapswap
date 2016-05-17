import React, { PropTypes } from 'react';
import Navigation from 'containers/Navigation';
import LayoutComponents from 'components/LayoutComponents';

const App = ({children}) => {
  return (
    <div>
      <Navigation />
      <LayoutComponents />
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
