import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {UserStory} from "../../components/Cards/stories/userStory";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IterationDialog from '../../components/popup-dialog/iteration-dialog/iterationDialog';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {UserStoryInterface} from "../../components/Cards/stories/UserStoryInterface";
import './iteration-planing.css';
import {PlaningBoard} from "../../components/Boards/iteration-planing/planingBoard";



export const IterationPlaning = () => {


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

     <PlaningBoard />
    </>
  );
};

