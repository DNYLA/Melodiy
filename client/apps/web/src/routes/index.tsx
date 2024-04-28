import { Link, createFileRoute } from '@tanstack/react-router';
import toast from 'react-hot-toast';

function Homepage() {
  return (
    <div>
      Homepage
      <Link to="/artist/$id" params={{ id: '15' }}></Link>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Homepage,
});
