import { Link } from '@melodiy/router';

function Homepage() {
  return (
    <div>
      <h1 className="text-xl">Welcome to the Homepage</h1>
      <Link to="/posts/$postId" params={{ postId: '25' }}>
        Click Here
      </Link>
    </div>
  );
}

export { Homepage };
