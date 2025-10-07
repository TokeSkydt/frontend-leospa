'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getRecommendation, Recommendation as RecommendationType } from '../data/Recommendation';

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecommendation();
      setRecommendations(Array.isArray(data) ? data : [data]);
    };
    fetchData();
  }, []);

  if (recommendations.length === 0) return <p>Indlæser anbefalinger...</p>;

  const current = recommendations[currentIndex];

  return (
    <section className="bg-pink-100 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <Image src="/img/quote.png" alt="quote" width={60} height={80} />
        </div>

        <h2 className="text-3xl font-bold text-center mb-4">{current.title}</h2>
        <p className="text-center mb-4">{current.content}</p>
        <div className='flex justify-center flex-3'>
          <Image src={`/img/customers/${current.image}`} alt='billed af en person' width={100} height={100} className='rounded-full text-center' />
        </div>
        <div className='flex justify-center'>
          <h3 className='mr-2'>{current.name}, </h3>
          <p>{current.title}</p>
        </div>


        <div className="flex justify-center space-x-3 mt-6">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer w-2 h-2 rounded-full ${index === currentIndex ? 'bg-pink-600' : 'bg-pink-300'} transition focus:outline-none
              `}
              aria-label={`Gå til anbefaling ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
