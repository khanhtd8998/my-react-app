import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Sidebar2 = (props: Props) => {
    return (
        <>
            <div className="flex h-screen flex-col justify-between border-e bg-white fixed w-[20%]">
                <div className="px-4">
                    <ul className="mt-6 space-y-1">
                        <li>
                            <a className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                General
                            </a>
                        </li>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    <span className="text-sm font-medium"> Product </span>
                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <Link to={"/admin/products"} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Product List
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/admin/products/form"} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Product Add
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    <span className="text-sm font-medium"> Category </span>
                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Category List
                                        </a>
                                    </li>
                                    <li>
                                        <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Category Add
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                User
                            </a>
                        </li>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    <span className="text-sm font-medium"> Account </span>
                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Details
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            Security
                                        </a>
                                    </li>
                                    <li>
                                        <form action="#">
                                            <button type="submit" className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700">
                                                Logout
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div >
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <img alt="User avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiw5ka6vw_F3-o4qNEq362CSJvjtKtRrBK8SLBt-mdEQ&s" className="size-10 rounded-full object-cover" />
                        <div>
                            <p className="text-xs">
                                <strong className="block font-medium">khanhtd8998</strong>
                            </p>
                        </div>
                    </a>
                </div>
            </div >
        </>
    )
}

export default Sidebar2