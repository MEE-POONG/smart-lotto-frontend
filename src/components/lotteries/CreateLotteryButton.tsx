'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import LotteryForm from './LotteryForm';
import { useCreateLottery, useGetLotteries } from '@/react-query/lotteries';
import { Lottery, LotteryInput } from '@/types';

function generateLotteryCode(currentLength: number): string {
    return `L${String(currentLength + 1).padStart(5, '0')}`;
}

export default function CreateLotteryButton({ lotteries }: { lotteries: Lottery[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isShowPendingLottery, setIsShowPendingLottery] = useState(false);
    const [isShowErrorLottery, setIsShowErrorLottery] = useState(false);
    const [isShowSuccessLottery, setIsShowSuccessLottery] = useState(false);
    const { mutate: createLottery, isPending: isPendingLottery, isError: isErrorLottery, error: errorLottery, isSuccess: isSuccessLottery } = useCreateLottery();
    const { refetch: refetchLotteries } = useGetLotteries();

    const handleSubmit = async (lottery: LotteryInput) => createLottery(lottery);
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
        refetchLotteries();
    }, [isSuccessLottery, refetchLotteries]);

    useEffect(() => {
        if (isSuccessLottery) {
            handleOpenPendingLottery();
        } else {
            handleClosePendingLottery();
        }
        setIsOpen(false);
    }, [isSuccessLottery]);

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
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
                เพิ่มล็อตโตะ
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
                                    <p className="mt-2 text-sm text-gray-500"> ล็อตโตะเพิ่มสำเร็จ </p>
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

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="เพิ่มล็อตโตะ">
                <LotteryForm
                    lottery_code={generateLotteryCode(lotteries?.length || 0)}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsOpen(false)}
                />
            </Modal>
        </>
    );
} 