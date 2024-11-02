'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteCustomer, useGetCustomers } from '@/react-query/customer';
import { Customer } from '@/types';

export default function DeleteCustomerButton({ customer }: { customer: Customer }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isShowPendingCustomer, setIsShowPendingCustomer] = useState(false);
    const [isShowErrorCustomer, setIsShowErrorCustomer] = useState(false);
    const [isShowSuccessCustomer, setIsShowSuccessCustomer] = useState(false);
    const { refetch: refetchCustomers } = useGetCustomers();
    const { mutate: deleteCustomer, isPending: isPendingDelete, isError: isErrorDelete, error: errorDelete, isSuccess: isSuccessDelete } = useDeleteCustomer();

    const handleDelete = async () => deleteCustomer(customer);
    const handleClosePendingCustomer = () => setIsShowPendingCustomer(false);
    const handleOpenPendingCustomer = () => setIsShowPendingCustomer(true);
    const handleCloseErrorCustomer = () => setIsShowErrorCustomer(false);
    const handleOpenErrorCustomer = () => setIsShowErrorCustomer(true);
    const handleCloseSuccessCustomer = () => setIsShowSuccessCustomer(false);
    const handleOpenSuccessCustomer = () => setIsShowSuccessCustomer(true);


    useEffect(() => {
        if (isSuccessDelete) {
            handleOpenSuccessCustomer();
        } else {
            handleCloseSuccessCustomer();
        }
        setIsOpen(false);
    }, [isSuccessDelete]);

    useEffect(() => {
        if (isPendingDelete) {
            handleOpenPendingCustomer();
        } else {
            handleClosePendingCustomer();
        }
        setIsOpen(false);
        refetchCustomers();
    }, [isPendingDelete, refetchCustomers]);

    useEffect(() => {
        if (isErrorDelete) {
            handleOpenErrorCustomer();
        } else {
            handleCloseErrorCustomer();
        }
        setIsOpen(false);
    }, [isErrorDelete]);


    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-1 text-red-600 hover:text-red-800 rounded-md hover:bg-red-100"
                title="ลบ"
            >
                <TrashIcon className="h-5 w-5" />
            </button>


            {
                isPendingDelete && isShowPendingCustomer && <div>
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
                isErrorDelete && isShowErrorCustomer && <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Error</h3>
                                    <p className="mt-2 text-sm text-gray-500"> {errorDelete.message} </p>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={handleCloseErrorCustomer}
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
                isSuccessDelete && isShowSuccessCustomer && <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Success</h3>
                                    <p className="mt-2 text-sm text-gray-500"> ลูกค้าถูกลบสำเร็จ </p>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={handleCloseSuccessCustomer}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="ยืนยันการลบ">
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                        คุณแน่ใจหรือไม่ที่จะลบข้อมูลลูกค้านี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
                    </p>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                        >
                            ลบ
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
} 