import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ViewEvent extends Document {
  @Prop({ required: true }) contentId: string;
  @Prop() contentType: string;
  @Prop({ type: String, default: null }) userId: string | null;
  @Prop() ip: string;
}

export const ViewEventSchema = SchemaFactory.createForClass(ViewEvent);
ViewEventSchema.index({ contentId: 1, createdAt: -1 });
