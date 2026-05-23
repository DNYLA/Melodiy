import { getRouteApi } from '@melodiy/router';

const route = getRouteApi('/posts/$postId');

function PostIdComponent() {
  const post = route.useParams();
  const data = route.useLoaderData();

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">Your post ID is {post.postId}</h4>
      <div className="text-sm">{data.title}</div>
      <div className="text-sm">{data.body}</div>
      <div>Test</div>
    </div>
  );
}

export { PostIdComponent };
