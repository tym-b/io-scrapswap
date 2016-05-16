import React, { PropTypes } from 'react';
import Navigation from 'containers/Navigation';
import LoginOrRegister from 'containers/LoginOrRegister';

const App = ({children}) => {
  return (
    <div>
      <Navigation />
      <LoginOrRegister />
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
