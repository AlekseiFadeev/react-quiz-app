import React from "react"
import classess from "./Button.module.css"

const Button = props => {
  const cls = [
    classess.Button,
    classess[props.type]
  ]

  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button