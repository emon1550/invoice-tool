
import { useState, useEffect } from 'react';
import { InvoiceData } from '@/types/invoice';

const STORAGE_KEY = 'invoice_tool_data';

export function useInvoiceStorage(initialData: InvoiceData) {
    const [data, setData] = useState<InvoiceData>(initialData);
    const [hasSavedData, setHasSavedData] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setHasSavedData(true);
        }
    }, []);

    const saveData = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setHasSavedData(true);
        return true;
    };

    const loadData = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with defaults to ensure new fields (like seal) are present
                setData({ ...initialData, ...parsed, items: parsed.items || initialData.items });
                return true;
            } catch (e) {
                console.error('Failed to parse saved data', e);
                return false;
            }
        }
        return false;
    };

    const clearData = () => {
        localStorage.removeItem(STORAGE_KEY);
        setHasSavedData(false);
    };

    return { data, setData, saveData, loadData, clearData, hasSavedData };
}
