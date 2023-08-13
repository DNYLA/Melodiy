'use client';
import Button from './button';
import Avatar from './avatar';
import React from 'react';
import { useSession } from 'next-auth/react';
import UserSettings from '@/components/user-settings';

function UserPanel() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between gap-x-1">
      {session?.user ? (
        <div>
          <UserSettings />
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
