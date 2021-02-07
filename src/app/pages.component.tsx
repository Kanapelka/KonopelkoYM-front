import React, { ReactNode, useState, useEffect } from 'react';
import {Switch, Route, useHistory, Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PeopleIcon from '@material-ui/icons/People';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';

import Constants from './Constatns';
import ProfilePage from './profile/profile-page.component';
import GenericPage from './shared/generic-page/generic-page.component';
import GenericAppBar from './shared/generic-page/navigation/generic-app-bar.component';
import LeftSection from './shared/generic-page/navigation/left-section.component';
import RightSection from './shared/generic-page/navigation/right-section.component';
import NotificationsDrawer from './shared/generic-page/drawer/generic-page-drawer.component';
import TooltipButton from './shared/tooltipped-buttons/tooltip-button.component';
import GenericPageContent from './shared/generic-page/generic-page-content';
import TooltipLinkButton from './shared/tooltipped-buttons/tooltip-link-button.component';
import drawerItems from './shared/athena-drawer-items';
import DashboardPage from './dashboard/dashboard-page.component';
import ProjectsPage from './projects/projects-page.component';
import RedirectControl from './redirect-control.componen';
import LocalStorageService from './services/LocalStorageService';
import ProjectSettings from './project-settings/project-settings.component';
import ProjectKanban from './project-kanban/project-kanban.component';
import TeammatesPage from './teammates/teammates-page.component';
import { ServerErrorPage, NotFoundPage, ForbiddenPage } from './error-page/ErrorPages';
import UserInfo from './shared/models/UserInfo';
import NotificationService from './services/NotificationService';
import NotificationModel from './shared/models/NotificationModel';

import './pages.styles.sass';
import NotificationsPopup from './notifications-popover.component';
import { Result } from './services/http/Http';
import CookiesService from './services/CookiesService';


interface PagesProps {
  history: any;
}

type PageState = {
  title?: string;
  userDisplayName?: string;
  drawerIsOpened: boolean;
  anchorElement: HTMLElement | null;
  notifications: Array<NotificationModel>;
}

function Pages({ history }: PagesProps) {
  const defaultState: PageState = {
    title: 'Dashboards',
    drawerIsOpened: false,
    anchorElement: null,
    notifications: [],
  };
  const [state, setState] = useState<PageState>(defaultState);
  const innerHistory = useHistory();

  async function loadNotifications() {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const notificationsLoaded = await NotificationService.GetNewNotificationsForUser(user);
    state.notifications = notificationsLoaded;
    setState({ ...state });
  }

  useEffect(() => innerHistory.listen(() => {
    if (innerHistory.location.pathname !== '/sign-in' && innerHistory.location.pathname !== '/sign-up') {
      loadNotifications();
    }
  }), [innerHistory]);

  useEffect(() => { loadNotifications(); }, []);

  function triggerDrawer(drawerState: boolean) {
    state.drawerIsOpened = drawerState;
    setState({ ...state });
  }

  function closeDrawer() {
    triggerDrawer(false);
  }

  function handleOpenProfileClick(event: React.MouseEvent<HTMLButtonElement>) {
    state.anchorElement = event.currentTarget;
    setState({ ...state });
  }

  function handleCloseProfile() {
    state.anchorElement = null;
    setState({ ...state });
  }

  async function logOut() {
    LocalStorageService.ClearStorage();
    CookiesService.ClearCookies();
    sessionStorage.clear();
    // @ts-ignore
    const auth = gapi.auth2.getAuthInstance();
    await auth.signOut();
    innerHistory.push(Constants.Urls.Pages.SIGN_IN);
  }

  async function expireAll(): Promise<void> {
    state.drawerIsOpened = false;
    setState({ ...state });
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);

    const promises: Array<Promise<Result<NotificationModel>>> = [];
    state.notifications.forEach((n) => {
      n.expiredDate = new Date();
      promises.push(NotificationService.UpdateNotification(user, n));
    });

    await Promise.all(promises);
    loadNotifications();
  }

  async function expireNotification(id: number): Promise<void> {
    const notification = state.notifications.find((n) => n.notificationId === id);
    if (!notification) return;

    notification.expiredDate = new Date();
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    await NotificationService.UpdateNotification(user, notification);
    loadNotifications();
  }

  const leftSection: ReactNode = (
    <LeftSection>
      <TooltipLinkButton tooltip="Личный кабинет" link="/dashboards" icon={<DashboardIcon />} color="inherit" />
      <TooltipLinkButton tooltip="Проекты" link="/projects" icon={<AccountTreeIcon />} color="inherit" />
      <TooltipLinkButton tooltip="Команда" link="/teammates" icon={<PeopleIcon />} color="inherit" />
    </LeftSection>
  );

  const rightSection: ReactNode = (
    <RightSection displayName={state.userDisplayName}>
      <TooltipButton
        tooltip="Уведомления"
        onClick={() => triggerDrawer(true)}
        icon={
          state.notifications.length === 0
            ? <NotificationsNoneOutlinedIcon />
            : (
              <Badge badgeContent={state.notifications.length} color="secondary">
                <NotificationsActiveIcon />
              </Badge>
            )
        }
        color="inherit"
      />
      <TooltipButton tooltip="Профиль" onClick={handleOpenProfileClick} icon={<AccountCircleIcon />} color="inherit" />
      <Menu
        open={Boolean(state.anchorElement)}
        anchorEl={state.anchorElement}
        onClose={handleCloseProfile}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem><Link className="link" to="/profile">Профиль</Link></MenuItem>
        <MenuItem onClick={logOut}>Выйти</MenuItem>
      </Menu>
    </RightSection>
  );

  return (
    <RedirectControl history={history}>
      <GenericPage>
        <GenericAppBar leftSection={leftSection} rightSection={rightSection} />
        <NotificationsDrawer
          open={state.drawerIsOpened}
          onClose={closeDrawer}
          notifications={state.notifications}
          onExpire={expireNotification}
          onExpireAll={expireAll}
        />
        <GenericPageContent className="generic-page-content">
          <Switch>
            <Route path={Constants.Urls.Pages.DASHBOARDS} component={DashboardPage} />
            <Route path={Constants.Urls.Pages.PROJECTS} exact component={ProjectsPage} />
            <Route path={`${Constants.Urls.Pages.PROJECTS}/:id/settings`} component={ProjectSettings} />
            <Route path={`${Constants.Urls.Pages.PROJECTS}/:id/tickets`} component={ProjectKanban} />
            <Route path={Constants.Urls.Pages.ERROR_500} component={ServerErrorPage} />
            <Route path={Constants.Urls.Pages.ERROR_404} component={NotFoundPage} />
            <Route path={Constants.Urls.Pages.ERROR_403} component={ForbiddenPage} />
            <Route path="/teammates" component={TeammatesPage} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </GenericPageContent>
      </GenericPage>
    </RedirectControl>
  );
}

export default Pages;
