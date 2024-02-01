import React from 'react'
import './keyboard.css'
import Keyboard from 'react-simple-keyboard'
import { useKeyBoard } from './hooks/UseKeyBoard'

interface Props {
  nameInput: string
}

export function KeyBoard ({ nameInput }: Props) {
  const { toggleKeyBoard, changeValue, openedKeyBoard } = useKeyBoard()

  const onChange = (input: string) => {
    changeValue({ id: nameInput, value: input })
  }

  const onKeyPress = (button: string) => {
    if (button === '{enter}') toggleKeyBoard()
  }

  const handleOnClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      event.stopPropagation()
      toggleKeyBoard()
    }
  }

  return openedKeyBoard
    ? (
      <div className='absolute inset-x-0 bottom-0  z-50' onClick={handleOnClickOutside}>
        <Keyboard onChange={onChange} onKeyPress={onKeyPress} />
      </div>
      )
    : (
      <></>
      )
}
