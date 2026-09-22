import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {

  const {currency, products} = useContext(ShopContext)

  return (
    <div className='border-t pt-16'>

      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"}/>
      </div>

      <div>
        {
          products.slice(1,4).map((item,index) => (
            <div key={index} className="border-t border-b flex flex-col md:flex-row py-4 text-gray-700 gap-4 md:items-center md:justify-between">
              <div className="flex items center text-sm gap-6">
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='font-medium sm:text-base'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>22, Sep, 2026</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p>Ready to ship</p>
                </div>
                <button className='border px-4 py-2 rounded-sm text-sm font-medium'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders