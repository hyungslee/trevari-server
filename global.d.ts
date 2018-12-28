
declare namespace Express {
    interface Request{
        user: { userId: number; name: string };

    }
}
declare module "*.json" {
    const value: any;
    export default value;
}
