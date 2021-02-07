import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import Constants from '../Constatns';
import { HttpStatus, Result } from '../services/http/Http';
import LocalStorageService from '../services/LocalStorageService';
import FixedSizeContent from '../shared/fixed-size-page/fixed-size-content.component';
import RightSection from '../shared/generic-page/navigation/right-section.component';
import ProjectBoard from '../shared/models/ProjectBoard';
import GenericSubNav from '../shared/generic-page/navigation/generic-sub-nav-component';
import LeftSection from '../shared/generic-page/navigation/left-section.component';
import UserInfo from '../shared/models/UserInfo';
import ProjectService from '../services/projects/ProjectsService';
import Board from './board.component';

import './project-kanban.styles.sass';
import TicketStatus from '../shared/models/TicketStatus';
import TicketStatusService from '../services/ticket-status/TicketStatusService';


const orange: string = '#ff5722';
const purple: string = '#673ab7';

type State = {
  loading: boolean;
  project?: ProjectBoard;
  alertMessage: string;
  alertOpened: boolean;
  alertSeverity: 'success' | 'info' | 'warning' | 'error';
};

function ProjectKanban({ match }: RouteComponentProps<{ id?: string }>) {
  const history = useHistory();

  const defaultState: State = {
    loading: true, alertMessage: '', alertOpened: false, alertSeverity: 'error',
  };
  const [state, setState] = useState<State>(defaultState);

  const validateId = (id?: string): number => {
    if (Number.isNaN(Number(id))) {
      history.push(Constants.Urls.Pages.ERROR_404);
      return 0;
    }
    return Number(id);
  };

  function displayAlert(message: string, severity: 'success' | 'info' | 'warning' | 'error') {
    state.alertMessage = message;
    state.alertSeverity = severity;
    state.alertOpened = true;
    setState({ ...state });
  }

  async function loadBoard() {
    const id: number = validateId(match.params.id);
    if (Number.isNaN(id)) return;

    const user = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result = await ProjectService.LoadBoard(user, id);

    switch (result.status) {
      case HttpStatus.Ok:
        state.project = result.payload;
        state.loading = false;
        setState({ ...state });
        break;
      case HttpStatus.Forbidden:
        history.push(Constants.Urls.Pages.ERROR_403);
        break;
      default:
        history.push(Constants.Urls.Pages.PROJECTS);
        break;
    }
  }

  async function addStatus(title: string) {
    const id: number = validateId(match.params.id);
    const ticketStatus = new TicketStatus(0, id, title);
    const user = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    const result: Result<TicketStatus> = await TicketStatusService.CreateNewStatus(user, ticketStatus);

    switch (result.status) {
      case HttpStatus.Ok:
      case HttpStatus.Created:
        state.project?.statuses?.push(result.payload);
        setState({ ...state });
        break;
      default:
        displayAlert('Ошибка при создании категории.', 'error');
        break;
    }

    state.loading = false;
    setState({ ...state });
  }

  async function removeStatus(id: number) {
    const user: UserInfo = LocalStorageService.GetFromStorage<UserInfo>(Constants.LocalStorage.USER);
    await TicketStatusService.RemoveStatus(user, id);
    loadBoard();
  }

  function onRemoveStatus(id: number) {
    state.loading = true;
    setState({ ...state });
    removeStatus(id);
  }

  function onAddStatus(title: string) {
    state.loading = true;
    setState({ ...state });
    addStatus(title);
  }

  useEffect(() => { loadBoard(); }, []);

  const rightSection = (
    <RightSection>
      <AvatarGroup max={10}>
        {state.project?.members?.map((m, index) => (
          <Avatar
            key={m.memberId}
            style={{
              backgroundColor: index % 2 === 0 ? purple : orange, width: 32, height: 32, fontSize: 18,
            }}
          >
            {`${m.firstName[0]}${m.lastName[0]}`}
          </Avatar>
        ))}
      </AvatarGroup>
    </RightSection>
  );
  const leftSection = <LeftSection><Typography variant="h6">Доска проекта</Typography></LeftSection>;

  return (
    <>
      <GenericSubNav leftSection={leftSection} rightSection={rightSection} />
      <FixedSizeContent>
        {
          state.loading
            ? <div className="loader-wrapper"><CircularProgress size={64} color="primary" /></div>
            : (
              <Board
                onAddStatus={onAddStatus}
                tickets={state.project?.tickets || []}
                statuses={state.project?.statuses || []}
                members={state.project?.members || []}
                projectId={validateId(match.params.id)}
                reload={loadBoard}
                onRemoveStatus={onRemoveStatus}
              />
            )
        }
      </FixedSizeContent>
    </>
  );
}

export default ProjectKanban;
