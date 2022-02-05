import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import actions from '../actions';

export default function CompleteVisitTogether() {
    const dispatch = useDispatch();
    return (
        <Box sx={{
            textAlign: 'center',
        }}>
            <Typography
                variant="h3"
                sx={{ pt: 20, mb: 5 }}
                align="center"
            >
                まずは施設内を見学してみませんか？
            </Typography>
            <Typography
                variant="h3"
                sx={{ mb: 10 }}
                align="center"
            >
                受付カウンターでお待ちしております！
            </Typography>
            <Button
                onClick={() => dispatch(actions.frontPortal.init())}
                variant="contained"
                sx={{ py: 2, px: 4 }}
            >
                <Typography variant="h4">
                    OK
                </Typography>
            </Button>
        </Box>
    );
}
