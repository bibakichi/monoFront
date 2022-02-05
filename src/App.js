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
import Event from './pages/Event';
import Overtime from './pages/Overtime';
import UndergraduateRecord from './pages/UndergraduateRecord';
import MachineRecord from './pages/MachineRecord';
import Machine from './pages/Machine';

export default function App() {
  const location = useLocation();
  const theme = useTheme();
  const isLandscape = useMediaQuery(theme.breakpoints.up('lg'));
  const [tabDisplay, setTabDisplay] = React.useState(true);
  const [tabTimeout, setTabTimeout] = React.useState(false);
  //################################################################
  React.useEffect(() => {
    if (location.pathname === "/") {
      //受付画面ではメニューを非表示にする
      setTabDisplay(false);
      //ブラウザバックも無効化
      window.history.pushState(null, null, location.href);
      window.addEventListener('popstate', (e) => {
        window.history.go(1);
      });
    }
    else {
      //管理画面ではメニューを常に表示
      setTabDisplay(true);
    }
  }, [location.pathname, location.href, tabTimeout]);
  //################################################################
  const handleRightClick = () => {
    if (location.pathname === "/") {
      //受付画面では右クリックでメニューを表示できる
      if (tabDisplay) {
        setTabDisplay(false);
      }
      else {
        setTabDisplay(true);
        //２秒後に非表示（tabTimeoutに変化を与えて、useEffectを発火させる）
        window.setTimeout(() => setTabTimeout(!tabTimeout), 2000);
      }
    }
    else {
      //管理画面ではメニューを常に表示
      setTabDisplay(true);
    }
  };
  //################################################################
  return (
    <Box
      sx={{ minHeight: '100%' }}
      onContextMenu={handleRightClick}
      onDoubleClick={handleRightClick}
    >
      <Grid container>
        <Grid item xs={12} lg={2} xl={1} >
          <Tabs
            orientation={isLandscape ? "vertical" : "horizontal"}
            variant="scrollable"
            value={location.pathname}
            sx={{
              border: 1,
              borderColor: 'divider',
              height: isLandscape ? '97vh' : 'auto',
              visibility: tabDisplay ? 'visible' : 'hidden',
            }}
          >
            <Tab component={Link} label="受付画面" to="/" value="/" />
            <Tab component={Link} label="ライセンス" to="/license" value="/license" />
            <Tab component={Link} label="設備予約状況" to="/machine" value="/machine" />
            <Tab component={Link} label="講習予約状況" to="/event" value="/event" />
            <Tab component={Link} label="職員予約状況" to="/staff" value="/staff" />
            <Tab component={Link} label="設備記録" to="/machine_record" value="/machine_record" />
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
              <Route exact path="/machine" element={<Machine />} />
              <Route exact path="/event" element={<Event />} />
              <Route exact path="/machine_record" element={<MachineRecord />} />
              <Route exact path="/undergraduate_record" element={<UndergraduateRecord />} />
              <Route exact path="/overtime" element={<Overtime />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
