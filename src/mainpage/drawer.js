import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { toggleDrawer } from '../redux/reducks';


export const SnsDrawer = () => {
    const userState = useSelector((state) => state.snsReducer);
    const dispatch = useDispatch();
    const menuTexts = ['Profile', 'Follows', 'Timelines', 'Settings'];

    const closeDrawer = (event) => {
        dispatch(toggleDrawer(false));
    };

    return (
        <div>
            <Drawer open={userState.drawerVisible} onBackdropClick={closeDrawer}>
                <List>
                    {menuTexts.map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
};
