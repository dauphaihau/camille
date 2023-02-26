'use client'

import { cn } from 'core/helpers';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

export type InputProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  classes?: string
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  size?: 'xs' | 'sm' | 'md';
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
}
// } & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  label,
  placeholder = '',
  helperText,
  id,
  classes,
  size = 'sm',
  type = 'text',
  readOnly = false,
  hideError = false,
  validation,
  ...others
}: InputProps) {

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className='text-sm text-[#3c4149] dark:text-white'>{label}</label>}
      <div className={cn('',
        'group')}>
        {/*<div className='input__contentLeft'>{contentLeft}</div>*/}
        {/*<div className='input__contentRight'>{contentRight}</div>*/}
        {/*<Clear/>*/}
        <input
          autoFocus={false}
          // ref={ref}
          type={type}
          // value={value}
          // name={name}
          // onChange={handleOnChange}
           {...register(id, validation)}
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
          dark:border-0 dark:text-white;
        `,

            [
              size === 'xs' && ['px-[14px] h-[28px] text-xs'],
              size === 'sm' && ['px-4 h-[34px] text-sm'],
              size === 'md' && ['px-[22px] h-[42px] text-base'],
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

Input.displayName = 'Input';
