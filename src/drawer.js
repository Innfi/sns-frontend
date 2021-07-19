import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles({
    list: { width: 250 },
    fullList: { width: 'auto' }
});

export const TemporaryDrawer = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        top: false, 
        left: false, 
        bottom: false, 
        right: false
    });

    const anchor='left';

    const userState = useSelector((state) => state.snsReducer);

    const toggleDrawer = useCallback(
        (anchor, open) => (event) => {
            if(event.type === 'keydown' && 
                (event.key === 'Tab' || event.key === 'Shift')) return;
    
            setState({ ...state, [anchor]: open });
        }, [state ]
    );

    useEffect(() => {
        console.log(`Drawer] in useEffect: ${userState.drawerVisible}`);
        toggleDrawer(anchor, userState.drawerVisible);
    }, [userState.drawerVisible, toggleDrawer]);

    const list = (anchor) => (
        <div onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                {['Profile', 'Follows', 'Timelines', 'Settings'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />} </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                <Drawer anchor={anchor} 
                    open={state[anchor]} 
                    onClose={toggleDrawer(anchor, false)} >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
};