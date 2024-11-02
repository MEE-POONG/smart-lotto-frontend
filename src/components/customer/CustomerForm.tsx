'use client';

import { CustomerInput } from '@/types';
import { useForm } from 'react-hook-form';

export default function CustomerForm({
    customer_code,
    initialData,
    onSubmit,
    onCancel
}: {
    customer_code?: string;
    initialData?: CustomerInput;
    onSubmit: (data: CustomerInput) => void;
    onCancel: () => void;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerInput>({
        defaultValues: initialData
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">รหัสลูกค้า</label>
                <input
                    {...register('customer_code', { required: 'กรุณากรอกรหัสลูกค้า' })}
                    className="mt-1 px-2 py-1 block text-slate-500 w-full rounded-md border-gray-100 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    readOnly={true}
                    defaultValue={customer_code}
                />
                {errors.customer_code && (
                    <p className="mt-1 text-sm text-red-600">{errors.customer_code.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">ชื่อลูกค้า</label>
                <input
                    {...register('customer_name', { required: 'กรุณากรอกชื่อลูกค้า' })}
                    className="mt-1 px-2 py-1 block text-slate-500 w-full rounded-md border-gray-100 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                <input
                    type="email"
                    {...register('customer_email')}
                    className="mt-1 px-2 py-1 block text-slate-500 w-full rounded-md border-gray-100 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">เบอร์โทร</label>
                <input
                    {...register('customer_phone')}
                    className="mt-1 px-2 py-1 block text-slate-500 w-full rounded-md border-gray-100 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-100 rounded-md hover:bg-gray-50"
                >
                    ยกเลิก
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                    บันทึก
                </button>
            </div>
        </form>
    );
} 