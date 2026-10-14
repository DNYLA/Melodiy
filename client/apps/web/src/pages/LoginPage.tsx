import { Button } from '@melodiy/ui';

function LoginPage() {
  return (
    <div className="p-4 gap-y-4 flex flex-col">
      <h1 className="text-xl text-violet-700">LoginPage</h1>
      <div className="flex ">
        <Button>Upload</Button>
      </div>
    </div>
  );
}

export { LoginPage };
