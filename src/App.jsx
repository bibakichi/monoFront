import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

import FrontPortal from './pages/FrontPortal';
import License from './pages/License';
import Reservation from './pages/Reservation';
import Record from './pages/Record';
import Overtime from './pages/Overtime';
import Event from './pages/Event';
import Links from './pages/Links';
import Master from './pages/Master';
import MasterEvent from './pages/MasterEvent';
import MasterLicense from './pages/MasterLicense';
import MasterMachine from './pages/MasterMachine';

export default function App() {
  const location = useLocation();
  const theme = useTheme();
  const isLandscape = useMediaQuery(theme.breakpoints.up('lg'));
  const [tabDisplay, setTabDisplay] = React.useState(false);
  const [tabTimeout, setTabTimeout] = React.useState(false);
  //################################################################
  React.useEffect(() => {
    if (location.pathname === "/frontPortal") {
      //受付画面ではメニューを非表示にする
      window.setTimeout(() => setTabDisplay(false), 2000);
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
    if (location.pathname === "/frontPortal") {
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
      sx={{ height: '100vh', maxWidth: '100vw', }}
      onContextMenu={handleRightClick}
    >
      <Grid container>
        {
          tabDisplay ?
            <Grid
              item
              xs={12} lg={2} xl={1}
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                height: '100%',
              }}
            >
              <Tabs
                orientation={isLandscape ? "vertical" : "horizontal"}
                variant="scrollable"
                value={location.pathname}
                sx={{
                  background: '#fff',
                  border: 1,
                  borderColor: 'divider',
                  height: isLandscape ? '100vh' : 'auto',
                }}
              >
                <Tab component={Link} label="リンク集" to="/" value="/" />
                <Tab component={Link} label="受付画面" to="/frontPortal" value="/frontPortal" />
                <Tab component={Link} label="ユーザー登録" to="/license" value="/license" />
                <Tab component={Link} label="予約状況" to="/reservation " value="/reservation" />
                <Tab component={Link} label="利用簿" to="/record" value="/record" />
                <Tab component={Link} label="残業" to="/overtime" value="/overtime" />
                <Tab component={Link} label="イベント編集" to="/event" value="/event" />
                <Tab component={Link} label="マスター編集" to="/master" value="/master" />
              </Tabs>
            </Grid>
            : null
        }
        <Grid
          item
          xs={12}
          lg={tabDisplay ? 10 : 12}
          xl={tabDisplay ? 11 : 12}
        >
          <Box sx={{
            overflowWrap: 'break-word',
          }}>
            <Routes>
              <Route path="/" element={<Links />} />
              <Route exact path="/frontPortal" element={<FrontPortal />} />
              <Route exact path="/license" element={<License />} />
              <Route exact path="/reservation" element={<Reservation />} />
              <Route exact path="/record" element={<Record />} />
              <Route exact path="/overtime" element={<Overtime />} />
              <Route exact path="/event" element={<Event />} />
              <Route exact path="/master" element={<Master />} />
              <Route exact path="/master/event" element={<MasterEvent />} />
              <Route exact path="/master/license" element={<MasterLicense />} />
              <Route exact path="/master/machine" element={<MasterMachine />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
