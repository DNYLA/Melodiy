import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ActionButton, Input, Select } from '../Inputs';
import { SelectItem } from '../Inputs/Select';

type FormValues = {
  databaseUrl: string;
  fileProvider: string;
  searchProvider: string;
};

const schema = z.object({
  databaseUrl: z.string(),
  fileProvider: z.string(),
  searchProvider: z.string(),
});

function AdminPanel() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // useEffect(() => {
  //   if (user) {
  //     signOut();
  //   }
  // }, [user, signOut]);

  const onSubmit = async (data: FormValues) => {
    // const success = await updateSettings(data.username, data.password, true);
    // if (success) {
    //   reset();
    //   navigate({ to: '/admin' });
    // }

    navigate({ to: '/' });
  };

  const tempItems: SelectItem[] = [
    { text: 'Local', value: 'local' },
    { text: 'Supabase', value: 'supabase' },
  ];

  return (
    <div className="w-[12%]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3 flex flex-col gap-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-medium" htmlFor="databaseUrl">
              Database Connection String (Postgres)
            </label>

            <p className="text-xs opacity-80">{errors.databaseUrl?.message}</p>
          </div>

          <Input
            {...register('databaseUrl', {
              required: 'Please enter the database connection string',
            })}
            disabled={isSubmitting}
            id="databaseUrl"
            placeholder="Server=127.0.0.1; Database=melodiy;Port=5345; User Id=postgres; Password=1234"
          />
        </div>

        <div className="flex flex-col mb-3 gap-y-1">
          <div className="flex items-center justify-between">
            <label className="font-medium" htmlFor="fileProvider">
              File Provider
            </label>
            <p className="text-xs opacity-80">{errors.fileProvider?.message}</p>
          </div>

          <Input
            {...register('fileProvider', {
              required: 'Select a file provider',
            })}
            disabled={isSubmitting}
            id="fileProvider"
            placeholder="Supabase"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <label className="font-medium" htmlFor="searchProvider">
              Search Provider
            </label>
            <p className="text-xs opacity-80">
              {errors.searchProvider?.message}
            </p>
          </div>

          <Select
            {...register('searchProvider', {
              required: 'Select a search provider',
            })}
            placeholder="Search Provider..."
            items={tempItems}
          />
        </div>

        <ActionButton className="mt-5" type="submit" isLoading={isSubmitting}>
          Save
        </ActionButton>
      </form>
    </div>
  );
}

export { AdminPanel };
