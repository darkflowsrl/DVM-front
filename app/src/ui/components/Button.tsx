import React from 'react'
import clsx from 'clsx'

interface Props {
  type?: 'success' | 'warning' | 'error' | 'default'
  disabled?: boolean
  children: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export function Button ({ type = 'default', disabled = false, children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'text-[17px] font-roboto text-[#1C2E3D] rounded-md px-[25px] py-[14px]',
        {
          'bg-default': type === 'default',
          'bg-success': type === 'success',
          'bg-warning': type === 'warning',
          'bg-error text-white': type === 'error',
          'bg-default/50': type === 'default' && disabled,
          'bg-success/50': type === 'success' && disabled,
          'bg-warning/50': type === 'warning' && disabled,
          'bg-error/50': type === 'error' && disabled
        }
      )}
    >
      {children}
    </button>
  )
}
