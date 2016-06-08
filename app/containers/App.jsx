import React, { PropTypes } from 'react';
import AppHeader from 'containers/AppHeader';
import LayoutComponents from 'containers/LayoutComponents';

const styles = {
  appContainer: {
    minHeight: '100vh'
  }
};

const App = ({children}) => {
  return (
    <div style={styles.appContainer}>
      <AppHeader />
      <LayoutComponents />
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
