import React, { useState } from 'react';
import { Layout } from 'react-grid-layout';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';

import FixedSizeContent from '../shared/fixed-size-page/fixed-size-content.component';
import DashboardDraggableGrid, { defaultLayout } from './dahsboard-grid/dashboard-draggable-grid.component';
import GenericSubNav from '../shared/generic-page/navigation/generic-sub-nav-component';
import LeftSection from '../shared/generic-page/navigation/left-section.component';
import RightSection from '../shared/generic-page/navigation/right-section.component';
import TooltipButton from '../shared/tooltipped-buttons/tooltip-button.component';
import LocalStorageService from '../services/LocalStorageService';
import Constants from '../Constatns';

import './dahsboard-page.styles.sass';


function DashboardPage() {
  const localLayout: Layout[] = LocalStorageService.GetFromStorage<any>(Constants.LocalStorage.DASHBOARD_LAYOUT);
  const [layout, setLayout] = useState(localLayout || defaultLayout);


  function onLayoutChange(newLayout: Layout[]): void {
    setLayout([...newLayout]);
    LocalStorageService.PutToStorage<any>(Constants.LocalStorage.DASHBOARD_LAYOUT, newLayout);
  }

  function refreshLayout() {
    onLayoutChange(defaultLayout);
  }

  const leftSection = <LeftSection><Typography variant="h6">Личный кабинет</Typography></LeftSection>;
  const rightSection = (
    <RightSection>
      <TooltipButton icon={<CachedIcon />} onClick={refreshLayout} tooltip="Сбросить" color="default" />
    </RightSection>
  );

  return (
    <>
      <GenericSubNav leftSection={leftSection} rightSection={rightSection} />
      <FixedSizeContent>
        <Container className="dashboard-container">
          <DashboardDraggableGrid layout={layout} onLayoutChange={onLayoutChange} />
        </Container>
      </FixedSizeContent>
    </>
  );
}

export default DashboardPage;
