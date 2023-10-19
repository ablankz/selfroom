import { UserCard } from '@/types/entity';
import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';

export interface UserFolloweeData extends UserCard {};

export type UserFolloweesResponse = ApplicationResponse<
  ApplicationPaginateData<UserFolloweeData>
>;
