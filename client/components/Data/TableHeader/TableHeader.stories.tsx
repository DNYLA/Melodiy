import { PlaylistType } from '@/types';
import type { Meta, StoryObj } from '@storybook/react';
import PlaylistHeader from './TableHeader';

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
    title: 'My Amazing Playlist',
    coverPath: '/images/default_playlist.png',
    releaseDate: new Date('2023-08-24 22:19:57'),
    tracks: [],
    type: PlaylistType.Playlist,
    owner: 'Dan',
  },
};
