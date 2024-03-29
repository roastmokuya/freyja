import { Schema, model, type Document } from 'mongoose';
import validator from 'validator';

export interface INew extends Document {
    title: string;
    description: string;
    image: string;
    smallImage: string;
}

const newSchema = new Schema<INew>(
    {
        title: {
            type: String,
            required: [true, 'title 未填寫']
        },
        description: {
            type: String,
            required: [true, 'description 未填寫']
        },
        image: {
            type: String,
            required: [true, '桌機 image 未填寫'],
            validate: {
                validator(value: string) {
                    return validator.isURL(value, { protocols: ['https'] });
                },
                message: '桌機 image 格式不正確'
            }
        },
        smallImage: {
            type: String,
            required: [true, '手機 image 未填寫'],
            validate: {
                validator(value: string) {
                    return validator.isURL(value, { protocols: ['https'] });
                },
                message: '手機 image 格式不正確'
            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('new', newSchema);
