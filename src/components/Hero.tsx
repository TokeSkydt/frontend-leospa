import React from 'react'
import { getHeroData } from '@/data/HeroData';
import Link from 'next/link';
import Image from 'next/image';
import VideoModal from './VideoModal';

const videoid = (url: string): string => {
  try {
    const parsed = new URL(url);

    // Case 1: Full YouTube URL with ?v=
    if (
      (parsed.hostname.includes("youtube.com") ||
        parsed.hostname.includes("youtube-nocookie.com")) &&
      parsed.searchParams.has("v")
    ) {
      return parsed.searchParams.get("v")!;
    }

    // Case 2: youtu.be short link
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    // Case 3: Embed URL
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/")[2];
    }

    throw new Error("No YouTube video ID found in URL: " + url);
  } catch {
    throw new Error("Invalid YouTube URL: " + url);
  }
}





const Hero = async () => {
  const heroData = await getHeroData();


  return (
    <header>
      <div className="min-h-screen flex flex-col absolute left-0 top-36">
        <Image
          src="/img/leaf.png"
          alt="leaf"
          width={50}
          height={200}
          className="w-[50px] lg:w-[200px] h-auto"
        />
      </div>

      <div className="hidden lg:block absolute top-0 right-0 -z-20">
        <div className="relative w-[600px] max-w-[90vw] h-auto">
          <Image
            src="/img/spa.png"
            alt="spa"
            width={0}
            height={0}
            sizes="(max-width: 1200px) 70vw, (max-width: 1200px) 40vw, 30vw"
            className="w-full h-auto"
          />
        </div>
      </div>

      <section className='max-w-2xl py-2 mx-auto flex flex-col justify-center px-3 mb-56 mt-20'>
        <div className='max-w-md'>
          <h3 className='text-sm text-pink-300'>{heroData.title1}</h3>
          <h1 className='text-5xl font-bold my-5'>{heroData.title2}</h1>
          <p>{heroData.content}</p>
          <div className='flex mt-5 items-center text-lg'>
            <button className='bg-red-400 px-4 py-2 cursor-pointer'>reservenow</button>

            <VideoModal videoUrl={`https://www.youtube.com/embed/${videoid(heroData.link)}`} />

            {/* <Link href={heroData.link}>
              <div className="flex items-center space-x-4 ml-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
                  <p className="text-red-400 text-lg">▷</p>
                </div>
                <p>Watch our story</p>
              </div>
            </Link> */}
            <p className='ml-2'>Watch our story</p>
          </div>

        </div>
      </section>
    </header>
  )
}

export default Hero