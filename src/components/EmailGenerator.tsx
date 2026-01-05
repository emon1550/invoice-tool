
'use client';

import { useState } from 'react';
import { InvoiceData } from '@/types/invoice';
import { Copy, Check, Mail } from 'lucide-react';
import { affiliateData } from '@/config/affiliate';

interface EmailGeneratorProps {
    data: InvoiceData;
}

export function EmailGenerator({ data }: EmailGeneratorProps) {
    const [copied, setCopied] = useState(false);

    const subject = `請求書のご送付について（${data.invoiceNumber}）`;
    const body = `${data.clientName}
ご担当者様

平素より大変お世話になっております。
${data.sellerName}です。

件名の通り、請求書（${data.invoiceNumber}）をお送りいたします。
添付ファイルをご確認くださいますようお願い申し上げます。

■ご請求金額：¥ ${(data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0) * (1 + data.taxRate)).toLocaleString()}（税込）
■お支払期限：${data.dueDate || '請求書記載の通り'}

ご不明な点がございましたら、お気軽にお問い合わせください。
よろしくお願い申し上げます。

--------------------------------------------------
${data.sellerName}
〒${data.sellerAddress}
Tel: ${data.sellerTel}
Email: ${data.sellerEmail}
--------------------------------------------------`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`件名: ${subject}\n\n${body}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <Mail size={16} />
                メール文面作成
            </h3>

            <div className="bg-slate-50 p-3 rounded text-xs text-slate-600 whitespace-pre-wrap border border-slate-200 h-32 overflow-y-auto">
                <div className="font-bold border-b border-slate-200 pb-1 mb-2">件名: {subject}</div>
                {body}
            </div>

            <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-md text-sm font-medium transition-colors border border-slate-300"
            >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                {copied ? 'コピーしました' : '件名と本文をコピー'}
            </button>

            <div className="text-xs text-center text-slate-500 pt-2 border-t border-slate-100">
                <p className="mb-1">毎回のメール作成・送信作業を自動化しませんか？</p>
                <a
                    href={affiliateData.accounting.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    マネーフォワードならワンクリックで送信完了
                </a>
            </div>
        </div>
    );
}
