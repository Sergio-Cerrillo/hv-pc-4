'use client'
import React, { FC } from "react";
interface ButtonProps {
    className?: string
    onClick?: () => void
    children: JSX.Element
}

const Button: FC<ButtonProps> = ({ onClick, className, children }) => {
    return <button className={className} onClick={onClick}>{children}</button>
}
export default Button

