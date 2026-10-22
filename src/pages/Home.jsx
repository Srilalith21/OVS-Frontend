import { HomeNav, LoggedInNav } from "../components/Nav.jsx";
import heroImage from "../assets/hero.png";

function FeatureSection() {
  return (
    <div className="feature-section bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Features of the Online Voting System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Secure Voting
            </h3>
            <p className="text-gray-600">
              Our system ensures the security and integrity of your votes.
            </p>
          </div>
          <div className="feature bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              User-Friendly Interface
            </h3>
            <p className="text-gray-600">
              Our system is easy to use and provides a great user experience.
            </p>
          </div>
          <div className="feature bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Real-Time Results
            </h3>
            <p className="text-gray-600">
              Get instant updates on the voting results as they come in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <>
      <div className="h-[calc(100vh-80px)] w-full bg-gray-200 flex items-center justify-center">
        <div className="h-full w-[45%] bg-blue-100 flex flex-col items-start justify-center px-10">
          <h1 className="text-4xl font-extrabold">
            <span className="text-orange-600">Welcome To</span>
            <br />
            <span className="text-green-600">Online Voting System</span>
          </h1>
          <p className="text-lg mt-4 max-w-[90%] leading-6">
            Streamline your elections with a secure, digital platform that
            allows voters to cast ballots from any device, anywhere.
          </p>
          <button className="mt-4 font-bold bg-blue-500 text-white py-3 px-10 rounded hover:bg-blue-600">
            Register {"-->"}
          </button>
        </div>
        <div className="h-full w-[55%] bg-red-600">
          <img
            src={heroImage}
            alt="Hero"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export function Home() {
  return (
    <>
      <HomeNav />
      <HeroSection />
      <FeatureSection />
    </>
  );
}
