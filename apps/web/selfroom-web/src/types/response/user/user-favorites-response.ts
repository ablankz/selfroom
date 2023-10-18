import { ChatRoomCard } from '@/types/entity';
import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';

export interface UserFavoriteData extends ChatRoomCard {};

export type UserFavoritesResponse = ApplicationResponse<
  ApplicationPaginateData<UserFavoriteData>
>;
