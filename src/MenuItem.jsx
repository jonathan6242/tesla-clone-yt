import './MenuItem.css'

function MenuItem({ title }) {
  return (
    <div className='menu__item'>
      <h4>{title}</h4>
    </div>
  )
}
export default MenuItem