import React from 'react'
import './keyboard.css'
import { useChangeValueKeyBoard } from './hooks/UseKeyBoard'
import { useKeyBoard } from './hooks/UseChangeValueKeyBoard'
import Keyboard from 'react-simple-keyboard'

export function KeyBoard () {
  const { setChangeValue } = useChangeValueKeyBoard()

  const { openedKeyBoard, setKeyBoard } = useKeyBoard()

  const onChange = (input: string) => {
    setChangeValue(input)
  }

  const onKeyPress = (button: string) => {
    if (button === '{enter}') setKeyBoard(false)
  }

  const handleOnClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      event.stopPropagation()
      setKeyBoard(false)
    }
  }

  return openedKeyBoard
    ? (
      <div className='absolute inset-x-0 bottom-0' onClick={handleOnClickOutside}>
        <Keyboard onChange={onChange} onKeyPress={onKeyPress} />
      </div>
      )
    : (
      <></>
      )
}
