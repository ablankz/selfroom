import { ChatRoom } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export interface ChatRoomsCreateData extends ChatRoom {}

export type ChatRoomsCreateResponse = ApplicationResponse<ChatRoomsCreateData>;
