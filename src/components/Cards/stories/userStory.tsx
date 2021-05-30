import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import {UserStoryInterface} from "./UserStoryInterface";
import './userStory.css';


const options = ['Edit', 'Delete'];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        color: '#98a6ad!important'
    },
    actions: {
        float: 'right',
    },
    title: {
        fontSize: '.9375rem',
        color: '#6c757d!important',
        fontWeight: 700,
        margin: '10px 0px!important',
    },
    cardDate: {
        textAlign: 'right',
        color: '#98a6ad!important',
        fontSize: '.75rem',
        fontWeight: 400
    }
}));

interface UserStory {
    title: string;
}


export const UserStory: React.FC<UserStory> = ({title}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCardMenu = (event: any) => {
        setAnchorEl(null);
    }

    return (
        <div className='card'>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <span className='badge badge-danger'>5</span>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={classes.cardDate}>Jan. 11, 2021</div>
                    </Grid>
                </Grid>

                <div className={classes.title}>
                    {title}
                </div>

            </CardContent>

            <CardActions disableSpacing>


                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <NotesOutlinedIcon className={'includeParagraph'}/>

                    </Grid>

                    <Grid item xs={6}>
                    </Grid>
                </Grid>

                <IconButton
                    className='menuButton'
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option}
                            selected={option === 'Pyxis'}
                            onClick={handleCardMenu}
                            className={'menuOption'}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>

            </CardActions>
        </div>
    );
};
