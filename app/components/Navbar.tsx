// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 w-full z-10 bg-white border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center">

//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             width={100}
//             height={32}
//             className="object-contain"
//             priority
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-6 font-semibold text-black text-sm">
//           <li><Link href="/problems" className="hover:text-rose-500">Problems</Link></li>
//           <li><Link href="#about-us" className="hover:text-rose-500">About Us</Link></li>
//           <li><Link href="#contact" className="hover:text-rose-500">Contact Us</Link></li>
//         </ul>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-black"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {open && (
//         <ul className="md:hidden flex flex-col items-center gap-5 bg-white text-black py-5 shadow-md border-t text-sm">
//           <li><Link href="/problems" onClick={() => setOpen(false)}>Problems</Link></li>
//           <li><Link href="#about-us" onClick={() => setOpen(false)}>About Us</Link></li>
//           <li><Link href="#contact" onClick={() => setOpen(false)}>Contact Us</Link></li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-semibold text-black">
          <li><Link href="/problems" className="hover:text-rose-500">Problems</Link></li>
          
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <ul className="md:hidden flex flex-col items-center gap-6 bg-white text-black py-6 shadow-md border-t">
          <li><Link href="/problems" onClick={() => setOpen(false)}>Problems</Link></li>
          
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
