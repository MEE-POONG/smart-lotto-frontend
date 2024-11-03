'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Lottery, LotteryInput, User } from '@/types';
import { useUpdateLottery } from '@/react-query/lotteries';
import { useGetLotteries } from '@/react-query/lotteries';
import LotteryForm from './LotteryForm';


export default function EditLotteryButton({ lottery, user }: { lottery: Lottery, user: User }) {
    const [isOpen, setIsOpen] = useState(false);

    const [isShowPendingLottery, setIsShowPendingLottery] = useState(false);
    const [isShowErrorLottery, setIsShowErrorLottery] = useState(false);
    const [isShowSuccessLottery, setIsShowSuccessLottery] = useState(false);
    const { mutate: updateLottery, isPending: isPendingLottery, isError: isErrorLottery, error: errorLottery, isSuccess: isSuccessLottery } = useUpdateLottery();
    const { refetch: refetchLotteries } = useGetLotteries();


    const handleSubmit = async (lottery: LotteryInput) => updateLottery(lottery);
    const handleClosePendingLottery = () => setIsShowPendingLottery(false);
    const handleOpenPendingLottery = () => setIsShowPendingLottery(true);
    const handleCloseErrorLottery = () => setIsShowErrorLottery(false);
    const handleOpenErrorLottery = () => setIsShowErrorLottery(true);
    const handleCloseSuccessLottery = () => setIsShowSuccessLottery(false);
    const handleOpenSuccessLottery = () => setIsShowSuccessLottery(true);


    useEffect(() => {
        if (isSuccessLottery) {
            handleOpenSuccessLottery();
        } else {
            handleCloseSuccessLottery();
        }
        setIsOpen(false);
    }, [isSuccessLottery]);

    useEffect(() => {
        if (isSuccessLottery) {
            handleOpenPendingLottery();
        } else {
            handleClosePendingLottery();
        }
        setIsOpen(false);
        refetchLotteries();
    }, [isSuccessLottery, refetchLotteries]);

    useEffect(() => {
        if (isErrorLottery) {
            handleOpenErrorLottery();
        } else {
            handleCloseErrorLottery();
        }
        setIsOpen(false);
    }, [isErrorLottery]);


    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-1 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-100"
                title="แก้ไข"
            >
                <PencilIcon className="h-5 w-5" />
            </button>

            {
                isPendingLottery && isShowPendingLottery && <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Loading...</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                isErrorLottery && isShowErrorLottery && <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Error</h3>
                                    <p className="mt-2 text-sm text-gray-500"> {errorLottery.message} </p>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={handleCloseErrorLottery}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                isSuccessLottery && isShowSuccessLottery && <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Success</h3>
                                    <p className="mt-2 text-sm text-gray-500"> ล็อตโตะแก้ไขสำเร็จ </p>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={handleCloseSuccessLottery}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="แก้ไขข้อมูลล็อตโตะ">
                <LotteryForm
                    initialData={{
                        lottery_id: lottery.lottery_id,
                        lottery_name: lottery.lottery_name,
                        draw_date: new Date(lottery.draw_date),
                        image_url: lottery.image_url,
                        enterprise_id: user.enterprise_id || 0,
                        last_modified_by: user.user_id || 0
                    }}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsOpen(false)}
                />
            </Modal>
        </>
    );
} 