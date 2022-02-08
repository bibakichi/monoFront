import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDrag, useDrop } from 'react-dnd';

import FileUploader from '../components/FileUploader';
import actions from '../actions';

export default function Links() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.links.categories);
    React.useEffect(() => {
        dispatch(actions.links.get());
    }, [dispatch]);
    return (
        <Box sx={{ height: '100vh', overflowY: 'scroll' }}>
            <Box sx={{ background: '#eee', }}>
                <Container sx={{ minHeight: '100vh', pt: '40px', }}>
                    <Typography variant="h4">
                        綾杉珈琲 管理ページ
                    </Typography>
                    <Typography>
                        ドラッグ＆ドロップすることで、順序を入れ替えることができます。
                    </Typography>
                    <List>
                        {Object.keys(categories)?.map((category, index) =>
                            <Category
                                key={category}
                                category={category}
                                items={categories[category]}
                                defaultOpen={index === 0}
                            />
                        )}
                    </List>
                </Container>
            </Box>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '50px',
                }}
                onClick={() => dispatch(actions.links.openDialog(null, null))}
            >
                <AddIcon />
            </Fab>
            <MyDialog />
        </Box>
    );
}
const Category = ({ category, items, defaultOpen }) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const dispatch = useDispatch();
    const ref = React.useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'KIMURA',
        drop(ballItem) {
            if (!ref.current) {
                return;
            }
            const catcherItem = {
                category,
                index: 0,
            };
            dispatch(actions.links.move(ballItem, catcherItem));
            ballItem.index = catcherItem?.index;
            setOpen(true);
            console.log(handlerId);
        },
    });
    drop(ref);
    return (
        <Card sx={{ px: 2, py: 2, my: 4, }}>
            <ListItemButton onClick={() => setOpen(!open)} ref={ref}>
                {open ?
                    <ExpandLess sx={{ fontSize: '30px' }} /> :
                    <ExpandMore sx={{ fontSize: '30px' }} />
                }
                <Typography variant="h5">
                    {category}
                </Typography>
            </ListItemButton>
            <Collapse in={open}>
                <Grid container spacing={2}>
                    {items?.map((item, index) =>
                        <MyCard
                            key={category + '/' + items.order + '/' + index}
                            category={category}
                            index={index}
                            item={{
                                ...item,
                                category,
                                index,
                            }}
                        />
                    )}
                </Grid>
            </Collapse >
        </Card>
    );
}

const MyCard = ({ category, index, item }) => {
    const dispatch = useDispatch();
    const ref = React.useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'KIMURA',
        drop(ballItem) {
            if (!ref.current) {
                return;
            }
            const catcherItem = item;
            if (ballItem?.category === catcherItem?.category && ballItem?.index === catcherItem?.index) {
                return;//アイテムを自分自身に置き換えない
            }
            dispatch(actions.links.move(ballItem, catcherItem));
            ballItem.index = catcherItem?.index;
            console.log(handlerId);
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'KIMURA',
        item: () => ({ ...item }),
    });
    drag(drop(ref));
    return (
        <Grid item xs={6} md={4} lg={3} >
            <Card
                ref={ref}
                sx={{
                    mt: 2,
                    opacity: isDragging ? 0 : 1,
                    cursor: 'grab',
                }}
            >
                <CardActionArea
                    onClick={() => dispatch(actions.links.openDialog(category, index))}
                >
                    <CardMedia
                        component="img"
                        height="100"
                        image={item.image1}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography variant="h6" >
                        {item.title}
                    </Typography>
                    <Typography  >
                        {item.subTitle}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            maxHeight: '70px',
                            overflow: 'hidden',
                        }}
                    >
                        {item.text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => dispatch(actions.links.openDialog(category, index))}
                        size="small"
                        color="primary"
                    >
                        編集
                    </Button>
                    <Button
                        color="error"
                        onClick={() => dispatch(actions.links.delete(category, index))}
                    >
                        削除
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

const MyDialog = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state?.links?.openDialog);
    const selectCategory = useSelector(state => state?.links?.select?.category);
    const selectIndex = useSelector(state => state?.links?.select?.index);
    const newItem = useSelector(state => state?.links?.newItem);
    const categories = useSelector(state => state?.links?.categories);
    const newFlag = useSelector(state => state?.links?.select?.new);
    const item = newFlag ? newItem : categories[selectCategory][selectIndex];
    return (
        <Dialog
            sx={{ zIndex: 999 }}
            open={open ? true : false}
            onClose={() => {
                if (newFlag) {
                    dispatch(actions.links.closeDialog());
                }
                else {
                    dispatch(actions.links.post());
                }
            }}
        >
            <DialogContent>
                {newFlag ?
                    <TextField
                        margin="dense"
                        label="カテゴリー"
                        variant="outlined"
                        value={item.category}
                        onChange={(event) => dispatch(actions.links.edit('category', event.target.value))}
                    />
                    : null
                }
                <TextField
                    autoFocus
                    margin="dense"
                    label="タイトル"
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    value={item.title}
                    onChange={(event) => dispatch(actions.links.edit('title', event.target.value))}
                />
                <TextField
                    margin="dense"
                    label="サブタイトル"
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    value={item.subTitle}
                    onChange={(event) => dispatch(actions.links.edit('subTitle', event.target.value))}
                />
                <TextField
                    margin="dense"
                    label="クリックしたときにジャンプするURL"
                    fullWidth
                    variant="outlined"
                    value={item.url}
                    onChange={(event) => dispatch(actions.links.edit('url', event.target.value))}
                />
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={6} >
                        <FileUploader
                            url={item.image1}
                            onChange={newUrl => dispatch(actions.links.edit('image1', newUrl))}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <FileUploader
                            url={item.image2}
                            onChange={newUrl => dispatch(actions.links.edit('image2', newUrl))}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <FileUploader
                            url={item.image3}
                            onChange={newUrl => dispatch(actions.links.edit('image3', newUrl))}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <FileUploader
                            url={item.image4}
                            onChange={newUrl => dispatch(actions.links.edit('image4', newUrl))}
                        />
                    </Grid>
                </Grid>
                <TextField
                    margin="dense"
                    label="文章"
                    multiline
                    rows={16}
                    fullWidth
                    variant="outlined"
                    value={item.text}
                    onChange={(event) => dispatch(actions.links.edit('text', event.target.value))}
                />
            </DialogContent>
            <DialogActions>
                {newFlag ?
                    <Button onClick={() => dispatch(actions.links.closeDialog())} >
                        キャンセル
                    </Button>
                    : null
                }
                <Button onClick={() => dispatch(actions.links.post())} >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
