import React, {useEffect, useReducer} from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {UserStory} from "../../Cards/stories/userStory";
import Grid from '@material-ui/core/Grid';
import {UserStoryInterface} from "../../../interfaces/UserStoryInterface";
import {useActions} from "../../../hooks/useActions";
import {UpdateStoryDialog} from "../../popup-dialog/stories-dialog/updateStoryDialog";
import {ShowStoryDialog} from "../../popup-dialog/stories-dialog/showStoryDialog";
import {StoryDialog} from "../../popup-dialog/stories-dialog/storyDialog";

interface ExplorationBoardProps {
    userStoriesData: UserStoryInterface[];
    createNew: boolean;
    handleCloseCreationModal: () => void;
}


const statenUserStories = (data: UserStoryInterface[]) => {
    const res = {'us0': [], 'us1': [], 'us2': [], 'us3': []};

    if (data.length > 0) {
        const maxListIndex = data.map(cell => cell.listIndex).reduce(function (prev, current) {
            return (prev > current) ? prev : current
        });

        Array(maxListIndex + 1).fill(0).map((_, i) => (
            data
                .filter(x => x.listIndex === i)
                .sort(function (a, b) {
                    return (a.position > b.position ? 1 : -1)
                })
                .map((x) => (

                    // @ts-ignore
                    res['us' + x.listIndex].push(x)

                ))
        ));
    }

    return res;
};

