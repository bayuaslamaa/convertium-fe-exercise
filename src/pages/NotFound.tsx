import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
            style={{
                backgroundImage: "url('/bg-blur-2.webp')",
            }}
        >
            <div className="max-w-md w-full bg-white/50 backdrop-blur-md p-8 shadow-lg rounded-sm text-center">
                <h1 className="text-6xl font-bold mb-4 text-black">404</h1>
                <h2 className="text-2xl mb-6 text-black">Page Not Found</h2>
                <p className="mb-8 text-gray-700">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-2 bg-black text-white font-medium uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 hover:bg-gray-800 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound; 