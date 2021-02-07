import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import UserProfile from '../shared/models/UserProfile';

import {
  jobTitleIconAdornment,
  locationIconAdornment,
  personIconAdornment,
} from '../sign-up/form/input-adornment';
import EditField from '../shared/edit-field/edit-field.component';
import FixedSizeContent from '../shared/fixed-size-page/fixed-size-content.component';

import './profile-page.styles.sass';


const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

interface ProfileFormProps {
  profile?: UserProfile;
  onUpdateProfile: (profile: UserProfile) => Promise<void> | void;
}

function ProfileForm({ profile, onUpdateProfile }: ProfileFormProps) {
  function updateFirstName(firstName: string): void {
    const updatedProfile: UserProfile = { ...profile! };
    updatedProfile.firstName = firstName;
    onUpdateProfile(updatedProfile);
  }

  function updateLastName(value: string): void {
    const updatedProfile: UserProfile = { ...profile! };
    updatedProfile.lastName = value;
    onUpdateProfile(updatedProfile);
  }

  function updateJobTitle(value: string): void {
    const updatedProfile: UserProfile = { ...profile! };
    updatedProfile.jobTitle = value;
    onUpdateProfile(updatedProfile);
  }

  function updateLocation(value: string): void {
    const updatedProfile: UserProfile = { ...profile! };
    updatedProfile.location = value;
    onUpdateProfile(updatedProfile);
  }

  function validationRule(value: string): boolean {
    return value.length !== 0;
  }

  return (
    <FixedSizeContent>
      <Container className="profile-wrapper">
        <Card className="profile-card">
          <CardContent>
            <div className="info-wrapper">
              <div>
                <div className="email-wrapper">
                  <EmailIcon style={{ marginRight: 10 }} />
                  <Typography variant="h6">{profile?.emailAddress}</Typography>
                </div>
                <div className="names-wrapper">
                  <EditField
                    validationRule={validationRule}
                    placeholder="Имя"
                    className="profile-edit-field"
                    defaultValue={profile?.firstName}
                    onDone={updateFirstName}
                    adornment={personIconAdornment}
                  />
                  <EditField
                    validationRule={validationRule}
                    placeholder="Фамилия"
                    className="profile-edit-field"
                    defaultValue={profile?.lastName}
                    onDone={updateLastName}
                    adornment={personIconAdornment}
                  />
                </div>
              </div>
            </div>
            <div className="names-wrapper">
              <EditField
                placeholder="Должность"
                className="profile-edit-field"
                defaultValue={profile?.jobTitle}
                onDone={updateJobTitle}
                adornment={jobTitleIconAdornment}
              />
              <EditField
                placeholder="Расположение"
                className="profile-edit-field"
                defaultValue={profile?.location}
                onDone={updateLocation}
                adornment={locationIconAdornment}
              />
            </div>
          </CardContent>
        </Card>
      </Container>
    </FixedSizeContent>
  );
}

export default ProfileForm;
