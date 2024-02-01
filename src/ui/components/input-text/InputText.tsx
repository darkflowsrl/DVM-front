import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'
import { useKeyBoard } from '../keyboard/hooks/UseKeyBoard'
import { useEffect, useState } from 'react'

interface Props {
  label: string
  name: string
  options: RegisterOptions<Record<string, string>>
  register: UseFormRegister<Record<string, string>>
  errors?: FieldErrors
}

export function InputText ({ label, name, register, options, errors }: Props) {
  const { toggleKeyBoard, value } = useKeyBoard()

  useEffect(() => toggleKeyBoard(), [])

  const onFocusInput = () => {
    toggleKeyBoard()
  }  

  return (
    <div className='flex flex-col mt-[46px]'>
      <label className='font-roboto font-bold text-success text-[20px] tracking-[0] leading-[normal] whitespace-nowrap mb-[13px]'>{label}</label>
      <input
        className={clsx('h-[64px] w-[366px] rounded-[5px] bg-[#172530] border border-solid border-[#fff] pl-[18px] text-white p-4', {
          'border-error': errors && errors[name],
          'focus:border-error': errors && errors[name],
          'focus-visible:border-error': errors && errors[name]
        })}
        type='text'
        value={value}
        {...register(name, options)}
        onFocus={onFocusInput}
      />
    </div>
  )
}