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
import UndergraduateRecord from './pages/UndergraduateRecord';
import MachinesRecord from './pages/MachinesRecord';
import Machines from './pages/Machines';

export default function App() {
  const location = useLocation();
  const theme = useTheme();
  const isLandscape = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Grid container>
      <Grid item xs={12} lg={2} xl={1}>
        <Tabs
          orientation={isLandscape ? "vertical" : "horizontal"}
          variant="scrollable"
          value={location.pathname}
          sx={{
            border: 1,
            borderColor: 'divider',
            height: isLandscape ? '97vh' : 'auto',
          }}
        >
          <Tab component={Link} label="受付画面" to="/" value="/" />
          <Tab component={Link} label="ライセンス" to="/license" value="/license" />
          <Tab component={Link} label="設備" to="/machines" value="/machines" />
          <Tab component={Link} label="イベント" to="/events" value="/events" />
          <Tab component={Link} label="機械記録" to="/machines_record" value="/machines_record" />
          <Tab component={Link} label="学部記録" to="/undergraduate_record" value="/undergraduate_record" />
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
            <Route exact path="/machines_record" element={<MachinesRecord />} />
            <Route exact path="/undergraduate_record" element={<UndergraduateRecord />} />
            <Route exact path="/overtime" element={<Overtime />} />
          </Routes>
        </Box>
      </Grid>
    </Grid>
  );
}
