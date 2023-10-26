import { ChatRoomCard } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export interface ChatRoomData extends ChatRoomCard {}

export type ChatRoomResponse = ApplicationResponse<ChatRoomData>;
