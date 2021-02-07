import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import PriorityCriticalIcon from '@atlaskit/icon-priority/glyph/priority-critical';
import PriorityMajorIcon from '@atlaskit/icon-priority/glyph/priority-major';
import PriorityHighestIcon from '@atlaskit/icon-priority/glyph/priority-highest';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import PriorityLowIcon from '@atlaskit/icon-priority/glyph/priority-low';

import { IStyledComponentProps } from '../Props';
import { Priority } from '../models/TicketThumbnailModel';


interface PriorityIconProps extends IStyledComponentProps{
  priority: Priority;
}

type PriorityDisplayData = {
  tooltip: string;
  icon: React.ReactNode;
}

function PriorityIcon({ priority, className }: PriorityIconProps) {
  function getPriorityDisplayData(p: Priority): PriorityDisplayData {
    switch (p) {
      case Priority.Critical:
        return { tooltip: 'Критичесикй', icon: <PriorityCriticalIcon size="large" label="Критичесикй" /> };
      case Priority.VeryHigh:
        return { tooltip: 'Очень высокий', icon: <PriorityMajorIcon size="large" label="Очень высокий" /> };
      case Priority.High:
        return { tooltip: 'Высокий', icon: <PriorityHighestIcon size="large" label="Высокий" /> };
      case Priority.Medium:
        return { tooltip: 'Средний', icon: <PriorityMediumIcon size="large" label="Средний" /> };
      case Priority.Low:
        return { tooltip: 'Низкий', icon: <PriorityLowIcon size="large" label="Низкий" /> };
      default:
        return { tooltip: 'ОШИБКА', icon: null };
    }
  }

  const priorityDisplayData: PriorityDisplayData = getPriorityDisplayData(priority);

  return (
    <div className={className}>
      <Tooltip TransitionComponent={Zoom} title={priorityDisplayData.tooltip}>
        <div>
          {priorityDisplayData.icon}
        </div>
      </Tooltip>
    </div>
  );
}

export default PriorityIcon;
