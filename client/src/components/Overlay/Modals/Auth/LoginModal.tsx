'use client';

import ActionButton from '@/components/Inputs/Buttons/ActionButton';
import { Input } from '@/components/Inputs/Input';
import useAuthModal from '@/hooks/modals/useAuthModal';
import useSession from '@/hooks/useSession';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Modal from '../Modal';

const schema = z.object({
  username: z.string().min(3, 'Please enter a valid username'),
  password: z.string().min(3, 'Please enter a valid password'),
});

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
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

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
            placeholder="Your Username"
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
            placeholder="Your Password"
          />
        </div>

        <button className="mb-4 text-sm" onClick={() => onOpen(false)}>
          Don't have an account? Register now.
        </button>

        <ActionButton type="submit" isLoading={isSubmitting}>
          Login
        </ActionButton>
      </form>
    </Modal>
  );
};

export default LoginModal;
