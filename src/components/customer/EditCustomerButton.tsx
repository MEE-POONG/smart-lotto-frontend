'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import CustomerForm from './CustomerForm';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Customer, CustomerInput, User } from '@/types';
import { useGetCustomers, useUpdateCustomer } from '@/react-query/customer';


export default function EditCustomerButton({ customer, user }: { customer: Customer, user: User }) {
    const [isOpen, setIsOpen] = useState(false);

    const [isShowPendingCustomer, setIsShowPendingCustomer] = useState(false);
    const [isShowErrorCustomer, setIsShowErrorCustomer] = useState(false);
    const [isShowSuccessCustomer, setIsShowSuccessCustomer] = useState(false);
    const { mutate: updateCustomer, isPending: isPendingCustomer, isError: isErrorCustomer, error: errorCustomer, isSuccess: isSuccessCustomer } = useUpdateCustomer();
    const { refetch: refetchCustomers } = useGetCustomers();


    const handleSubmit = async (customer: CustomerInput) => updateCustomer(customer);
    const handleClosePendingCustomer = () => setIsShowPendingCustomer(false);
    const handleOpenPendingCustomer = () => setIsShowPendingCustomer(true);
    const handleCloseErrorCustomer = () => setIsShowErrorCustomer(false);
    const handleOpenErrorCustomer = () => setIsShowErrorCustomer(true);
    const handleCloseSuccessCustomer = () => setIsShowSuccessCustomer(false);
    const handleOpenSuccessCustomer = () => setIsShowSuccessCustomer(true);


    useEffect(() => {
        if (isSuccessCustomer) {
            handleOpenSuccessCustomer();
        } else {
            handleCloseSuccessCustomer();
        }
        setIsOpen(false);
    }, [isSuccessCustomer]);

    useEffect(() => {
        if (isSuccessCustomer) {
            handleOpenPendingCustomer();
        } else {
            handleClosePendingCustomer();
        }
        setIsOpen(false);
        refetchCustomers();
    }, [isSuccessCustomer, refetchCustomers]);

    useEffect(() => {
        if (isErrorCustomer) {
            handleOpenErrorCustomer();
        } else {
            handleCloseErrorCustomer();
        }
        setIsOpen(false);
    }, [isErrorCustomer]);


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
                isPendingCustomer && isShowPendingCustomer && <div>
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
                isErrorCustomer && isShowErrorCustomer && <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Error</h3>
                                    <p className="mt-2 text-sm text-gray-500"> {errorCustomer.message} </p>
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
                isSuccessCustomer && isShowSuccessCustomer && <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Success</h3>
                                    <p className="mt-2 text-sm text-gray-500"> ลูกค้าแก้ไขสำเร็จ </p>
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
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="แก้ไขข้อมูลลูกค้า">
                <CustomerForm
                    initialData={{
                        customer_id: customer.customer_id,
                        customer_code: customer.customer_code,
                        customer_name: customer.customer_name,
                        customer_email: customer.customer_email,
                        customer_phone: customer.customer_phone,
                        customer_address: customer.customer_address,
                        bank_name: customer.bank_name,
                        bank_account_no: customer.bank_account_no,
                        bank_account_type: customer.bank_account_type,
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