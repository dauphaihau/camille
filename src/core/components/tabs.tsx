'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../helpers';
import { Button } from './buttons';

type TabsProps = TabsPrimitive.TabsProps

export function Tabs({ ...props }: TabsProps) {
  return <TabsPrimitive.Root { ...props } />;
}

type TabsListElement = React.ElementRef<typeof TabsPrimitive.List>;

Tabs.List = React.forwardRef<
  TabsListElement,
  TabsPrimitive.TabsListProps
>(function TabsList(props, forwardedRef) {
  return (
    <TabsPrimitive.List
      { ...props }
      asChild={ false }
      ref={ forwardedRef }
      className={ cn('border-b border-accent-light px-1.5') }
    />
  );
});


type TabsTriggerElement = React.ElementRef<typeof TabsPrimitive.Trigger>;

Tabs.Trigger = React.forwardRef<TabsTriggerElement, TabsPrimitive.TabsTriggerProps>(
  function TabsTrigger(props, forwardedRef) {
    const { className, children, ...triggerProps } = props;
    return (
      <TabsPrimitive.Trigger
        { ...triggerProps }
        asChild={ false }
        ref={ forwardedRef }
        className={ cn(
          'py-1.5',
          'data-[state=active]:border-b-black border-0 data-[state=active]:border-solid data-[state=active]:border-b-2',
          className
        ) }
      >
        <Button
          classes='text-sm font-medium'
          color='gray'
          variant='text'
          size='xs'
        >{ children }
        </Button>
      </TabsPrimitive.Trigger>
    );
  }
);

type TabsContentElement = React.ElementRef<typeof TabsPrimitive.Content>;

Tabs.Content = React.forwardRef<TabsContentElement, TabsPrimitive.TabsContentProps>(
  function TabsContent(props, forwardedRef) {
    return (
      <TabsPrimitive.Content
        { ...props }
        ref={ forwardedRef }
        className={ cn('') }
      />
    );
  }
);

Tabs.displayName = 'Tabs';
