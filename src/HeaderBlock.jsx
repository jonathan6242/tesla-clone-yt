import './HeaderBlock.css'

function HeaderBlock() {
  return (
    <div className="header-block">
      <div className="header-block__info">
        <div className="header-block__info--text">
          <h1>Model 3</h1>
          <h4>Order Online for <span>Touchless Delivery</span></h4>
        </div>
        <div className="header-block__actions">
          <button className='header-block__button--primary'>Custom Order</button>
          <button className='header-block__button--secondary'>Existing Inventory</button>
        </div>
      </div>
    </div>
  )
}
export default HeaderBlock