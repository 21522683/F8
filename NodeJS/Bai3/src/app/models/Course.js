import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
});

export default mongoose.model('Course', Course);