import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import actions from '../actions';

export default function ForgetCard() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.timecard.userId);
    return (
        <Box sx={{ textAlign: 'center', height: '100%', }}  >
            <Typography
                variant="h4"
                sx={{ pt: 10, mb: 7 }}
                align="center"
            >
                学籍番号<small>（または職員番号）</small>を入力してください
            </Typography>
            <Typography
                variant="h4"
                align="left"
                sx={{
                    mx: 'auto',
                    width: '200px',
                    height: '40px',
                    p: 1,
                    border: 'solid 2px',
                    borderRadius: '5px',
                }}
            >
                {userId}
            </Typography>
            <Box sx={{
                position: 'absolute',
                width: '96vw',
                bottom: '90px',
            }}    >
                <Box sx={{
                    width: '50%',
                    mx: 'auto',
                    transform: "scale(2.0)",
                }} >
                    <Keyboard
                        newLineOnEnter
                        onChange={(input) => dispatch(
                            actions.timecard.setUserId(input)
                        )}
                        layout={{
                            default: [
                                "1 2 3 4 5 6 7 8 9 0 {bksp}",
                                "Q W E R T Y U I O P",
                                "A S D F G H J K L",
                                " Z X C V B N M {enter}",
                            ],
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
