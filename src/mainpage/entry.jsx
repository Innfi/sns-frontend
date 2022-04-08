import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TimelineCards from '../timeline/timelineCards';
import TimelineForm from '../timeline/timelineForm';
import SnsDrawer from './drawer';
import SnsAppbar from './appbar';
import SnsFooter from './footer';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, marginBottom: 10 },
  menuButton: { marginRight: theme.spacing(2) },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: { display: 'block' },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: { color: 'inherit' },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function EntryPage() {
  const classes = useStyles();
  const authData = useSelector((state) => state.snsReducer.authData);

  if (!authData.token) return <RedirectPage />;

  return (
    <div className={classes.root}>
      <SnsAppbar />
      <SnsDrawer />
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <TimelineCards />
        </Grid>
        <Grid>
          <TimelineForm />
        </Grid>
      </Grid>
      <SnsFooter />
    </div>
  );
}

function RedirectPage() {
  const history = useHistory();

  useEffect(() => {
    // settimeout?

    history.push('/signin');
  });

  return <div>entry page (unauthorized)</div>;
}
