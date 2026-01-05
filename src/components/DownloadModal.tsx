
'use client';

import { ReactNode } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export function DownloadModal({ isOpen, onClose, children }: DownloadModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <CheckCircle className="text-green-500" size={20} />
                        作成完了
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-slate-600 mb-6 text-sm">
                        PDFのダウンロードが開始されました。
                        <br />
                        <span className="text-slate-500 text-xs mt-2 block bg-slate-100 p-2 rounded">
                            ※サーバーへのデータ送信・保存は一切行われておりません。<br />
                            安心してお使いください。
                        </span>
                    </p>

                    <div className="bg-slate-50 rounded-lg p-1">
                        {children}
                    </div>
                </div>

                <div className="p-4 bg-slate-50 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
}
