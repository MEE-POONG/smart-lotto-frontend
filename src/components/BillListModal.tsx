import { Order } from "@/types";

const BillListModal = ({ isOpen, onClose, bills }: { isOpen: boolean, onClose: () => void, bills: Order | null }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-lg w-full max-w-2xl mx-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                        รายการบิล
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                    <div>
                        <p className="font-medium text-gray-600">เลขที่บิล: {bills?.order_date ? new Date(bills?.order_date).getTime() : ''}-{bills?.order_id}</p>
                        <p className="font-medium text-gray-600">ลูกค้า: {bills?.customer?.customer_name}</p>
                        <p className="text-sm text-gray-600">วันที่: {bills?.order_date ? new Date(bills?.order_date).toLocaleDateString() : ''}</p>
                    </div>
                    <div>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-lg text-gray-600">฿{bills?.total_price}</p>
                        <p className="text-sm text-gray-600">{bills?.order_status}</p>
                    </div>
                </div>

                {/* Bill List */}
                <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    {bills?.order_items?.map((bill) => (
                        <div
                            key={bill.order_item_id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <div>
                                <p className="font-medium text-gray-600 text-xl">{bill.number_value}</p>
                                <p className="text-sm text-gray-500">{bill.item_type?.type_name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-lg text-gray-600">฿{bill.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillListModal;
