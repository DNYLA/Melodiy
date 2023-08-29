import type { Meta, StoryObj } from '@storybook/react';
import PlaylistCard from './PlaylistCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Cards/PlaylistCard',
  component: PlaylistCard,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof PlaylistCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: 'Sample Playlist',
    owner: 'Dan',
    imageUrl: '/images/default_playlist.png',
  },
};
