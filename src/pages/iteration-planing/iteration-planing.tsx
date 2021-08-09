import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {UserStory} from "../../components/Cards/stories/userStory";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IterationDialog from '../../components/popup-dialog/iteration-dialog/iterationDialog';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {UserStoryInterface} from "../../interfaces/UserStoryInterface";
import './iteration-planing.css';
import {PlaningBoard} from "../../components/Boards/iteration-planing/planingBoard";


const useFetching = () => {

    const {loadUserStories} = useActions();

    useEffect(() => {
        loadUserStories();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

}

export const IterationPlaning = () => {

    const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

    const handleCloseCreationModal = () => {
        setOpenCreateDialog(false);
    }

    const {data, error, loading} = useTypedSelector((state: any) => state.loadUserStories);

    useFetching();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6">Continues Exploration</Typography>
        </Grid>

        <Grid item xs={6}>
          <IterationDialog />
        </Grid>
      </Grid>

        {error && <h3>error</h3>}

        {loading && <h3>loading user stories</h3>}

        {!error && !loading &&
            <PlaningBoard userStoriesData={data} />
        }
    </>
  );
};

