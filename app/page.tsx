"use client";
import VideoPlayer from "./components/VideoPlayer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-white text-black dark:text-black transition-colors duration-500 pt-6">

      {/* HERO SECTION */}
      <section className="flex items-center px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            {/* <div className="inline-flex items-center gap-2 bg-gray-200 dark:bg-white-900 text-yellow-600 dark:text-yellow-400 px-3 py-1.5 rounded-full text-xs border border-zinc-300 dark:border-zinc-700 mb-6">
              🎤 Powered by Instacks
            </div> */}

            <h1 className="text-3xl md:text-5xl font-bold leading-snug">
              Learn to solve and explain coding problems out loud.
            </h1><br />
{/* <div className="inline-flex items-center bg-gray-200 dark:bg-white-900
      text-rose-600 dark:text-rose-400 px-4 py-1.5 rounded-full text-xs
      border border-zinc-300 dark:border-zinc-700 mb-6 font-semibold 
      gap-8">
  
  <span>🚀</span>
  <span>Practice.</span>
  <span>Build.</span>
  <span>Improve.</span>

</div> */}

            <h1 className="text-1xl md:text-1xl font-bold leading-snug">
    Become a Front-End Developer by Practicing Daily.
  </h1>
  <div className="flex gap-3 mt-5">
    <span className="bg-orange-500/20 text-orange-500 text-xs px-3 py-1 rounded-full">HTML</span>
    <span className="bg-blue-500/20 text-blue-500 text-xs px-3 py-1 rounded-full">CSS</span>
    <span className="bg-yellow-500/20 text-yellow-500 text-xs px-3 py-1 rounded-full">JavaScript</span>
  </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button className="bg-black hover:bg-black text-white font-medium px-5 py-2.5 rounded-lg transition">
               <a href="/problems"> Explore →</a>
              </button>
              <button className="border border-zinc-500 dark:border-zinc-400 hover:border-rose-500 px-5 py-2.5 rounded-lg transition">
                <a href="/problems">See all problems →</a>
              </button>
            </div>
          </div>

          {/* RIGHT - VIDEO */}
          <div className="flex justify-center lg:justify-end">
            <VideoPlayer />
          </div>

        </div>
      </section>


      {/* UI PRACTICE SECTION */}
      {/* TOP PROBLEMS SECTION */}
<section className="px-6 py-20 bg-white text-black transition-colors">
  <div className="max-w-6xl mx-auto text-center">
    
    {/* Language Icons */}
    <div className="flex justify-center gap-8 mb-8">
      <img src="/html.png" alt="HTML" className="h-16 w-16" />
      <img src="/css.png" alt="CSS" className="h-22 w-20" />
      <img src="/js1.png" alt="JavaScript" className="h-20 w-16" />
    </div>

    {/* Title */}
    <h2 className="text-4xl md:text-5xl font-bold text-black">
      Practice UI with{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
        Live Code
      </span>
    </h2>

    {/* Subtitle */}
    <p className="mt-4 text-lg text-gray-600">
      HTML Challenges. CSS Styling. JavaScript Logic.
      <br />
      Supercharged with{" "}
      <span className="text-rose-500 font-semibold">Live Preview Mode.</span>
    </p>

    {/* Button */}
    <div className="mt-10">
      <button className="px-8 py-3 rounded-xl font-medium text-black bg-gradient-to-r from-orange-400 to-yellow-500 hover:brightness-110 shadow-lg transition-all flex items-center gap-2 mx-auto">
        <a href="/problems">Explore UI Problems →</a>
      </button>
    </div>

  </div>
</section>

{/* WHAT MAKES US UNIQUE SECTION */}
{/* WHAT MAKES US UNIQUE SECTION */}
<section className="px-6 py-2 bg-white text-black transition-colors">
  <div className="max-w-6xl mx-auto text-center">

    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      What Makes <span className="text-rose-500">Instacks</span> Unique?
    </h2>

    <p className="text-zinc-600 max-w-3xl mx-auto mb-12">
      We transform learning into a fun, hands-on journey — practice, build, and become a better web developer every day!
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Card 1 */}
      <div className="p-6 rounded-xl border border-zinc-300 bg-gray-50 hover:shadow-xl transition">
        <span className="text-4xl">👨‍💻</span>
        <h3 className="text-xl font-semibold mt-3 mb-2">Real Coding Practice</h3>
        <p className="text-sm text-zinc-700">
          No theory overload. Write HTML, CSS & JS and instantly see results.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 rounded-xl border border-zinc-300 bg-gray-50 hover:shadow-xl transition">
        <span className="text-4xl">🔥</span>
        <h3 className="text-xl font-semibold mt-3 mb-2">Fun Challenges</h3>
        <p className="text-sm text-zinc-700">
          Learn by building cool UI components, animations & mini apps.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 rounded-xl border border-zinc-300 bg-gray-50 hover:shadow-xl transition">
        <span className="text-4xl">🏆</span>
        <h3 className="text-xl font-semibold mt-3 mb-2">Track Your Progress</h3>
        <p className="text-sm text-zinc-700">
          Earn streaks, climb the leaderboard, and become a UI pro!
        </p>
      </div>

    </div>

  </div>
