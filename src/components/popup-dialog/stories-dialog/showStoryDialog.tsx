import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {UserStoryInterface} from "../../Cards/stories/UserStoryInterface";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import './showStoryDialog.css';

interface UpdateStoryProps {
    isOpen: boolean;
    story: UserStoryInterface;
    handleClose: () => void;
}

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


export const ShowStoryDialog: React.FC<UpdateStoryProps> = ({isOpen, story, handleClose}) => {
    const theme = useTheme();
    const classes = useStyles();


    return (

            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={'showCard'}>
                <DialogTitle id="alert-dialog-title">{story.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {story.description}
                    </DialogContentText>
                </DialogContent>

                <Grid className={'secondary-info showCard'} container spacing={2}>
                    <Grid item xs={6}>
                        <span className='badge badge-danger'>5</span>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={classes.cardDate}>Jan. 11, 2021</div>
                    </Grid>
                </Grid>

                </div>
            </Dialog>
    );
}