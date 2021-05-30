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


const userStoriesDummyData: UserStoryInterface[] = [
    {
        id: 'gary',
        title: 'Gary Goodspeed',
        position: 0,
        listIndex: 0
    },
    {
        id: 'cato',
        title: 'Little Cato',
        position: 1,
        listIndex: 0
    },
    {
        id: 'kvn',
        title: 'KVN',
        position: 2,
        listIndex: 0
    },
    {
        id: 'mooncake',
        title: 'Mooncake',
        position: 3,
        listIndex: 0
    },
    {
        id: 'hello',
        title: 'hello now',
        position: 4,
        listIndex: 0
    },
    {
        id: 'brow',
        title: 'brown',
        position: 0,
        listIndex: 1
    },
    {
        id: 'cow',
        title: 'cow',
        position: 1,
        listIndex: 1
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

export const Exploration = () => {

    const userStories = statenUserStories(userStoriesDummyData);
    const [state, setState] = useState({
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
                    <StoryDialog/>
                </Grid>
            </Grid>


            <Grid container spacing={3}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Grid item xs={12} lg={3} md={6} sm={6}>
                        <Droppable droppableId="us0">
                            {(provided) => (
                                <div
                                    className="us0 exploration-drop"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {state.us0.map(({id, title}, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
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
                                    {state.us1.map(({id, title}, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
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
                                {state.us2.map(({id, title}, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
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
                                {state.us3.map(({id, title}, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
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

            </Grid>
        </>
    );
};

