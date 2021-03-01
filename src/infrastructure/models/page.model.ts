import { Document, Schema, model, Model } from 'mongoose';
import * as faker from 'faker';
import { testimony } from '@domain/entities/testimony';

export class pageModel {
  _id?: string; 
  name: string;
  biografy: string;
  testimonies: testimony[];
  phoneNumber: boolean;
  email: Date;
  log: string;
  video: string;


  constructor(user: pageModel | any) {
    this._id = faker.random.uuid();
    this.name = user.name;
    this.biografy = user.biografy;
    this.testimonies = user.testimonies;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.log = user.log;
    this.video = user.video;
  }

  /* any method would be defined here*/
  save(): pageModel{
    return this;
  } 
}

// no necessary to export the schema (keep it private to the module)
var schema = new Schema({
  _id: { required: true, unique : true, dropDups: true, type: String},
  name: { required: true, type: String },
  biografy: { required: true, type: String },
  testimonies: { required: true, unique : true, dropDups: true, type: Array },
  phoneNumber: { required: true,  type: String },
  email: { required: true, type: String },
  log: { required: true, type: String },
  video: { required: true, type: String }
})

// register each method at schema
schema.method('foo', pageModel.prototype.save)

// 2) Document
export type UserDocument  = pageModel & Document;

// 3) MODEL
export const mongoosePageModel = model<UserDocument>('Date', schema);