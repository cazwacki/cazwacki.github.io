import React from 'react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function ExpandableList(props) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    let primary = props.primary
    let secondary = props.secondary
    let elements = props.elements
    let list_icon = props.icon

    const expandable_list = []
    expandable_list.push((
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                {list_icon}
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ color: 'text.primary' }}
                primary={primary}
                secondary={secondary ? secondary : ''} />
            {open ? <ExpandLess sx={{ color: 'gray' }} /> : <ExpandMore sx={{ color: 'gray' }} />}
        </ListItemButton>
    ))

    const list_items = []
    for (let i in elements) {
        list_items.push((
            <ListItem sx={{ pl: 4 }}>
                <ListItemText
                    primary={elements[i]} primaryTypographyProps={{ color: 'text.secondary' }}
                />
            </ListItem>
        ))
    }

    expandable_list.push((
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {list_items}
            </List>
        </Collapse>
    ))

    return (expandable_list)
}
