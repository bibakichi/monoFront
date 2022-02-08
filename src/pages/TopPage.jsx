import * as React from 'react';
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const TopPage = () => {
    const categories = useSelector(state => state.links.categories);
    if (!categories["トップ"]) return <div />;
    if (!categories["トップ"]?.length > 0) return <div />;
    if (!categories["トップ"][0]) return <div />;
    const item = categories["トップ"][0];
    return (
        <Box sx={{
            height: '100vh',
            scrollSnapAlign: 'start',
            overflowY: 'hidden',
        }}>
            <Container>
                <h1 style={{ paddingTop: '20px', fontSize: '80px', textAlign: 'center' }}>
                    {item.title}
                </h1>
                <h1 style={{ textAlign: 'center' }}>
                    {item.subTitle}
                </h1>
                {item.text}
                <Grid container spacing={2} >
                    <Grid item xs={3} >
                        <img alt="" src={item.image1} style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={3} >
                        <img alt="" src={item.image2} style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={3} >
                        <img alt="" src={item.image3} style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={3} >
                        <img alt="" src={item.image4} style={{ width: '100%' }} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default TopPage;