import React from 'react'
import { getFooterData } from '@/data/FooterData';
import Link from 'next/link';
import Image from 'next/image';

const Contact = async () => {
  const FoterData = await getFooterData();

  return (

    <section className='bg-pink-50'>
      <div className='flex justify-center mt-5'>
        <Image src="/img/logo.png" alt="logo" height={100} width={100} className='' />
      </div>
      <div className="flex flex-wrap justify-center mt-12 gap-3 ">
        <div>
          <Image src="/img/appointment-img.jpg" alt="" width={300} height={300} className='' />
        </div>
        <div className='max-w-[300px]'>
          <h4 className='text-2xl font-bold'>Contact Us</h4>
          <p className='text-gray-600'>If you have any questions or need further information, feel free to reach out to us.</p>
          <div className='mt-5'>
            <p>Email: {FoterData.email}</p>
            <p>Phone: {FoterData.phone}</p>
            <p>Address: {FoterData.address}</p>
          </div>
        </div>


      </div>

    </section>
  )
}

export default Contact