export const ExplorationBoard: React.FC<ExplorationBoardProps> = ({
                                                                      userStoriesData,
                                                                      createNew,
                                                                      handleCloseCreationModal
                                                                  }) => {

    const LIST_INDEX = {
        'us0': 0,
        'us1': 1,
        'us2': 2,
        'us3': 3
    }

    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const [storyToUpdate, setStoryToUpdate] = React.useState<UserStoryInterface>();

    const [openShowDialog, setOpenShowDialog] = React.useState(false);
    const [storyToShow, setStoryToShow] = React.useState<UserStoryInterface>();

    const [userStories, setUserStories] = React.useState<any>();

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const {updateBoardAction} = useActions();

    useEffect(() => {
        const us = statenUserStories(userStoriesData);
        setUserStories(us);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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

            // @ts-ignore
            sourceItems.forEach(function (story: UserStoryInterface, position: number) {
                story.position = position
            });

            userStories[source.droppableId] = sourceItems;

            setUserStories(userStories);

            board = sourceItems;
            updateBoardAction(board);

        } else {
            // @ts-ignore
            const sourceItems = Array.from(userStories[source.droppableId]);
            const [sourceCell] = sourceItems.splice(result.source.index, 1);

            // @ts-ignore
            const destinationItems = Array.from(userStories[destination.droppableId]);
            destinationItems.splice(destination.index, 0, sourceCell);

            board = ({
                ...userStories,
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destinationItems
            });

            userStories[source.droppableId] = sourceItems;
            userStories[destination.droppableId] = destinationItems;
            setUserStories(userStories);

            // @ts-ignore
            sourceItems.forEach(function (story: UserStoryInterface, position: number) {
                story.position = position
            });
            try {
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


    const handleShowStory = (userStory: UserStoryInterface) => {
        setStoryToShow(userStory);
        setOpenShowDialog(true);
    }

    const handleDialogClose = () => {
        setStoryToUpdate(undefined);
        setOpenUpdateDialog(false);
    }


    const handleShowCloseDialog = () => {
        setStoryToShow(undefined);
        setOpenShowDialog(false);
    }

    const handleDeleteStory = async (deletedStory: UserStoryInterface) => {
        const listIndexName = 'us'.concat(String(deletedStory.listIndex));
        // @ts-ignore
        if (LIST_INDEX[listIndexName] !== undefined) {
            const sourceItems = Array.from(userStories[listIndexName]);
            sourceItems.splice(deletedStory.position, 1);

            // @ts-ignore
            sourceItems.forEach(function (story: UserStoryInterface, position: number) {
                story.position = position
            });
            userStories[listIndexName] = sourceItems;
            await setUserStories(userStories);
            forceUpdate();
        }
    }


    const handleAfterCreation = (createdUserStory: UserStoryInterface) => {
        const listIndexName = 'us'.concat(String(createdUserStory.listIndex));
        // @ts-ignore
        if (LIST_INDEX[listIndexName] !== undefined) {

            // @ts-ignore
            const sourceItems = Array.from(userStories[listIndexName]);

            sourceItems.splice(0, 0, createdUserStory);

            // @ts-ignore
            sourceItems.forEach(function (story: UserStoryInterface, position: number) {
                story.position = position
            });

            userStories[listIndexName] = sourceItems;
            setUserStories(userStories);
        }
    }

    const handleUpdateCard = (story: UserStoryInterface, userStoryUpdated: UserStoryInterface) => {
        story.title = userStoryUpdated.title;
        story.description = userStoryUpdated.description;
        story.estimation = userStoryUpdated.estimation;
        story.creationDate = userStoryUpdated.creationDate;
    }

    const handleAfterUpdate = (userStoryUpdated: UserStoryInterface) => {
        const listIndexName = 'us'.concat(String(userStoryUpdated.listIndex));
        // @ts-ignore
        if (LIST_INDEX[listIndexName] !== undefined) {
            // @ts-ignore
            const sourceItems: UserStoryInterface[] = Array.from(userStories[listIndexName]);
            // @ts-ignore
            sourceItems.filter((y) => y._id === userStoryUpdated._id).map((story: UserStoryInterface) => handleUpdateCard(story, userStoryUpdated));
            userStories[listIndexName] = sourceItems;
            setUserStories(userStories);
        }
    }

    return (
        <>

            {storyToUpdate &&
            <UpdateStoryDialog isOpen={openUpdateDialog} story={storyToUpdate} handleClose={handleDialogClose}
                               handleAfterUpdate={handleAfterUpdate}/>
            }

            {storyToShow &&
            <ShowStoryDialog isOpen={openShowDialog} story={storyToShow} handleClose={handleShowCloseDialog}/>
            }

            <StoryDialog openCreationModal={createNew} handleCloseCreationModal={handleCloseCreationModal}
                         handleAfterCreation={handleAfterCreation}/>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Grid item xs={12} lg={3} md={6} sm={6}>
                    <Droppable droppableId="us0">
                        {(provided) => (
                            <div
                                className="us0 exploration-drop"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {
                                    userStories &&

                                    userStories.us0.map((userStory: UserStoryInterface, index: number) => {
                                        return (
                                            <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                        <UserStory story={userStory}
                                   handleEdit={() => handleStoryEdit(userStory)}
                                   handleShow={() => handleShowStory(userStory)}
                                   handleAfterDelete={handleDeleteStory}
                        />
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
                                {userStories &&
                                userStories.us1.map((userStory: UserStoryInterface, index: number) => {
                                    return (
                                        <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                            {(provided) => (
                                                <span
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                        <UserStory story={userStory}
                                   handleEdit={() => handleStoryEdit(userStory)}
                                   handleShow={() => handleShowStory(userStory)}
                                   handleAfterDelete={handleDeleteStory}
                        />
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
                                {
                                    userStories &&
                                    userStories.us2.map((userStory: UserStoryInterface, index: number) => {
                                        return (
                                            <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                        <UserStory story={userStory}
                                   handleEdit={() => handleStoryEdit(userStory)}
                                   handleShow={() => handleShowStory(userStory)}
                                   handleAfterDelete={handleDeleteStory}
                        />
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
                                {userStories &&
                                userStories.us3.map((userStory: UserStoryInterface, index: number) => {
                                    return (
                                        <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                            {(provided) => (
                                                <span
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                        <UserStory story={userStory}
                                   handleEdit={() => handleStoryEdit(userStory)}
                                   handleShow={() => handleShowStory(userStory)}
                                   handleAfterDelete={handleDeleteStory}
                        />
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
        </>
    );
}