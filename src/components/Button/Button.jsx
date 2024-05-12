
import './Button.css'

const Button = ({ onClick, isActive }) => {
  return (
    <button className='btn accent' onClick={onClick} >
      {isActive}
    </button>
  )
}

export default Button