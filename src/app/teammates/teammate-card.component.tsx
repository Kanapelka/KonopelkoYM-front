import React, { ReactNode } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import ProjectMember from '../shared/models/ProjectMember';

import './teammates.styles.sass';


const orange: string = '#ff5722';

interface TeammateCardProps {
  teammate: ProjectMember;
}

function TeammateCard({ teammate }: TeammateCardProps) {
  const avatar = (<Avatar style={{ backgroundColor: orange }}>{teammate.firstName[0] + teammate.lastName[0]}</Avatar>);
  const fullName: string = `${teammate.firstName} ${teammate.lastName}`;

  return (
    <Card variant="outlined" className="teammate-card">
      <CardHeader avatar={avatar} title={fullName} subheader={teammate.emailAddress} />
    </Card>
  );
}

export default TeammateCard;
