import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Grid, Container, Divider 
    } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { toggleDrawer } from '../redux/reducks';
import { TemporaryDrawer } from './drawer';
import { TimelineCards } from '../timeline/timelineCards';
import { TimelineForm } from '../timeline/timelineForm';


const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, marginBottom: 10 },
    menuButton: { marginRight: theme.spacing(2)},
    title: { 
        flexGrow:1, display: 'none', 
        [theme.breakpoints.up('sm')]: { display: 'block' }
    },
    search: { 
        position: 'relative', borderRadius: theme.shape.borderRadius, 
        marginLeft: 0, width: '100%',
        [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(1), width: 'auto' }
    }, 
    searchIcon: { 
        padding: theme.spacing(0, 2), height: '100%', position: 'absolute', 
        pointerEvents: 'none', display: 'flex', alignItems: 'center', 
        justifyContent: 'center' 
    },
    inputRoot: { color: 'inherit'},
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
    footer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        padding: '80px 0',
        color: 'black',
      },
}));

export const EntryPage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const authData = useSelector((state) => state.snsReducer.authData);

    if(!authData.token) return (<RedirectPage />);

    const handleOnClickMenuButton = () => {
        dispatch(toggleDrawer(true));
    };

    return (
        <div>
            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} 
                        onClick={handleOnClickMenuButton} color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        appbar header
                    </Typography>
                </Toolbar>
            </AppBar>
            <TemporaryDrawer />
            </div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3} />
                    <Grid item xs={3}>
                        <TimelineCards />
                    </Grid>
                    <Grid>
                        <TimelineForm />
                    </Grid>
                </Grid>
            </div>
            <Container component="footer" className={classes.footer}>
                <Divider variant="middle" />
                <Typography> ( footer text here ) </Typography>
            </Container>
        </div>
    );
};

const RedirectPage = () => {
    const history = useHistory();

    // useEffect(() => {
    //     //settimeout? 

    //     history.push('/signin');
    // });

    return (
        <div>
            entry page (unauthorized)
        </div>
    );
};