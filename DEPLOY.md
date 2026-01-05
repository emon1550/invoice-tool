
# Cloudflare Pages へのデプロイ手順

このプロジェクトは **Static Export (静的書き出し)** モードで設定されています。
Cloudflare Pages へのデプロイは非常に簡単です。

## 手順

1.  **GitHubにリポジトリを作成**し、このプロジェクトをプッシュします。
2.  **Cloudflare Dashboard** にログインし、「Compute (Workers & Pages)」→「Pages」を選択します。
3.  「Connect to Git」を選択し、作成したリポジトリを選びます。
4.  ビルド設定画面で以下のように入力します：
    *   **Framework preset**: `Next.js (Static Export)` または `None`
    *   **Build command**: `npm run build`
    *   **Output directory**: `out`
        *   ※ Next.js のデフォルト出力先は `.next` ですが、`output: 'export'` 設定時は `out` フォルダになります。

5.  「Save and Deploy」をクリックします。

## 注意点

*   **画像最適化**: `next/image` は自動的に無効化されています（Cloudflare Pages の無料枠では Image Optimization が使えないため）。
*   **APIルート**: サーバーサイドの処理（API Routes）は使用できませんが、このツールはすべてブラウザ上で動作するため問題ありません。

これで、完全無料・登録不要の請求書作成ツールが公開されます！
