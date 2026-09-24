import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Destructure { data } from axios directly to write less code
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { token },
      })

      if (data.success) {
        setOrders(data.orders)
      } else {
        toast.error(data.message || 'Unable to load orders')
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      )

      if (data.success) {
        toast.success('Order status updated')
        fetchOrders() // Re-fetch orders easily
      } else {
        toast.error(data.message || 'Status update failed')
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    }
  }

  // Fetch orders when component loads or token changes
  useEffect(() => {
    if (token) fetchOrders()
  }, [token])

  // 2. Helper function to keep JSX clean
  const formatDate = (dateString) => new Date(dateString).toDateString()

  // 3. Early returns replace messy nested ternaries in the JSX
  if (loading) return <div className="p-5">Loading orders...</div>
  if (orders.length === 0) return <div className="p-5">No orders found.</div>

  return (
    <div>
      <h2 className='mb-6 text-2xl font-semibold'>Orders</h2>

      <div className='flex flex-col gap-5'>
        {orders.map((order) => (
          <div key={order._id} className='border rounded-lg p-4 bg-white shadow-sm'>
            
            {/* Top Row: IDs & Customer Info */}
            <div className='flex flex-col md:flex-row md:justify-between gap-3 border-b pb-3 mb-3'>
              <div>
                <p className='font-medium'>Order ID: {order._id.slice(-6)}</p>
                <p className='text-sm text-gray-500'>{formatDate(order.createdAt)}</p>
              </div>

              <div className='text-sm text-gray-600 md:text-right'>
                <p>Customer: {order.address?.firstName} {order.address?.lastName}</p>
                <p className="font-semibold text-black">Amount: ${order.amount}</p>
              </div>
            </div>

            {/* Middle Row: Items List */}
            <div className='space-y-2'>
              {order.items.map((item, index) => (
                <div key={index} className='flex justify-between text-sm border-b pb-2 last:border-b-0'>
                  <p>{item.name} <span className="text-gray-500">(x{item.quantity} {item.size})</span></p>
                  <p>${item.price}</p>
                </div>
              ))}
            </div>

            {/* Bottom Row: Status Update & Payment */}
            <div className='mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
              <div className='text-sm text-gray-600'>
                <p>Payment: <span className="font-medium text-black">{order.paymentMethod}</span></p>
                <p>Address: {order.address?.city}, {order.address?.country}</p>
              </div>

              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className='border rounded px-3 py-2 bg-gray-50 outline-none cursor-pointer'
              >
                <option value='Order Placed'>Order Placed</option>
                <option value='Packing'>Packing</option>
                <option value='Shipped'>Shipped</option>
                <option value='Out for delivery'>Out for delivery</option>
                <option value='Delivered'>Delivered</option>
                <option value='Cancelled'>Cancelled</option>
              </select>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders