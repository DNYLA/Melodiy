'use client';

import { Button } from '@/components/Inputs/Buttons/Button';
import { Input } from '@/components/Inputs/Input';
import useAuthModal from '@/hooks/modals/useAuthModal';
import useSession from '@/hooks/useSession';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';

//TODO: Update to use-form
const LoginModal = () => {
  const router = useRouter();
  const { onClose, onOpen, isOpen, isLogin } = useAuthModal();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const { user, signIn } = useSession();

  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [router, onClose, user, isOpen]); //Add auth session

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await signIn(data.username, data.password);
    if (success) setData({ username: '', password: '' });
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen && isLogin}
      onChange={onChange}
    >
      <Form.Root onSubmit={handleSubmit} className="">
        <Form.Field className="mb-[10px] grid" name="username">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Username
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your username
            </Form.Message>
          </div>

          <Form.Control asChild>
            <Input
              placeholder="Your Username"
              type="username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="mb-[10px] grid" name="password">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Password
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="valueMissing"
            >
              Please enter a password
            </Form.Message>
          </div>

          <Form.Control asChild>
            <Input
              placeholder="Your Password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </Form.Control>
        </Form.Field>

        <button className="text-sm" onClick={() => onOpen(false)}>
          Don't have an account? Register now.
        </button>

        <Form.Submit asChild className="mt-[10px]">
          <Button>Login</Button>
        </Form.Submit>
      </Form.Root>
    </Modal>
  );
};

export default LoginModal;
