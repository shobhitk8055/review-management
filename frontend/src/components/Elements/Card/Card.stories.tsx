import { Meta, Story } from '@storybook/react';

import { Card, CardProps } from './Card';

const meta: Meta = {
  title: 'Components/Elements/Card',
  component: Card,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<CardProps> = (props) => <Card {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  header: '',
  footer: '',
  shadow: true
};
