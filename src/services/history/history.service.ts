import {HistoryModel} from '../../dataBase';
import {IHistory} from '../../models';

class HistoryService {
  createHistory(history: Partial<IHistory>): Promise<IHistory> {
    const historyToCreate = new HistoryModel(history);

    return historyToCreate.save();
  }
}
export const historyService = new HistoryService();
