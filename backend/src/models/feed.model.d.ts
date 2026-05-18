import mongoose, { Document } from 'mongoose';
export interface IFeed extends Document {
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IFeed, {}, {}, {}, mongoose.Document<unknown, {}, IFeed, {}, mongoose.DefaultSchemaOptions> & IFeed & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IFeed>;
export default _default;
//# sourceMappingURL=feed.model.d.ts.map