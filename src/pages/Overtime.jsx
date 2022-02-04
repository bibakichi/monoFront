import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import actions from '../actions';

export default function App() {
    const dispatch = useDispatch();
    const timecard = useSelector((state) => state.user.timecard);

    React.useEffect(() => {
        dispatch(actions.user.timecard.get(null, null, null));
    }, []);

    return (
        <Box >
            {JSON.stringify(timecard)}
        </Box>
    );
}
