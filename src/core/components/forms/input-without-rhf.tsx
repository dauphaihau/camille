'use client'

import { cn } from 'core/helpers';
import * as React from 'react';

export type InputWithoutRhfProps = {
  /** Input label */
  label?: string;
  id: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  classes?: string
  sizeInput?: 'xs' | 'sm' | 'md';
} & React.ComponentPropsWithoutRef<'input'>;

export function InputWithoutRhf({
  label,
  helperText,
  id,
  classes,
  sizeInput = 'sm',
  type = 'text',
  ...others
}: InputWithoutRhfProps) {

  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className='text-sm text-[#3c4149] dark:text-white'>{label}</label>}
      <div
        className={cn('',
          'group')}
      >
        {/*<div className='input__contentLeft'>{contentLeft}</div>*/}
        {/*<div className='input__contentRight'>{contentRight}</div>*/}
        {/*<Clear/>*/}
        <input
          autoFocus={false}
          type={type}
          className={cn(
            `
          bg-[#f7f7f7] focus:bg-white
          border border-solid border-gray-300 hover:border-black
          rounded placeholder-gray-500
          transition duration-200 ease-in-out
          focus:ring-black focus:border focus:border-black focus:outline-none
          w-full appearance-none
          text-gray-900 text-xs lg:text-sm
          dark:bg-[#16161a]
          dark:border-0 dark:text-white
          
          disabled:bg-red-300
          disabled:cursor-not-allowed
          disabled:hover:border-gray-300
          disabled:bg-[#e9ecef] 
          disabled:text-[#aeb5bc]
        `,
            [
              sizeInput === 'xs' && ['px-[14px] h-[28px] text-xs'],
              sizeInput === 'sm' && ['px-4 h-[34px] text-sm'],
              sizeInput === 'md' && ['px-[22px] h-[42px] text-base'],
            ],
            'p-2.5 md:pr-5',
            // { 'pl-10': contentLeft },
            classes
          )}
          {...others}
        />
      </div>
      {helperText && <p className='text-red-500 text-sm mt-2'>{helperText}</p>}
    </div>
  );
}

InputWithoutRhf.displayName = 'Input';
