
'use client';

import { ChangeEvent } from 'react';
import { InvoiceData, InvoiceItem } from '@/types/invoice';
import { affiliateData } from '@/config/affiliate';
import { AdCard } from './AdCard';
import { Plus, Trash2 } from 'lucide-react';

interface InvoiceFormProps {
    data: InvoiceData;
    onChange: (data: InvoiceData) => void;
}

export function InvoiceForm({ data, onChange }: InvoiceFormProps) {
    const handleChange = (field: keyof InvoiceData, value: string | number) => {
        onChange({ ...data, [field]: value });
    };

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        const newItem: InvoiceItem = {
            id: Math.random().toString(36).substr(2, 9),
            description: '',
            quantity: 1,
            unitPrice: 0,
        };
        onChange({ ...data, items: [...data.items, newItem] });
    };

    const removeItem = (index: number) => {
        if (data.items.length === 1) return;
        const newItems = data.items.filter((_, i) => i !== index);
        onChange({ ...data, items: newItems });
    };

    return (
        <div className="space-y-8 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            {/* Seller Information */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">自社情報</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="氏名 / 屋号" value={data.sellerName} onChange={(e) => handleChange('sellerName', e.target.value)} placeholder="山田 太郎" />

                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.isQualifiedInvoiceIssuer}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    onChange({
                                        ...data,
                                        isQualifiedInvoiceIssuer: isChecked,
                                        sellerRegistrationNumber: isChecked ? data.sellerRegistrationNumber : ''
                                    });
                                }}
                                className="rounded border-slate-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            適格請求書発行事業者
                        </label>

                        {data.isQualifiedInvoiceIssuer && (
                            <InputGroup
                                label="登録番号 (T+13桁)"
                                value={data.sellerRegistrationNumber}
                                onChange={(e) => handleChange('sellerRegistrationNumber', e.target.value)}
                                placeholder="T1234567890123"
                            />
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">住所</label>
                    <input
                        type="text"
                        value={data.sellerAddress}
                        onChange={(e) => handleChange('sellerAddress', e.target.value)}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border text-slate-900"
                        placeholder="東京都千代田区..."
                    />
                    <div className="mt-2">
                        <AdCard ad={affiliateData.virtual_office} variant="inline" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="電話番号" value={data.sellerTel} onChange={(e) => handleChange('sellerTel', e.target.value)} />
                    <InputGroup label="メールアドレス" value={data.sellerEmail} onChange={(e) => handleChange('sellerEmail', e.target.value)} />
                </div>
            </section>

            {/* Client Information */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">請求先</h3>
                <InputGroup label="取引先名" value={data.clientName} onChange={(e) => handleChange('clientName', e.target.value)} placeholder="株式会社 〇〇 御中" />
            </section>

            {/* Bank Information */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">振込先情報</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="銀行名" value={data.bankName} onChange={(e) => handleChange('bankName', e.target.value)} placeholder="〇〇銀行" />
                    <InputGroup label="支店名" value={data.bankBranch} onChange={(e) => handleChange('bankBranch', e.target.value)} placeholder="本店営業部" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">口座種別</label>
                        <select
                            value={data.bankAccountType}
                            onChange={(e) => handleChange('bankAccountType', e.target.value)}
                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border text-slate-900"
                        >
                            <option value="普通">普通</option>
                            <option value="当座">当座</option>
                        </select>
                    </div>
                    <InputGroup label="口座番号" value={data.bankAccountNumber} onChange={(e) => handleChange('bankAccountNumber', e.target.value)} placeholder="1234567" />
                </div>
                <InputGroup label="口座名義 (カナ)" value={data.bankAccountHolder} onChange={(e) => handleChange('bankAccountHolder', e.target.value)} placeholder="ヤマダ タロウ" />
            </section>

            {/* Invoice Details */}
            <section className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-semibold text-slate-800">請求内容 (10%対象)</h3>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600">税率:</label>
                        <select
                            value={data.taxRate}
                            onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
                            className="rounded border-slate-300 text-sm p-1 text-slate-900"
                        >
                            <option value={0.1}>10%</option>
                            <option value={0.08}>8% (軽減)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputGroup label="請求番号" value={data.invoiceNumber} onChange={(e) => handleChange('invoiceNumber', e.target.value)} />
                    <InputGroup label="請求日" type="date" value={data.date} onChange={(e) => handleChange('date', e.target.value)} />
                    <InputGroup label="支払期限" type="date" value={data.dueDate} onChange={(e) => handleChange('dueDate', e.target.value)} />
                </div>

                <div className="mt-4 space-y-3">
                    <div className="grid grid-cols-12 gap-2 text-sm font-medium text-slate-500 px-2">
                        <div className="col-span-6">品目</div>
                        <div className="col-span-2 text-right">数量</div>
                        <div className="col-span-3 text-right">単価</div>
                        <div className="col-span-1"></div>
                    </div>

                    {data.items.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded">
                            <div className="col-span-6">
                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    className="w-full rounded border-slate-300 text-sm p-1.5 border text-slate-900"
                                    placeholder="品目名"
                                />
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                                    className="w-full rounded border-slate-300 text-sm p-1.5 border text-right text-slate-900"
                                />
                            </div>
                            <div className="col-span-3">
                                <input
                                    type="number"
                                    value={item.unitPrice}
                                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                                    className="w-full rounded border-slate-300 text-sm p-1.5 border text-right text-slate-900"
                                />
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                    title="削除"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addItem}
                        className="w-full py-2 border-2 border-dashed border-slate-300 rounded-md text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                        <Plus size={18} /> 行を追加
                    </button>
                </div>
            </section>

            <section>
                <label className="block text-sm font-medium text-slate-700 mb-1">備考</label>
                <textarea
                    value={data.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border h-24 text-slate-900"
                    placeholder="振込先情報など..."
                />
            </section>
        </div>
    );
}

function InputGroup({ label, value, onChange, type = 'text', placeholder }: { label: string, value: string | number, onChange: (e: ChangeEvent<HTMLInputElement>) => void, type?: string, placeholder?: string }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border text-slate-900"
                placeholder={placeholder}
            />
        </div>
    );
}
