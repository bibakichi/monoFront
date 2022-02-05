import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import actions from '../actions';

export default function CompleteLargePrinter() {
    const dispatch = useDispatch();
    return (
        <Box sx={{
            textAlign: 'center',
        }}>
            <Typography
                variant="h3"
                sx={{ pt: 20, mb: 10 }}
                align="center"
            >
                受付カウンターへお越しください！
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
