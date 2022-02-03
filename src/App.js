import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Route, Routes } from "react-router-dom";

import CardReader from './pages/CardReader';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', height: '100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="受付画面" {...a11yProps(0)} />
        <Tab label="ライセンス" {...a11yProps(1)} />
        <Tab label="設備" {...a11yProps(2)} />
        <Tab label="イベント" {...a11yProps(3)} />
        <Tab label="学部別 人数" {...a11yProps(4)} />
        <Tab label="残業" {...a11yProps(5)} />
      </Tabs>
      <Routes>
        <Route exact path="/" component={() => <CardReader />} />
        <Route exact path="/bbb" component={() => <div>BBB</div>} />
        <Route exact path="/ccc" component={() => <div>CCC</div>} />
      </Routes>
    </Box>
  );
}
