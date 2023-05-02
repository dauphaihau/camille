import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { cn } from "core/helpers";

enum ButtonVariant {
  'filled',
  'outline',
  'default',
  'text',
}

enum ButtonColor {
  'black',
  'red',
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
    width = '', icon = '', iconRight = '', iconLeft = '',
    children,
    text, shadow = '',
    size = 'sm',
    isLoading,
    disabled: buttonDisabled,
    ...others
  } = props

  const disabled = isLoading || buttonDisabled

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        // font-medium
        //   font-semibold
          `
          inline-flex items-center justify-center rounded 
          transition ease-in-out duration-300
          leading-4 cursor-pointer
        `,
        { 'drop-shadow-xl': shadow },
        [
          size === 'xs' && ['px-[14px] h-[28px] text-xs'],
          size === 'sm' && ['px-4 h-[34px] text-sm'],
          size === 'md' && ['px-[22px] h-[42px] text-base'],
        ],
        [
          color === 'black' && [
            { 'bg-black text-white hover:opacity-80': variant === 'filled' },
            { 'bg-white text-black hover:bg-[#e9eaeb]': variant === 'outline' },

            { 'bg-transparent text-primary-black hover:text-primary-black hover:bg-[#efefef]': variant === 'text' },
            // { 'bg-transparent text-primary-black hover:text-primary-black hover:bg-zinc-100': variant === 'text' },

            // 'border-2 border-black dark:border-white',
            { 'border-[1px] border-solid border-black': variant !== 'text' && !disabled },
            // { 'border-[1px] border-solid border-black': variant !== 'default' && variant !== 'text' && !disabled },

            'dark:bg-white dark:text-black',
            // 'dark:hover:bg-black dark:hover:text-white',
            // 'dark:hover:bg-black',
            // 'dark:hover:bg-gray-300',
            'dark:hover:bg-[#f8f9fa]',

            // { 'hover:bg-white hover:text-black': !disabled && variant === 'filled' }
            // { 'hover:opacity-80': !disabled && variant === 'filled' }

            // 'hover:bg-white hover:text-black',
            // 'active:bg-primary-500',
            // 'disabled:bg-primary-400 disabled:hover:bg-primary-400',
          ],

          color === 'red' && [
            { 'bg-[#eb5757] text-white': variant === 'filled' },
            { 'bg-white text-black': variant === 'outline' },
            { 'hover:bg-[#c45753]': !disabled },
            // 'border-[1px] border-solid border-black',
            'dark:bg-white dark:text-black',
            // 'hover:bg-[#c45753]',
          ],

          color === 'gray' && !disabled && [
            { 'bg-white text-[#37352f] hover:bg-[#efefef]:': variant === 'text' },
            'hover:bg-[#efefef]'
          ],

          variant === 'default' && [
            // { 'border-[1px] border-solid border-[#cfd4da]': variant !== 'default' && !disabled },
            { 'border-[1px] border-solid border-[#cfd4da]': !disabled },
            { 'hover:bg-[#f8f9fa]': !disabled }
          ],
        ],
        [
          disabled && !isLoading && [
            'bg-[#e5e5e5] text-[#acacac] dark:bg-[#383a3f] dark:text-[#25262b] cursor-not-allowed hover:opacity-100'
          ]
        ],
        // [
        //   disabled && !isLoading && [
        //     'bg-[#e5e5e5] text-[#acacac] dark:bg-[#383a3f] dark:text-[#25262b] cursor-not-allowed hover:opacity-100'
        //   ]
        // ],
        {
          // 'opacity-30 hover:opacity-30': disabled || isLoading,
          'opacity-30 hover:opacity-30': isLoading,
          'cursor-wait': isLoading,
          'cursor-not-allow': buttonDisabled,
          'drop-shadow-xl': shadow,
          [`w-${width}`]: width
        },
        classes
      )}
      {...others}
      ref={ref}
    >
      {iconLeft && <span className='mr-2'>{iconLeft}</span>}
      {
        isLoading &&
        <svg
          role="status"
          className="inline w-3 h-[18px] mr-2.5 text-gray-300 animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
      }
      {children || text}
      {iconRight && <span className='ml-2'>{iconRight}</span>}
    </button>
  )
})

Button.displayName = 'Button';
export default Button;
