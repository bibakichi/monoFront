import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const SubPages = ({ index, item, }) => {
    return (
        <Box sx={{
            height: '100vh',
            scrollSnapAlign: 'start',
            overflowY: 'hidden',
        }}>
            <Container>
                <h3 style={{ paddingTop: '20px' }}>
                    {item.title}
                </h3>
                {item.text}
                <Box>
                    {item.image1 ?
                        <img alt="" src={item.image1} /> :
                        null
                    }
                    {item.image2 ?
                        <img alt="" src={item.image2} /> :
                        null
                    }
                    {item.image3 ?
                        <img alt="" src={item.image3} /> :
                        null
                    }
                    {item.image4 ?
                        <img alt="" src={item.image4} /> :
                        null
                    }
                </Box>
            </Container>
        </Box>
    );
}
export default SubPages;