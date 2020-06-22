import {Document, Model, model, Schema} from 'mongoose';

import {IHistory} from '../../models';
import {TableNamesEnum} from '../../constants';

export type HistoryType = IHistory & Document;

export const HistorySchema: Schema = new Schema<IHistory>({
  event: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  data: Schema.Types.Mixed
}
,{
  timestamps: true
}
);

export const HistoryModel: Model<HistoryType> = model<HistoryType>(TableNamesEnum.HISTORY, HistorySchema);
