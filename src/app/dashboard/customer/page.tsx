'use client';

import CreateCustomerButton from "@/components/customer/CreateCustomerButton";
import CustomerTable from "@/components/customer/CustomerTable";
import { useGetCustomers } from "@/react-query/customer";
import { useGetUser } from "@/react-query/user";
import { User } from "@/types";

const CustomerPage: React.FC = () => {
    const { data: customers } = useGetCustomers();
    const { data: user } = useGetUser();
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-gray-100">
                <h1 className="text-2xl font-semibold text-gray-800">จัดการลูกค้า</h1>
                <CreateCustomerButton customers={customers || []} />
            </div>
            <CustomerTable customers={customers || []} user={user || {} as User} />
        </div>
    )
};

export default CustomerPage;