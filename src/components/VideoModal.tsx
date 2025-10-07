"use client";

import { useState } from "react";

type VideoModalProps = {
  videoUrl: string;
};

export default function VideoModal({ videoUrl }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center ml-4 text-pink-300 cursor-pointer"
      >
        ▷
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)} // close on background click
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-9 text-gray-600 hover:text-black text-6xl font-bold cursor-pointer"
          >
            &times;
          </button>
          <div
            className="rounded-2xl shadow-xl max-w-3xl w-full relative "
            onClick={(e) => e.stopPropagation()} // stop background click
          >
            {/* Close button */}

            {/* Video */}
            <div className="aspect-video">
              <iframe
                src={videoUrl + "?autoplay=1&modestbranding=1&showinfo=0&rel=0"}
                title="Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-[60vh] rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
