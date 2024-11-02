'use client'
import React from 'react';
import { useGetLotteries } from '@/react-query/lotteries';
import LotteryCard from '@/components/LotteryCard';

const HomePage: React.FC = () => {
  const { data: lotteries } = useGetLotteries();
  return (
    <div className="bg-white rounded-lg md:p-8 m-5 shadow-lg">
      <h1 className="text-4xl font-bold text-left text-gray-500 mb-8 drop-shadow-sm border-b-2 border-gray-200 pb-2 p">
        ประเภทหวย
      </h1>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-6">
        {lotteries?.map((lottery) => (
          <LotteryCard
            key={lottery.lottery_id}
            lottery_id={lottery.lottery_id}
            lottery_name={lottery.lottery_name}
            image_url={lottery.image_url}
            draw_date={lottery.draw_date}
            status={lottery.status}
            enterprise_id={lottery.enterprise_id}
            last_modified_by={lottery.last_modified_by}
            userUser_id={lottery.userUser_id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;