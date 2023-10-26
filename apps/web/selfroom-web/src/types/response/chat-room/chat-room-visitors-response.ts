import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';
import { Visitor } from '@/types/entity';

export interface ChatRoomVisitorData extends Visitor {};

export type ChatRoomVisitorsResponse = ApplicationResponse<
  ApplicationPaginateData<ChatRoomVisitorData>
>;
