import React from 'react';
import { Grid } from "@mui/material/";

function ProfileWall() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '50vh' }}
        >

            <Grid item xs={3}>
                Please Login to view this page
            </Grid>

        </Grid>
    );
}

export default ProfileWall;