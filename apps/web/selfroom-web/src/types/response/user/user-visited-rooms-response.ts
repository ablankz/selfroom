import { ApplicationResponse } from '../application-response';
import { ApplicationPaginateData } from '../application-paginate-data';
import { VisitedChatRoom } from '@/types/entity';

export interface UserVisitedRoomsData extends VisitedChatRoom {};

export type UserVisitedRoomsResponse = ApplicationResponse<
  ApplicationPaginateData<UserVisitedRoomsData>
>;
