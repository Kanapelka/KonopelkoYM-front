import React from 'react';
// eslint-disable-next-line no-unused-vars
import ReactGridLayout, { Layout } from 'react-grid-layout';

import HighestPriorityTicket from './grid-items/highest-priority-tickets.component';
import RecentProjects from './grid-items/recent-projects.component';
import PeopleWorkedWith from './grid-items/people-worked-with.component';
import LatestActivity from './grid-items/latest-activity.component';


interface DashboardDraggableGridProps {
  layout: Layout[];
  onLayoutChange: (layout: Layout[]) => void;
}

function DashboardDraggableGrid({ layout, onLayoutChange }: DashboardDraggableGridProps) {
  return (
    <ReactGridLayout
      onLayoutChange={onLayoutChange}
      className="layout"
      isResizable={false}
      layout={layout}
      cols={12}
      width={1280}
    >
      <div key="tickets">
        <HighestPriorityTicket />
      </div>
      <div key="projects">
        <RecentProjects />
      </div>
      <div key="people">
        <PeopleWorkedWith />
      </div>
      <div key="activity">
        <LatestActivity />
      </div>
    </ReactGridLayout>
  );
}

export const defaultLayout: Layout[] = [
  {
    i: 'tickets', x: 0, y: 0, w: 8, h: 2.5,
  },
  {
    i: 'projects', x: 8, y: 0, w: 4, h: 2.5,
  },
  {
    i: 'people', x: 0, y: 2, w: 6, h: 2.5,
  },
  {
    i: 'activity', x: 6, y: 2, w: 6, h: 2.5,
  },
];


export default DashboardDraggableGrid;
