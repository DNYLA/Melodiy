import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSession } from '../../../hooks/useSession';
import { ActionButton, Input } from '../../Inputs';
import { Modal } from '../Modal';
import { useAuthModal } from './useAuthModal';

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must contain at least 3 character(s)'),
    password: z
      .string()
      .min(3, 'Password must contain at least 3 character(s)'),
    confirmPassword: z.string().min(3, ''),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const RegisterModal = () => {
  const navigate = useNavigate();
  const { onClose, isOpen, isLogin, onOpen } = useAuthModal();
  const { user, signUp } = useSession();
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
  }, [onClose, user, isOpen]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit = async (data: FormValues) => {
    const success = await signUp(data.username, data.password, false);
    if (success) reset();
  };

  return (
    <Modal
      title="Create a new account"
      description="Enter your details"
      isOpen={isOpen && !isLogin}
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
            placeholder="Enter a username"
          />
        </div>

        <div className="mb-3 flex flex-col gap-y-1">
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
            placeholder="Enter a secure password"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <label className="font-medium" htmlFor="password">
              Confirm Password
            </label>
            <p className="text-xs opacity-80">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <Input
            {...register('confirmPassword', {
              required: 'Please enter your password',
            })}
            disabled={isSubmitting}
            id="password"
            type="password"
            placeholder="Enter your password again"
          />
        </div>

        <button className="mb-4 text-sm" onClick={() => onOpen(true)}>
          Already got an account. Login!
        </button>

        <ActionButton type="submit" isLoading={isSubmitting}>
          Register
        </ActionButton>
      </form>
    </Modal>
  );
};

export { RegisterModal };
