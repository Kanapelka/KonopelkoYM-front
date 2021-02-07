import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { createStyles, Theme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

import UserProfile from '../models/UserProfile';
import Container from '../container/container.component';

import './account-thumbnail.styles.sass';


const useStyles = makeStyles((theme: Theme) => createStyles({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

interface AccountThumbnailProps {
  user: UserProfile;
}

function AccountThumbnail({ user }: AccountThumbnailProps) {
  const classes = useStyles();
  const [elevation, setElevation] = useState(3);

  return (
    <Paper
      elevation={elevation}
      className="account-paper"
      onMouseEnter={() => { setElevation(7); }}
      onMouseLeave={() => { setElevation(3); }}
    >
      <Container vertical horizontal className="thumbnail-container">
        <Avatar className={classes.purple}>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
        <Typography>
          {user.firstName}
          <br />
          {user.lastName}
        </Typography>
      </Container>
    </Paper>
  );
}

export default AccountThumbnail;
