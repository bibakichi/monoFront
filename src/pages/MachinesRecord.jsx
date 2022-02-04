import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import actions from '../actions';

import TableMachinesRecord from '../components/TableMachinesRecord';

export default function MachinesRecord() {
    const dispatch = useDispatch();
    const year = useSelector((state) => state.user.timecard.filter.year);
    const month = useSelector((state) => state.user.timecard.filter.month);
    const machinesRecords = useSelector((state) => state.user.timecard.machinesRecords);

    React.useEffect(() => {
        dispatch(actions.user.timecard.get());
    }, [dispatch]);

    return (
        <>
            <Container maxWidth="sm" sx={{ py: 2 }}>
                <Stack spacing={2} direction="row">
                    <Input
                        value={year}
                        onChange={
                            (event) =>
                                dispatch(actions.user.timecard.filter.setYear(event.target.value))
                        }
                        variant="standard"
                        sx={{ width: '70px' }}
                        endAdornment={<InputAdornment position="end">年</InputAdornment>}
                    />
                    <Input
                        value={month}
                        onChange={
                            (event) =>
                                dispatch(actions.user.timecard.filter.setMonth(event.target.value))
                        }
                        variant="standard"
                        sx={{ width: '50px' }}
                        endAdornment={<InputAdornment position="end">月</InputAdornment>}
                    />
                    <Button
                        variant="contained"
                        onClick={() => dispatch(actions.user.timecard.get())}
                    >
                        更新
                    </Button>
                </Stack>
            </Container>
            <TableMachinesRecord rows={machinesRecords} />
        </>
    );
}
