import * as React from 'react';
import { useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import actions from '../actions';

export default function Entrance() {
    const dispatch = useDispatch();

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', }}>
            <Typography
                variant="h3"
                sx={{ py: 6 }}
                align="center"
            >
                ようこそ　<br />ものづくりセンターへ！
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={6} >
                    <Button
                        onClick={() => dispatch(actions.frontPortal.selectNewUser())}
                        variant="contained"
                        sx={{ my: 6, py: 2, px: 4 }}
                    >
                        <Typography variant="h4">
                            はじめて
                        </Typography>
                    </Button>
                    <Button
                        onClick={() => dispatch(actions.frontPortal.selectLargePrint())}
                        variant="contained"
                        sx={{ my: 6, py: 2, px: 4 }}
                    >
                        <Typography variant="h4">
                            大判プリント
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={6} >
                    <Button
                        onClick={() => dispatch(actions.frontPortal.selectReserved())}
                        variant="contained"
                        sx={{ my: 6, py: 2, px: 4 }}
                    >
                        <Typography variant="h4">
                            予約済み
                        </Typography>
                    </Button>
                    <Button
                        onClick={() => dispatch(actions.frontPortal.selectNotReserved())}
                        variant="contained"
                        sx={{ my: 6, py: 2, px: 4 }}
                    >
                        <Typography variant="h4">
                            予約していない
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
