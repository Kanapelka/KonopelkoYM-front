import React from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import { IContainerProps } from '../Props';


interface TabPanelProps extends IContainerProps {
  value: number;
  index: number;
}

function TabPanel({
  children, className, value, index,
}: TabPanelProps) {
  const theme = useTheme();

  return (
    <div className={className} role="tabpanel" hidden={value !== index} dir={theme.direction}>
      {value === index && children}
    </div>
  );
}

export default TabPanel;
