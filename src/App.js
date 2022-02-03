import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, Route, Routes, useLocation } from "react-router-dom";

import CardReader from './pages/CardReader';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  return (
    <Box
      sx={{ display: 'flex', height: '100vh', width: '100vw', }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={location.pathname}
        sx={{ flexGrow: 1, borderRight: 1, borderColor: 'divider' }}
      >
        <Tab component={Link} label="受付画面" to="/" value="/" />
        <Tab component={Link} label="ライセンス" to="/license" value="/license" />
        <Tab component={Link} label="設備" to="/machines" value="/machines" />
        <Tab component={Link} label="イベント" to="/events" value="/events" />
        <Tab component={Link} label="学部別 人数" to="/record" value="/record" />
        <Tab component={Link} label="残業" to="/overtime" value="/overtime" />
      </Tabs>
      <Box
        sx={{ flexGrow: 10, height: '100%', }}
      >
        <Routes>
          <Route exact path="/license" component={() => <CardReader />} />
          <Route component={NotFound} />
        </Routes>
      </Box>
    </Box>
  );
}
