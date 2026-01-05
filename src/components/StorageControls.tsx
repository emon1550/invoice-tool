
import { useState } from 'react';
import { Save, DownloadCloud, AlertTriangle, Trash2, AlertCircle } from 'lucide-react';
import { affiliateData } from '@/config/affiliate';
import { AdCard } from './AdCard';

interface StorageControlsProps {
    onSave: () => void;
    onLoad: () => void;
    onClear: () => void;
    hasSavedData: boolean;
}

export function StorageControls({ onSave, onLoad, onClear, hasSavedData }: StorageControlsProps) {
    const [deleteStep, setDeleteStep] = useState<0 | 1 | 2>(0); // 0: idle, 1: confirm, 2: final confirm

    const handleDelete = () => {
        if (deleteStep === 0) {
            setDeleteStep(1);
        } else if (deleteStep === 1) {
            setDeleteStep(2);
        } else {
            onClear();
            setDeleteStep(0);
        }
    };

    const cancelDelete = () => {
        setDeleteStep(0);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 text-sm">データ保存（ブラウザ）</h3>
                {hasSavedData && (
                    <div className="flex gap-2">
                        {deleteStep === 0 ? (
                            <button
                                onClick={onLoad}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                                保存データを読み込む
                            </button>
                        ) : null}
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                {deleteStep === 0 ? (
                    <>
                        <button
                            onClick={onSave}
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            <Save size={16} />
                            ブラウザに保存
                        </button>
                        {hasSavedData && (
                            <button
                                onClick={handleDelete}
                                className="px-3 py-2 border border-slate-300 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="保存データを削除"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="flex-1 flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                        <button
                            onClick={handleDelete}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold text-white transition-colors ${deleteStep === 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-red-700 hover:bg-red-800'
                                }`}
                        >
                            <AlertCircle size={16} />
                            {deleteStep === 1 ? '本当に削除しますか？' : '最終確認：全て消えます'}
                        </button>
                        <button
                            onClick={cancelDelete}
                            className="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-100 text-sm"
                        >
                            キャンセル
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                {/* Security Note */}
                <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-xs leading-relaxed text-emerald-800">
                    <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                        ビジネス利用も安心
                    </h4>
                    <p>
                        当サイトのサーバーには一切データを送信・保存しません。
                        入力内容はすべて<span className="font-bold border-b border-emerald-300">お客様のブラウザ内でのみ</span>処理されます。
                        外部への情報漏洩リスクがないため、機密性の高い請求書作成にも安心してご利用いただけます。
                    </p>
                </div>

                {/* Data Persistence Warning (Affiliate Hook) */}
                <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs leading-relaxed text-amber-800">
                    <div className="flex items-start gap-2">
                        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                        <div>
                            ブラウザのキャッシュを削除するとデータは消えます。
                            <div className="mt-2 pt-2 border-t border-amber-200/50">
                                <p className="mb-1 font-medium text-amber-900">永続的な保存・複数端末での利用なら：</p>
                                <a
                                    href={affiliateData.accounting.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline font-medium hover:text-blue-800"
                                >
                                    マネーフォワード クラウド（データをクラウドで安全管理）
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

