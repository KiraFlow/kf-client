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

const userStoriesDummyData: UserStoryInterface[] = [
  {
    _id: 'gary',
    title: 'Gary Goodspeed',
    position: 0,
    listIndex: 0,
    estimation: 1,
    creationDate: new Date(),
    description: 'de'

  },
  {
    _id: 'cato',
    title: 'Little Cato',
    position: 1,
    listIndex: 0,
    creationDate: new Date(),
    estimation: 1,
    description: 'de'

  },
  {
    _id: 'kvn',
    title: 'KVN',
    position: 2,
    listIndex: 0,
    creationDate: new Date(),
    estimation: 1,
    description: 'de'

  },
  {
    _id: 'mooncake',
    title: 'Mooncake',
    position: 3,
    listIndex: 0,
    creationDate: new Date(),
    estimation: 1,
    description: 'de'

  },
  {
    _id: 'hello',
    title: 'hello now',
    position: 4,
    listIndex: 0,
    creationDate: new Date(),
    estimation: 1,
    description: 'de'

  },
  {
    _id: 'brow',
    title: 'brown',
    position: 0,
    listIndex: 1,
    creationDate: new Date(),
    estimation: 1,
    description: 'de'


  },
  {
    _id: 'cow',
    title: 'cow',
    position: 1,
    listIndex: 1,
    creationDate: new Date(),
    estimation: 1,
    description: 'de'

  }

];


const whatever: UserStoryInterface[] = [

  {
    _id: 'sixsix',
    title: 'KVN',
    position: 2,
    listIndex: 0,
    creationDate: new Date(),
    estimation: 1,
    description: 'de'

  }
];

const useFetching = () => {

  const {loadUserStories} = useActions();

  useEffect(() => {
    loadUserStories();

  }, []);
}

const statenUserStories = (data: UserStoryInterface[]) => {
  const res = {'us0': [], 'us1': [], 'us2': [], 'us3': []};

  if (data.length > 0) {
    const maxListIndex = data.map(cell => cell.listIndex).reduce(function (prev, current) {
      return (prev > current) ? prev : current
    });

    Array(maxListIndex + 1).fill(0).map((_, i) => {
      data
          .filter(x => x.listIndex === i)
          .sort(function (a, b) {
            return (a.position > b.position ? 1 : -1)
          })
          .map(x => {

            // @ts-ignore
            res['us' + x.listIndex].push(x);

          })
    });
  }
  return res;
};

 export const IterationPlaning = () => {

   const userStories = statenUserStories(userStoriesDummyData);
   const [state, setState] = useState({
     'usx': whatever,
     'us0': userStories['us0'],
     'us1': userStories['us1'],
     'us2': userStories['us2'],
     'us3': userStories['us3']
   });

   const {data, error, loading} = useTypedSelector((state: any) => state.loadUserStories);
   useFetching();


   function handleOnDragEnd(result: any) {

     if (!result.destination) return;
     const destination = result.destination;
     const source = result.source;

     if (destination.droppableId === source.droppableId) {
       // @ts-ignore
       const sourceItems = Array.from(state[source.droppableId]);
       const [sourceCell] = sourceItems.splice(result.source.index, 1);
       sourceItems.splice(result.destination.index, 0, sourceCell);
       setState(state => ({...state, [destination.droppableId]: sourceItems}))
     } else {
       // @ts-ignore
       const sourceItems = Array.from(state[source.droppableId]);
       const [sourceCell] = sourceItems.splice(result.source.index, 1);

       // @ts-ignore
       const destinationItems = Array.from(state[destination.droppableId]);
       destinationItems.splice(destination.index, 0, sourceCell);
       setState(state => ({
         ...state,
         [source.droppableId]: sourceItems,
         [destination.droppableId]: destinationItems
       }));
     }

   }

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

      <Grid container spacing={2}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className={'tasks'}>
              <h5 className={'task-header'}>User Stories (2)</h5>
            </div>

            <div className={'stories-list ustories'}>
              <Droppable droppableId="usx">
                {(provided) => (
                  <div
                    className="usx drop-x"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {state.usx.map(({_id, title }, index) => {
                      return (
                        <Draggable key={_id} draggableId={_id} index={index}>
                          {(provided) => (
                            <span
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                            <UserStory title={title} id={_id}/>
                            </span>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </Grid>

          <Grid item xl={8} lg={8} md={8} sm={12} xs={12} className={'usg'}>
            <div className={'tasks'}>
              <h5 className={'task-header'}>Velocity: 0</h5>
            </div>
            <div className={'tasks tasksDrag d-md-none'}>
              <h5 className={'mt-0 task-header'}>High Value / High Cost</h5>
            </div>
            <Grid container spacing={2} className={'row'}>
              <span className={'hv'}>high value</span>
              <span className={'hc'}>high cost</span>

              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={'left-block drop'}
              >
                <Droppable droppableId="us0">
                  {(provided) => (
                    <div
                      className="us0 drop-v"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {state.us0.map(({_id, title }, index) => {
                        return (
                          <Draggable key={_id} draggableId={_id} index={index}>
                            {(provided) => (
                              <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                            <UserStory title={title} id={_id}/>
                              </span>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>

              <span className={'lc'}>low cost</span>
              <div className={'tasks tasksDrag d-md-none'}>
                <h5 className={'mt-0 task-header'}>High value / Low Cost</h5>
              </div>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={'right-block drop'}
              >
                <Droppable droppableId="us1">
                  {(provided) => (
                    <div
                      className="us1 drop-v"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {state.us1.map(({_id, title }, index) => {
                        return (
                          <Draggable key={_id} draggableId={_id} index={index}>
                            {(provided) => (
                              <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                            <UserStory title={title} id={_id}/>
                              </span>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>
            </Grid>
            <Grid container spacing={2} className={'row'}>
              <span className={'lv'}>low value</span>
              <div className={'tasks tasksDrag d-md-none'}>
                <h5 className={'mt-0 task-header'}>Low Value / High Cost</h5>
              </div>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={'up-block drop'}
              >
                <Droppable droppableId="us2">
                  {(provided) => (
                    <div
                      className="us2 under-drop drop-v"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {state.us2.map(({_id, title }, index) => {
                        return (
                          <Draggable key={_id} draggableId={_id} index={index}>
                            {(provided) => (
                              <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                            <UserStory title={title} id={_id}/>
                              </span>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>
              <div className={'tasks tasksDrag d-md-none'}>
                <h5 className={'mt-0 task-header'}>Low Value / High Cost</h5>
              </div>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={'down-block drop'}
              >
                <Droppable droppableId="us3">
                  {(provided) => (
                    <div
                      className="us3 under-drop drop-v"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {state.us3.map(({_id, title }, index) => {
                        return (
                          <Draggable key={_id} draggableId={_id} index={index}>
                            {(provided) => (
                              <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                            <UserStory title={title} id={_id}/>
                              </span>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>
            </Grid>
          </Grid>
        </DragDropContext>
      </Grid>
    </>
  );
};
