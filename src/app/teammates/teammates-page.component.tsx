import React, {
  useState, useEffect, createRef, ChangeEvent,
} from 'react';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProjectMember from '../shared/models/ProjectMember';
import ProjectThumbnailModel from '../shared/models/ProjectThumbnailModel';
import TeammatesGrid from './teammates-grid.component';
import GenericSubNav from '../shared/generic-page/navigation/generic-sub-nav-component';
import LeftSection from '../shared/generic-page/navigation/left-section.component';
import RightSection from '../shared/generic-page/navigation/right-section.component';
import TooltipButton from '../shared/tooltipped-buttons/tooltip-button.component';
import UserInfo from '../shared/models/UserInfo';
import LocalStorageService from '../services/LocalStorageService';
import Constants from '../Constatns';
import { Result } from '../services/http/Http';
import ProjectService from '../services/projects/ProjectsService';

import './teammates.styles.sass';


function TeammatesPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [membersFilter, setMembersFilter] = useState<string>('');
  const [projects, setProjects] = useState<Array<ProjectThumbnailModel>>([]);
  const [teammates, setTeammates] = useState<Array<ProjectMember>>([]);

  const filterInputRef = createRef<HTMLInputElement>();

  async function loadProjects() {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result: Result<Array<ProjectThumbnailModel>> = await ProjectService.LoadProjects(user, 0, 100);

    const loadedProjects: Array<ProjectThumbnailModel> = result.payload;
    const members: Array<ProjectMember> = [];
    loadedProjects.forEach((project) => { members.push(...project.members); });

    setProjects(loadedProjects);
    setTeammates(members);
    setLoading(false);
  }

  function filterTeammates(members: Array<ProjectMember>, filter: string) {
    if (filter === '') {
      return members;
    }

    return members.filter((m) => m.firstName.toLowerCase().indexOf(filter.toLowerCase()) >= 0
      || m.lastName.toLowerCase().indexOf(filter.toLowerCase()) >= 0
      || `${m.firstName} ${m.lastName}`.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
  }

  function restoreFilter() {
    filterInputRef.current!.value = '';
    setMembersFilter('');
  }

  function applyFilter(event: ChangeEvent<HTMLInputElement>) {
    setMembersFilter(event.target.value);
  }

  useEffect(() => { loadProjects(); }, []);

  const leftSection = (<LeftSection><Typography variant="h6">Команды</Typography></LeftSection>);
  const rightSection = (
    <RightSection>
      <TextField onChange={applyFilter} inputRef={filterInputRef} placeholder="Поиск..." />
      <TooltipButton icon={<RefreshIcon />} onClick={restoreFilter} tooltip="Сбросить" />
    </RightSection>
  );

  return (
    <>
      <GenericSubNav leftSection={leftSection} rightSection={rightSection} />
      {
        loading
          ? <div className="loader-wrapper"><CircularProgress size={64} color="primary" /></div>
          : <TeammatesGrid projects={projects} teammates={filterTeammates(teammates, membersFilter)} />
      }
    </>
  );
}

export default TeammatesPage;
