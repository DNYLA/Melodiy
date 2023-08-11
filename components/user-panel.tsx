'use client';
import Button from './button';
import Avatar from './avatar';
import React from 'react';

function UserPanel() {
  const user = false;
  return (
    <div className="flex items-center justify-between gap-x-1">
      {user ? (
        <div>
          <Avatar
            src={'./images/test-avatar.jpg'}
            fallback="J"
            className="cursor-pointer"
          />
        </div>
      ) : (
        <>
          <div>
            <Button className="font-medium text-white bg-transparent">
              Sign Up
            </Button>
          </div>
          <div>
            <Button className="px-6 py-2">Login</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserPanel;
