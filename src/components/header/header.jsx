import { NavLink } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

function Header() {
    return (
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/50 backdrop-blur-[10px]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8 xl:px-0">
                <div className="flex items-center gap-2.5">
                    <NavLink to="/">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-700">
                            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.25} />
                        </div>
                    </NavLink>
                    <span className="font-semibold text-gray-900 whitespace-nowrap hidden sm:block">
                        Prompt Enhancer
                    </span>
                </div>

                <div className="flex items-center rounded-full bg-gray-100 p-0.5 text-sm">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `rounded-full px-3 py-1 font-medium transition duration-150 ${isActive
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`
                        }
                    >
                        Overview
                    </NavLink>
                    <NavLink
                        to="/enhance"
                        className={({ isActive }) =>
                            `rounded-full px-3 py-1 font-medium transition duration-150 ${isActive
                                ? "bg-[#00786f] text-white shadow-sm"
                                : "text-gray-500 hover:text-[#00786f]"
                            }`
                        }
                    >
                        Enhance
                    </NavLink>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">

                    <div className="hidden items-center gap-1.5 sm:flex">
                        <span className="h-2 w-2 rounded-full mt-0.5 bg-green-600" />
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                            Powered by AI
                        </span>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-green-600 sm:hidden" />
                </div>
            </div>
        </header>
    )
}

export default Header
