import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import actions from '../actions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
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


export default function Links() {
    const dispatch = useDispatch();
    const categorizedItems = useSelector((state) => state.links.categorizedItems);
    React.useEffect(() => {
        dispatch(actions.links.get());
    }, [dispatch]);
    return (
        <>
            <Container sx={{ minHeight: '100vh', }}>
                <List>
                    {Object.keys(categorizedItems)?.map((category, index) =>
                        <Category
                            key={category}
                            category={category}
                            defaultOpen={index === 0}
                        />
                    )}
                </List>
                <MyDialog />
            </Container>
            <Container sx={{
                position: 'absolute',
                bottom: '20px',
                textAlign: 'right',
                pointerEvents: 'none',
            }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ pointerEvents: 'auto', mr: '20px', }}
                    onClick={() => dispatch(actions.links.setNewLinkId())}
                >
                    <AddIcon />
                </Fab>
            </Container>
        </>
    );
}
const Category = ({ category, defaultOpen }) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const categorizedItems = useSelector((state) => state.links.categorizedItems);
    return (
        <>
            <ListItemButton
                onClick={() => setOpen(!open)}
                sx={{ mt: 3 }}
            >
                {open ?
                    <ExpandLess sx={{ fontSize: '50px' }} /> :
                    <ExpandMore sx={{ fontSize: '50px' }} />
                }
                <Typography variant="h4">
                    {category}
                </Typography>
            </ListItemButton>
            <Collapse in={open} sx={{ pb: 3 }}>
                <Grid container spacing={2}>
                    {categorizedItems[category]?.map(item =>
                        <MultiActionAreaCard
                            key={item.linkId}
                            linkId={item.linkId}
                            title={item.title}
                            url={item.url}
                            imageUrl={item.imageUrl}
                            text={item.text}
                        />
                    )}
                </Grid>
            </Collapse >
        </>
    );
}

const MultiActionAreaCard = ({ linkId, text, title, url, imageUrl, }) => {
    const dispatch = useDispatch();
    return (
        <Grid item xs={6} md={4} lg={3} >
            <Card sx={{ mt: 2 }}>
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
                        onClick={() => dispatch(actions.links.setLinkId(linkId))}
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
    const linkId = useSelector((state) => state.links.linkId);
    const title = useSelector((state) => state.links.title);
    const category = useSelector((state) => state.links.category);
    const imageUrl = useSelector((state) => state.links.imageUrl);
    const url = useSelector((state) => state.links.url);
    const text = useSelector((state) => state.links.text);
    return (
        <Dialog
            open={linkId ? true : false}
            onClose={() => dispatch(actions.links.setLinkId(null))}
        >
            <DialogTitle>編集</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ pb: 2, }} >
                    頻繁にアクセスするWebページを登録すると、全員で共有できます
                </DialogContentText>
                <TextField
                    margin="dense"
                    label="カテゴリー"
                    variant="outlined"
                    value={category}
                    onChange={(event) => dispatch(actions.links.setCategory(event.target.value))}
                />
                <TextField
                    margin="dense"
                    label="タイトル"
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(event) => dispatch(actions.links.setTitle(event.target.value))}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="URL"
                    fullWidth
                    variant="outlined"
                    value={url}
                    onChange={(event) => dispatch(actions.links.setUrl(event.target.value))}
                />
                <TextField
                    margin="dense"
                    label="画像のURL"
                    fullWidth
                    variant="outlined"
                    value={imageUrl}
                    onChange={(event) => dispatch(actions.links.setImageUrl(event.target.value))}
                />
                <TextField
                    margin="dense"
                    label="文章"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={text}
                    onChange={(event) => dispatch(actions.links.setText(event.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color="error"
                    onClick={() => dispatch(actions.links.delete())}
                >
                    削除
                </Button>
                <Button onClick={() => dispatch(actions.links.setLinkId(null))} >
                    キャンセル
                </Button>
                <Button onClick={() => dispatch(actions.links.post())} >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
