import { Schema, model, type Document } from 'mongoose';
import validator from 'validator';
import itemSchema, { IItem } from './schema/item';

export interface IRoom extends Document {
    name: string;
    description: string;
    imageUrl: string;
    smallImageUrl: string;
    imageUrlList: string[];
    smallImageUrlList: string[];
    areaInfo: string;
    bedInfo: string;
    maxPeople: number;
    price: number;
    // 可使用：1，已刪除：-1
    status: number;
    facilityInfo: IItem[];
    amenityInfo: IItem[];
}

const roomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
            required: [true, 'name 未填寫']
        },
        description: {
            type: String,
            required: [true, 'description 未填寫']
        },
        imageUrl: {
            type: String,
            required: [true, '桌機 imageUrl 未填寫'],
            validate: {
                validator(value: string) {
                    return validator.isURL(value, { protocols: ['https'] });
                },
                message: '桌機 imageUrl 格式不正確'
            }
        },
        smallImageUrl: {
            type: String,
            required: [true, '手機 imageUrl 未填寫'],
            validate: {
                validator(value: string) {
                    return validator.isURL(value, { protocols: ['https'] });
                },
                message: '手機 imageUrl 格式不正確'
            }
        },
        imageUrlList: [
            {
                type: String,
                trim: true,
                validate: {
                    validator(value: string) {
                        return validator.isURL(value, { protocols: ['https'] });
                    },
                    message: '桌機 imageUrlList 格式不正確'
                }
            }
        ],
        smallImageUrlList: [
            {
                type: String,
                trim: true,
                validate: {
                    validator(value: string) {
                        return validator.isURL(value, { protocols: ['https'] });
                    },
                    message: '手機 imageUrlList 格式不正確'
                }
            }
        ],
        areaInfo: {
            type: String,
            required: [true, 'areaInfo 未填寫']
        },
        bedInfo: {
            type: String,
            required: [true, 'bedInfo 未填寫']
        },
        maxPeople: {
            type: Number,
            required: [true, 'maxPeople 未填寫'],
            validate: {
                validator(value: number) {
                    return validator.isInt(`${value}`, { min: 1 });
                },
                message: 'maxPeople 格式不正確'
            }
        },
        price: {
            type: Number,
            required: [true, 'price 未填寫']
        },
        status: {
            type: Number,
            default: 1
        },
        facilityInfo: {
            type: [itemSchema],
            default: []
        },
        amenityInfo: {
            type: [itemSchema],
            default: []
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('room', roomSchema);