</section>


{/* SKILL ROADMAP — ULTRA MODERN */}
<section className="px-6 py-14 bg-white text-black">
  <div className="max-w-6xl mx-auto text-center">

    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Your Frontend <span className="text-rose-500">Success Path</span>
    </h2>

    <p className="text-zinc-600 max-w-2xl mx-auto mb-14">
      From writing your first HTML tag to building complete interactive web apps 🚀
    </p>

    {/* Roadmap Container */}
    <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">

      {/* Step 1 */}
      <div className="group relative bg-white border border-zinc-200 
      rounded-2xl p-6 w-full max-w-sm
      shadow-sm hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300">
        <div className="absolute -top-4 left-6 bg-rose-500 text-white text-sm 
        font-semibold w-10 h-10 flex items-center justify-center rounded-full">
          1
        </div>
        <span className="text-4xl block mb-4">🌱</span>
        <h3 className="text-xl font-bold mb-2">Start Strong</h3>
        <p className="text-sm text-zinc-600">
          Master HTML basics — layouts, forms, and essential UI elements.
        </p>
      </div>

      {/* Connector */}
      <div className="hidden md:block w-24 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></div>

      {/* Step 2 */}
      <div className="group relative bg-white border border-zinc-200 
      rounded-2xl p-6 w-full max-w-sm
      shadow-sm hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300">
        <div className="absolute -top-4 left-6 bg-purple-500 text-white text-sm 
        font-semibold w-10 h-10 flex items-center justify-center rounded-full">
          2
        </div>
        <span className="text-4xl block mb-4">🎨</span>
        <h3 className="text-xl font-bold mb-2">Design Beautiful UI</h3>
        <p className="text-sm text-zinc-600">
          Learn CSS — Flexbox, Grid, animations & responsive design.
        </p>
      </div>

      {/* Connector */}
      <div className="hidden md:block w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>

      {/* Step 3 */}
      <div className="group relative bg-white border border-zinc-200 
      rounded-2xl p-6 w-full max-w-sm
      shadow-sm hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300">
        <div className="absolute -top-4 left-6 bg-blue-500 text-white text-sm 
        font-semibold w-10 h-10 flex items-center justify-center rounded-full">
          3
        </div>
        <span className="text-4xl block mb-4">⚡</span>
        <h3 className="text-xl font-bold mb-2">Bring Ideas to Life</h3>
        <p className="text-sm text-zinc-600">
          Use JavaScript DOM to build interactive components & mini apps.
        </p>
      </div>

    </div>
  </div>
</section>


{/* PRICING SECTION */}
<section className="px-6 py-6 bg-white text-black text-center transition-colors">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Completely <span className="text-rose-500">FREE</span> for Students 🎉
    </h2>

    <p className="text-zinc-600 max-w-2xl mx-auto mb-10">
      Practice HTML, CSS & JavaScript without any subscriptions or hidden fees.
      Just learn and build 🚀
    </p>

    <button className="bg-rose-500 hover:bg-rose-600 px-8 py-3 text-lg font-semibold rounded-xl shadow-md transition">
      <a href="/problems">Start Learning Now →</a>
    </button>

  </div>
</section>



    </main>
      <Footer/>
    </div>
  );
}
