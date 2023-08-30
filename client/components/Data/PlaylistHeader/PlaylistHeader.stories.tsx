import type { Meta, StoryObj } from '@storybook/react';
import PlaylistHeader from './PlaylistHeader';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Data/PlaylistHeader',
  component: PlaylistHeader,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof PlaylistHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

//TODO: Add Stories for Album, Playlist, etc.
export const Playlist: Story = {
  args: {
    data: {
      uid: '25',
      title: 'My Amazing Playlist',
      imagePath: '/images/default_playlist.png',
      createdAt: '2023-08-24 22:19:57',
      tracks: [],
      user: {
        id: 1,
        username: 'Dan',
      },
    },
  },
};
