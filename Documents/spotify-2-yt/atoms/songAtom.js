import { atom } from "recoil"

export const currentTrackIdState = atom ({
    key : "currentTrackIdState", // unico ID con respecto a otros atoms selectores
    default : null, // default value (aka valor inicial)
})

export const isPlayingState = atom ({
    key : "isPlayingState",
    default : false,
})
