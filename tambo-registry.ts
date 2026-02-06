import { z } from 'zod';
import DestinationExplorer from '@/components/tambo/DestinationExplorer';
import FlightFinder from '@/components/tambo/FlightFinder';
import LocalGuide from '@/components/tambo/LocalGuide';
import TripStats from '@/components/tambo/TripStats';

export const travelComponents = [
  {
    name: 'DestinationExplorer',
    description: 'Use for PLANNING phase. When user asks "where should I go", "ideas for trips", or is researching destinations.',
    component: DestinationExplorer,
    propsSchema: z.object({
      place: z.string(),
      highlights: z.array(z.string()).max(3),
      bestSeason: z.string()
    }),
  },
  {
    name: 'FlightFinder',
    description: 'Use for BOOKING phase. When user asks for "flights", "prices", "tickets", or "how to get there".',
    component: FlightFinder,
    propsSchema: z.object({
      from: z.string(),
      to: z.string(),
      price: z.string(),
      duration: z.string()
    }),
  },
  {
    name: 'LocalGuide',
    description: 'Use for DURING TRIP phase. When user says "I am in Paris now", "where to eat", or needs navigation nearby.',
    component: LocalGuide,
    propsSchema: z.object({
      nearbySpot: z.string(),
      type: z.enum(['Food', 'Sight']),
      distance: z.string()
    }),
  },
  {
    name: 'TripStats',
    description: 'Use for POST TRIP phase. When user says "I am back", "trip summary", or asks about expenses.',
    component: TripStats,
    propsSchema: z.object({
      totalSpent: z.string(),
      topCategory: z.string()
    }),
  }
];