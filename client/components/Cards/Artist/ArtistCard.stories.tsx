import type { Meta, StoryObj } from '@storybook/react';
import ArtistCard from './ArtistCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Cards/Artist',
  component: ArtistCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ArtistCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    name: 'Sample Artist',
    imageUrl: '/images/default_playlist.png',
  },
};
