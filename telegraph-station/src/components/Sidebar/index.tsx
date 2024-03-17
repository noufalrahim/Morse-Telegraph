import { useState } from "react";

export default function SideBar({state, setState}: any) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <>
            <aside id="logo-sidebar" className="w-1/4 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#7D0A0A]">
                    <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">Telegraph Station</span>
                    </a>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={toggleDropdown} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-[#BF3131] dark:text-white" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Dashboard</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`${isDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <button onClick={() => {setState(0)}} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-[#BF3131] dark:text-white">Channels</button>
                                </li>
                                <li>
                                    <button onClick={() => {setState(1)}} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-[#BF3131] dark:text-white">Create Channel</button>
                                </li>
                                <li>
                                    <button onClick={() => {setState(2)}} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-[#BF3131] dark:text-white">BroadCasts</button>
                                </li>
                            </ul>
                            <button onClick={() => {setState(3)}} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-[#BF3131] dark:text-white" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Help</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}