'use client';
import Avatar from './avatar';
import React from 'react';

function UserPanel() {
  return (
    <div>
      <Avatar
        src={'./images/test-avatar.jpg'}
        fallback="J"
        className="cursor-pointer"
      />
    </div>
  );
}

export default UserPanel;
