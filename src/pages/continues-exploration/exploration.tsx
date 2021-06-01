import React, {useState} from 'react';
import {UserStory} from "../../components/Cards/stories/userStory";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StoryDialog from '../../components/popup-dialog/stories-dialog/storyDialog';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {useEffect} from "react";
import {useActions} from "../../hooks/useActions";
import {UserStoryInterface} from "../../components/Cards/stories/UserStoryInterface";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import './exploration.css';

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

export const Exploration = () => {

    const {data, error, loading} = useTypedSelector((state: any) => state.loadUserStories);



        const userStories = statenUserStories(data);
        const [state, setState] = useState({
            'us0': userStories['us0'],
            'us1': userStories['us1'],
            'us2': userStories['us2'],
            'us3': userStories['us3']
        });

        console.log(data[0]);

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
                    <StoryDialog/>
                </Grid>
            </Grid>


            <Grid container spacing={3}>

                {error && <h3>error</h3>}

                {loading && <h3>loading user stories</h3>}

                {!error && !loading &&

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Grid item xs={12} lg={3} md={6} sm={6}>
                        <Droppable droppableId="us0">
                            {(provided) => (
                                <div
                                    className="us0 exploration-drop"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {userStories.us0.map(({_id, title}: any, index: number) => {
                                        return (
                                            <Draggable key={_id} draggableId={_id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                            <UserStory title={title}/>
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

                    <Grid item xs={12} lg={3} md={6} sm={6}>
                        <Droppable droppableId="us1">
                            {(provided) => (
                                <div
                                    className="us1 exploration-drop"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {userStories.us1.map(({_id, title}, index) => {
                                        return (
                                            <Draggable key={_id} draggableId={_id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                            <UserStory title={title}/>
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

                    <Grid item xs={12} lg={3} md={6} sm={6}>
                        <Droppable droppableId="us2">
                            {(provided) => (
                                <div
                                    className="us2 exploration-drop"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {userStories.us2.map(({_id, title}, index) => {
                                        return (
                                            <Draggable key={_id} draggableId={_id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                            <UserStory title={title}/>
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

                    <Grid item xs={12} lg={3} md={6} sm={6}>
                        <Droppable droppableId="us3">
                            {(provided) => (
                                <div
                                    className="us3 exploration-drop"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {userStories.us3.map(({_id, title}, index) => {
                                        return (
                                            <Draggable key={_id} draggableId={_id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                            <UserStory title={title}/>
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
                </DragDropContext>
                }
            </Grid>
        </>
    );
};

