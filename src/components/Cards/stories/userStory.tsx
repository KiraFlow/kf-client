import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import './userStory.css';
import {UserStoryInterface} from "./UserStoryInterface";
import axios from "../../../axios";

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
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

interface UserStoryProps {
    story: UserStoryInterface;
    handleEdit: () => void;
    handleShow: () => void;
}

export const UserStory: React.FC<UserStoryProps> = ({story, handleEdit, handleShow}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleDelete = async (event: React.MouseEvent<HTMLElement>, userStoryId: string) => {
        try {
            await axios.delete('/exploration/delete', {
                data: {userStoryId},
                headers: {"Content-Type": "Application/json"}
            });


        } catch (err) {
            console.log(`error deleting card ${err}`);
        }
        setOpen(false);
    }

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleEditClick = () => {
        setOpen(false);
        handleEdit();
    }

    const handleShowClick = () => {
        setOpen(false);
        handleShow();
    }

    const creation = new Date(story.creationDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className='card'>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <span className='badge badge-danger'>{story.estimation}</span>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={classes.cardDate}>{creation}</div>
                    </Grid>
                </Grid>

                <div className={classes.title}>
                    <span className={'cardTitle'} onClick={handleShow}>{story.title}</span>
                </div>

            </CardContent>

            <CardActions disableSpacing>


                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {story.description &&
                        <NotesOutlinedIcon className={'includeParagraph'}/>
                        }
                    </Grid>

                    <Grid item xs={6}>
                    </Grid>
                </Grid>

                <IconButton
                    className='menuButton'
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <MoreVertIcon/>
                </IconButton>

                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleShowClick}>Show</MenuItem>
                                        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                                        <MenuItem onClick={(e) => handleDelete(e, story._id)}>Delete</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>

            </CardActions>
        </div>
    );
};
