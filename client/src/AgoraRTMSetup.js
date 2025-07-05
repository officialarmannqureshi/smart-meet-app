import { createClient } from 'agora-rtm-react';

const appId = "0365936f329e4f13a751ba07c81c04be";
const token = null;
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useRTMClient = createClient(appId);