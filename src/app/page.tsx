'use client';

import { useRef, useState } from 'react';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { DownloadModal } from '@/components/DownloadModal';
import { AdCard } from '@/components/AdCard';
import { StorageControls } from '@/components/StorageControls';
import { EmailGenerator } from '@/components/EmailGenerator';
import { SealManager } from '@/components/SealManager';
import { affiliateData } from '@/config/affiliate';
import { InvoiceData, initialInvoiceData } from '@/types/invoice';
import { usePDFGenerator } from '@/hooks/use-pdf';
import { useInvoiceStorage } from '@/hooks/use-storage';
import { Download, Printer } from 'lucide-react';

export default function Home() {
  const {
    data: invoiceData,
    setData: setInvoiceData,
    saveData,
    loadData,
    clearData,
    hasSavedData
  } = useInvoiceStorage(initialInvoiceData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const { generatePDF, isGenerating } = usePDFGenerator();

  const handleDownload = async () => {
    if (previewRef.current) {
      await generatePDF(previewRef.current, `invoice_${invoiceData.invoiceNumber || 'draft'}.pdf`);
      // Show modal AFTER download starts/completes
      setIsModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Easy Invoice</h1>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">無料・登録不要</span>
          </div>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span>作成中...</span>
            ) : (
              <>
                <Download size={20} />
                <span>PDFを保存</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Editor */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">入力フォーム</h2>
            </div>

            <StorageControls
              onSave={saveData}
              onLoad={loadData}
              onClear={clearData}
              hasSavedData={hasSavedData}
            />

            <InvoiceForm
              data={invoiceData}
              onChange={setInvoiceData}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SealManager
                data={invoiceData}
                onChange={setInvoiceData}
              />
              <EmailGenerator
                data={invoiceData}
              />
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between lg:justify-end">
              <h2 className="lg:hidden text-lg font-semibold text-slate-800">プレビュー</h2>
              <p className="text-sm text-slate-500">A4サイズ</p>
            </div>

            <InvoicePreview
              ref={previewRef}
              data={invoiceData}
            />

            {/* Footer Ad if needed, but Modal is primary for MoneyForward */}
          </div>
        </div>
      </div>

      {/* Success Modal with Money Forward Ad */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AdCard
          ad={affiliateData.accounting}
          variant="modal"
        />
      </DownloadModal>
    </main>
  );
}
