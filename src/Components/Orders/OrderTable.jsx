import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { server } from '../../server';
import { formatDate } from '../../Helpers/datehelper';
import { Loader } from 'lucide-react';

function OrderTable() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([])
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders();
  }, []);


  useEffect(() => {

    const result = data.filter((item) => {
      return item.items.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)

  }, [search, data])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${server}/admin/orders`);
      console.log(response.data)

      const orderCount = response.data.length;
      setCount(orderCount);

      const orderData = response.data.map(order => {
        const items = order.items.map(item => item.name).join(', '); // Combine item names
        return {
          id: order._id,
          user: order.userName,
          email: order.email,
          items: items,
          quantity: order.items.reduce((acc, item) => acc + item.quantity, 0), // Calculate total quantity
          paymentId: order.paymentId,
          price: order.items.reduce((acc, item) => acc + item.price * item.quantity, 0), // Calculate total price
          total: order.totalAmount,
          createdAt: formatDate(order.createdAt)
        };
      });
      console.log(orderData.length)
      setData(orderData);
      setFilter(orderData)
      setLoading(false)

    } catch (error) {
      console.log("order fetch error :" + error);
    }
  };
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,

    },
    {
      name: 'Customer',
      selector: row => row.user,
      sortable: true,

    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Items',
      selector: row => row.items,
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Payment ID',
      selector: row => row.paymentId,

    },
    {
      name: 'Total',
      selector: row => row.total,
      sortable: true,
    },
    {
      name: 'Order time',
      selector: row => row.createdAt,
      sortable: true,

    },
  ];



  return (
    <div>

      <div className='flex flex-row text-2xl font-Roboto   space-x-2'>
        <h1 className='font-light'>All Orders</h1>
        <h1 className='text-seaGreen font-bold'>{count}</h1>


      </div>

      <div className='mt-5 border border-gray-300'>

        <DataTable
          columns={columns}
          data={filter}
          progressPending={loading}
          progressComponent={<Loader className=' flex justify-center items-center' size={50} />}
          columnFilter
          subHeader
          subHeaderComponent={
            <input type='text'
              placeholder='Search item'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='border-2 p-2' />
          }
          subHeaderAlign='right'
        />
      </div>
    </div>
  )
}

export default OrderTable