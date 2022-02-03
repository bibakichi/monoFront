import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

import CardReader from './pages/CardReader';
import License from './pages/License';
import Events from './pages/Events';
import Overtime from './pages/Overtime';
import Record from './pages/Record';
import Machines from './pages/Machines';

export default function App() {
  const location = useLocation();
  const theme = useTheme();
  const isLandscape = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Grid container sx={{ height: '100%', }}>
      <Grid item xs={12} lg={2} xl={1}>
        <Tabs
          orientation={isLandscape ? "vertical" : "horizontal"}
          variant="scrollable"
          value={location.pathname}
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            height: isLandscape ? '97%' : 'auto',
          }}
        >
          <Tab component={Link} label="受付画面" to="/" value="/" />
          <Tab component={Link} label="ライセンス" to="/license" value="/license" />
          <Tab component={Link} label="設備" to="/machines" value="/machines" />
          <Tab component={Link} label="イベント" to="/events" value="/events" />
          <Tab component={Link} label="学部別 人数" to="/record" value="/record" />
          <Tab component={Link} label="残業" to="/overtime" value="/overtime" />
        </Tabs>
      </Grid>
      <Grid item xs={12} lg={10} xl={11}>
        <Box sx={{
          overflowWrap: 'break-word',
        }}>
          <Routes>
            <Route exact path="/" element={<CardReader />} />
            <Route exact path="/license" element={<License />} />
            <Route exact path="/machines" element={<Machines />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/record" element={<Record />} />
            <Route exact path="/overtime" element={<Overtime />} />
          </Routes>
        </Box>
      </Grid>
    </Grid>
  );
}
