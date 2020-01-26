import React from "react"
import classess from "./MenuToggle.module.css"

const MenuToggle = props => {
  const cls = [
    classess.MenuToggle,
    'fa'
  ]

  if (props.isOpen) {
    cls.push('fa-times')
    cls.push(classess.open)
  } else {
    cls.push('fa-bars')
  }

  return (
    <i
      className={cls.join(' ')}
      onClick={props.onToggle}
    />
  )
}

export default MenuToggle