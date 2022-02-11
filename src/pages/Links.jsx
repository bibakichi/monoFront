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
import DialogContentText from '@mui/material/DialogContentText';
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CopyToClipBoard from 'react-copy-to-clipboard';
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
        <>
            <Box sx={{ background: '#fafafa' }}>
                <Container sx={{ minHeight: '100vh', }}>
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
        </>
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
                            order={item.order}
                            title={item.title}
                            url={item.url}
                            imageUrl={item.imageUrl}
                            text={item.text}
                            index={index}
                        />
                    )}
                </Grid>
            </Collapse >
        </Card>
    );
}

const MyCard = (props) => {
    const { category, text, title, url, imageUrl, index } = props;
    const dispatch = useDispatch();
    const ref = React.useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'KIMURA',
        drop(ballItem) {
            if (!ref.current) {
                return;
            }
            const catcherItem = props;
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
        item: () => ({ ...props }),
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
                    href={url}
                    target="_blank"
                >
                    <CardMedia
                        component="img"
                        height="100"
                        image={imageUrl}
                    />
                </CardActionArea>
                <CardContent>
                    <Link
                        href={url}
                        target="_blank"
                        sx={{
                            textDecoration: 'none',
                        }}
                    >
                        <Typography variant="h6" >
                            {title}
                        </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        {text}
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
                    <CopyToClipBoard text={url}>
                        <Button size="small" color="primary">
                            URLをコピー
                        </Button>
                    </CopyToClipBoard>
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
    const {
        category,
        text,
        title,
        url,
        imageUrl,
    } = newFlag ? newItem : categories[selectCategory][selectIndex];
    return (
        <Dialog
            sx={{ zIndex: 999 }}
            open={open ? true : false}
            onClose={() => dispatch(actions.links.closeDialog())}
        >
            <DialogContent>
                <DialogContentText sx={{ pb: 2, }} >
                    頻繁にアクセスするWebページを登録すると、全員で共有できます
                </DialogContentText>
                {newFlag ?
                    <TextField
                        margin="dense"
                        label="カテゴリー"
                        variant="outlined"
                        value={category}
                        onChange={(event) => dispatch(actions.links.edit('category', event.target.value))}
                    />
                    : null
                }
                <TextField
                    margin="dense"
                    label="タイトル"
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(event) => dispatch(actions.links.edit('title', event.target.value))}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="URL"
                    fullWidth
                    variant="outlined"
                    value={url}
                    onChange={(event) => dispatch(actions.links.edit('url', event.target.value))}
                />
                <TextField
                    margin="dense"
                    label="文章"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={text}
                    onChange={(event) => dispatch(actions.links.edit('text', event.target.value))}
                />
                <FileUploader
                    url={imageUrl}
                    onChange={newUrl => dispatch(actions.links.edit('imageUrl', newUrl))}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color="error"
                    onClick={() => dispatch(actions.links.delete())}
                >
                    削除
                </Button>
                <Button onClick={() => dispatch(actions.links.closeDialog())} >
                    キャンセル
                </Button>
                <Button onClick={() => dispatch(actions.links.post())} >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
