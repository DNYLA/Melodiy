import { createFileRoute } from '@tanstack/react-router';
import toast from 'react-hot-toast';

function Homepage() {
  return <div>Homepage</div>;
}

export const Route = createFileRoute('/')({
  component: Homepage,
});
