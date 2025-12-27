"use client";

const VideoPlayer = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 w-full max-w-xl shadow-xl">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="rounded-xl w-full h-auto"
      >
        <source src="/demo1.mp4" type="video/mp4"  />
      </video>
    </div>
  );
};

export default VideoPlayer;
