import React, { ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import LeftSection from './left-section.component';
import RightSection from './right-section.component';


interface GenericSubNavProps {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

function GenericSubNav({ leftSection, rightSection }: GenericSubNavProps) {
  const styles: React.CSSProperties = { backgroundColor: 'rgb(249, 249, 250)', color: 'black', paddingTop: '48px' };

  return (
    <AppBar style={styles} position="absolute">
      <Toolbar className="app-bar-toolbar sub-nav-toolbar" variant="dense">
        {leftSection || <LeftSection />}
        {rightSection || <RightSection />}
      </Toolbar>
    </AppBar>
  );
}

export default GenericSubNav;
