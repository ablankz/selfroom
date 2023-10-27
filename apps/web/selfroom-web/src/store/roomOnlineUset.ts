import { atom } from "recoil";
import { SimpleUser } from "@/types/entity";

export const onlineUsersState = atom<SimpleUser[]>({
    key: "onlineUsersState",
    default: []
});