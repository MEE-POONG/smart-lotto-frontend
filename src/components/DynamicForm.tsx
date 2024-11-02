'use client'
import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import BetTable from './BetTable';
import { useGetCustomers } from '@/react-query/customer';
import { useGetLotteryById } from '@/react-query/lotteries';
import { useParams } from 'next/dist/client/components/navigation';
import { useCreateOrder, useGetOrders } from '@/react-query/order';
import { useGetUser } from '@/react-query/user';
import { useCreateOrderItems } from '@/react-query/order-item';
import { Order } from '@/types';
import BillListModal from './BillListModal';

interface BetData {
    result: string;
    number: string;
    up: number;
    down: number;
    tote: number;
}

const DynamicForm: React.FC = () => {
    const { id } = useParams();
    const { data: user } = useGetUser();
    const { data: customers } = useGetCustomers();
    const { data: lottery } = useGetLotteryById(Number(id));
    const { data: orders, refetch } = useGetOrders();
    const { mutate: createOrder, isPending, isError, error, data: order, isSuccess } = useCreateOrder();
    const { mutate: createOrderItems, isPending: isPendingOrderItem, isError: isErrorOrderItem, error: errorOrderItem, isSuccess: isSuccessOrderItem } = useCreateOrderItems();
    const [selectedCustomer, setSelectedCustomer] = useState('');

    const [timeLeft, setTimeLeft] = useState('');

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    // Countdown timer for close time
    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = lottery?.draw_date ? +new Date(lottery.draw_date) - +new Date() : 0;
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft(`${days}วัน ${hours}ชั่วโมง ${minutes}นาที ${seconds}วินาที`);
            } else {
                setTimeLeft('ปิดรับแทง');
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [lottery?.draw_date]);

    const [betData, setBetData] = useState<BetData[]>([]);

    const handleAmount = () => {
        const total = betData.reduce((acc, bet) => acc + Number(bet.up) + Number(bet.down) + Number(bet.tote), 0);
        return total;
    };

    useEffect(() => {
        if (isError) {
            setShowErrorModal(true);
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccessOrderItem) {
            setShowSuccessModal(true);
        }
        refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessOrderItem]);

    useEffect(() => {
        if (order) {
            const orderItemsUp = betData.filter(bet => bet.up).map((bet) => ({
                order_id: order.order_id,
                number_value: bet.number,
                item_type_id: bet.number.length === 2 ? 1 : bet.number.length === 3 ? 3 : 5,
                price: Number(bet.up),
                enterprise_id: Number(user?.enterprise_id),
                last_modified_by: Number(user?.user_id),
                quantity: 1
            }));
            const orderItemsDown = betData.filter(bet => bet.down).map((bet) => ({
                order_id: order.order_id,
                number_value: bet.number,
                item_type_id: bet.number.length === 2 ? 2 : 6,
                price: Number(bet.down),
                enterprise_id: Number(user?.enterprise_id),
                last_modified_by: Number(user?.user_id),
                quantity: 1
            }));
            const orderItemsTote = betData.filter(bet => bet.tote).map((bet) => ({
                order_id: order.order_id,
                number_value: bet.number,
                item_type_id: 4,
                price: Number(bet.tote),
                enterprise_id: Number(user?.enterprise_id),
                last_modified_by: Number(user?.user_id),
                quantity: 1
            }));
            const orderItems = [...orderItemsUp, ...orderItemsDown, ...orderItemsTote];
            createOrderItems(orderItems);
            setBetData([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full">
                <CustomerForm
                    customers={customers || []}
                    setSelectedCustomer={setSelectedCustomer}
                />

                <div className="mt-0">
                    <BetTable betData={betData} setBetData={setBetData} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">ยอดรวม: <span className="text-blue-500">{handleAmount().toLocaleString()} ฿</span></p>
                    <p className="text-gray-600">{timeLeft === 'ปิดรับแทง' ? "" : "เหลือ:"} <span className={`font-semibold ${timeLeft === 'ปิดรับแทง' ? 'text-red-500' : 'text-green-500'}`}>{timeLeft}</span></p>
                </div>

                {timeLeft !== 'ปิดรับแทง' && (
                    betData.length > 0 && (
                        selectedCustomer && (
                            <div className="flex items-center mt-6">
                                <button onClick={() => createOrder({
                                    customer_id: Number(selectedCustomer),
                                    enterprise_id: Number(user?.enterprise_id),
                                    order_status: 'pending',
                                    total_price: handleAmount(),
                                    payment_status: 'unpaid',
                                })} className="bg-purple-500 text-white py-2 px-4 rounded-lg mr-4">ยืนยัน</button>
                                <button className="bg-red-500 text-white py-2 px-4 rounded-lg">ยกเลิก</button>
                            </div>
                        )
                    )
                )}
                {(isPending || isPendingOrderItem) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
                                <p className="text-lg">กำลังดำเนินการ...</p>
                            </div>
                        </div>
                    </div>
                )}
                {(isError || isErrorOrderItem) && showErrorModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
                            <p className="text-gray-800">{error?.message || errorOrderItem?.message || 'An unexpected error occurred.'}</p>
                            <button
                                onClick={() => setShowErrorModal(false)}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {isSuccessOrderItem && showSuccessModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="flex flex-col items-center">
                                <div className="text-green-500 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">สำเร็จ!</h2>
                                <p className="text-gray-600 mb-4">บันทึกรายการสำเร็จ</p>
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                                >
                                    ตกลง
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="gap-6 space-y-6 w-full">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <table className="w-full text-left text-gray-600 border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="pb-2 border border-gray-200 p-2">ชื่อลูกค้า</th>
                                <th className="pb-2 border border-gray-200 p-2">ยอดขาย</th>
                                <th className="pb-2 border border-gray-200 p-2">ยอดถูก</th>
                                <th className="pb-2 border border-gray-200 p-2">ยอดได้เสีย</th>
                                <th className="pb-2 border border-gray-200 p-2">สถานะ</th>
                                <th className="pb-2 border border-gray-200 p-2">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.sort((a: Order, b: Order) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime())?.map((o: Order) => (
                                <tr key={o.order_id}>
                                    <td className="py-1 text-gray-600 border border-gray-200 p-2">{o.customer?.customer_name}</td>
                                    <td className="py-1 text-blue-600 font-semibold text-right border border-gray-200 p-2">{Number(o.total_price).toLocaleString()}</td>
                                    <td className="py-1 text-green-500 font-semibold text-right border border-gray-200 p-2">{o.gain_price ? Number(o.gain_price).toLocaleString() : 'รอผล'}</td>
                                    <td className="py-1 text-red-500 font-semibold text-right border border-gray-200 p-2">{o.gain_price ? Number(o.total_price - o.gain_price).toLocaleString() : 'รอผล'}</td>
                                    <td className="py-1 text-yellow-500 font-semibold border border-gray-200 p-2">{o.order_status === 'pending' ? 'รอการชำระเงิน' : 'ชำระเงินแล้ว'}</td>
                                    <td className="py-1 text-gray-600 border border-gray-200 p-2">
                                        <button onClick={() => { setIsModalOpen(true); setSelectedOrder(o) }} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 text-xs">ดูบิล</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <BillListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                bills={selectedOrder || null}
            />
        </div>
    );
};

export default DynamicForm;