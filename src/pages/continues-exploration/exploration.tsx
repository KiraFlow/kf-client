import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StoryDialog from '../../components/popup-dialog/stories-dialog/storyDialog';
import {useEffect} from "react";
import {useActions} from "../../hooks/useActions";
import {UserStoryInterface} from "../../components/Cards/stories/UserStoryInterface";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import './exploration.css';
import {UpdateStoryDialog} from "../../components/popup-dialog/stories-dialog/updateStoryDialog";
import {ShowStoryDialog} from "../../components/popup-dialog/stories-dialog/showStoryDialog";
import {ExplorationBoard} from "../../components/Boards/explorationBoard";

const useFetching = () => {

    const {loadUserStories} = useActions();

    useEffect(() => {
        loadUserStories();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

}

export const Exploration = () => {



    const {data, error, loading} = useTypedSelector((state: any) => state.loadUserStories);

    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const [storyToUpdate, setStoryToUpdate] = React.useState<UserStoryInterface>();

    const [openShowDialog, setOpenShowDialog] = React.useState(false);
    const [storyToShow, setStoryToShow] = React.useState<UserStoryInterface>();

    const {updateBoardAction} = useActions();


    useFetching();



    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h6">Continues Exploration</Typography>
                </Grid>

                <Grid item xs={6}>

                    <StoryDialog/>
                </Grid>
            </Grid>


            <Grid container spacing={3}>
                {error && <h3>error</h3>}

                {loading && <h3>loading user stories</h3>}

                {!error && !loading &&

                    <ExplorationBoard userStoriesData={data}/>

                }
            </Grid>
        </>
    );
};

