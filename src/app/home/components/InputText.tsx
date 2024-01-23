interface Props {
  label: string
}

export function InputText ({ label }: Props) {
  return (
    <div className='flex flex-col mt-[46px]'>
      <label className='font-roboto font-bold text-[#32cf9c] text-[20px] tracking-[0] leading-[normal] whitespace-nowrap mb-[13px]'>{label}</label>
      <input className='h-[64px] w-[366px] rounded-[5px] bg-[#172530] border border-solid border-[#fff] pl-[18px] text-white mr-8 p-4' type='text' />
    </div>
  )
}
