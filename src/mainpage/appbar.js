import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, AccountCircle } from '@material-ui/icons';


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

export const SnsAppbar = () => {
    const classes = useStyles();

    const handleOnClickMenuButton = () => {
        dispatch(toggleDrawer(true));
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} 
                    onClick={handleOnClickMenuButton} color="inherit" aria-label="open drawer">
                    <Menu />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    appbar header
                </Typography>
                <IconButton color="inherit" aria-label="miscMenu" edge="end">
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};