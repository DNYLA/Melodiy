'use client';

import { Input } from '@/components/Inputs/Input';
import useAuthModal from '@/hooks/modals/useAuthModal';
import useSession from '@/hooks/useSession';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';

const RegisterModal = () => {
  const router = useRouter();
  const { onClose, isOpen, isLogin, onOpen } = useAuthModal();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const { user, signUp } = useSession();

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
    const success = await signUp(data.username, data.password);
    if (success) setData({ username: '', password: '' });
  };

  return (
    <Modal
      title="Create a new account"
      description="Enter your details"
      isOpen={isOpen && !isLogin}
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
              placeholder="Enter a username"
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
              placeholder="Enter a secure password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </Form.Control>
        </Form.Field>

        <button className="text-sm" onClick={() => onOpen(true)}>
          Already got an account. Login!
        </button>

        <Form.Submit asChild>
          <button className="shadow-blackA7 hover:bg-mauve3 mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Register
          </button>
        </Form.Submit>
      </Form.Root>
    </Modal>
  );
};

export default RegisterModal;
