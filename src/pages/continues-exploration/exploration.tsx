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
import {UpdateStoryDialog} from "../../components/popup-dialog/stories-dialog/updateStoryDialog";
import {ShowStoryDialog} from "../../components/popup-dialog/stories-dialog/showStoryDialog";

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

    const LIST_INDEX = {
        'us0': 0,
        'us1': 1,
        'us2': 2,
        'us3': 3
    }

    const {data, error, loading} = useTypedSelector((state: any) => state.loadUserStories);

    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const [storyToUpdate, setStoryToUpdate] = React.useState<UserStoryInterface>();

    const [openShowDialog, setOpenShowDialog] = React.useState(false);
    const [storyToShow, setStoryToShow] = React.useState<UserStoryInterface>();

    const {updateBoardAction} = useActions();

    const userStories = statenUserStories(data);


    const [state, setState] = useState({
        'reloadBoard': false
    });

    useFetching();

    function handleOnDragEnd(result: any) {

        if (!result.destination) return;
        const destination = result.destination;
        const source = result.source;
        let board = null;
        if (destination.droppableId === source.droppableId) {
            // @ts-ignore
            const sourceItems = Array.from(userStories[source.droppableId]);
            const [sourceCell] = sourceItems.splice(result.source.index, 1);
            sourceItems.splice(result.destination.index, 0, sourceCell);
            setState(state => ({'reloadBoard': true}));

            // @ts-ignore
            sourceItems.forEach(function (story: UserStoryInterface, position: number) {
                story.position = position
            });

            board = sourceItems;
            updateBoardAction(board);

        } else {
            // @ts-ignore
            const sourceItems = Array.from(userStories[source.droppableId]);
            const [sourceCell] = sourceItems.splice(result.source.index, 1);

            // @ts-ignore
            const destinationItems = Array.from(userStories[destination.droppableId]);
            destinationItems.splice(destination.index, 0, sourceCell);
            setState(state => ({'reloadBoard': true}));

            board = ({
                ...userStories,
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destinationItems
            });


            // @ts-ignore
            sourceItems.forEach(function (story: UserStoryInterface, position: number) {
                story.position = position
            });
            try{
                // @ts-ignore
                const destinationList = LIST_INDEX[destination.droppableId]

                // @ts-ignore
                destinationItems.forEach(function (story: UserStoryInterface, position: number) {
                    story.position = position
                    story.listIndex = destinationList
                });

                board = sourceItems.concat(destinationItems);

                if (!board) return;
                updateBoardAction(board);

            } catch (e) {
                console.log(e);
            }
        }
    }


    const handleStoryEdit = (userStory: UserStoryInterface) => {
        setStoryToUpdate(userStory);
        setOpenUpdateDialog(true);
    }

    const handleDialogClose = () => {
        setStoryToUpdate(undefined);
        setOpenUpdateDialog(false);
    }

    const handleShowStory = (userStory: UserStoryInterface) => {
        setStoryToShow(userStory);
        setOpenShowDialog(true);
    }

    const handleShowCloseDialog = () => {
        setStoryToShow(undefined);
        setOpenShowDialog(false);
    }


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h6">Continues Exploration</Typography>
                </Grid>

                <Grid item xs={6}>

                    {storyToUpdate &&
                    <UpdateStoryDialog isOpen={openUpdateDialog} story={storyToUpdate} handleClose={handleDialogClose}/>
                    }

                    {storyToShow &&
                    <ShowStoryDialog isOpen={openShowDialog} story={storyToShow} handleClose={handleShowCloseDialog}/>
                    }

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
                                    {userStories.us0.map((userStory: UserStoryInterface, index: number) => {
                                        return (
                                            <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                            <UserStory story={userStory}
                                       handleEdit={() => handleStoryEdit(userStory)} handleShow={() => handleShowStory(userStory)}/>
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
                                    {userStories.us1.map((userStory: UserStoryInterface, index) => {
                                        return (
                                            <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                            <UserStory story={userStory}
                                       handleEdit={() => handleStoryEdit(userStory)} handleShow={() => handleShowStory(userStory)}/>
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
                                    {userStories.us2.map((userStory: UserStoryInterface, index) => {
                                        return (
                                            <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                            <UserStory story={userStory}
                                       handleEdit={() => handleStoryEdit(userStory)} handleShow={() => handleShowStory(userStory)}/>
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
                                    {userStories.us3.map((userStory: UserStoryInterface, index) => {
                                        return (
                                            <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                            <UserStory story={userStory}
                                       handleEdit={() => handleStoryEdit(userStory)} handleShow={() => handleShowStory(userStory)}/>
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

