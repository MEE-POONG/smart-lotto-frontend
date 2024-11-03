'use client';

import CreateLotteryButton from "@/components/lotteries/CreateLotteryButton";
import LotteryTable from "@/components/lotteries/LotteryTable";
import { useGetLotteries } from "@/react-query/lotteries";
import { useGetUser } from "@/react-query/user";
import { User } from "@/types";

const LotteryPage: React.FC = () => {
    const { data: lotteries } = useGetLotteries();
    const { data: user } = useGetUser();
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-gray-100">
                <h1 className="text-2xl font-semibold text-gray-800">จัดการล็อตโตะ</h1>
                <CreateLotteryButton lotteries={lotteries || []} />
            </div>
            <LotteryTable lotteries={lotteries || []} user={user || {} as User} />
        </div>
    )
};

export default LotteryPage;