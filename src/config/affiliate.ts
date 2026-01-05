
export interface AffiliateAd {
    id: string;
    serviceName: string;
    url: string;
    description: string;
    placements: ('form_address' | 'modal' | 'footer')[];
}

export const affiliateData: Record<string, AffiliateAd> = {
    accounting: {
        id: 'accounting',
        serviceName: 'マネーフォワード クラウド',
        url: 'https://px.a8.net/svt/ejp?a8mat=4AUYOM+8NZNII+3SPO+8RM3HT',
        description: '毎回の入力が面倒なら、連携で自動化！インボイス対応も完璧です。',
        placements: ['modal', 'footer'],
    },
    virtual_office: {
        id: 'virtual_office',
        serviceName: 'バーチャルオフィス1',
        url: 'https://px.a8.net/svt/ejp?a8mat=4AUYOM+A07RII+5A2I+5YRHE',
        description: '自宅住所の公開が不安なら、月額880円からの住所貸しサービスがおすすめ。',
        placements: ['form_address'],
    },
};
