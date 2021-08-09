import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {UserStory} from "../../Cards/stories/userStory";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import {UserStoryInterface} from "../../../interfaces/UserStoryInterface";

const useFetching = () => {

    const {loadUserStories} = useActions();

    useEffect(() => {
        loadUserStories();

    }, []);
}

const statenUserStories = (data: UserStoryInterface[]) => {
    const res = {'us0': [], 'us1': [], 'us2': [], 'us3': [], 'us4': []};

    if (data.length > 0) {
        const maxListIndex = data.map(cell => cell.planing.listIndex).reduce(function (prev, current) {
            return (prev > current) ? prev : current
        });

        Array(maxListIndex + 1).fill(0).map((_, i) => {
            data
                .filter(x => x.planing.listIndex === i)
                .sort(function (a, b) {
                    return (a.planing.position > b.planing.position ? 1 : -1)
                })
                .map(x => {

                    // @ts-ignore
                    res['us' + x.planing.listIndex].push(x);

                })
        });
    }
    return res;
};



interface PlaningBoardProps {
    userStoriesData: UserStoryInterface[];
}

export const PlaningBoard: React.FC<PlaningBoardProps> = ({
                                                              userStoriesData
                                                              }) => {
    const [userStories, setUserStories] = React.useState<any>();

    useEffect(() => {
        const us = statenUserStories(userStoriesData);
        setUserStories(us);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {updateBoardAction} = useActions();

    const LIST_INDEX = {
        'us0': 0,
        'us1': 1,
        'us2': 2,
        'us3': 3,
        'us4': 4
    }

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
                story.planing.position = position
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
                    story.planing.position = position
                    story.planing.listIndex = destinationList
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
        console.log('boo');
    }

    const handleShowStory = (userStory: UserStoryInterface) => {
        console.log('boo');
    }

    const handleDeleteStory = (deletedStory: UserStoryInterface) => {
        console.log('boo');
    }

    return (
        <Grid container spacing={2}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <div className={'tasks'}>
                        <h5 className={'task-header'}>User Stories (2)</h5>
                    </div>

                    <div className={'stories-list ustories'}>
                        <Droppable droppableId="us0">
                            {(provided) => (
                                <div
                                    className="us0 drop-x"
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
                            <Droppable droppableId="us1">
                                {(provided) => (
                                    <div
                                        className="us1 drop-v"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            userStories &&
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
                            <Droppable droppableId="us2">
                                {(provided) => (
                                    <div
                                        className="us2 drop-v"
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
                            <Droppable droppableId="us3">
                                {(provided) => (
                                    <div
                                        className="us3 under-drop drop-v"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            userStories &&
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
                            <Droppable droppableId="us4">
                                {(provided) => (
                                    <div
                                        className="us4 under-drop drop-v"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            userStories &&
                                            userStories.us4.map((userStory: UserStoryInterface, index: number) => {
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
                    </Grid>
                </Grid>
            </DragDropContext>
        </Grid>
    );
}

