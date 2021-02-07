import React from 'react';

import { IParenComponentProps } from '../Props';

import './full-screen.styles.sass';


interface FullScreenProps extends IParenComponentProps {
}

function FullScreen({ children }: FullScreenProps) {
  return (
    <div className="full-screen">
      {children}
    </div>
  );
}

export default FullScreen;
