import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import actions from '../actions';

export default function CardReader() {
    const dispatch = useDispatch();
    return (
        <Box sx={{
            textAlign: 'center',
        }}>
            <ArrowDropUpIcon sx={{ fontSize: "300px" }} />
            <Typography
                variant="h3"
                sx={{ mb: 10, }}
                align="center"
            >
                学生証<small>（または職員証）</small>をタッチしてください
            </Typography>
            <Button
                onClick={() => dispatch(actions.frontPortal.forgetCard())}
                variant="outlined"
                sx={{ py: 1, px: 3 }}
            >
                <Typography variant="h5">
                    学生証を忘れた
                </Typography>
            </Button>
        </Box>
    );
}
