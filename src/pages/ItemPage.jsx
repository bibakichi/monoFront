import * as React from 'react';
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Button from '@mui/material/Button';

const ItemPages = () => {
    const categories = useSelector(state => state.links.categories);
    return (
        <Container sx={{
            height: '100vh',
            scrollSnapAlign: 'start',
            overflowY: 'hidden',
        }}>
            <h1 style={{ paddingTop: '20px', textAlign: 'center' }}>
                Items
            </h1>
            <Grid container spacing={2} sx={{ p: 1 }}>
                {categories["商品"]?.map((item, index) =>
                    <Items
                        key={index}
                        index={index}
                        item={item}
                    />
                )}
            </Grid>
        </Container>
    );
}
export default ItemPages;


const Items = ({ index, item, }) => {
    return (
        <Grid item xs={6} md={4} lg={3}>
            <Card sx={{ mt: 2, }} >
                <CardActionArea
                >
                    <CardMedia
                        component="img"
                        height="100"
                        image={item.image1}
                    />
                </CardActionArea>
                <CardContent>
                    <h3>
                        {item.title}
                    </h3>
                    <h5>
                        {item.subTitle}
                    </h5>
                    {item.text}
                </CardContent>
                <CardActions>
                    <Button>
                        購入
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
