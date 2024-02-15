import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void,
  children: ReactNode,
  className?: String,
  color?: 'primary' | 'dark'
}

const Button: FC<ButtonProps> = ({ color = 'primary', onClick, children, className }) => {
  const buttonStyles = {
    primary: 'bg-[#4DF986] text-black',
    dark: 'bg-dark-main border border-[#343B45] text-white'
  }
  return <button onClick={onClick} className={`${className} ${buttonStyles[color]} h-12 font-semibold text-base rounded-lg px-5`}>
    {children}
  </button>
}

export default Button;