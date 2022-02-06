import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import actions from '../actions';

import DataTable from '../components/DataTable';
import DownloadButton from '../components/DownloadButton';

export default function MachinesRecord() {
    const dispatch = useDispatch();
    const year = useSelector((state) => state.timecard.year);
    const month = useSelector((state) => state.timecard.month);
    const rows = useSelector((state) => state.machinesRecords.rows);

    React.useEffect(() => {
        const setup = async () => {
            const today = new Date();
            await dispatch(actions.timecard.setUserId('ALL'));
            await dispatch(actions.timecard.setYear(String(today.getFullYear())));
            await dispatch(actions.timecard.setMonth(String(today.getMonth() + 1)));
            await dispatch(actions.timecard.setDate('ALL'));
            await dispatch(actions.timecard.get());
        }
        setup()
    }, [dispatch]);

    return (
        <>
            <Container maxWidth="sm" sx={{ py: 2, }}>
                <Stack spacing={2} direction="row">
                    <Input
                        value={year}
                        onChange={(event) => dispatch(
                            actions.timecard.setYear(event.target.value)
                        )}
                        sx={{ width: '70px' }}
                        endAdornment={<InputAdornment position="end">年</InputAdornment>}
                    />
                    <Input
                        value={month}
                        onChange={(event) => dispatch(
                            actions.timecard.setMonth(event.target.value)
                        )}
                        sx={{ width: '70px' }}
                        endAdornment={<InputAdornment position="end">月</InputAdornment>}
                    />
                    <Button
                        variant="contained"
                        onClick={() => dispatch(actions.timecard.get())}
                    >
                        情報取得
                    </Button>
                </Stack>
            </Container>
            <DataTable rows={rows} />
            {
                (rows.length > 0) ? null :
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                        データがありません
                    </Box>
            }
            <DownloadButton rows={rows} />
        </>
    );
}
