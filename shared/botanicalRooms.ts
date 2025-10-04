/**
 * Botanical Room Data for Casa Flora Heritage Home
 *
 * These 5 bedrooms represent the botanical heritage storytelling system.
 * Casa Flora rents as a WHOLE HOUSE ONLY - rooms are for guest experience,
 * not individual booking selection.
 */

export type RoomName = 'geisha' | 'orquidea' | 'hortensia' | 'veranera' | 'begonia';

export type BathroomType = 'ensuite' | 'shared';

export type FloorLocation = 'downstairs' | 'upstairs';

export interface BotanicalRoom {
  id: RoomName;
  displayName: string;
  flowerNameEnglish: string;
  flowerNameSpanish: string;
  floor: FloorLocation;
  bathroomType: BathroomType;
  bedConfiguration: string;
  capacity: number;

  // Heritage storytelling
  heritageStory: string;
  flowerStory: string;
  gardenLocation: string;
  bloomingSeason?: string;

  // Features & amenities
  features: string[];
  viewDescription?: string;

  // Image paths (relative to attached_assets)
  mainImage: string;
  additionalImages?: string[];
}

export const BOTANICAL_ROOMS: Record<RoomName, BotanicalRoom> = {
  geisha: {
    id: 'geisha',
    displayName: 'Geisha',
    flowerNameEnglish: 'Geisha Coffee Blossoms',
    flowerNameSpanish: 'Café Geisha',
    floor: 'downstairs',
    bathroomType: 'ensuite',
    bedConfiguration: 'Queen bed',
    capacity: 2,

    heritageStory: 'Geisha honors Boquete\'s world-famous Geisha coffee—the most prized coffee varietal on earth. Originally from Ethiopia, Geisha thrives in Boquete\'s volcanic soil and cool highlands. Its delicate jasmine-scented blossoms perfume the valley each October-November.',

    flowerStory: 'World-famous Boquete coffee heritage. Geisha coffee is the crown jewel of Panama\'s coffee industry, fetching record prices at auction and putting our mountain valley on the global specialty coffee map.',

    gardenLocation: 'You\'ll find our coffee plants near the covered walkway. Visit in late autumn to experience their fragrant white blooms.',

    bloomingSeason: 'October - November',

    features: [
      'Private en-suite bathroom',
      'Queen bed',
      'Garden views',
      'Original hardwood details',
      'Coffee-themed décor'
    ],

    viewDescription: 'Mountain and garden views with coffee plants visible from window',

    mainImage: '/bedrooms/casa-flora-room-geisha-main.jpg',
    additionalImages: [
      '/bathrooms/casa-flora-bathroom-geisha-ensuite.jpg',
      '/bathrooms/casa-flora-bathroom-geisha-ensuite-shower.jpg'
    ]
  },

  orquidea: {
    id: 'orquidea',
    displayName: 'Orquídea',
    flowerNameEnglish: 'Orchid',
    flowerNameSpanish: 'Orquídea',
    floor: 'downstairs',
    bathroomType: 'ensuite',
    bedConfiguration: 'King bed',
    capacity: 2,

    heritageStory: 'Orquídea honors Panama\'s national flower—the exquisite "Holy Ghost Orchid" (Peristeria elata). Orchids flourish in Boquete\'s cloud forests and are the crown jewel of our annual Flower Fair each January.',

    flowerStory: 'Panama\'s national treasure. The orchid represents elegance, rarity, and the precious biodiversity of our cloud forest ecosystem. Our gardens feature orchids throughout shaded walkways and tree trunks where they grow naturally.',

    gardenLocation: 'Look for orchids throughout our gardens, especially near shaded walkways and tree trunks where they grow naturally.',

    bloomingSeason: 'Year-round (peak in January during Flower Fair)',

    features: [
      'Private en-suite bathroom',
      'King bed',
      'Premium room',
      'Cloud forest views',
      'Elegant orchid accents'
    ],

    viewDescription: 'Lush tropical garden with orchid-rich shaded areas',

    mainImage: '/bedrooms/casa-flora-room-orquidea-main.jpg',
    additionalImages: [
      '/bathrooms/casa-flora-bathroom-orquidea-ensuite.jpg'
    ]
  },

  hortensia: {
    id: 'hortensia',
    displayName: 'Hortensia',
    flowerNameEnglish: 'Hydrangea',
    flowerNameSpanish: 'Hortensia',
    floor: 'upstairs',
    bathroomType: 'shared',
    bedConfiguration: 'Twin beds',
    capacity: 2,

    heritageStory: 'Hortensia celebrates the romantic hydrangeas that thrive in Boquete\'s cool highland climate. These European immigrants have flourished here for over a century, their white and pink blooms cascading along our covered walkways.',

    flowerStory: 'Peaceful hydrangea gardens. Named "Hortensia" in Spanish, these romantic blooms evoke musical gardens and serene contemplation. They represent the successful European heritage plants that have made Boquete their home.',

    gardenLocation: 'Find hydrangeas along our covered walkways and garden borders throughout the property.',

    bloomingSeason: 'Year-round (peak bloom in rainy season)',

    features: [
      'Twin beds (perfect for friends or siblings)',
      'Shared upstairs bathroom',
      'Peaceful garden views',
      'Hydrangea-themed accents',
      'Mountain breeze windows'
    ],

    viewDescription: 'Garden views showcasing hydrangea borders and mountain backdrop',

    mainImage: '/bedrooms/casa-flora-room-hortensia-twin-beds.jpg',
    additionalImages: [
      '/bathrooms/casa-flora-bathroom-upstairs-shared.jpg'
    ]
  },

  veranera: {
    id: 'veranera',
    displayName: 'Veranera',
    flowerNameEnglish: 'Bougainvillea',
    flowerNameSpanish: 'Veranera',
    floor: 'upstairs',
    bathroomType: 'shared',
    bedConfiguration: 'Bunk beds',
    capacity: 2,

    heritageStory: 'Veranera celebrates the vibrant bougainvillea that cascades over our walls and fences in brilliant magenta and purple. The Spanish name "Veranera" means "summer flower," evoking endless tropical warmth.',

    flowerStory: 'Bright summer colors. Bougainvillea brings year-round vibrancy to Casa Flora, its papery bracts creating living curtains of color. This hardy climbing plant symbolizes the resilient beauty of tropical Panama.',

    gardenLocation: 'See bougainvillea cascading over walls and fences throughout the property, creating brilliant color cascades.',

    bloomingSeason: 'Year-round',

    features: [
      'Bunk beds (great for kids or budget travelers)',
      'Shared upstairs bathroom',
      'Colorful tropical décor',
      'Mountain views',
      'Playful summer vibe'
    ],

    viewDescription: 'Vibrant garden views with bougainvillea-draped walls',

    mainImage: '/bedrooms/casa-flora-room-veranera-bunk-beds.jpg',
    additionalImages: [
      '/bathrooms/casa-flora-bathroom-upstairs-shared.jpg'
    ]
  },

  begonia: {
    id: 'begonia',
    displayName: 'Begonia',
    flowerNameEnglish: 'Begonia',
    flowerNameSpanish: 'Begonia',
    floor: 'upstairs',
    bathroomType: 'shared',
    bedConfiguration: 'Full bed',
    capacity: 2,

    heritageStory: 'Begonia celebrates the charming shade-loving begonias that flourish along our garden pathways. Simple, sweet, and perfect in both English and Spanish, this room embodies approachable beauty.',

    flowerStory: 'Sweet simplicity. Begonias thrive in the dappled shade of our tropical gardens, their deep crimson and pink blooms adding cheerful color to shaded areas. They represent accessible beauty and joyful gardening.',

    gardenLocation: 'Find begonias along shaded pathways and under tree canopies throughout the gardens.',

    bloomingSeason: 'Year-round',

    features: [
      'Full bed (cozy for couples)',
      'Shared upstairs bathroom',
      'Charming garden views',
      'Shade garden aesthetic',
      'Intimate and welcoming'
    ],

    viewDescription: 'Shaded garden pathways with begonia borders',

    mainImage: '/common-areas/casa-flora-interior-common-living-room.jpg', // Placeholder - Begonia photos not yet available per TODO.md
    additionalImages: [
      '/bathrooms/casa-flora-bathroom-upstairs-shared.jpg'
    ]
  }
};

