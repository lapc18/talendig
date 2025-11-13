import { StopStation } from './stop-station.entity';
import { z } from 'zod';

export const stopStationDto = z.object({
  name: z.string().min(2),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const StopStationService = {
  list: () => StopStation.findAll(),
  create: (data: z.infer<typeof stopStationDto>) => StopStation.create(data),
};

