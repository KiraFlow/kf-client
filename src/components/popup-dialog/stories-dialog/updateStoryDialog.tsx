import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
    createStyles,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import './storyDialog.css';
import {UserStoryInterface} from "../../Cards/stories/UserStoryInterface";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

interface UpdateStoryProps {
    isOpen: boolean;
    story: UserStoryInterface;
    handleClose: () => void;

}

export const UpdateStoryDialog: React.FC<UpdateStoryProps> = ({isOpen, story, handleClose}) => {
    const [title, setTitle] = React.useState(story.title);
    const [description, setDescription] = React.useState(story.description);
    const [estimation, setEstimation] = React.useState(story.estimation);

    const {updateUserStory} = useActions();
    const {data, error, loading} = useTypedSelector((state: any) => state.updateUserStory);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUserStory({
            _id: story._id,
            creationDate: new Date(),
            listIndex: story.listIndex,
            position: story.position,
            title: title,
            description: description,
            estimation: estimation
        });

        handleClose();
    };


    const body = (
        <Dialog
            fullWidth
            maxWidth="md"
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <form onSubmit={onSubmit}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <span className={"modal-title"}>Update User Story</span>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <div className={'form-group'}>
                                <label>User Story</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    name="title"
                                    placeholder="Enter user story"
                                    className={'form-control form-control-light story-title'}
                                    id="task-title"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="form-group">
                                <label>Estimation</label>
                                <select
                                    value={estimation} onChange={(e) => setEstimation(parseInt(e.target.value))}
                                    className="form-control form-control-light"
                                    id="task-priority2"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control form-control-light story-description"
                                    id="task-description"
                                    rows={3}
                                    cols={5}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <button
                        className={'btn btn-light'}
                        onClick={handleClose}
                        color="secondary"
                    >
                        Cancel
                    </button>
                    <button
                        className={'btn btn-primary'}
                        type="submit" value="Submit"
                        color="primary"
                    >
                        Subscribe
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    );

    return (
        <>

            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
}
