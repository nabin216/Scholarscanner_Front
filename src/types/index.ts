export interface Scholarship {
    id: string;
    slug: string;
    title: string;
    description: string;
    amount: number;
    applyLink: string;
    deadline: Date;
    eligibilityCriteria: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    profileCompleted: boolean;
    scholarshipsApplied: string[];
}