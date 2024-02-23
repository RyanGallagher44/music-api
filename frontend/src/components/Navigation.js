import React from "react";
import { Link, useLocation } from "react-router-dom";
import SpotifyLogo from "../assets/images/spotify_logo.png";

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isArtistsPage = location.pathname.includes("/artists");
  const isPlaylistPage = location.pathname === "/playlists";

  const getNavItemClass = (isActive) => {
    return `block py-2 px-3 rounded ${
      isActive
        ? "text-spotify-green"
        : "text-white hover:text-spotify-green hover:bg-transparent"
    }`;
  };

  return (
    <nav className="bg-white dark:bg-spotify-black fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 h-16">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={SpotifyLogo} className="h-8" alt="Spotify Logo" />
          <span className="self-center text-2xl font-gotham whitespace-nowrap dark:text-white align-middle">
            Spotify API
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mt-[-12px]">
          <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 font-medium font-gotham border border-gray-100 rounded-lg bg-spotify-black md:space-x-8 rtl:space-x-reverse md:border-0 md:bg-white dark:bg-spotify-black md:dark:bg-spotify-black dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={getNavItemClass(isHomePage)}
                aria-current={isHomePage ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/artists"
                className={getNavItemClass(isArtistsPage)}
                aria-current={isArtistsPage ? "page" : undefined}
              >
                Artists
              </Link>
            </li>
            <li>
              <Link
                to="/playlists"
                className={getNavItemClass(isHomePage)}
                aria-current={isPlaylistPage ? "page" : undefined}
              >
                Playlists
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
