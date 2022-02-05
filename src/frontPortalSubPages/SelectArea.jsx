import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import actions from '../actions';

export default function SelectArea() {
    const dispatch = useDispatch();
    const area = useSelector((state) => state.timecard.area);
    const areaState = useSelector((state) => state.timecard.areaState);

    const CheckLabel = ({ areaName, small = false }) =>
        <FormControlLabel
            disabled={areaState[areaName]?.full}
            sx={{ pb: 4 }}
            control={
                <Checkbox
                    checked={(!areaState[areaName]?.full) & area[areaName] ? true : false}
                    onChange={(event) =>
                        dispatch(actions.timecard.setArea(areaName, event.target.checked))
                    }
                    sx={{
                        color: "primary.main",
                        transform: small ? "scale(1.2)" : "scale(1.5)",
                    }}
                />
            }
            label={
                <Typography
                    variant={small ? "h5" : "h4"}
                    color={(areaState[areaName]?.full) ? "#aaa" : "primary"}
                    sx={{
                        textDecoration: (areaState[areaName]?.full) ? 'line-through' : 'none',
                    }}
                >
                    {areaName}
                </Typography>
            }
        />

    const People = ({ areaName }) => (areaState[areaName]?.full) ?
        <Typography variant="h5" color="error">
            満員
        </Typography>
        :
        <Typography variant="h5" color="#aaa">
            あと{areaState[areaName]?.num}名
        </Typography>

    return (
        <FormGroup>
            <Typography
                variant="h3"
                sx={{ py: 6 }}
                align="center"
            >
                どこで作業をしますか？
            </Typography>
            <Container maxWidth="sm">
                <Grid container spacing={4}>
                    <Grid item xs={3} >
                        <Typography variant="h5" align="right" color="#aaa">
                            １階
                        </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <CheckLabel areaName="軽作業エリア" />
                    </Grid>
                    <Grid item xs={3} >
                        <People areaName="軽作業エリア" />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3} />
                    <Grid item xs={6} >
                        <CheckLabel areaName="金属エリア" />
                    </Grid>
                    <Grid item xs={3} >
                        <People areaName="金属エリア" />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3} />
                    <Grid item xs={6} >
                        <CheckLabel areaName="木工エリア" />
                    </Grid>
                    <Grid item xs={3} >
                        <People areaName="木工エリア" />
                    </Grid>
                </Grid>
                <Box p={1} />
                <Grid container spacing={4}>
                    <Grid item xs={3} >
                        <Typography variant="h5" align="right" color="#aaa">
                            地下１階
                        </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <CheckLabel areaName="電子工作室" />
                    </Grid>
                    <Grid item xs={3} >
                        <People areaName="電子工作室" />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3} />
                    <Grid item xs={6} >
                        <CheckLabel areaName="ミーティングルーム" small />
                    </Grid>
                    <Grid item xs={3} >
                        <People areaName="ミーティングルーム" />
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{
                mx: 'auto',
                position: 'absolute',
                bottom: '10px',
                width: '100%',
                textAlign: 'center',
            }}>
                <Button
                    onClick={() => dispatch(actions.frontPortal.next())}
                    variant="contained"
                    sx={{ py: 2, px: 4 }}
                >
                    <Typography variant="h4">
                        次へ
                    </Typography>
                </Button>
            </Box>
        </FormGroup>
    );
}
