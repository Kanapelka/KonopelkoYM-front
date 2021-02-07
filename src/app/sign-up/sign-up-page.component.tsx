import React from 'react';

import PageBackground from '../shared/page-background/page-background.component';
import FullScreen from '../shared/full-screen/full-sreen.component';
import Container from '../shared/container/container.component';
import SignUpCard from './sign-up-card.component';
import LoginRedirect from '../login-redirect.component';

import * as imageUrl from '../../assets/login background image.jpg';


function SignUpPage() {
  return (
    <LoginRedirect>
      <PageBackground imageUrl={imageUrl}>
        <FullScreen>
          <Container horizontal vertical>
            <SignUpCard />
          </Container>
        </FullScreen>
      </PageBackground>
    </LoginRedirect>
  );
}

export default SignUpPage;
