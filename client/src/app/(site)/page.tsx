import { Button } from '@/components/Inputs/Buttons/Button';

export default function Home() {
  return (
    <div className="flex flex-col">
      Home
      <Button>Login</Button>
      <Button variant="alternative">Sign Up</Button>
    </div>
  );
}
