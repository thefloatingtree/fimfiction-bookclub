import { writable } from "svelte/store";

export const signedOutRoute = writable('loading')
export const signedInRoute = writable('')