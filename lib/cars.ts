export type Car = {
  id: string;
  slug: string;
  name: string;
  brand: 'Ferrari' | 'Lamborghini' | 'Rolls-Royce' | 'Bentley' | 'Porsche' | 'Aston Martin' | 'McLaren' | 'Mercedes-Maybach';
  price: number;
  currency: 'EUR';
  year: number;
  power: string;
  zeroToHundred: string;
  topSpeed: string;
  fuel: 'Petrol' | 'Hybrid';
  transmission: 'Automatic' | 'Dual-Clutch';
  description: string;
  heroImage: string;
  gallery: string[];
  interior: string[];
  engineSound?: string;
};

export const cars: Car[] = [
  {
    id: '1',
    slug: 'ferrari-sf90-stradale',
    name: 'Ferrari SF90 Stradale',
    brand: 'Ferrari',
    price: 540000,
    currency: 'EUR',
    year: 2023,
    power: '1000 cv',
    zeroToHundred: '2.5 s',
    topSpeed: '340 km/h',
    fuel: 'Hybrid',
    transmission: 'Dual-Clutch',
    description:
      'The SF90 Stradale is Ferrari’s first plug-in hybrid supercar delivering awe-inspiring power with unprecedented everyday drivability. This specification includes the Assetto Fiorano package for supreme track performance.',
    heroImage: 'https://images.unsplash.com/photo-1606066974454-06b99aef447c?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523983302122-73e702275082?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1617813487456-80f0134d63d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
    ],
    engineSound: '/sounds/rev.mp3'
  },
  {
    id: '2',
    slug: 'lamborghini-huracan-sto',
    name: 'Lamborghini Huracán STO',
    brand: 'Lamborghini',
    price: 420000,
    currency: 'EUR',
    year: 2022,
    power: '640 cv',
    zeroToHundred: '3.0 s',
    topSpeed: '310 km/h',
    fuel: 'Petrol',
    transmission: 'Dual-Clutch',
    description:
      'Track-honed STO specification with extensive carbon fibre, rear-wheel drive agility and bespoke Ad Personam interior.',
    heroImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511394330521-2077d72694de?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=80'
    ],
    engineSound: '/sounds/engine-start.mp3'
  },
  {
    id: '3',
    slug: 'rolls-royce-ghost-black-badge',
    name: 'Rolls-Royce Ghost Black Badge',
    brand: 'Rolls-Royce',
    price: 485000,
    currency: 'EUR',
    year: 2021,
    power: '600 hp',
    zeroToHundred: '4.5 s',
    topSpeed: '250 km/h',
    fuel: 'Petrol',
    transmission: 'Automatic',
    description:
      'The Ghost Black Badge reinterprets post-opulent luxury with a darker aesthetic, illuminated fascia and bespoke lounge seating.',
    heroImage: 'https://images.unsplash.com/photo-1523981784081-91fd0a17b658?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1587954285702-5ec2440ed43d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617813487456-80f0134d63d2?auto=format&fit=crop&w=1200&q=80'
    ],
    engineSound: '/sounds/engine-start.mp3'
  },
  {
    id: '4',
    slug: 'bentley-flying-spur-speed',
    name: 'Bentley Flying Spur Speed',
    brand: 'Bentley',
    price: 320000,
    currency: 'EUR',
    year: 2023,
    power: '626 hp',
    zeroToHundred: '3.8 s',
    topSpeed: '333 km/h',
    fuel: 'Petrol',
    transmission: 'Automatic',
    description:
      'The Flying Spur Speed pairs handcrafted British luxury with a W12 powerhouse, featuring rotating display and diamond-knurling details.',
    heroImage: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523983302122-73e702275082?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '5',
    slug: 'porsche-911-turbo-s',
    name: 'Porsche 911 Turbo S',
    brand: 'Porsche',
    price: 245000,
    currency: 'EUR',
    year: 2023,
    power: '650 hp',
    zeroToHundred: '2.6 s',
    topSpeed: '330 km/h',
    fuel: 'Petrol',
    transmission: 'Dual-Clutch',
    description:
      'An everyday supercar delivering exceptional performance, adaptive aerodynamics and a refined GT interior.',
    heroImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1503731989599-9abffd7c7d86?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1570294646131-5be3d843b852?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '6',
    slug: 'aston-martin-dbs-superleggera',
    name: 'Aston Martin DBS Superleggera',
    brand: 'Aston Martin',
    price: 310000,
    currency: 'EUR',
    year: 2022,
    power: '715 hp',
    zeroToHundred: '3.4 s',
    topSpeed: '340 km/h',
    fuel: 'Petrol',
    transmission: 'Automatic',
    description:
      'A grand-touring flagship blending sculpted carbon fibre bodywork with thunderous V12 performance.',
    heroImage: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c1?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1523983302122-73e702275082?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '7',
    slug: 'mclaren-765lt-spider',
    name: 'McLaren 765LT Spider',
    brand: 'McLaren',
    price: 420000,
    currency: 'EUR',
    year: 2023,
    power: '765 ps',
    zeroToHundred: '2.8 s',
    topSpeed: '330 km/h',
    fuel: 'Petrol',
    transmission: 'Dual-Clutch',
    description:
      'Ultra-lightweight longtail Spider with Senna-derived aerodynamics and visceral twin-turbo soundtrack.',
    heroImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523983302122-73e702275082?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1617813487456-80f0134d63d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '8',
    slug: 'mercedes-maybach-s680',
    name: 'Mercedes-Maybach S 680 4MATIC',
    brand: 'Mercedes-Maybach',
    price: 290000,
    currency: 'EUR',
    year: 2023,
    power: '612 hp',
    zeroToHundred: '4.5 s',
    topSpeed: '250 km/h',
    fuel: 'Petrol',
    transmission: 'Automatic',
    description:
      'Ultimate chauffeured serenity with executive rear lounge seats, Burmester 4D surround sound and ambient light signatures.',
    heroImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1523983302122-73e702275082?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1523981784081-91fd0a17b658?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1587954285702-5ec2440ed43d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '9',
    slug: 'ferrari-roma',
    name: 'Ferrari Roma',
    brand: 'Ferrari',
    price: 235000,
    currency: 'EUR',
    year: 2022,
    power: '620 cv',
    zeroToHundred: '3.4 s',
    topSpeed: '320 km/h',
    fuel: 'Petrol',
    transmission: 'Dual-Clutch',
    description:
      'La Nuova Dolce Vita grand tourer balancing sculpted elegance with a turbocharged V8 for unforgettable escapes.',
    heroImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511394330521-2077d72694de?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1617813487456-80f0134d63d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '10',
    slug: 'lamborghini-urus-performante',
    name: 'Lamborghini Urus Performante',
    brand: 'Lamborghini',
    price: 310000,
    currency: 'EUR',
    year: 2023,
    power: '666 cv',
    zeroToHundred: '3.3 s',
    topSpeed: '306 km/h',
    fuel: 'Petrol',
    transmission: 'Automatic',
    description:
      'The Performante elevates the Super SUV with rally driving modes, Akrapovič exhaust and extensive lightweight carbon fibre.',
    heroImage: 'https://images.unsplash.com/photo-1542280756-74b2f55e73d6?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1587954285702-5ec2440ed43d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617813487456-80f0134d63d2?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '11',
    slug: 'rolls-royce-cullinan-black-badge',
    name: 'Rolls-Royce Cullinan Black Badge',
    brand: 'Rolls-Royce',
    price: 460000,
    currency: 'EUR',
    year: 2023,
    power: '600 hp',
    zeroToHundred: '4.9 s',
    topSpeed: '250 km/h',
    fuel: 'Petrol',
    transmission: 'Automatic',
    description:
      'Commanding presence for every terrain, featuring Viewing Suite, Shooting Star Headliner and bespoke dual-tone cabin.',
    heroImage: 'https://images.unsplash.com/photo-1606664515524-ed2f548a5f95?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523981784081-91fd0a17b658?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587954285702-5ec2440ed43d?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '12',
    slug: 'ferrari-daytona-sp3',
    name: 'Ferrari Daytona SP3',
    brand: 'Ferrari',
    price: 2200000,
    currency: 'EUR',
    year: 2024,
    power: '840 cv',
    zeroToHundred: '2.9 s',
    topSpeed: '340 km/h',
    fuel: 'Petrol',
    transmission: 'Dual-Clutch',
    description:
      'Icona series limited edition inspired by the 1960s prototype era, featuring sculpted aerodynamics and a naturally aspirated V12.',
    heroImage: 'https://images.unsplash.com/photo-1573067556344-d83ab1d4d3cd?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511394330521-2077d72694de?auto=format&fit=crop&w=1400&q=80'
    ],
    interior: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617813487456-80f0134d63d2?auto=format&fit=crop&w=1200&q=80'
    ],
    engineSound: '/sounds/rev.mp3'
  }
];

export const brands = Array.from(new Set(cars.map((car) => car.brand)));
export const fuels = Array.from(new Set(cars.map((car) => car.fuel)));
export const transmissions = Array.from(new Set(cars.map((car) => car.transmission)));
