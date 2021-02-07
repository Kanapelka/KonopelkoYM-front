import React, { ReactNode, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserInfo from '../shared/models/UserInfo';
import { HttpStatus, Result } from '../services/http/Http';
import ProjectMember, { Role } from '../shared/models/ProjectMember';
import ProjectThumbnailModel from '../shared/models/ProjectThumbnailModel';
import GenericSubNav from '../shared/generic-page/navigation/generic-sub-nav-component';
import LeftSection from '../shared/generic-page/navigation/left-section.component';
import EditProjectSection from './sections/edit-project-section.component';
import FixedSizeContent from '../shared/fixed-size-page/fixed-size-content.component';
import ProjectsService from '../services/projects/ProjectsService';
import LocalStorageService from '../services/LocalStorageService';
import SnackBarAlert from '../shared/snack-bar-alert/snack-bar-alert.component';
import Constants from '../Constatns';

import './project-settings.styles.sass';
import ManageProjectMembers from './sections/manage-project-members.component';
import DangerousZone from './sections/dangerous-zone.component';


type PageState = {
  loading: boolean;
  currentUserRole: Role;
  openAlert: boolean;
  alertSeverity: 'success' | 'info' | 'warning' | 'error';
  alertMessage?: string;
  project?: ProjectThumbnailModel;
  newProjectName?: string;
};

function ProjectSettings({ match }: RouteComponentProps<{ id?: string }>) {
  const defaultState: PageState = {
    loading: true,
    currentUserRole: Role.User,
    openAlert: false,
    alertSeverity: 'success',
  };
  const [state, setState] = useState<PageState>(defaultState);
  const history = useHistory();

  const leftSection: ReactNode = (<LeftSection><Typography variant="h6">Настройки прокта</Typography></LeftSection>);

  function displayAlert(severity: 'success' | 'info' | 'warning' | 'error', message: string) {
    state.alertSeverity = severity;
    state.openAlert = true;
    state.alertMessage = message;
    setState({ ...state });
  }

  async function loadProjectDetails() {
    const { id } = match.params;
    if (Number.isNaN(Number(id))) {
      history.push(Constants.Urls.Pages.ERROR_404);
    }

    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result: Result<ProjectThumbnailModel> = await ProjectsService.LoadProjectSettings(user, Number(id));

    switch (result.status) {
      case HttpStatus.NotFound:
        history.push(Constants.Urls.Pages.ERROR_404);
        break;
      case HttpStatus.Forbidden:
        history.push(Constants.Urls.Pages.ERROR_403);
        break;
      case HttpStatus.Ok:
        state.project = result.payload;
        // @ts-ignore
        state.currentUserRole = result.payload.members.find((m) => m.userId === user.userId)?.projectRole;
        state.loading = false;
        setState({ ...state });
        break;
      default:
        displayAlert('error', 'Ошибке при загрузке данных.');
        break;
    }
  }

  async function updateProject(newName: string) {
    const user = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result = await ProjectsService.UpdateProject(user, newName, Number(match.params.id));

    switch (result.status) {
      case HttpStatus.Forbidden:
        displayAlert('error', 'К сожалению, у вас нет прав доступа для того, чтобы переименовать проект.');
        break;
      case HttpStatus.Ok:
        displayAlert('success', 'Изменения были сохранены.');
        await loadProjectDetails();
        break;
      default:
        displayAlert('error', 'Ошибка при попытке обновить проект.');
        break;
    }
  }

  function onUpdateProject(newName: string) {
    state.loading = true;
    setState({ ...state });
    updateProject(newName);
  }

  async function removeMember(memberId: number) {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result: Result<any> = await ProjectsService.RemoveMember(user, memberId);

    switch (result.status) {
      case HttpStatus.Ok:
        loadProjectDetails();
        return;
      case HttpStatus.Forbidden:
        displayAlert('error', 'У вас нет прав доступа для этого действия.');
        break;
      default:
        displayAlert('error', 'Возникла ошибка при попытке обновить проект.');
        break;
    }
    state.loading = false;
    setState({ ...state });
  }

  function onRemoveMember(memberId: number) {
    state.loading = true;
    setState({ ...state });
    removeMember(memberId);
  }

  async function onChangeRole(memberId: number, role: Role) {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    // @ts-ignore
    const member: ProjectMember = state.project.members.find((m) => m.memberId === memberId);
    const result: Result<any> = await ProjectsService.UpdateRole(user, member, role);

    switch (result.status) {
      case HttpStatus.Ok:
        loadProjectDetails();
        displayAlert('success', 'Роль была изменена.');
        return;
      case HttpStatus.Forbidden:
        displayAlert('error', 'У вас нет прав доступа, чтобы управлять роялми.');
        break;
      default:
        displayAlert('error', 'Ошибка при попытке обновить роль.');
        break;
    }
    state.loading = false;
    setState({ ...state });
  }

  async function addMember(emailAddress: string) {
    const { id } = match.params;
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result: Result<any> = await ProjectsService.AddMember(user, Number(id), emailAddress);

    switch (result.status) {
      case HttpStatus.Ok:
      case HttpStatus.Created:
        loadProjectDetails();
        displayAlert('success', 'Добавлен новый член команды.');
        return;
      case HttpStatus.BadRequest:
        displayAlert('warning', 'Этот пользователь уже часть команды.');
        break;
      case HttpStatus.Forbidden:
        displayAlert('error', 'У вас нет прав доступа для добавления пользователей.');
        break;
      case HttpStatus.NotFound:
        displayAlert('error', 'Похоже, пользователя с такой почтой не существует.');
        break;
      default:
        displayAlert('error', 'Ошибка при добавления нового члена команды.');
        break;
    }
    state.loading = false;
    setState({ ...state });
  }

  function onAddMember(emailAddress: string) {
    state.loading = true;
    setState({ ...state });
    addMember(emailAddress);
  }

  useEffect(() => {
    loadProjectDetails();
  }, []);

  function closeAlert() {
    state.openAlert = false;
    setState({ ...state });
  }

  async function deleteProject() {
    const { id } = match.params;
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result = await ProjectsService.DeleteProject(user, Number(id));

    switch (result.status) {
      case HttpStatus.Ok:
        history.push('/projects');
        break;
      case HttpStatus.Forbidden:
        displayAlert('error', 'Удалять проект может только владелец.');
        break;
      default:
        displayAlert('error', 'Ошибка при удалении проекта.');
    }
  }

  function onDeleteProject() {
    state.loading = true;
    setState({ ...state });
    deleteProject();
  }

  return (
    <>
      <GenericSubNav leftSection={leftSection} />
      <FixedSizeContent>
        {
          state.loading
            ? <div className="loader-wrapper"><CircularProgress size={64} color="primary" /></div>
            : (
              <Container className="project-details-content-padding">
                <EditProjectSection
                  projectName={state.project?.projectName}
                  allowEdit={state.currentUserRole !== Role.User}
                  updateName={onUpdateProject}
                />
                <ManageProjectMembers
                  allowAdd={state.currentUserRole !== Role.User}
                  onAddMember={onAddMember}
                  onRemove={onRemoveMember}
                  onChangeRole={onChangeRole}
                  members={state.project?.members || []}
                />
                <DangerousZone onDelete={onDeleteProject} projectName={state.project?.projectName} />
              </Container>
            )
        }
      </FixedSizeContent>
      <SnackBarAlert
        severity={state.alertSeverity}
        open={state.openAlert}
        message={state.alertMessage}
        onClose={closeAlert}
      />
    </>
  );
}

export default ProjectSettings;
