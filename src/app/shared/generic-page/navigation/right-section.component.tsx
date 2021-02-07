import React from 'react';

import '../generic-pge.styles.sass';


interface RightSectionProps {
  children?: React.ReactNode;
  displayName?: string;
}

function RightSection({ children, displayName }: RightSectionProps) {
  return (
    <div className="app-bar-toolbar-section right-section">
      {displayName && <span className="right-section-display-name">{displayName}</span>}
      {children}
    </div>
  );
}

export default RightSection;
