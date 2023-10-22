import { ChatRoomCard } from '@/types/entity';
import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';

export interface ChatRoomsData extends ChatRoomCard {};

export type ChatRoomsResponse = ApplicationResponse<
  ApplicationPaginateData<ChatRoomsData>
>;
