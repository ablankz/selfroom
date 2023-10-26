import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';
import { UserCard } from '@/types/entity';

export interface ChatRoomFavorData extends UserCard {};

export type ChatRoomFavorsResponse = ApplicationResponse<
  ApplicationPaginateData<ChatRoomFavorData>
>;
