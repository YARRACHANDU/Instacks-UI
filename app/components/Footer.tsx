import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-zinc-400">

        <div>
          <h2 className="text-white text-xl font-bold mb-3">
            Powered By <span className="text-rose-500">Instacks</span>
          </h2>
          <p className="text-sm">
            Practice UI. Build Skills. Become a UI Developer 🚀
          </p>
        </div>

        <div>
          <h4 className="text-white mb-3 font-semibold">Explore</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/problems" className="hover:text-white">Problems</Link></li>
            <li><Link href="#about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-3 font-semibold">Learning</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="#" className="hover:text-white">HTML</Link></li>
            <li><Link href="#" className="hover:text-white">CSS</Link></li>
            <li><Link href="#" className="hover:text-white">JavaScript</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-3 font-semibold">Legal</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm text-zinc-600 py-4">
        © 2025 Instacks. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
