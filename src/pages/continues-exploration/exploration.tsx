import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useEffect} from "react";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import './exploration.css';
import {ExplorationBoard} from "../../components/Boards/exploration/explorationBoard";
import Button from "@material-ui/core/Button";

const useFetching = () => {

    const {loadUserStories} = useActions();

    useEffect(() => {
        loadUserStories();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

}

export const Exploration = () => {

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

                    <Button
                        variant="contained"
                        color="primary"
                        style={{float: 'right'}}
                        onClick={() => setOpenCreateDialog(true)}
                    >
                        Add New
                    </Button>

                </Grid>
            </Grid>


            <Grid container spacing={3}>
                {error && <h3>error</h3>}

                {loading && <h3>loading user stories</h3>}

                {!error && !loading &&

                    <ExplorationBoard userStoriesData={data} createNew={openCreateDialog} handleCloseCreationModal={handleCloseCreationModal}/>

                }
            </Grid>
        </>
    );
};

