import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

import actions from '../actions';
import Entrance from '../frontPortalSubPages/Entrance';
import SelectArea from '../frontPortalSubPages/SelectArea';
import CardReader from '../frontPortalSubPages/CardReader';
import ForgetCard from '../frontPortalSubPages/ForgetCard';
import CompleteVisitTogether from '../frontPortalSubPages/CompleteVisitTogether';
import CompleteLargePrinter from '../frontPortalSubPages/CompleteLargePrinter';


const Page = ({ pageId }) => {
    let pageComponent;
    switch (pageId) {
        case "ENTRANCE":
            pageComponent = <Entrance />;
            break
        case "CARD_READER":
            pageComponent = <CardReader />;
            break;
        case "FORGET_CARD":
            pageComponent = <ForgetCard />;
            break;
        case "SELECT_AREA":
            pageComponent = <SelectArea />;
            break;
        case "COMPLETE_VISIT_TOGETHER":
            pageComponent = <CompleteVisitTogether />;
            break;
        case "COMPLETE_LARGE_PRINTER":
            pageComponent = <CompleteLargePrinter />;
            break;
        default:
            console.log('サブページ「' + pageId + '」が存在しません');
            pageComponent = <Entrance />;
    }
    return (
        <Paper sx={{
            ml: '2%',
            width: '96%',
            mt: '5px',
            height: '93vh',
        }}>
            {pageComponent}
        </Paper>
    );
}

export default function DotsMobileStepper() {
    const dispatch = useDispatch();
    const inputText = useSelector((state) => state.frontPortal.inputText);
    const pageIds = useSelector((state) => state.frontPortal.pageIds);
    const step = useSelector((state) => state.frontPortal.step);
    const nextButtonEnable = useSelector((state) => state.frontPortal.nextButtonEnable);
    const inputEl = React.useRef(null);
    const theme = useTheme();

    React.useEffect(() => {
        dispatch(actions.frontPortal.init());
    }, [dispatch]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                background: '#eee',
            }}
            onClick={() => {
                if (pageIds[step] !== "FORGET_CARD") {
                    inputEl.current.focus();
                }
            }}
        >
            {
                (pageIds[step] !== "FORGET_CARD") ?
                    <Input
                        autoFocus
                        inputRef={inputEl}
                        value={inputText}
                        onChange={(event) => dispatch(actions.frontPortal.setInputText(event.target.value))}
                        onKeyDown={event => {
                            if (event.keyCode === 13) {
                                // エンターキー押下時の処理
                                dispatch(actions.frontPortal.submitInputText());
                            }
                        }}
                        sx={{
                            zIndex: 10,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    />
                    : null
            }
            <SwipeableViews
                disabled
                index={step}
                style={{ height: '100vh', maxHeight: '100vh', }}
            >
                {
                    pageIds.map(pageId =>
                        <Page pageId={pageId} key={pageId} />
                    )
                }
            </SwipeableViews>
            <MobileStepper
                variant="dots"
                steps={pageIds.length}
                position="bottom"
                activeStep={step}
                sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    background: 'none',
                }}
                nextButton={
                    <Button
                        size="small"
                        onClick={() => dispatch(actions.frontPortal.next())}
                        disabled={!nextButtonEnable}
                    >
                        次へ
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={() => dispatch(actions.frontPortal.back())}
                        disabled={step === 0}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        戻る
                    </Button>
                }
            />
        </Box>
    );
}
