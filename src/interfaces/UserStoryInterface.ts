export interface UserStoryInterface {
    _id: string;
    listIndex: number;
    position: number;
    title: string;
    description: string;
    estimation: number;
    creationDate: Date;
    planing: {
        listIndex: number;
        position: number;
    }
}