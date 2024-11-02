'use client';

import { Customer } from "@/types";
import EditCustomerButton from "./EditCustomerButton";
import DeleteCustomerButton from "./DeleteCustomerButton";
import { User } from '@/types';

export default function CustomerTable({ customers, user }: { customers: Customer[], user: User }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัสลูกค้า</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">อีเมล</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เบอร์โทร</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ธนาคาร</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{customer.customer_code}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{customer.customer_name}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{customer.customer_email}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{customer.customer_phone}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{customer.bank_name}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                <div className="flex space-x-2">
                                    <EditCustomerButton customer={customer} user={user} />
                                    {false && <DeleteCustomerButton customer={customer} />}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 