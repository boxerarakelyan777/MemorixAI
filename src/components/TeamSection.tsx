import React from 'react';

const Team: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Team</h2>
        <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
          Meet the dedicated team behind our platform, working to bring you the best experience.
        </p>
      </div>
      <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
        {/* Team Member 1 */}
        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="w-[472px] max-h-[591px] rounded-lg sm:rounded-none sm:rounded-l-lg object-cover"
              src="/teamMembers/Rudik.JPG"
              alt="Rudik Avatar"
            />
          </a>
          <div className="p-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">Rudik Arakelyan</a>
            </h3>
            <span className="text-gray-500 dark:text-gray-400">Co-founder & Full Stack Web Developer</span>
            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
            Rudik is a co-founder and full stack web developer of the platform.
            </p>
            <ul className="flex space-x-4 sm:mt-0">
                <li>
                    <a href="https://www.linkedin.com/in/rudik-arakelyan/"  target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.269c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75c.967 0 1.75.785 1.75 1.75s-.783 1.75-1.75 1.75zm13.25 12.269h-3v-5.607c0-1.335-.03-3.059-1.862-3.059-1.863 0-2.148 1.454-2.148 2.958v5.708h-3v-11h2.882v1.505h.041c.402-.76 1.383-1.561 2.848-1.561 3.046 0 3.607 2.006 3.607 4.612v6.444z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/boxerarakelyan777" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M12 .296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.599.111.793-.26.793-.577v-2.176c-3.338.725-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.091-.745.084-.729.084-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.809 1.304 3.494.997.109-.775.418-1.305.76-1.604-2.665-.305-5.466-1.335-5.466-5.93 0-1.311.468-2.38 1.237-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.009-.322 3.301 1.23.957-.266 1.98-.399 3-.404 1.02.005 2.043.138 3 .404 2.292-1.552 3.299-1.23 3.299-1.23.655 1.653.243 2.873.119 3.176.77.841 1.237 1.91 1.237 3.221 0 4.607-2.807 5.624-5.479 5.921.43.372.815 1.102.815 2.222v3.293c0 .319.192.694.801.576 4.767-1.588 8.203-6.084 8.203-11.386 0-6.627-5.373-12-12-12z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                <li>
                    <a href="https://x.com/boxerarakelyan" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M24 4.557c-.883.392-1.83.656-2.828.775 1.014-.608 1.794-1.573 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.92 0 .385.044.76.127 1.122-4.09-.205-7.719-2.165-10.14-5.144-.424.725-.666 1.567-.666 2.465 0 1.701.866 3.2 2.181 4.079-.804-.026-1.561-.247-2.228-.616v.062c0 2.375 1.693 4.355 3.946 4.804-.413.111-.849.171-1.296.171-.317 0-.626-.031-.928-.089.627 1.956 2.445 3.379 4.6 3.419-1.685 1.32-3.808 2.106-6.115 2.106-.398 0-.79-.023-1.175-.069 2.179 1.396 4.768 2.211 7.548 2.211 9.051 0 13.999-7.497 13.999-13.986 0-.213-.004-.426-.014-.637.961-.695 1.8-1.562 2.462-2.549z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                </ul>

          </div>
        </div>
        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img
      className="w-[496px] max-h-[591px] rounded-lg sm:rounded-none sm:rounded-l-lg object-cover"
      src="/teamMembers/David.jpg"
      alt="Diepreye Avatar"
    />
  </a>    <div className="p-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">Diepreye Charles-Daniel</a>
            </h3>
            <span className="text-gray-500 dark:text-gray-400">Co-founder & Full Stack Web Developer</span>
            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
            Diepreye is a co-founder and full stack web developer of the platform.

            </p>
            <ul className="flex space-x-4 sm:mt-0">
                <li>
                    <a href="https://www.linkedin.com/in/diepreyecd/" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.269c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75c.967 0 1.75.785 1.75 1.75s-.783 1.75-1.75 1.75zm13.25 12.269h-3v-5.607c0-1.335-.03-3.059-1.862-3.059-1.863 0-2.148 1.454-2.148 2.958v5.708h-3v-11h2.882v1.505h.041c.402-.76 1.383-1.561 2.848-1.561 3.046 0 3.607 2.006 3.607 4.612v6.444z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/davephoenix360" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M12 .296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.599.111.793-.26.793-.577v-2.176c-3.338.725-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.091-.745.084-.729.084-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.809 1.304 3.494.997.109-.775.418-1.305.76-1.604-2.665-.305-5.466-1.335-5.466-5.93 0-1.311.468-2.38 1.237-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.009-.322 3.301 1.23.957-.266 1.98-.399 3-.404 1.02.005 2.043.138 3 .404 2.292-1.552 3.299-1.23 3.299-1.23.655 1.653.243 2.873.119 3.176.77.841 1.237 1.91 1.237 3.221 0 4.607-2.807 5.624-5.479 5.921.43.372.815 1.102.815 2.222v3.293c0 .319.192.694.801.576 4.767-1.588 8.203-6.084 8.203-11.386 0-6.627-5.373-12-12-12z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>

                </ul>

          </div>
        </div>
        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="w-[496px] max-h-[591px] rounded-lg sm:rounded-none sm:rounded-l-lg"
              src="/teamMembers/Vedant.jpg"
              alt="Vedant Avatar"
            />
          </a>
          <div className="p-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">Vedant Patare</a>
            </h3>
            <span className="text-gray-500 dark:text-gray-400">Co-founder & Full Stack Web Developer</span>
            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
            Vedant is a co-founder and full stack web developer of the platform.

            </p>
            <ul className="flex space-x-4 sm:mt-0">
                <li>
                    <a href="https://www.linkedin.com/in/vedant-patare-65a332280/" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.269c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75c.967 0 1.75.785 1.75 1.75s-.783 1.75-1.75 1.75zm13.25 12.269h-3v-5.607c0-1.335-.03-3.059-1.862-3.059-1.863 0-2.148 1.454-2.148 2.958v5.708h-3v-11h2.882v1.505h.041c.402-.76 1.383-1.561 2.848-1.561 3.046 0 3.607 2.006 3.607 4.612v6.444z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/vedant1729" target="_blank"className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M12 .296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.599.111.793-.26.793-.577v-2.176c-3.338.725-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.091-.745.084-.729.084-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.809 1.304 3.494.997.109-.775.418-1.305.76-1.604-2.665-.305-5.466-1.335-5.466-5.93 0-1.311.468-2.38 1.237-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.009-.322 3.301 1.23.957-.266 1.98-.399 3-.404 1.02.005 2.043.138 3 .404 2.292-1.552 3.299-1.23 3.299-1.23.655 1.653.243 2.873.119 3.176.77.841 1.237 1.91 1.237 3.221 0 4.607-2.807 5.624-5.479 5.921.43.372.815 1.102.815 2.222v3.293c0 .319.192.694.801.576 4.767-1.588 8.203-6.084 8.203-11.386 0-6.627-5.373-12-12-12z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                <li>
                    <a href="https://x.com/vedantp1729" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M24 4.557c-.883.392-1.83.656-2.828.775 1.014-.608 1.794-1.573 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.92 0 .385.044.76.127 1.122-4.09-.205-7.719-2.165-10.14-5.144-.424.725-.666 1.567-.666 2.465 0 1.701.866 3.2 2.181 4.079-.804-.026-1.561-.247-2.228-.616v.062c0 2.375 1.693 4.355 3.946 4.804-.413.111-.849.171-1.296.171-.317 0-.626-.031-.928-.089.627 1.956 2.445 3.379 4.6 3.419-1.685 1.32-3.808 2.106-6.115 2.106-.398 0-.79-.023-1.175-.069 2.179 1.396 4.768 2.211 7.548 2.211 9.051 0 13.999-7.497 13.999-13.986 0-.213-.004-.426-.014-.637.961-.695 1.8-1.562 2.462-2.549z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                </ul>

          </div>
        </div>
        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
          <a href="#" >
            <img
              className="w-[482px] max-h-[591px] rounded-lg sm:rounded-none sm:rounded-l-lg object-cover"
              src="/teamMembers/Rohit.jpg"
              alt="Rohit Avatar"
            />
          </a>
          <div className="p-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">Rohit Menon</a>
            </h3>
            <span className="text-gray-500 dark:text-gray-400">Co-founder & Full Stack Web Developer</span>
            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
            Rohit is a co-founder and full stack web developer of the platform.

            </p>
            <ul className="flex space-x-4 sm:mt-0">
                <li>
                    <a href="https://www.linkedin.com/in/rohit-menon-376216228/" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.269c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75c.967 0 1.75.785 1.75 1.75s-.783 1.75-1.75 1.75zm13.25 12.269h-3v-5.607c0-1.335-.03-3.059-1.862-3.059-1.863 0-2.148 1.454-2.148 2.958v5.708h-3v-11h2.882v1.505h.041c.402-.76 1.383-1.561 2.848-1.561 3.046 0 3.607 2.006 3.607 4.612v6.444z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/rohitrm13" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M12 .296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.599.111.793-.26.793-.577v-2.176c-3.338.725-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.091-.745.084-.729.084-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.809 1.304 3.494.997.109-.775.418-1.305.76-1.604-2.665-.305-5.466-1.335-5.466-5.93 0-1.311.468-2.38 1.237-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.009-.322 3.301 1.23.957-.266 1.98-.399 3-.404 1.02.005 2.043.138 3 .404 2.292-1.552 3.299-1.23 3.299-1.23.655 1.653.243 2.873.119 3.176.77.841 1.237 1.91 1.237 3.221 0 4.607-2.807 5.624-5.479 5.921.43.372.815 1.102.815 2.222v3.293c0 .319.192.694.801.576 4.767-1.588 8.203-6.084 8.203-11.386 0-6.627-5.373-12-12-12z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </a>
                </li>
                </ul>

          </div>
        </div>
          
        </div>  
      </div>
    </section>
  );
};

export default Team;
