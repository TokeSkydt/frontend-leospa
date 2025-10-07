import React from 'react'
import { getTreatmentsData } from '@/data/TreatmentData';
import Link from 'next/link';
import Image from 'next/image';


const truncateText = (htmlString: string, wordLimit: number = 15) => {
  if (!htmlString) return '';
  // fjener HTML tags
  const textOnly = htmlString.replace(/<[^>]*>/g, '');

  const truncated = textOnly.split(' ').slice(0, wordLimit).join(' ');
  return truncated;
};

const Treatments = async () => {
  const TreatmentData = await getTreatmentsData();

  return (
    <div>
      <div className='text-center mt-10 mb-5'>
        <div className='flex justify-center'>
          <Image src="/img/procedures.png" alt="" width={250} height={50} />
        </div>
        <p className=''>to doesn't hit appear replenish together called he of mad place won't wherein blessed second every wherein </p>
        <p>were meat kind wherein and martcin</p>
      </div>
      <section className='flex flex-wrap justify-center gap-3 mt-15 '>
        {TreatmentData.slice(0, 3).map((Treatment, _id) => (
          <div key={_id} className=''>
            <div className='border border-gray-300 p-4 text-center pb-12 mb-15 h-[400px]'>
              <Image
                src={`/img/extra_procedures_etc/${Treatment.image}`}
                alt="Treatment billeder"
                width={225}
                height={300}
                className='mr-4'
              />
              <div className='max-w-[200px] m-auto '>
                <h4 className='font-bold'>{Treatment.title}</h4>
                <p className="text-sm text-gray-300 font-light">
                  {truncateText(Treatment.content)}...
                </p>
              </div>
              <button>
                <Link href={`/treatment/${Treatment._id}`} className='bg-black text-white py-2 px-4 mt-4 rounded-full cursor-pointer inline-block hover:bg-pink-300'>
                  Read more
                </Link>
              </button>

            </div>

          </div>
        ))}
      </section>


    </div>
  )
}

export default Treatments