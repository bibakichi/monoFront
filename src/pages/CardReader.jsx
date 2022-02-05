import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import actions from '../actions';

export default function App() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.cardReader.userId);

    return (
        <Box >
            <Input
                value={userId}
                onChange={(event) => dispatch(
                    actions.cardReader.setUserId(event.target.value)
                )}
            />

        </Box>
    );
}
