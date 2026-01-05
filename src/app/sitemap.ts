import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    // 最終的には独自ドメイン（例: https://invoice.yoursite.com）に置き換わります
    // 環境変数 NEXT_PUBLIC_BASE_URL があればそれを使い、なければデフォルトのデプロイURLを使います
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://invoice.beojp.com';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]
}
