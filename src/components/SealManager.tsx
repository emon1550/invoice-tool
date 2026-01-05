
'use client';

import { ChangeEvent, useRef } from 'react';
import { InvoiceData } from '@/types/invoice';
import { Upload, Stamp } from 'lucide-react';
import { affiliateData } from '@/config/affiliate';

interface SealManagerProps {
    data: InvoiceData;
    onChange: (data: InvoiceData) => void;
}

export function SealManager({ data, onChange }: SealManagerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTypeChange = (type: InvoiceData['sealDetail']['type']) => {
        onChange({
            ...data,
            sealDetail: { ...data.sealDetail, type }
        });
    };

    const handleTextChange = (text: string) => {
        onChange({
            ...data,
            sealDetail: { ...data.sealDetail, text }
        });
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange({
                    ...data,
                    sealDetail: {
                        type: 'upload',
                        image: reader.result as string
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                    <Stamp size={16} />
                    角印（ハンコ）
                </h3>
                <a href={affiliateData.accounting.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline">電子契約ならMF</a>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => handleTypeChange('none')}
                    className={`text-xs py-2 px-1 rounded border ${data.sealDetail.type === 'none' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-600'}`}
                >
                    なし
                </button>
                <button
                    onClick={() => handleTypeChange('upload')}
                    className={`text-xs py-2 px-1 rounded border ${data.sealDetail.type === 'upload' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-600'}`}
                >
                    画像アップロード
                </button>
                {/* Presets could be added here if we had logic to draw them, currently sticking to upload/none as primary usable feature */}
            </div>

            {data.sealDetail.type === 'upload' && (
                <div className="space-y-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/png,image/jpeg"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-6 border-2 border-dashed border-slate-300 rounded hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-slate-500 gap-1"
                    >
                        {data.sealDetail.image ? (
                            <img src={data.sealDetail.image} alt="Upload" className="h-12 w-12 object-contain" />
                        ) : (
                            <>
                                <Upload size={20} />
                                <span className="text-xs">クリックして画像を選択</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
