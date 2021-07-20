import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, InputBase 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { toggleDrawer } from './redux/reducks';
import { TemporaryDrawer } from './drawer';


const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1},
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
}));

export function EntryPage() {
    const dispatch = useDispatch();
    const classes = useStyles();

    // if(!userState.authData.token) {
    //     return (
    //         <div>
    //             entry page (unauthorized)
    //         </div>
    //     );
    // }

    const handleOnClickMenuButton = () => {
        dispatch(toggleDrawer(true));
    };

    return (
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
    );
};