'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { Box, Button, Row } from 'core/components';
import { cn } from 'core/helpers';
import { PATH } from 'config/const';
import './navigation-menu.css';

export default function Navigate() {
  const pathName = usePathname();
  return (
    <Row
      justify='between'
      align='center'
      classes='h-16 py-4  mx-auto'
    >
      <NavigationMenu.Root className='NavigationMenuRoot'>
        <Box classes='w-full'>
          <NavigationMenu.List className='NavigationMenuList'>
            <NavigationMenu.Item>
              <Link
                href={ PATH.HOME }
                className='font-bold text-xl hover:opacity-50'
              >
                Camille
              </Link>
            </NavigationMenu.Item>
            <Row>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className='NavigationMenuTrigger'>
                  Solutions
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className='NavigationMenuContent'>
                  <ul className='List one'>
                    <li style={ { gridRow: 'span 3' } }>
                      <NavigationMenu.Link asChild>
                        <a
                          className='Callout'
                          href='/'
                        >
                          <svg
                            aria-hidden
                            width='38'
                            height='38'
                            viewBox='0 0 25 25'
                            fill='white'
                          >
                            <path d='M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z' />
                            <path d='M12 0H4V8H12V0Z' />
                            <path d='M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z' />
                          </svg>
                          <div className='CalloutHeading'>Camille</div>
                          <p className='CalloutText'>Unstyled, accessible components for React.</p>
                          { /*<div className="CalloutHeading">Radix Primitives</div>*/ }
                          { /*<p className="CalloutText">Unstyled, accessible components for React.</p>*/ }
                        </a>
                      </NavigationMenu.Link>
                    </li>

                    <ListItem
                      href='#'
                      title='Enterprise'
                    >
                      Advanced features for you org
                    </ListItem>
                    <ListItem
                      href='#'
                      title='Small business'
                    >
                      Run your team on one tool
                    </ListItem>
                    <ListItem
                      href='#'
                      title='Personal'
                    >
                      Free for individuals
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className='NavigationMenuTrigger'>
                  Features
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className='NavigationMenuContent'>
                  <ul className='List two'>
                    <ListItem
                      title='Sync and organize'
                      href='#'
                    >
                      Keep your note handy
                    </ListItem>
                    <ListItem
                      title='Tasks'
                      href='#'
                    >
                      Bring notes & to-dos app together
                    </ListItem>
                    <ListItem
                      title='Drawings'
                      href='#'
                    >
                      Add own simple drawings and illustrations everywhere
                    </ListItem>
                    <ListItem
                      title='Templates'
                      href='#'
                    >
                      Create better notes, faster
                    </ListItem>
                    <ListItem
                      title='Offline Support'
                      href='#'
                    >
                      Use Camille whether you have an internet connection or not!
                    </ListItem>
                    <ListItem
                      title='Versions'
                      href='#'
                    >
                      (Coming soon) See and compare different text versions.
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={ cn('NavigationMenuTrigger',
                    { '!text-black': pathName === PATH.PRICING }
                  ) }
                >
                  <Link href={ PATH.PRICING }>
                    Pricing
                  </Link>
                </NavigationMenu.Trigger>
              </NavigationMenu.Item>
            </Row>

            <NavigationMenu.Item>
              <Link href={ PATH.LOGIN }>
                <Button
                  size='xs'
                  classes='text-[13px] px-2.5'
                >Login
                </Button>
              </Link>
            </NavigationMenu.Item>
            <NavigationMenu.Indicator className='NavigationMenuIndicator'>
              <div className='Arrow' />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>
          <div className='ViewportPosition'>
            <NavigationMenu.Viewport className='NavigationMenuViewport' />
          </div>
        </Box>
      </NavigationMenu.Root>
    </Row>
  );
}

interface ListItemProps {
  children: React.ReactNode
  title?: string
  className?: string
  href?: string
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(({
  className,
  children,
  title,
  ...props
}, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        className={ cn('ListItemLink', className) }
        { ...props }
        ref={ forwardedRef }
      >
        <div className='ListItemHeading'>{ title }</div>
        <p className='ListItemText'>{ children }</p>
      </a>
    </NavigationMenu.Link>
  </li>
));

ListItem.displayName = 'List Item';
