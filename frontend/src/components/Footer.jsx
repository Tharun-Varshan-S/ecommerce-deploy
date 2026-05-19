const Footer = () => (
  <footer className="mt-20 border-t border-white/10 bg-slate-950 text-slate-300">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">ShopSphere</h3>
        <p className="text-sm text-slate-400">
          Premium commerce platform built for a modern shopping experience with enterprise-grade
          design and performance.
        </p>
      </div>
      <div className="space-y-3 text-sm">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Quick Links</p>
        <a className="block hover:text-white" href="/">
          Home
        </a>
        <a className="block hover:text-white" href="/search">
          Shop
        </a>
        <a className="block hover:text-white" href="/cart">
          Cart
        </a>
        <a className="block hover:text-white" href="/orders">
          Orders
        </a>
      </div>
      <div className="space-y-3 text-sm">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Categories</p>
        <span className="block">Electronics</span>
        <span className="block">Fashion</span>
        <span className="block">Gaming</span>
        <span className="block">Accessories</span>
      </div>
      <div className="space-y-3 text-sm">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Connect</p>
        <span className="block">Instagram</span>
        <span className="block">Twitter</span>
        <span className="block">LinkedIn</span>
        <span className="block">YouTube</span>
      </div>
    </div>
    <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} ShopSphere. Premium MERN commerce experience.
    </div>
  </footer>
);

export default Footer;
