import React from 'react'
import { getAbout } from '../data/About'
import parse from 'html-react-parser'
import Image from 'next/image'


const clientsImages = [
  { src: "/img/extra_procedures_etc/CelluliteReduction.jpg", alt: "leaf" },
  { src: "/img/extra_procedures_etc/facial.jpg", alt: "leaf" },
  { src: "/img/extra_procedures_etc/hydrating-mani-pedi.jpg", alt: "leaf" },
  { src: "/img/extra_procedures_etc/4.jpg", alt: "leaf" },
  { src: "/img/extra_procedures_etc/5.jpg", alt: "leaf" },
  { src: "/img/extra_procedures_etc/6.jpg", alt: "leaf" },
  { src: "/img/extra_procedures_etc/7.jpg", alt: "leaf" },
]

/* ChatGpt: Helper function to shuffle the images randomly
.sort() expects a comparator function (a, b) => number. If the result is negative, a comes first; positive, b comes first; zero means leave them equal.
Here, for each pair of items, the comparator returns a random positive or negative number: 0.5 - Math.random() yields a value in the range (-0.5, +0.5).
This effectively gives a “random” ordering, as each comparison is random.
After this, shuffled is in a random order
slice(0, count) returns a new array containing the first count elements.
If count is greater than the length of the array, slice just returns as many as there are.
*/
const getRandomImages = (images: any[], count = 4) => {
  const shuffled = [...images].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const About = async () => {
  const About = await getAbout();
  const randomImages = getRandomImages(clientsImages)
  return (

    <div>

      <div className='flex justify-start max-w-xl -z-30 -m-10 md:justify-center'>
        <Image src="/img/china-rose.png" alt="rose" height={100} width={100} />
      </div>

      <div className='max-w-2xl m-auto text-center'>
        <div className='flex justify-center mb-3'>
          <Image src="/img/favicon.png" alt="icon" width={75} height={75} />
        </div>
        <h2 className='text-3xl font-bold mb-4'>{About.title}</h2>
        <p>{parse(About.content)}</p>
        <button className='uppercase bg-red-300 py-2 px-4 rounded-3xl mt-5 text-white'>read more</button>
        <div>
        </div>
      </div>

      <div className='absolute right-20 -z-30 hidden lg:block -mt-50'>
        <Image src="/img/jasmine.png" alt="jasmine flour" width={75} height={75} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mt-10'>
        {randomImages.map((client, index) => (
          <Image
            key={index}
            src={client.src}
            alt={client.alt}
            width={300}
            height={400}
            className='w-full object-cover h-[50vh]'
          />
        ))}
      </div>
    </div>
  )
}

export default About