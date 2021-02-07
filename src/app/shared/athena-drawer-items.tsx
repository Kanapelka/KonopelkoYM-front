import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';

import DrawerItem from './generic-page/drawer/drawer-item';

const drawerItems: DrawerItem[] = [
  new DrawerItem('Dashboards', <DashboardIcon /> , '/dashboard'),
];

export default drawerItems;
