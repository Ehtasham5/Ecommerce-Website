import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { currency, backendUrl, token, navigate } = useContext(ShopContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const getOrders = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message || 'Unable to load orders')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    getOrders()
  }, [token, backendUrl, navigate])

  if (!token) {
    return (
      <div className='border-t pt-16 text-center text-gray-600'>
        Please login to see your orders.
      </div>
    )
  }

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"}/>
      </div>

      {loading ? (
        <div className='mt-10 text-gray-500'>Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className='mt-10 text-gray-500'>No orders yet.</div>
      ) : (
        <div className='mt-8 flex flex-col gap-6'>
          {orders.map((order) => (
            <div key={order._id} className='border rounded-md p-4'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-3 mb-3'>
                <div>
                  <p className='font-medium sm:text-base'>Order ID: {order._id.slice(-6)}</p>
                  <p className='mt-2 text-sm text-gray-500'>
                    Date: {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className='text-sm text-gray-600'>
                  <p>Status: {order.status}</p>
                  <p>Payment: {order.paymentMethod}</p>
                </div>
              </div>

              {order.items.map((item, index) => (
                <div key={`${order._id}-${index}`} className='flex items-center justify-between gap-4 border-b py-3 last:border-b-0'>
                  <div className='flex items-center gap-4'>
                    <img className='w-16 h-16 object-cover rounded' src={item.image?.[0]} alt={item.name} />
                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <div className='flex gap-3 text-sm text-gray-600 mt-1'>
                        <span>Qty: {item.quantity || 1}</span>
                        <span>Size: {item.size || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <p className='font-medium'>{currency}{item.price}</p>
                </div>
              ))}

              <div className='mt-4 text-right font-medium'>
                Total: {currency}{order.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders