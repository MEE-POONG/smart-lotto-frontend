import React from 'react';
import { Customer } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';

const CustomerForm: React.FC<{ customers: Customer[], setSelectedCustomer: Dispatch<SetStateAction<string>> }> = ({ customers, setSelectedCustomer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredCustomers = customers.filter(customer =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex items-center space-x-4 mb-5 text-gray-600">
            <div className="flex flex-col gap-2 relative">
                <label className="block text-gray-500 text-sm">ชื่อลูกค้า</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search customer..."
                />

                {showSuggestions && searchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                        {filteredCustomers.map((customer) => (
                            <div
                                key={customer.customer_id}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSelectedCustomer(String(customer.customer_id));
                                    setSearchTerm(customer.customer_name);
                                    setShowSuggestions(false);
                                }}
                            >
                                {customer.customer_name}
                            </div>
                        ))}
                    </div>
                )}
                {filteredCustomers.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                        <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            ไม่พบลูกค้า
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default CustomerForm;