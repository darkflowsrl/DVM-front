import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { DataSelect } from '../../../app/home/interfaces/data-select.interface'
import clsx from 'clsx'
import { useModal } from '../modal/hooks/UseModal'

interface Props {
  label: string
  name: string
  data: DataSelect[]
  options?: RegisterOptions
  register: UseFormRegister<Record<string, number>>
  errors?: FieldErrors
  withAdd?: boolean
}

export function InputSelect ({ label, name, data, register, options = {}, errors, withAdd = false }: Props) {
  const optiones = [<option key={-1} className='border-b-success p-[30px]' selected />, ...data.map((value, i) => {
    return <option key={i} value={value.id} className='border-b-success p-[30px]'>{value.name}</option>
  })]

  return (
    <div className='flex flex-col mt-[46px]'>

      <label className='font-roboto font-bold text-success text-[20px] tracking-[0] leading-[normal] whitespace-nowrap mb-[13px]'>{label}</label>
      <select
        className={clsx('relative h-[64px] w-[366px] rounded-[5px] bg-[#172530] border border-solid border-[#fff] pl-[18px] text-white bg-[url("./arrow-down.svg")] appearance-none bg-no-repeat mr-8 p-4 bg-[94%]', {
          'border-error': errors && errors[name],
          'focus:border-error': errors && errors[name],
          'focus-visible:border-error': errors && errors[name]
        })}
        {...register(name, options)}
      >
        {optiones}
        {withAdd && <OpcionNuevoOperario />}
        <div className='relative'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9' fill='none'>
            <path d='M10.4225 7.67263L15.6677 2.29759C15.8805 2.07819 16 1.78139 16 1.47202C16 1.16265 15.8805 0.865846 15.6677 0.646438C15.5615 0.536679 15.4351 0.449561 15.2958 0.39011C15.1566 0.330658 15.0072 0.300049 14.8563 0.300049C14.7055 0.300049 14.5561 0.330658 14.4169 0.39011C14.2776 0.449561 14.1512 0.536679 14.045 0.646438L8.81122 6.03319C8.70498 6.14295 8.5786 6.23006 8.43934 6.28952C8.30009 6.34897 8.15072 6.37958 7.99987 6.37958C7.84901 6.37958 7.69965 6.34897 7.56039 6.28952C7.42114 6.23006 7.29475 6.14295 7.18852 6.03319L1.95474 0.646438C1.74107 0.425928 1.45067 0.30143 1.14743 0.300332C0.844186 0.299234 0.552936 0.421626 0.337752 0.640583C0.122569 0.85954 0.00107761 1.15713 5.671e-06 1.46788C-0.00106627 1.77862 0.118372 2.07708 0.33204 2.29759L5.57725 7.67263C6.22004 8.33052 7.09138 8.70005 7.99987 8.70005C8.90835 8.70005 9.77969 8.33052 10.4225 7.67263Z' fill='white' />
          </svg>
        </div>
      </select>
    </div>
  )
}

function OpcionNuevoOperario () {
  const { toggleOpenedState } = useModal()
  const handleClick = () => toggleOpenedState('agregar-operario')
  return (
    <option className='text-success p-[30px]' key={-2} value='-1' onClick={handleClick}>
      Agregar Operario +
    </option>
  )
}
