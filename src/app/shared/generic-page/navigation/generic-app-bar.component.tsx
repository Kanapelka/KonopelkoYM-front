import React, { ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import LeftSection from './left-section.component';
import RightSection from './right-section.component';

import '../generic-pge.styles.sass';


interface GenericAppBarProps {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

// I strongly recommend pass LeftSection + RightSection
// to display left and right side navigation!
function GenericAppBar({ leftSection, rightSection }: GenericAppBarProps) {
  return (
    <AppBar style={{ zIndex: 1201 }}>
      <Toolbar className="app-bar-toolbar" variant="dense">
        {leftSection || <LeftSection />}
        {rightSection || <RightSection />}
      </Toolbar>
    </AppBar>
  );
}

export default GenericAppBar;
