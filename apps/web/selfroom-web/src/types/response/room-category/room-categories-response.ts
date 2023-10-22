import { SimpleRoomCategory } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export interface RoomCategoriesData extends SimpleRoomCategory {}

export type RoomCategoriesResponse = ApplicationResponse<RoomCategoriesData[]>;
