import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ExpandableList from './list.js'

export default function MultiList(props) {
    let header = props.header
    let lists = props.lists

    const rendered_lists = []
    for (let i in lists) {
        rendered_lists.push(ExpandableList({ primary: lists[i].primary, secondary: lists[i].secondary, elements: lists[i].list, icon: lists[i].icon }))
    }

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {header ? header : ''}
                </ListSubheader>
            }
        >
            {rendered_lists.length > 1 ? rendered_lists : rendered_lists[0]}
        </List>
    );
}