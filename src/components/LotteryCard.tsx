import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lottery } from '@/types';



const LotteryCard: React.FC<Lottery> = ({ lottery_id, lottery_name, image_url, draw_date }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(draw_date) - +new Date();
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft(`${days}วัน ${hours}ชั่วโมง ${minutes}นาที ${seconds}วินาที`);
            } else {
                setTimeLeft('Closed');
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [draw_date]);

    return (
        <Link href={`/dashboard/order/${lottery_id}`} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 md:m-2 flex justify-between flex-col relative">
            <Image
                src={image_url}
                alt={lottery_name}
                width={50}
                height={50}
                className="absolute top-7 right-5"
                />
            <div className="p-4 w-full text-xs">
                <h2 className="text-xl font-bold text-gray-800">{lottery_name}</h2>
                <p className="text-gray-500">สิ้นสุดวันที่: {new Date(draw_date).toLocaleString('th-TH')}</p>
                <p className={`font-semibold ${timeLeft === 'Closed' ? 'text-red-600' : 'text-green-600'}`}>
                    {timeLeft === 'Closed' ? 'หวยสิ้นสุด' : `เหลือ: ${timeLeft}`}
                </p>
            </div>
        </Link >
    );
};

export default LotteryCard;