'use client';

import { Button } from '@/components/Inputs/Buttons/Button';
import { Input } from '@/components/Inputs/Input';
import useAuthModal from '@/hooks/modals/useAuthModal';
import useSession from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../Modal';

type FormValues = {
  username: string;
  password: string;
};

const LoginModal = () => {
  const router = useRouter();
  const { onClose, onOpen, isOpen, isLogin } = useAuthModal();
  const { user, signIn } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [router, onClose, user, isOpen]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit = async (data: FormValues) => {
    const success = await signIn(data.username, data.password);
    if (success) reset();
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen && isLogin}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3 flex flex-col gap-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-medium" htmlFor="username">
              Username
            </label>

            <p className="text-xs opacity-80">{errors.username?.message}</p>
          </div>

          <Input
            {...register('username', {
              required: 'Please enter your username',
            })}
            disabled={isSubmitting}
            id="username"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <p className="text-xs opacity-80">{errors.password?.message}</p>
          </div>

          <Input
            {...register('password', {
              required: 'Please enter your password',
            })}
            disabled={isSubmitting}
            id="password"
            type="password"
          />
        </div>

        <button className="mb-4 text-sm" onClick={() => onOpen(false)}>
          Don't have an account? Register now.
        </button>

        <Button type="submit">Login</Button>
      </form>
    </Modal>
  );
};

export default LoginModal;
