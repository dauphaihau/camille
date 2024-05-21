import { forwardRef, ReactNode } from 'react';
import { ClassValue } from 'clsx';
import { cn } from 'core/helpers';

interface BoxProps {
  classes: string | ClassValue[],
  children: ReactNode,
  footer: boolean,
  nav: boolean,
  header: boolean,
  main: boolean,
  form: boolean,
  section: boolean,
  aside: boolean,
  blockquote: boolean,
  hideIf: boolean,
  onClick: () => void,
  onSubmit: (event) => void,
  style: object
}

const Box = forwardRef<HTMLDivElement, Partial<BoxProps>>((props, ref) => {
  const {
    children, classes, hideIf = false,
    footer, nav, header, main, aside,
    ...others
  } = props;

  const className = cn(classes);

  if (hideIf) return null;

  if (header) return <header ref={ ref } className={ className } { ...others }>{ children }</header>;
  if (nav) return <nav ref={ ref } className={ className } { ...others }>{ children }</nav>;
  if (footer) return <footer ref={ ref } className={ className } { ...others }>{ children }</footer>;
  if (main) return <main ref={ ref } className={ className } { ...others }>{ children }</main>;
  if (aside) return <aside ref={ ref } className={ className } { ...others }>{ children }</aside>;
  return (<div ref={ ref } className={ className } { ...others }>{ children }</div>);
});

Box.displayName = 'Box';
export default Box;
