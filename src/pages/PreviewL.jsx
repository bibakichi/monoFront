import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';

import actions from '../actions';
import TopPage from './TopPage';
import SubPages from './SubPages';
import ItemPages from './ItemPage';

export default function Preview() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.links.categories);
    const [snap, setSnap] = React.useState(false);
    React.useEffect(() => {
        dispatch(actions.links.get());
        window.setTimeout(() => {
            setSnap(true);
        }, 500);
    }, [dispatch]);
    return (
        <Box
            sx={{
                background: '#fff',
                mx: 'auto',
                overflowX: 'hidden',
                overflowY: 'scroll',
                height: '100vh',
                scrollSnapType: snap ? 'y mandatory' : '',
            }}
        >
            <TopPage />
            {categories["ページ"]?.map((item, index) =>
                <SubPages
                    key={index}
                    index={index}
                    item={item}
                />
            )}
            <ItemPages />
        </Box>
    );
}