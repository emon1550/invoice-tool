
'use client';

import { forwardRef } from 'react';
import { InvoiceData } from '@/types/invoice';

interface InvoicePreviewProps {
    data: InvoiceData;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data }, ref) => {
    const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const taxAmount = Math.floor(subtotal * data.taxRate);
    const totalAmount = subtotal + taxAmount;

    return (
        <div className="w-full overflow-auto bg-slate-100 p-4 md:p-8 rounded-lg border border-slate-200 shadow-inner flex justify-center min-h-[600px]">
            {/* A4 Scale Container */}
            <div
                ref={ref}
                className="bg-white shadow-lg box-border mx-auto text-slate-900"
                style={{
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '6mm', // Maximized printable area (was 10mm)
                    position: 'relative',
                    transformOrigin: 'top center',
                    transform: 'scale(calc(100% / var(--scale-factor, 1)))',
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-wider mb-2 text-slate-800">請求書</h1>
                        <p className="text-sm text-slate-500">INVOICE</p>
                    </div>
                    <div className="text-right text-sm leading-relaxed">
                        <p className="font-bold text-lg mb-1">{data.invoiceNumber}</p>
                        <p>発行日: {data.date}</p>
                        {data.dueDate && <p>支払期限: {data.dueDate}</p>}
                        {data.isQualifiedInvoiceIssuer && data.sellerRegistrationNumber && (
                            <p className="mt-2 text-slate-400 text-xs">登録番号: {data.sellerRegistrationNumber}</p>
                        )}
                    </div>
                </div>

                {/* Address Block */}
                <div className="flex justify-between items-start mb-8 gap-8">
                    <div className="flex-1">
                        <div className="border-b-2 border-slate-800 pb-1 mb-2 inline-block min-w-[200px]">
                            <span className="text-lg font-semibold">{data.clientName}</span>
                        </div>
                    </div>

                    <div className="text-right text-sm leading-relaxed relative">
                        <p className="font-bold text-base">{data.sellerName}</p>
                        <p className="whitespace-pre-wrap">{data.sellerAddress}</p>
                        <p>{data.sellerTel}</p>
                        <p>{data.sellerEmail}</p>

                        {/* Seal */}
                        {data.sealDetail?.image && (
                            <div className="absolute top-0 right-[-10px] opacity-80 mix-blend-multiply pointer-events-none">
                                <img
                                    src={data.sealDetail.image}
                                    alt="Seal"
                                    className="h-16 w-16 object-contain rotate-[-10deg]"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Amount Summary */}
                <div className="bg-slate-800 text-white p-4 flex justify-between items-end mb-6 rounded-sm">
                    <span className="text-sm">ご請求金額</span>
                    <span className="text-3xl font-bold">¥ {totalAmount.toLocaleString()} -</span>
                </div>

                {/* Details Table */}
                <div className="mb-8">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-slate-800 text-slate-600">
                                <th className="text-left py-2 font-semibold w-[50%]">品目</th>
                                <th className="text-center py-2 font-semibold">数量</th>
                                <th className="text-right py-2 font-semibold">単価</th>
                                <th className="text-right py-2 font-semibold">金額</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item) => (
                                <tr key={item.id} className="border-b border-slate-200">
                                    <td className="py-3">{item.description}</td>
                                    <td className="py-3 text-center">{item.quantity}</td>
                                    <td className="py-3 text-right">¥ {item.unitPrice.toLocaleString()}</td>
                                    <td className="py-3 text-right font-medium">
                                        ¥ {(item.quantity * item.unitPrice).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {/* Empty rows filler if needed, but skipping for simplicity */}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-6">
                    <div className="w-[40%] text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-200">
                            <span>小計 (税抜)</span>
                            <span>¥ {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-200">
                            <span>消費税 ({data.taxRate * 100}%)</span>
                            <span>¥ {taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold text-lg mt-2">
                            <span>合計</span>
                            <span>¥ {totalAmount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Bank Info */}
                {(data.bankName || data.bankAccountHolder) && (
                    <div className="flex justify-end mb-8">
                        <div className="w-[40%] text-sm">
                            <p className="font-semibold mb-2 text-slate-600 border-b border-slate-200 pb-1">お振込先</p>
                            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                                <dt className="text-slate-500">銀行名</dt>
                                <dd>{data.bankName} {data.bankBranch}</dd>
                                <dt className="text-slate-500">口座</dt>
                                <dd>{data.bankAccountType} {data.bankAccountNumber}</dd>
                                <dt className="text-slate-500">名義</dt>
                                <dd>{data.bankAccountHolder}</dd>
                            </dl>
                        </div>
                    </div>
                )}

                {/* Notes */}
                {data.notes && (
                    <div className="mt-4 border text-sm p-4 rounded-sm min-h-[100px]">
                        <p className="font-semibold mb-2 text-slate-600 text-xs">備考</p>
                        <p className="whitespace-pre-wrap">{data.notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
});

InvoicePreview.displayName = 'InvoicePreview';
