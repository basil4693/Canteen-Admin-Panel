import React from 'react'
import { OrderComponent } from '../Components'

function OrdersPage() {
  return (
    <div className='flex flex-col'>
    <div className='flex items-center justify-center mt-2' >
      <h1 className='font-semibold text-2xl text-chineseBlack font-Roboto'>Orders</h1>
    </div>
    <div className='flex flex-row w-full gap-4 m-2'>
      <OrderComponent/>

    </div>
  </div>   )
}

export default OrdersPage