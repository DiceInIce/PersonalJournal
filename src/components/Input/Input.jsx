import { forwardRef } from "react"

const Input = () => {
  forwardRef(function Input({isValid, apperance = Text, className, ...props}, ref) {
    return (
      <input type="text" ref={ref} className={className} {...props}/>
    )
  })
}

export default Input

// //
// import { forwardRef } from 'react';
// import styles from './Input.module.css';
// import cn from 'classnames';

// const Input = forwardRef(function Input({ isValid, appearence = 'text', className, ...props }, ref) {
// 	return (
// 		<input ref={ref} className={cn(className, {
// 			[styles['invalid']]: isValid,
// 			[styles['input-title']]: appearence == 'title',
// 			[styles['input']]: appearence == 'text'
// 		})};


// стилизация инпутов
// авторизация