import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postId')({
  beforeLoad: ({ context }) => {
    console.log('here');
    console.log(context);
  },
  loader: ({ params }) => fetchPost(params.postId)
});

const fetchPost = async (postId: string) => {
  return { id: postId, title: 'test post', body: 'This post has been scheduled for deletion' };
};
