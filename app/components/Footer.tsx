import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black border-t">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-zinc-400">

        <div>
          <h2 className="text-white text-xl font-bold mb-3">
            Powered By Instacks <span className="text-rose-500"> </span>
          </h2>
          <p className="text-sm">Level up your coding interview skills.</p>
        </div>

        <div>
          <h4 className="text-white mb-3">Explore</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="#" className="hover:text-white">Home</Link></li>
            <li><Link href="#" className="hover:text-white">Features</Link></li>
            <li><Link href="#" className="hover:text-white">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-3">Resources</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="#" className="hover:text-white">Blog</Link></li>
            <li><Link href="#" className="hover:text-white">Docs</Link></li>
            <li><Link href="#" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-3">Legal</h4>
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
