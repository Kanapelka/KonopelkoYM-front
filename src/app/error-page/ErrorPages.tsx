import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Constants from '../Constatns';
import GenericSubNav from '../shared/generic-page/navigation/generic-sub-nav-component';

import './error.sass';


const error503Message = 'Похоже, возникил проблемы на стороне сервера. Пожалуйста, обратитесь в службу поддержки.';
const error404Message = 'Мы не можем найти контент, который вы ищите.';
const error403Message = 'У вас нет доступа к запрашиваемому контенту';

interface ErrorPageProps {
  message: string;
}

function ErrorPage({ message }: ErrorPageProps) {
  const history = useHistory();

  const onBackToSafetyClick = () => history.push(Constants.Urls.Pages.DASHBOARDS);

  return (
    <>
      <GenericSubNav leftSection={<Typography color="error" variant="h6">ОШИБКА</Typography>} />
      <div className="error-message-wrapper">
        <Typography className="error-message-text" variant="h4">
          {message}
        </Typography>
        <Button onClick={onBackToSafetyClick} className="back-to-safety-button" color="primary" variant="contained">
          На главную
        </Button>
      </div>
    </>
  );
}

const ServerErrorPage = () => (<ErrorPage message={error503Message} />);
const NotFoundPage = () => (<ErrorPage message={error404Message} />);
const ForbiddenPage = () => (<ErrorPage message={error403Message} />);

export { ServerErrorPage, NotFoundPage, ForbiddenPage };
