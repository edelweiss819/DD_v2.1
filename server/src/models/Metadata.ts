import {Document, Schema, model} from 'mongoose';

export interface IMetadata extends Document {
    metadata: {
        [key: string]: any;
    };
}


const metadataSchema = new Schema<IMetadata>({
                                                 metadata: {
                                                     type: Schema.Types.Mixed,
                                                     default: {}
                                                 }
                                             });

const Metadata = model<IMetadata>('Metadata', metadataSchema);

export default Metadata;
