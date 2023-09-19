/* eslint-disable react/prop-types */
// import { PropsWithChildren } from 'react'

// type ButtonProps = {
//   onClick?: (params: unknown) => unknown | undefined
//   className?: string | undefined
//   variant?: string | undefined
//   disabled?: boolean
//   color?: string | undefined
//   bgColor?: string | undefined
// }

const Button = (props) => {
  const { children, onClick, variant, disabled, color, bgColor, className } = props

  const classBGColor = bgColor || 'bg-white'

  let classNames = 'border rounded-md w-full p-1 hover:drop-shadow-md mr-1 ' + classBGColor + ' ' + className
  // switch (variant) {
  //   case 'purple': {
  //     classNames =
  //       'py-2 px-4 w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'
  //     break
  //   }
  //   case 'green': {
  //     classNames =
  //       'py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none'
  //     break
  //   }
  // }

  // console.log(classNames)


  return (
    <button
      type='button'
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      // style={{ color: color, backgroundColor: bgColor }}
    >
      {children}
    </button>
  )
}

export default Button