// Helper functions
export function getRoomsByFloor(floor: FloorLocation): BotanicalRoom[] {
  return Object.values(BOTANICAL_ROOMS).filter(room => room.floor === floor);
}

export function getRoomsByBathroomType(type: BathroomType): BotanicalRoom[] {
  return Object.values(BOTANICAL_ROOMS).filter(room => room.bathroomType === type);
}

export function getTotalCapacity(): number {
  return Object.values(BOTANICAL_ROOMS).reduce((sum, room) => sum + room.capacity, 0);
}

export function getRoomById(id: RoomName): BotanicalRoom | undefined {
  return BOTANICAL_ROOMS[id];
}

// House configuration summary
export const CASA_FLORA_HOUSE = {
  totalBedrooms: 5,
  totalCapacity: getTotalCapacity(), // Should be ~10 guests
  downstairsRooms: getRoomsByFloor('downstairs').length, // 2 (Geisha, Orquídea)
  upstairsRooms: getRoomsByFloor('upstairs').length, // 3 (Hortensia, Veranera, Begonia)
  ensuiteRooms: getRoomsByBathroomType('ensuite').length, // 2
  sharedBathRooms: getRoomsByBathroomType('shared').length, // 3
  rentalType: 'whole-house-only' as const,
  description: '5 Botanical Bedrooms, One Century-Old Story'
};
