import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  priority: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);