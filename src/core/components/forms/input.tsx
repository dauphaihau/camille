'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { cn } from 'core/helpers';

export type InputProps = {
  /** Input label */
  label?: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  error?: string | boolean;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  classes?: string
  classesLabelLeft?: string
  labelLeft?: string
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */

  sizeInput?: 'xs' | 'sm' | 'md';
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
} & React.ComponentPropsWithoutRef<'input'>;

const sizes = {
  xs: 'px-[14px] h-[28px] text-xs',
  sm: 'px-4 h-[36px] text-sm',
  md: 'px-[22px] h-[42px] text-base',
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  const {
    label,
    helperText,
    id,
    classes,
    classesLabelLeft,
    sizeInput = 'sm',
    type = 'text',
    labelLeft,
    error,
    ...others
  } = props;

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
      <div className={ cn('group relative') }>
        { /*<div className='input__contentLeft'>{contentLeft}</div>*/ }
        <span
          className={ cn('absolute flex items-center justify-center top-0 left-0 bottom-0',
            sizes[sizeInput],
            classesLabelLeft
          ) }
        >{ labelLeft }
        </span>
        { /*<Clear/>*/ }
        <input
          type={ type }
          ref={ ref }
          className={ cn(
            `
          bg-[#f7f7f5] focus:bg-white
          border border-solid 
          focus:border focus:outline-none focus:ring-1 
          
          rounded placeholder-gray-500
          transition duration-200 ease-in-out
          w-full appearance-none
          text-gray-900 text-xs lg:text-sm
          dark:bg-[#16161a]
          dark:border-0 dark:text-white
          
          disabled:cursor-not-allowed
          disabled:hover:border-gray-300
          disabled:bg-[#e5e5e5] 
          disabled:text-[#aeb5bc]
        `,
            sizes[sizeInput],
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-black focus:border-black focus:ring-black',
            'p-2.5 md:pr-5',
            // { 'pl-10': contentLeft },
            classes
          ) }
          { ...others }
        />
      </div>
      { !error && helperText && <p className='text-sm mt-2'>{ helperText }</p> }
      {
        typeof error === 'string' && error && (
          <p className='text-red-500 text-sm mt-2'>
            { error }
          </p>
        )
      }

    </div>
  );
});

Input.displayName = 'Input';
