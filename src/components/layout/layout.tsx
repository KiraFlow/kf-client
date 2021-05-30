import React from 'react';
import { Navbar } from './navbar/navbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <div />
    </div>
  );
};
