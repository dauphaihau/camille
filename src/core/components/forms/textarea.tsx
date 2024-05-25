'use client';

import * as React from 'react';
import { cn } from 'core/helpers';

export type TextareaProps = {
  /** Textarea label */
  label?: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id?: string;
  /** Small text below input, useful for additional information */
  error?: string | boolean;
  helperText?: string;
  /**
   * Textarea type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  classes?: string
  classesLabelLeft?: string
  labelLeft?: string

  size?: 'xs' | 'sm' | 'md' | number;
} & React.ComponentPropsWithoutRef<'textarea'>;

export function Textarea({
  label,
  helperText,
  id,
  classes,
  classesLabelLeft,
  size = 'sm',
  labelLeft,
  error,
  ...others
}: TextareaProps) {

  const arrSize = {
    xs: 'px-[14px] text-xs',
    sm: 'px-4 text-sm',
    md: 'px-[22px] text-base',
  };

  return (
    <div className='w-full'>
      {
        label &&
        <label
          htmlFor={ id }
          className='text-sm font-medium text-[#3c4149] dark:text-white mb-1'
        >
          { label }
        </label>
      }
      <div
        className={ cn('',
          'group relative') }
      >
        { /*<div className='input__contentLeft'>{contentLeft}</div>*/ }
        <span
          className={ cn('absolute flex items-center justify-center top-0 left-0 bottom-0',
            arrSize[size],
            classesLabelLeft
          ) }
        >{ labelLeft }
        </span>
        { /*<div className='input__contentRight'>{contentRight}</div>*/ }
        { /*<Clear/>*/ }
        <textarea
          className={ cn(
            `
          bg-[#f7f7f5] focus:bg-white
          border border-solid border-gray-300 hover:border-black
          rounded placeholder-gray-500
          transition duration-200 ease-in-out
          focus:ring-black focus:border focus:border-black focus:outline-none
          w-full appearance-none
          text-gray-900 text-xs lg:text-sm
          dark:bg-[#16161a]
          dark:border-0 dark:text-white
          
          disabled:cursor-not-allowed
          disabled:hover:border-gray-300
          disabled:bg-[#e5e5e5] 
          disabled:text-[#aeb5bc]
        `,
            arrSize[size],
            'p-2.5 md:pr-5',
            // { 'pl-10': contentLeft },
            classes
          ) }
          { ...others }
        />
      </div>
      { !error && helperText && <p className='text-sm mt-2'>{ helperText }</p> }
      {
        typeof error === 'string' && error &&
        <p className='text-red-500 text-sm mt-2'>
          { error }
        </p>
      }

    </div>
  );
}

Textarea.displayName = 'Textarea';
