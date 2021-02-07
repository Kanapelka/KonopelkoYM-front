import React from 'react';
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, Theme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

import Constants from '../../Constatns';
import { IStyledComponentProps } from '../Props';

import './ticket-thumbnail.styles.sass';


const useStyles = makeStyles((theme: Theme) => createStyles({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

interface AssigneeThumbnailProps extends IStyledComponentProps{
  assignee: { assigneeId: number, firstName: string, lastName: string };
}

function AssigneeThumbnail({ assignee, className }: AssigneeThumbnailProps) {
  const link: string = `${Constants.Urls.Pages.USERS}/${assignee.assigneeId}`;
  const classes = useStyles();

  return (
    <Link to={link} className={`link ${className}`}>
      <Tooltip title={`${assignee.firstName} ${assignee.lastName}`} TransitionComponent={Zoom}>
        <div>
          <Avatar className={classes.purple}>{`${assignee.firstName[0]}${assignee.lastName[0]}`}</Avatar>
        </div>
      </Tooltip>
    </Link>
  );
}

export default AssigneeThumbnail;
