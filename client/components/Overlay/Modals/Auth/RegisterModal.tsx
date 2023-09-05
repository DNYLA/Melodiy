'use client';

import useAuthModal from '@/hooks/modals/useAuthModal';
import { ServiceResponse } from '@/types';
import { AXIOS } from '@/utils/network/axios';
import * as Form from '@radix-ui/react-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';

const RegisterModal = () => {
  const router = useRouter();
  const { onClose, isOpen, isLogin, onOpen } = useAuthModal();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const { data: session } = useSession();

  useEffect(() => {
    // if (session) {
    //   router.refresh();
    //   onClose();
    // }
    // if (loggedIn) refershRouter; onClose();
    if (session?.user && isOpen) {
      onClose();
    }
  }, [router, onClose, session, isOpen]); //Add auth session

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: res } = await AXIOS.post<ServiceResponse<number>>(
        '/auth/register',
        {
          username: data.username,
          password: data.password,
        }
      );
      if (res.success) {
        toast.success(`Registered account, please login!`);
        setTimeout(() => onOpen(true), 350);
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Unexpected Error';

      if (err.response.status === 409) {
        toast(message, {
          icon: '⚠️',
        });
      } else {
        toast.error(message);
      }
    }
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
            <input
              placeholder="Enter a username"
              className="shadow-blackA9 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-neutral-700 px-[10px] text-[15px] leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500"
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
              Please enter a question
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              placeholder="Enter a secure password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="shadow-blackA9 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-neutral-700 px-[10px] text-[15px] leading-none text-white outline-none placeholder:text-sm placeholder:font-extralight placeholder:text-neutral-500"
              required
              type="password"
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="shadow-blackA7 mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Register
          </button>
        </Form.Submit>
      </Form.Root>
    </Modal>
  );
};

export default RegisterModal;
