import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Homepage } from './pages/homepage/homepage';
import {Exploration} from './pages/continues-exploration/exploration';
import {IterationPlaning} from './pages/iteration-planing/iteration-planing';
import { Layout } from './components/layout/layout';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

export const App = () => {
  const theme = createMuiTheme({
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    palette: {
      background: {
        default: '#fafbfe',
      },
      primary: {
        main: '#727cf5',
      },
      secondary: {
        main: '#6c757d',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Router>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/exploration" component={Exploration} />
          <Route exact path="/planing" component={IterationPlaning} />
        </Router>
      </Layout>
    </ThemeProvider>
  );
};
