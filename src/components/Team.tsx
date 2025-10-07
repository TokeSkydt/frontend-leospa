import React from 'react'
import { getTeamData } from '@/data/TeamData';
import Link from 'next/link';
import Image from 'next/image';

const Team = async () => {
  const TeamData = await getTeamData();

  return (
    <div>
      <div className='text-center mt-10 mb-5'>
        <h4 className='text-2xl font-bold'>Experienced Team</h4>
        <p className=''>to doesn't hit appear replenish together called he of mad place won't wherein blessed second every wherein </p>
        <p>were meat kind wherein and martcin</p>
      </div>
      <section className='flex flex-wrap justify-center gap-3 mt-15'>
        {TeamData.map((Team, _id) => (
          <div key={_id} className=''>
            <div className='abselute'>
              <Image
                src={`/img/team/${Team.image}`}
                alt={`${Team.firstname} ${Team.lastname}`}
                width={225}
                height={300}
                className='mr-4'
              />
              <div className='bg-white py-4 text-center shadow mb-20 relative top-[-50px] w-[200px] left-3'>
                <h5 className='text-lg font-bold'>{Team.firstname} {Team.lastname}</h5>
                <p className='text-sm text-gray-600'>{Team.role}</p>
              </div>
            </div>

          </div>
        ))}
      </section>


    </div>
  )
}

export default Team