'use client';

import { LotteryInput } from '@/types';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import Image from 'next/image';
import useUploadImage from '@/react-query/images';

export default function LotteryForm({
    initialData,
    onSubmit,
    onCancel
}: {
    lottery_code?: string;
    initialData?: LotteryInput;
    onSubmit: (data: LotteryInput) => void;
    onCancel: () => void;
}) {
    const { register, handleSubmit, setValue, getValues } = useForm<LotteryInput>({
        defaultValues: initialData
    });
    const uploadImageMutation = useUploadImage();

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        try {
            const data = await uploadImageMutation.mutateAsync(file);
            setValue('image_url', data.url);
            console.log(data.url);
            console.log(getValues('image_url'));
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload file');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-gray-700">ชื่อล็อตโตะ</label>
                <input
                    {...register('lottery_name', { required: 'กรุณากรอกชื่อล็อตโตะ' })}
                    className="mt-1 px-2 py-1 block text-slate-500 w-full rounded-md border-gray-100 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">วันที่ปิดการขาย {dayjs(initialData?.draw_date).format('DD/MM/YYYY HH:mm')}</label>
                <input
                    {...register('draw_date', { required: 'กรุณากรอกวันที่ปิดการขาย' })}
                    className="mt-1 px-2 py-1 block text-slate-500 w-full rounded-md border-gray-100 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    type="datetime-local"
                    defaultValue={dayjs(initialData?.draw_date).format('YYYY-MM-DDTHH:mm')}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">อัพโหลดไฟล์</label>
                {(getValues('image_url') ||  initialData?.image_url) && (
                    <Image
                        src={initialData?.image_url || getValues('image_url')}
                        alt="Lottery Image"
                        width={100}
                        height={100}
                        className='w-full h-auto'
                    />
                )}
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>อัพโหลดไฟล์</span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept="image/png,image/jpeg,image/gif"
                                    onChange={handleFileUpload}
                                />
                            </label>
                            <p className="pl-1">หรือลากไฟล์มาวาง</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
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