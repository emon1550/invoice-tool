
import { AffiliateAd } from '@/config/affiliate';
import { ExternalLink } from 'lucide-react';

interface AdCardProps {
    ad: AffiliateAd;
    variant?: 'inline' | 'card' | 'modal';
    className?: string;
}

export function AdCard({ ad, variant = 'card', className = '' }: AdCardProps) {
    if (variant === 'inline') {
        return (
            <a
                href={ad.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors ${className}`}
            >
                <ExternalLink size={14} />
                <span>{ad.description}</span>
            </a>
        );
    }

    if (variant === 'modal') {
        return (
            <div className={`bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-sm ${className}`}>
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    {ad.serviceName}
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">推奨</span>
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{ad.description}</p>
                <a
                    href={ad.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                    詳細を見る / 連携する
                    <ExternalLink className="ml-2 h-4 w-4" />
                </a>
            </div>
        );
    }

    // Card variant (default)
    return (
        <div className={`bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-900 text-sm">{ad.serviceName}</h4>
                <span className="text-[10px] text-slate-400 border px-1 rounded">Promotion</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">{ad.description}</p>
            <a
                href={ad.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 font-medium hover:underline flex items-center"
            >
                詳しく見る <ExternalLink size={10} className="ml-1" />
            </a>
        </div>
    );
}
