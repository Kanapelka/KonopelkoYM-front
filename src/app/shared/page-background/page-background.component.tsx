import React from 'react';

import { IParenComponentProps } from '../Props';

import './page-background.styles.sass';


interface IPageBackgroundProps extends IParenComponentProps{
  imageUrl: any,
}

function PageBackground({ imageUrl, children }: IPageBackgroundProps) {
  return (
    <div className="background">
      <div className="image-wrapper">
        <img src={imageUrl} alt="background" />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default PageBackground;
