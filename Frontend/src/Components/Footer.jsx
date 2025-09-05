import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-300 ">
      <div className="absolute inset-0 bg-gradient-to-tr  from-gray-900 via-black to-gray-900 opacity-80"></div>

      <div className="relative max-w-7xl mx-auto  px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide mb-4">
            Milestone<span className="text-gray-400">Me</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
            A smart platform to track and analyze students' coding journey
            across coding platforms. Helping students{" "}
            <span className="text-white">level up</span> and faculty{" "}
            <span className="text-white">mentor effectively</span>.
          </p>
          <div className="mt-6">
            <span className="text-xs uppercase tracking-wider text-gray-500">
              Powered by
            </span>
            <img src="../public/logo.png" alt="logo" className="h-15 w-60" />
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">
            Project Stakeholders
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            <span className="text-white font-medium">Project Mentor:</span>
            <br />
            Dr. Kapil Agrawal
          </p>

          <div>
            <p className="text-white font-medium mb-3">Team Members</p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-400">
              <li className="relative text-gray-400">
                <span className="cursor-pointer hover:text-white transition-colors group inline-block">
                  Uday Gandhi (2203031450007)
                  {/* Hover Card */}
                  <div
                    className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-gray-900 text-gray-200 shadow-lg
      opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100
      transition-all duration-300 z-10 p-3 pointer-events-none"
                  >
                    <p className="font-semibold text-sm">Team Leader</p>
                    <p className="text-xs text-gray-400">
                      Full Stack Developer
                    </p>
                  </div>
                </span>
              </li>

<li className="relative text-gray-400">
                <span className="cursor-pointer hover:text-white transition-colors group inline-block">
                  Vraj Rathva (2203031450020)
                  {/* Hover Card */}
                  <div
                    className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-gray-900 text-gray-200 shadow-lg
      opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100
      transition-all duration-300 z-10 p-3 pointer-events-none"
                  >
                    <p className="font-semibold text-sm">R&D</p>
                    <p className="text-xs text-gray-400">
                      Full Stack Developer
                    </p>
                  </div>
                </span>
              </li>
              <li className="relative text-gray-400">
                <span className="cursor-pointer hover:text-white transition-colors group inline-block">
                  Nevil Modi (2203031450013)
                  {/* Hover Card */}
                  <div
                    className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-gray-900 text-gray-200 shadow-lg
      opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100
      transition-all duration-300 z-10 p-3 pointer-events-none"
                  >
                    <p className="font-semibold text-sm">Web-design</p>
                    <p className="text-xs text-gray-400">
                      Front end web design
                    </p>
                  </div>
                </span>
              </li>
              <li className="relative text-gray-400">
                <span className="cursor-pointer hover:text-white transition-colors group inline-block">
                  Yash Chauhan (2203031450005)
                  {/* Hover Card */}
                  <div
                    className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-gray-900 text-gray-200 shadow-lg
      opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100
      transition-all duration-300 z-10 p-3 pointer-events-none"
                  >
                    <p className="font-semibold text-sm">Logic building</p>
                    <p className="text-xs text-gray-400">
                      Backend and Logic building
                    </p>
                  </div>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 mt-8 py-4">
        <p className="text-center text-xs text-gray-500 tracking-wide">
          © {new Date().getFullYear()} MilestoneMe · All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
