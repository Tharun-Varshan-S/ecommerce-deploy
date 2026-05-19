import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="mx-auto max-w-xl rounded-xl bg-white p-8 text-center shadow-sm">
    <h1 className="text-4xl font-bold text-gray-900">404</h1>
    <p className="mt-3 text-gray-600">The page you are looking for does not exist.</p>
    <Link to="/" className="mt-6 inline-block rounded-lg bg-primary px-5 py-2 text-white">
      Back to Home
    </Link>
  </div>
);

export default NotFoundPage;
