import { useToggle } from './hooks/useToggle'

export function ButtonMenu () {
  const { handleToggleSidebar } = useToggle()

  return (
    <button
      id='sidebar-toggle'
      className='fixed z-30'
      onClick={handleToggleSidebar}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100'
        height='88'
        viewBox='0 0 100 88'
        fill='none'
      >
        <g filter='url(#filter0_d_1179_579)'>
          <path
            d='M0 0H88C92.4183 0 96 3.58172 96 8V72C96 76.4183 92.4183 80 88 80H0V0Z'
            fill='#32CF9C'
          />
        </g>
        <path
          d='M29 54H68V49.5H29V54ZM29 42.75H68V38.25H29V42.75ZM29 27V31.5H68V27H29Z'
          fill='#1C2E3D'
        />
        <defs>
          <filter
            id='filter0_d_1179_579'
            x='-4'
            y='0'
            width='104'
            height='88'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_1179_579'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_1179_579'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </button>
  )
}
