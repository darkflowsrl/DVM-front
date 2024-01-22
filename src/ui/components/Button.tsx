import PropTypes from 'prop-types'
import { useReducer } from 'react'

interface Props {
  property1: 'frame-1' | 'frame-2';
  className: any;
}

export function Button ({ property1, className }: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || 'frame-1'
  })
  return (
    <div
      className={`w-[137px] shadow-[0px_3.41px_3.41px_#00000040] h-[49px] rounded-[5px] relative ${
        state.property1 === 'frame-2' ? 'bg-[#27ac81]' : 'bg-[#32cf9c]'
      } ${className}`}
      onClick={() => {
        dispatch('click')
      }}
    >
      {' '}
      <div className="[font-family:'Roboto-Regular',Helvetica] w-[87px] left-[25px] tracking-[0] text-[17.7px] top-[13px] text-[#1c2e3d] h-[21px] font-normal text-center leading-[normal] absolute">
        {' '}
        Agregar{' '}
      </div>{' '}
    </div>
  )
}

function reducer (state: any, action: any) {
  switch (action) {
    case 'click':
      return { ...state, property1: 'frame-2' }
  }
  return state
}

Button.propTypes = { property1: PropTypes.oneOf(['frame-1', 'frame-2']) }
