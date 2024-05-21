import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { cn } from 'core/helpers';

enum ButtonVariant {
  'filled',
  'outline',
  'default',
  'text',
}

enum ButtonColor {
  'black',
  'red',
  'blue',
  'gray',
}

type ButtonProps = {
  classes: string,
  shadow: boolean,
  variant?: keyof typeof ButtonVariant;
  color?: keyof typeof ButtonColor;
  icon: ReactNode,
  iconLeft: ReactNode,
  iconRight: ReactNode,
  width: 'full' | 'fit',
  size: 'xs' | 'sm' | 'md',
  isLoading: boolean,
  text: string | number | ReactNode,
} & ComponentPropsWithoutRef<'button'>

const Button = forwardRef<HTMLButtonElement, Partial<ButtonProps>>((props, ref) => {

  const {
    variant = 'filled',
    color = 'black',
    type = 'button', classes = '',
    width = '',
    // icon = '',
    iconRight = '', iconLeft = '',
    children,
    text, shadow = '',
    size = 'sm',
    isLoading,
    disabled: buttonDisabled,
    ...others
  } = props;

  const disabled = isLoading || buttonDisabled;

  return (
    <button
      type={ type }
      disabled={ disabled }
      className={ cn(
        `
          font-semibold
          inline-flex items-center justify-center rounded-md 
          transition ease-in-out duration-200
          leading-4 cursor-pointer
        `,
        { 'drop-shadow-xl': shadow },
        [
          size === 'xs' && ['px-2.5 h-[28px] text-xs'],
          size === 'sm' && ['px-4 h-[36px] text-sm'],
          size === 'md' && ['px-[22px] h-[42px] text-base'],
        ],
        [
          color === 'black' && [
            { 'bg-black text-white hover:opacity-80': variant === 'filled' },
            { 'bg-white text-black hover:bg-[#e9eaeb]': variant === 'outline' },
            { 'bg-transparent text-primary-black hover:text-primary-black hover:bg-accent-light': variant === 'text' },
            'dark:bg-white dark:text-black',
            'dark:hover:bg-[#f8f9fa]',
          ],
          color === 'red' && [
            { 'bg-[#eb5757] text-white': variant === 'filled' },
            { 'bg-white text-black': variant === 'outline' },
            { 'hover:bg-[#c45753]': !disabled },
            'dark:bg-white dark:text-black',
          ],
          color === 'blue' && [
            { 'bg-[#4281db] text-white': variant === 'filled' },
            { 'bg-white text-black': variant === 'outline' },
            { 'hover:bg-[#3275cd]': !disabled },
            'dark:bg-white dark:text-black',
          ],

          color === 'gray' && !disabled && [
            { 'bg-white text-[#37352f] hover:bg-accent-light:': variant === 'text' },
            'hover:bg-accent-light',
          ],

          variant === 'default' && [
            { 'h-[34px] border border-solid border-accent hover:bg-accent-light': !disabled },
          ],
        ],
        [
          disabled && !isLoading && [
            'bg-[#e5e5e5] border text-[#acacac] dark:bg-[#383a3f] dark:text-[#25262b] cursor-not-allowed hover:opacity-100',
          ],
        ],
        {
          'opacity-30 hover:opacity-30': isLoading,
          'cursor-wait': isLoading,
          'cursor-not-allow': buttonDisabled,
          'drop-shadow-xl': shadow,
          [`w-${width}`]: width,
        },
        classes
      ) }
      { ...others }
      ref={ ref }
    >
      { iconLeft && <span className='mr-2'>{ iconLeft }</span> }
      {
        isLoading &&
        <svg
          className='animate-spin -ml-1 mr-3 h-4 w-4 text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4' />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
      }
      { children || text }
      { iconRight && <span className='ml-2'>{ iconRight }</span> }
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
