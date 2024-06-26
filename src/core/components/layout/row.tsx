import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { ClassValue } from 'clsx';
import { cn } from 'core/helpers';

enum GAP {
  FIRST = 1,
  SECOND,
  THIRD,
  FOUR,
  EIGHT = 8,
}

enum SPACE {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  BETWEEN = 'between',
  AROUND = 'around',
}

enum WRAP {
  DEFAULT = 'wrap',
  REVERSE = 'reverse',
  NOWRAP = 'nowrap',
}

const WRAP_MAPS: Record<WRAP, string> = {
  [WRAP.DEFAULT]: 'flex-wrap',
  [WRAP.REVERSE]: 'flex-wrap-reverse',
  [WRAP.NOWRAP]: 'flex-nowrap',
};

const GAP_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-1',
  [GAP.SECOND]: 'gap-2',
  [GAP.THIRD]: 'gap-3',
  [GAP.FOUR]: 'gap-4',
  [GAP.EIGHT]: 'gap-8',
};

const JUSTIFY_MAPS: Record<SPACE, string> = {
  [SPACE.CENTER]: 'justify-center',
  [SPACE.BETWEEN]: 'justify-between',
  [SPACE.AROUND]: 'justify-around',
  [SPACE.END]: 'justify-end',
  [SPACE.START]: 'justify-start',
};

const ALIGN_ITEM_MAPS: Record<SPACE, string> = {
  [SPACE.CENTER]: 'items-center',
  [SPACE.BETWEEN]: 'items-between',
  [SPACE.AROUND]: 'items-around',
  [SPACE.END]: 'items-end',
  [SPACE.START]: 'items-start',
};

const ALIGN_CONTENT_MAPS: Record<SPACE, string> = {
  [SPACE.START]: 'content-start',
  [SPACE.END]: 'content-end',
  [SPACE.CENTER]: 'content-center',
  [SPACE.BETWEEN]: 'content-between',
  [SPACE.AROUND]: 'content-around',
};

type RowProps = {
  gap: number,
  justify: 'center' | 'between' | 'around' | 'start' | 'end'
  align: 'center' | 'between' | 'around' | 'start' | 'end'
  content: 'center' | 'between' | 'around'
  wrap: 'wrap' | 'reverse' | 'around'
  hideIf: boolean,
  reverse: boolean
  classes: string | ClassValue[],
} & ComponentPropsWithoutRef<'div'>

const Row = forwardRef<HTMLDivElement, Partial<RowProps>>(({
  children, classes, gap = 0, hideIf, justify, align, content, wrap, reverse, ...others
}, ref) => {

  if (hideIf) return null;

  return (
    <div
      ref={ ref }
      className={ cn('flex',
        GAP_MAPS[gap],
        justify && JUSTIFY_MAPS[justify],
        align && ALIGN_ITEM_MAPS[align],
        content && ALIGN_CONTENT_MAPS[content],
        wrap && WRAP_MAPS[wrap],
        { 'flex-row-reverse': reverse },
        cn(classes)
      ) }
      { ...others }
    >
      { children }
    </div>
  );
});

Row.displayName = 'Row';
export default Row;
