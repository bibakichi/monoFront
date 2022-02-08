import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

import Links from './pages/Links';
import Preview from './pages/Preview';

export default function App() {
  const location = useLocation();
  const theme = useTheme();
  const isLandscape = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box sx={{ height: '100vh', maxWidth: '100vw', }}>
      <Grid container>
        {isLandscape ?
          <Grid
            item
            xs={12} md={2} xl={1}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              height: '100%',
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={location.pathname}
              sx={{
                background: '#fff',
                border: 1,
                borderColor: 'divider',
                height: '100vh',
              }}
            >
              <Tab component={Link} label="編集" to="/" value="/" />
              <Tab component={Link} label="プレビュー" to="/preview" value="/preview" />
            </Tabs>
          </Grid> :
          null
        }
        <Grid
          item
          xs={12}
          md={10}
          xl={11}
        >
          <Box sx={{
            overflowWrap: 'break-word',
          }}>
            <Routes>
              <Route path="/" element={<Links />} />
              <Route path="/preview" element={<Preview />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
