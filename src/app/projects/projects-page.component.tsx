import React, {
  ChangeEvent, createRef, useEffect, useState,
} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';

import GenericSubNav from '../shared/generic-page/navigation/generic-sub-nav-component';
import LeftSection from '../shared/generic-page/navigation/left-section.component';
import RightSection from '../shared/generic-page/navigation/right-section.component';
import TooltipButton from '../shared/tooltipped-buttons/tooltip-button.component';
import GenericDialog from '../shared/generic-dialog/generic-dialog.component';
import SnackBarAlert from '../shared/snack-bar-alert/snack-bar-alert.component';
import ProjectsService from '../services/projects/ProjectsService';
import UserInfo from '../shared/models/UserInfo';
import LocalStorageService from '../services/LocalStorageService';
import Constants from '../Constatns';
import { HttpStatus, Result } from '../services/http/Http';
import ProjectThumbnailModel from '../shared/models/ProjectThumbnailModel';

import './projects-page.styles.sass';
import ProjectsView from './projects-view.component';


type PageState = {
  loading: boolean;
  dialogOpened: boolean;
  alertOpened: boolean;
  alertSeverity: 'success' | 'info' | 'warning' | 'error';
  alertMessage?: string;
  newProjectName: string;
  searchFilter?: string;
  currentTab: number;
  projects: ProjectThumbnailModel[];
};

function ProjectsPage() {
  const defaultState: PageState = {
    loading: true,
    dialogOpened: false,
    alertOpened: false,
    alertSeverity: 'success',
    newProjectName: '',
    projects: [],
    currentTab: 0,
  };
  const searchInputRef = createRef();
  const [state, setState] = useState<PageState>(defaultState);

  function openDialog() {
    state.dialogOpened = true;
    setState({ ...state });
  }

  function closeDialog() {
    state.dialogOpened = false;
    state.newProjectName = '';
    setState({ ...state });
  }

  function closeAlert() {
    state.alertOpened = false;
    setState({ ...state });
  }

  function onProjectNameChange(event: ChangeEvent<HTMLInputElement>) {
    state.newProjectName = event.target.value;
    setState({ ...state });
  }

  function onSearchFilterChange(event: ChangeEvent<HTMLInputElement>) {
    state.searchFilter = event.target.value;
    setState({ ...state });
  }

  function onTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    state.currentTab = newValue;
    setState({ ...state });
  }

  function displayAlert(message: string, severity: 'success' | 'info' | 'warning' | 'error') {
    state.alertMessage = message;
    state.alertSeverity = severity;
    state.alertOpened = true;
    setState({ ...state });
  }

  async function loadProjects() {
    const currentUser: UserInfo = LocalStorageService.GetFromStorage(Constants.LocalStorage.USER);
    const result: Result<ProjectThumbnailModel[]> = await ProjectsService.LoadProjects(
      currentUser, 0, 100, state.searchFilter,
    );

    if (result.status === HttpStatus.Ok) {
      state.projects = result.payload;
      state.loading = false;
    } else {
      displayAlert('Failed to load projects.', 'error');
    }

    setState({ ...state });
  }

  async function searchProject() {
    state.loading = true;
    setState({ ...state });
    loadProjects();
  }

  function refreshProjects() {
    state.loading = true;
    state.searchFilter = undefined;
    setState({ ...state });
    // @ts-ignore
    searchInputRef.current.value = '';
    loadProjects();
  }

  async function createNewProject() {
    const name = state.newProjectName;
    closeDialog();
    const currentUser: UserInfo = LocalStorageService.GetFromStorage(Constants.LocalStorage.USER);
    const result = await ProjectsService.CreateProject(name, currentUser);
    switch (result.status) {
      case HttpStatus.Ok:
      case HttpStatus.Created:
        displayAlert('Проект успешно создан.', 'success');
        break;
      default:
        displayAlert('Возникла ошибка при создании проекта', 'error');
        break;
    }
    loadProjects();
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const leftSection = (
    <LeftSection>
      <div className="left-section-wrapper">
        <Typography variant="h6">Проекты</Typography>
        <Tabs
          onChange={onTabChange}
          value={state.currentTab}
          className="project-tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab value={0} label="Все" />
          <Tab value={1} label="Свои" />
          <Tab value={2} label="Участвую" />
        </Tabs>
      </div>
    </LeftSection>
  );
  const rightSection = (
    <RightSection>
      <div className="projects-nav-bar-right-section">
        <TooltipButton tooltip="Искать" icon={<SearchIcon />} onClick={searchProject} />
        <TextField
          inputRef={searchInputRef}
          onChange={onSearchFilterChange}
          className="search-project-text-field"
          placeholder="Поиск..."
        />
        <TooltipButton tooltip="Отчистить поиск" icon={<RefreshIcon />} onClick={refreshProjects} />
        <TooltipButton tooltip="Создать проект" icon={<AddIcon />} onClick={openDialog} />
      </div>
    </RightSection>
  );

  return (
    <>
      <GenericSubNav leftSection={leftSection} rightSection={rightSection} />
      {
        state.loading
          ? <div className="loader-wrapper"><CircularProgress size={64} color="primary" /></div>
          : <ProjectsView currentTabIndex={state.currentTab} projects={state.projects} />
      }
      <GenericDialog
        opened={state.dialogOpened}
        title="Create new project"
        confirmText="Create"
        onConfirm={createNewProject}
        onClose={closeDialog}
      >
        <div className="new-dialog-name-text-field-wrapper">
          <TextField onChange={onProjectNameChange} label="New project name" className="new-dialog-name-text-field" />
        </div>
      </GenericDialog>
      <SnackBarAlert
        open={state.alertOpened}
        severity={state.alertSeverity}
        onClose={closeAlert}
        message={state.alertMessage}
      />
    </>
  );
}

export default ProjectsPage;
