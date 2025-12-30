"use client";

const VideoPlayer = () => {
  return (
    <div className="bg-zinc-900 border-zinc-700 rounded-2xl p-1 shadow-xl align-middle h-80">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="rounded-xl w-full h-auto"
      >
        <source src="/final-instacks.mp4" type="video/mp4"  />
      </video>
    </div>
  );
};

export default VideoPlayer;
