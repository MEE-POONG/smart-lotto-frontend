import React from 'react';
import { Customer } from '@/types';
import { Dispatch, SetStateAction } from 'react';

const CustomerForm: React.FC<{ customers: Customer[], selectedCustomer: string, setSelectedCustomer: Dispatch<SetStateAction<string>> }> = ({ customers, selectedCustomer, setSelectedCustomer }) => {

    return (
        <div className="flex items-center space-x-4">
            {/* Customer Dropdown */}
            <div className="flex flex-col gap-2">
                <label className="block text-gray-500 text-sm">ชื่อลูกค้า</label>
                <select
                    className="w-full px-3 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                        <option key={customer.customer_id} value={customer.customer_id}>
                            {customer.customer_name}
                        </option>
                    ))}
                </select>
                <div className="mt-1 flex items-center">
                    {/* <input
                        type="checkbox"
                        id="lockCustomer"
                        checked={lockCustomer}
                        onChange={() => setLockCustomer(!lockCustomer)}
                        className="h-4 w-4 text-purple-500 border-gray-300 rounded focus:ring-0"
                    />
                    <label htmlFor="lockCustomer" className="ml-2 text-sm text-gray-500">
                        ล็อคชื่อลูกค้า
                    </label> */}
                    <label htmlFor="lockCustomer" className="ml-2 text-sm text-gray-500">
                        &nbsp;
                    </label>
                </div>
            </div>

            {/* Order Input */}
            {/* <div className="flex flex-col gap-2">
                <label className="block text-gray-500 text-sm">บิลย่อย</label>
                <input
                    type="text"
                    value="001"
                    readOnly
                    className="w-full px-3 py-2 bg-purple-50 text-gray-600 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <label htmlFor="lockCustomer" className="ml-2 text-sm text-gray-500">
                    &nbsp;
                </label>
            </div> */}

            {/* Start Sale Button */}
            {/* <div className="flex flex-col gap-2 mt-8 self-start">
                <button className="px-4 py-2 bg-green-200 text-gray-700 font-semibold rounded-lg hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                    เริ่มขาย
                </button>
            </div> */}
        </div>
    );
};

export default CustomerForm;