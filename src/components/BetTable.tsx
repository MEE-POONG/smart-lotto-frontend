import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

type BetData = {
    result: string;
    number: string;
    up: number;
    down: number;
    tote: number;
};

type BetTableProps = {
    betData: BetData[];
    setBetData: React.Dispatch<React.SetStateAction<BetData[]>>;
};

const initialFormBet: BetData = {
    result: 'ล',
    number: '',
    up: 0,
    down: 0,
    tote: 0,
};

const BetTable: React.FC<BetTableProps> = ({ betData, setBetData }) => {
    const [formBet, setFormBet] = useState<BetData>(initialFormBet);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof BetData) => {
        const newData = [...betData];
        newData[index][field] = e.target.value as never;
        setBetData(newData);
    };

    const handleAddBet = () => {
        setBetData([...betData, formBet]);
        setFormBet(initialFormBet);
    };

    const handlePermutation = (number: string, up: number, down: number) => {
        console.log(number);

        const digits = number.split('');
        const permutations = digits.reduce(
            (perms: string[], char: string) => {
                const newPerms: string[] = [];
                perms.forEach(perm => {
                    for (let i = 0; i <= perm.length; i++) {
                        newPerms.push(perm.slice(0, i) + char + perm.slice(i));
                    }
                });
                return newPerms;
            },
            ['']
        );

        console.log([...new Set(permutations)].filter(num => num !== number));

        setBetData((prevData) => {
            const newData = [...new Set(permutations)].filter(num => num !== number).map(bet => ({
                result: 'ล',
                number: bet,
                up: up,
                down: down,
                tote: 0
            }))
            return [...prevData, ...newData]
        })

        return [...new Set(permutations)].filter(num => num !== number);

    }

    const handleDelete = (index: number) => {
        console.log(index);

        setBetData((prevData) => prevData.filter((_, i) => i !== index));
    };
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-gray-500 font-semibold">หมายเลข</th>
                        <th className="px-4 py-2 text-gray-500 font-semibold">บน</th>
                        <th className="px-4 py-2 text-gray-500 font-semibold">ล่าง</th>
                        <th className="px-4 py-2 text-gray-500 font-semibold">โต๊ด</th>
                        <th className="px-4 py-2 text-gray-500 font-semibold">ลบ</th>
                    </tr>
                </thead>
                <tbody>
                    {betData.map((row, index) => (
                        <tr key={index} className="text-center">
                            <td className="px-4 py-2 bg-purple-50 text-gray-700 border border-gray-200">{row.number}</td>
                            <td className="px-4 py-2 bg-purple-50 text-gray-700 border border-gray-200">
                                <input
                                    type="number"
                                    value={row.up}
                                    placeholder={`${row.number.length === 1 ? 'วิ่งบน' : 'บน'}`}
                                    className="w-full h-full text-center bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-50"
                                    onChange={(e) => handleInputChange(e, index, 'up')}
                                    onKeyDown={(e) => {
                                        if (e.key === 'a') {
                                            handlePermutation(row.number.toString(), row.up, row.down)
                                        }
                                    }}
                                    maxLength={3}
                                />
                            </td>
                            <td className="px-4 py-2 bg-purple-50 text-gray-700 border border-gray-200">
                                {row.number.length <= 2 ? (
                                    <input
                                        type="number"
                                        value={row.down}
                                        placeholder={`${row.number.length === 1 ? 'วิ่งล่าง' : 'ล่าง'}`}
                                        className="w-20 text-center bg-purple-50"
                                        onChange={(e) => handleInputChange(e, index, 'down')}
                                        onKeyDown={(e) => {
                                            if (e.key === 'a') {
                                                handlePermutation(row.number.toString(), row.up, row.down)
                                            }
                                        }}
                                    />
                                ) : (
                                    <span className="text-gray-400 text-nowrap">ไม่รับ</span>
                                )}
                            </td>
                            <td className="px-4 py-2 bg-purple-50 text-gray-700 border border-gray-200">
                                {row.number.length <= 2 ? (
                                    <span className="text-gray-400">ไม่รับ</span>
                                ) : (
                                    <input
                                        type="number"
                                        value={row.tote}
                                        placeholder='โต๊ด'
                                        className="w-20 text-center bg-purple-50"
                                        onChange={(e) => handleInputChange(e, index, 'tote')}
                                    />
                                )}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                                    <FaTimes />
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr className="text-center">
                        <td className="px-4 py-2 bg-purple-50 text-gray-700 border border-gray-200">
                            <input
                                type="number"
                                value={formBet.number}
                                placeholder={`หมายเลข`}
                                className="w-full h-full text-center bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-50"
                                onChange={(e) => setFormBet({ ...formBet, number: e.target.value })}
                                maxLength={3}
                            />
                        </td>
                        <td className="px-4 py-2 bg-purple-50 text-gray-700 border border-gray-200">
                            <input
                                type="number"
                                value={formBet.up}
                                placeholder={`${formBet.number.length === 1 ? 'วิ่งบน' : 'บน'}`}
                                className="w-full h-full text-center bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-50"
                                onChange={(e) => setFormBet({ ...formBet, up: Number(e.target.value) })}
                            />
                        </td>
                        <td className="px-4 py-2 bg-purple-50 text-gray-700 border border-gray-200">
                            {formBet.number.length <= 2 ? (
                                <input
                                    type="number"
                                    value={formBet.down}
                                    placeholder={`${formBet.number.length === 1 ? 'วิ่งล่าง' : 'ล่าง'}`}
                                    className="w-20 text-center bg-purple-50"
                                    onChange={(e) => setFormBet({ ...formBet, down: Number(e.target.value) })}
                                />
                            ) : (
                                <span className="text-gray-400 text-nowrap">ไม่รับ</span>
                            )}
                        </td>
                        <td className="px-4 py-2 bg-purple-50 text-gray-700 border border-gray-200">
                            {formBet.number.length <= 2 ? (
                                <span className="text-gray-400 text-nowrap">ไม่รับ</span>
                            ) : (
                                <input
                                    type="number"
                                    value={formBet.tote}
                                    placeholder='โต๊ด'
                                    className="w-20 text-center bg-purple-50"
                                    onChange={(e) => setFormBet({ ...formBet, tote: Number(e.target.value) })}
                                />
                            )}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                            <button onClick={handleAddBet} className="bg-purple-500 text-white py-2 px-4 rounded-lg">เพิ่ม</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BetTable;