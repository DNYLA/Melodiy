import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Data/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    // nextjs: {
    //   appDirectory: true,
    // },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'images/test-avatar.jpg',
    fallback: 'D',
    alt: "Dan's Avatar",
  },
};

//TODO: Add Square Avatar
export const Square: Story = {
  args: {
    src: 'images/test-avatar.jpg',
    fallback: 'D',
    alt: "Dan's Avatar",
  },
};
