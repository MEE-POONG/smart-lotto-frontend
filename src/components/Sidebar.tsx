'use client'
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cloneElement } from "react";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navigationItems = [
        {
            href: "/dashboard/order",
            label: "หวย",
            icon: (
                <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="5 12 3 12 12 3 21 12 19 12" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
            )
        },
        {
            href: "/dashboard/wallet",
            label: "กระเป๋าเงิน",
            icon: (
                <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                </svg>
            )
        },
        {
            href: "/dashboard/admin",
            label: "ธุรการ",
            icon: (
                <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="16 3 20 7 16 11" />
                    <line x1="10" y1="7" x2="20" y2="7" />
                    <polyline points="8 13 4 17 8 21" />
                    <line x1="4" y1="17" x2="13" y2="17" />
                </svg>
            )
        },
        {
            href: "/dashboard/customer",
            label: "ลูกค้า",
            icon: (
                <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
            )
        }
    ];

    const onLogout = () => {
        deleteCookie('token');
        router.push('/auth/login');
    }

    return (
        <aside className="px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300">
            <div>
                <div className="-mx-6 px-6 py-4">
                    <Link href="/dashboard" title="home">
                        <Image
                            src="/images/logo.jpg"
                            width={160}
                            height={40}
                            alt="SMART LOTTO"
                            className="w-40"
                        />
                    </Link>
                </div>
                <ul className="space-y-2 tracking-wide mt-8">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                                pathname === item.href
                                    ? "bg-primary text-white bg-gradient-to-r from-sky-600 to-cyan-400" 
                                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            )}
                        >
                            {cloneElement(item.icon, {
                                className: cn(
                                    item.icon.props.className,
                                    pathname === item.href ? "text-white" : "text-gray-700"
                                )
                            })}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <button
                    onClick={onLogout}
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group"
                >
                    <svg className="h-6 w-6 text-gray-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                    </svg>
                    <span className="group-hover:text-gray-700">ออกจากระบบ</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar; 