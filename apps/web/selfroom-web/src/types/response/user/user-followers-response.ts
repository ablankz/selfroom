import { UserCard } from '@/types/entity';
import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';

export interface UserFollowerData extends UserCard {};

export type UserFollowersResponse = ApplicationResponse<
  ApplicationPaginateData<UserFollowerData>
>;
