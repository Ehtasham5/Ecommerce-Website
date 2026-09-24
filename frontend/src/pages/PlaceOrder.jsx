import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState("cod")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })
  const { products, backendUrl, cartItems, getCartAmount, setCartItems, navigate, token, delivery_price } = useContext(ShopContext)

  const onChangeHandler = (event) => {
    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!token) {
      toast.error('Please login before placing your order')
      navigate('/login')
      return
    }

    try {
      let orderItems = []
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId))
            if (itemInfo) {
              itemInfo.size = size
              itemInfo.quantity = cartItems[itemId][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      if (!orderItems.length) {
        toast.error('Your cart is empty')
        return
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_price,
        paymentMethod: method,
      }

      const response = await axios.post(
        backendUrl + '/api/order/place',
        orderData,
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        toast.success(response.data.message || 'Order placed successfully')
        navigate('/orders')
      } else {
        toast.error(response.data.message || 'Unable to place order')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

      <div className='flex flex-col gap-4 w-full sm:max-w-120'>
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>

        <div className="flex gap-3">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} className='border bg-slate-50 rounded py-1.5 px-3.5 border-gray-700 w-full' type="text" placeholder='First name' required/>
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} className='border bg-slate-50 rounded py-1.5 px-3.5 border-gray-700 w-full' type="text" placeholder='Last name' required/>
        </div>
        <input name="email" value={formData.email} onChange={onChangeHandler} className='border border-gray-700 py-1.5 px-3.5 rounded w-full ' type="email" placeholder='Enter your email' required />
        <input name="street" value={formData.street} onChange={onChangeHandler} className='border border-gray-700 py-1.5 px-3.5 rounded w-full ' type="text" placeholder='Street' required />
        <div className="flex gap-3">
          <input name="city" value={formData.city} onChange={onChangeHandler} className='border bg-slate-50 rounded py-1.5 px-3.5 border-gray-700 w-full' type="text" placeholder='City' required/>
          <input name="state" value={formData.state} onChange={onChangeHandler} className='border bg-slate-50 rounded py-1.5 px-3.5 border-gray-700 w-full' type="text" placeholder='State' required/>
        </div>
        <div className="flex gap-3">
          <input name="zipCode" value={formData.zipCode} onChange={onChangeHandler} className='border bg-slate-50 rounded py-1.5 px-3.5 border-gray-700 w-full' type="text" placeholder='Zip Code' required/>
          <input name="country" value={formData.country} onChange={onChangeHandler} className='border bg-slate-50 rounded py-1.5 px-3.5 border-gray-700 w-full' type="text" placeholder='Country' required/>
        </div>
        <input name="phone" value={formData.phone} onChange={onChangeHandler} className='border border-gray-700 py-1.5 px-3.5 rounded w-full ' type="tel" placeholder='Phone' required />
        
        
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"}/>
        </div>
        {/* ----------- PAYMENT OPTIONS ------------------ */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <div role="button" tabIndex={0} onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
          </div>
          <div role="button" tabIndex={0} onClick={() => setMethod("razor-pay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razor-pay" ? "bg-green-400" : ""}`}></p>
            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
          </div>
          <div role="button" tabIndex={0} onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
            <p className='text-sm mx-4 text-gray-500 font-medium'>CASH ON DELIVERY</p>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button disabled={isSubmitting} type="submit" className='bg-black text-white px-15 py-3 text-sm disabled:opacity-50'>
            {isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder