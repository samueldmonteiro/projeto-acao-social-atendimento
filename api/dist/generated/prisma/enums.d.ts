export declare const Role: {
    readonly ATTENDANT: "ATTENDANT";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const Gender: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
    readonly OTHER: "OTHER";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
