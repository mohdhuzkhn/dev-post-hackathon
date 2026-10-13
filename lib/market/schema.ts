import {z} from 'zod';
import {ideaSchema} from '../validation/idea';
const shortText=z.string().trim().min(1).max(500);
export const segmentSchema=z.object({customer:shortText,need:shortText,buyer:shortText}).strict();
export const marketInputSchema=ideaSchema.extend({location:z.string().trim().min(2,'Enter a city, country, or Online / Global.').max(160)});
export const marketSchema=z.object({segments:z.array(segmentSchema).min(2).max(3)}).strict();
export const confirmedMarketSchema=marketInputSchema.extend({segments:z.array(segmentSchema).min(2).max(3)});
export type MarketSegment=z.infer<typeof segmentSchema>;
export type ConfirmedMarket=z.infer<typeof confirmedMarketSchema>;
