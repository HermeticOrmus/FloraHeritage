/**
 * Botanical Room Data for Casa Del Puente Heritage Home
 *
 * These 4 bedrooms represent the botanical heritage storytelling system.
 * Casa Del Puente rents as a WHOLE HOUSE ONLY - rooms are for guest experience,
 * not individual booking selection.
 */

export type RoomName = 'geisha' | 'orquidea' | 'hortensia' | 'veranera';

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
    flowerNameEnglish: 'Geisha Flower',
    flowerNameSpanish: 'Flor Geisha',
    floor: 'downstairs',
    bathroomType: 'ensuite',
    bedConfiguration: '2 single beds',
    capacity: 2,

    heritageStory: 'Geisha celebrates the delicate beauty and refined elegance that defines this special room. Named for its graceful aesthetic and serene atmosphere, this downstairs bedroom offers peaceful garden views.',

    flowerStory: 'Refined elegance. The Geisha room embodies grace, tranquility, and sophisticated simplicity—a peaceful retreat within our heritage home.',

    gardenLocation: 'Boquete is one of the world\'s geisha coffee capitals, with prized coffee plants thriving throughout this renowned growing region. You\'ll find geisha coffee farms and plantations all around town.',

    bloomingSeason: 'Year-round garden beauty',

    features: [
      'Private en-suite bathroom',
      '2 single beds',
      'Garden views',
      'Original hardwood details',
      'Elegant décor'
    ],

    viewDescription: 'Mountain and garden views from downstairs bedroom',

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
    bedConfiguration: '2 single beds',
    capacity: 2,

    heritageStory: 'Orquídea honors Panama\'s national flower—the exquisite "Holy Ghost Orchid" (Peristeria elata). Orchids flourish in Boquete\'s cloud forests and are the crown jewel of our annual Flower Fair each January.',

    flowerStory: 'Panama\'s national treasure. The orchid represents elegance, rarity, and the precious biodiversity of our cloud forest ecosystem. Our gardens feature orchids throughout shaded walkways and tree trunks where they grow naturally.',

    gardenLocation: 'Look for orchids throughout our gardens, especially near shaded walkways and tree trunks where they grow naturally.',

    bloomingSeason: 'Year-round (peak in January during Flower Fair)',

    features: [
      'Private en-suite bathroom',
      '2 single beds',
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
    bedConfiguration: '2 single beds',
    capacity: 2,

    heritageStory: 'Hortensia celebrates the romantic hydrangeas that thrive in Boquete\'s cool highland climate. These European immigrants have flourished here for over a century, their white and light blue blossoms can be seen all over the garden.',

    flowerStory: 'Peaceful hydrangea gardens. Named "Hortensia" in Spanish, these romantic blooms evoke musical gardens and serene contemplation. They represent the successful European heritage plants that have made Boquete their home.',

    gardenLocation: 'Find hydrangeas in the garden and throughout the property.',

    bloomingSeason: 'Year-round (peak bloom in rainy season)',

    features: [
      '2 single beds',
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
    bedConfiguration: '2 bunk beds',
    capacity: 4,

    heritageStory: 'Veranera celebrates the vibrant bougainvillea that cascades over our walls and fences in brilliant magenta and purple. The Spanish name "Veranera" means "summer flower," evoking endless tropical warmth.',

    flowerStory: 'Bright summer colors. Bougainvillea brings year-round vibrancy to Casa Del Puente, its papery bracts creating living curtains of color. This hardy climbing plant symbolizes the resilient beauty of tropical Panama.',

    gardenLocation: 'See bougainvillea cascading over walls and fences throughout the property, creating brilliant color cascades.',

    bloomingSeason: 'Year-round',

    features: [
      '2 bunk beds (sleeps 4)',
      'Shared upstairs bathroom',
      'Cozy tropical décor',
      'Bridge views',
      'Playful summer vibe'
    ],

    viewDescription: 'Bridge and river views with bougainvillea-draped walls',

    mainImage: '/bedrooms/casa-flora-room-veranera-bunk-beds.jpg',
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
export const CASA_DEL_PUENTE_HOUSE = {
  totalBedrooms: 4,
  totalCapacity: getTotalCapacity(), // 10 guests (2+2+2+4)
  downstairsRooms: getRoomsByFloor('downstairs').length, // 2 (Geisha, Orquídea)
  upstairsRooms: getRoomsByFloor('upstairs').length, // 2 (Hortensia, Veranera)
  ensuiteRooms: getRoomsByBathroomType('ensuite').length, // 2
  sharedBathRooms: getRoomsByBathroomType('shared').length, // 2
  fullBathrooms: 3,
  guestBathrooms: 1,
  rentalType: 'whole-house-only' as const,
  description: '4 Botanical Bedrooms, One Century-Old Story'
};
