import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {HttpStatus} from '../services/http/Http';
import UserService from '../services/UserService';

import GenericSubNav from '../shared/generic-page/navigation/generic-sub-nav-component';
import SnackBarAlert from '../shared/snack-bar-alert/snack-bar-alert.component';
import ProfileForm from './profile-form.component';
import UserProfile from '../shared/models/UserProfile';
import LeftSection from '../shared/generic-page/navigation/left-section.component';
import UserInfo from '../shared/models/UserInfo';
import LocalStorageService from '../services/LocalStorageService';
import Constants from '../Constatns';


function ProfilePage() {
  const [openAlert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile>();

  function displayAlert(severity: 'success' | 'info' | 'warning' | 'error', message: string) {
    setAlert(true);
    setAlertMessage(message);
    setAlertSeverity(severity);
  }

  async function loadProfile(): Promise<void> {
    const userInfo: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result = await UserService.GetUserProfile(userInfo, userInfo.userId);
    setProfile(result.payload);
    setLoading(false);
  }

  async function updateProfile(updatedProfile: UserProfile) {
    const userInfo: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result = await UserService.UpdateUserProfile(userInfo, updatedProfile);

    switch (result.status) {
      case HttpStatus.Ok:
        displayAlert('success', 'Информация сохранена.');
        setProfile({ ...result.payload });
        break;
      default:
        displayAlert('error', 'Произошла ошибка при попытке обновить информацию.');
        break;
    }
  }

  function onUpdateProfile(updatedProfile: UserProfile): void {
    updateProfile(updatedProfile);
  }

  useEffect(() => { loadProfile(); }, []);

  const leftSection = <LeftSection><Typography variant="h6">Профиль</Typography></LeftSection>;

  return (
    <>
      <GenericSubNav leftSection={leftSection} />
      {
        loading
          ? <div className="loader-wrapper"><CircularProgress size={64} color="primary" /></div>
          : (
            <>
              <ProfileForm
                profile={profile}
                onUpdateProfile={onUpdateProfile}
              />
            </>
          )
      }
      <SnackBarAlert
        message={alertMessage}
        open={openAlert}
        severity={alertSeverity}
        onClose={() => setAlert(false)}
      />
    </>
  );
}

export default ProfilePage;
