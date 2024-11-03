'use client';

import { Lottery } from "@/types";
import EditLotteryButton from "./EditLotteryButton";
import DeleteLotteryButton from "./DeleteLotteryButton";
import { User } from '@/types';
import Image from "next/image";

export default function LotteryTable({ lotteries, user }: { lotteries: Lottery[], user: User }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รูปภาพ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่ออกผล</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {lotteries.map((lottery) => (
                        <tr key={lottery.lottery_id}>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                <Image src={lottery.image_url} alt={lottery.lottery_name} width={100} height={100} />
                            </td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{lottery.lottery_name}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{new Date(lottery.draw_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                <div className="flex space-x-2">
                                    <EditLotteryButton lottery={lottery} user={user} />
                                    {false && <DeleteLotteryButton lottery={lottery} />}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 