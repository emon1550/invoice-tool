
export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface InvoiceData {
    invoiceNumber: string;
    date: string;
    dueDate: string;

    // Own Info
    sellerName: string;
    sellerRegistrationNumber: string; // T + 13 digits
    sellerAddress: string;
    sellerTel: string;
    sellerEmail: string;
    isQualifiedInvoiceIssuer: boolean;

    // Payment Info
    bankName: string;
    bankBranch: string;
    bankAccountType: string;
    bankAccountNumber: string;
    bankAccountHolder: string;

    // Seal Info
    sealDetail: {
        type: 'none' | 'upload' | 'preset_circle' | 'preset_square';
        image?: string; // DataURL for upload
        text?: string;  // Text for preset
    };

    // Client Info
    clientName: string;

    // Details
    items: InvoiceItem[];
    taxRate: number; // 0.10 or 0.08
    notes: string;
}

export const initialInvoiceData: InvoiceData = {
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    sellerName: '',
    sellerRegistrationNumber: '',
    sellerAddress: '',
    sellerTel: '',
    sellerEmail: '',
    isQualifiedInvoiceIssuer: true,

    bankName: '',
    bankBranch: '',
    bankAccountType: '普通',
    bankAccountNumber: '',
    bankAccountHolder: '',

    sealDetail: {
        type: 'none',
        text: '',
    },

    clientName: '',
    items: [
        { id: '1', description: '', quantity: 1, unitPrice: 0 }
    ],
    taxRate: 0.10,
    notes: '',
};
