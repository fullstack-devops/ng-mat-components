import { FsCalendarModule } from 'projects/ng-mat-components/src/public-api';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import StoryFsCalendarComponent from './calendar.component';

export default {
  title: 'Fs Calendar',
  component: StoryFsCalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FsCalendarModule
      ],
    }),
  ]
} as Meta;

const Template: Story<StoryFsCalendarComponent> = (args: StoryFsCalendarComponent) => ({
  props: args,

});

export const Default = Template.bind({});
Default.args = {};
