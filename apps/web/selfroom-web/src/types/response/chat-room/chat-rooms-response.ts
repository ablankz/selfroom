import { ChatRoomCard } from '@/types/entity';
import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';

export interface ChatRoomData extends ChatRoomCard {};

export type ChatRoomsResponse = ApplicationResponse<
  ApplicationPaginateData<ChatRoomData>
>;
