import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, AccountCircle } from '@material-ui/icons';

import { signoutThunk } from '../redux/reducks';


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

    const [ anchorEl, setAnchorEl ] = useState(null);
    const handleClick = (e) => { setAnchorEl(e.currentTarget) };
    const handleClose = () => { setAnchorEl(null) };

    const dispatch = useDispatch();
    const history = useHistory();

    const openLogoutDialog = () => { setOpen(true); };
    const closeLogoutDialog = () => { setOpen(false); };
    const handleLogout = () => { dispatch(signoutThunk(history)); };

    const handleOnClickMenuButton = () => {
        dispatch(toggleDrawer(true));
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} 
                        onClick={handleOnClickMenuButton} color="inherit" aria-label="open drawer">
                        <Menu />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        appbar header
                    </Typography>
                    <IconButton color="inherit" aria-label="miscMenu" edge="end" 
                        onClick={(e) => handleClick(e)}>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu id="general-menu" anchorEl={anchorEl} keepMounted 
                open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={openLogoutDialog} >Logout</MenuItem>
                <MenuItem>History</MenuItem>
            </Menu>
            <Dialog open={open} onClose={closeLogoutDialog} fullWidth={true} maxWidth="xs" 
                aria-labelledby="form-dialog-logout" >
                <DialogTitle id="logout-title">Logout?</DialogTitle>
                <DialogActions>
                    <Button onClick={closeLogoutDialog} color="secondary"> Cancel </Button>
                    <Button onClick={handleLogout} color="primary"> OK </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};