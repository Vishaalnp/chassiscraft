export interface FeaturePackageDetail {
  id: 'Economy' | 'Standard' | 'Premium';
  title: string;
  tagline: string;
  baseMultiplier: number;
  badge: string;
  features: string[];
}

export const FEATURE_PACKAGES: FeaturePackageDetail[] = [
  {
    id: 'Economy',
    title: 'Economy Transit',
    tagline: 'Cost-effective, durable body structure for basic commuting and local staff transport.',
    baseMultiplier: 1.0,
    badge: 'Value Choice',
    features: [
      'Standard tubular steel frame (IS 4923)',
      'Flat floor anti-skid rubber linoleum',
      'Non-reclining high-back standard seats',
      'Sliding clear glass windows with safety guard',
      'Standard LED ceiling strip lights',
      'Basic front & rear fiberglass bumpers',
      'Standard driver cabin partition',
      '2 Fire extinguishers & 4 Emergency hammers',
      'AIS-052 mandatory safety compliance'
    ]
  },
  {
    id: 'Standard',
    title: 'Standard Intercity',
    tagline: 'Balanced comfort, pushback seats, and enhanced aesthetic for route buses.',
    baseMultiplier: 1.25,
    badge: 'Most Popular',
    features: [
      'High-tensile tubular frame with anti-rust dip coat',
      '3mm heavy-duty anti-skid vinyl flooring with wood accent option',
      'Push-back reclining seats in PU leatherette',
      'Tinted toughened glass windows',
      'Individual AC louvers & reading lights per row',
      'USB-A charging ports at every seat row',
      'Central overhead luggage racks with LED accent strip',
      'Pneumatic automatic front entrance door',
      'GPS tracking & Reverse parking sensor package',
      '4 Fire extinguishers & 8 Emergency hammers'
    ]
  },
  {
    id: 'Premium',
    title: 'Luxury Aerocoach',
    tagline: 'Ultra-premium coach experience with executive seating, infotainment, and sleeper option.',
    baseMultiplier: 1.55,
    badge: 'Flagship Luxury',
    features: [
      'Aerodynamic FRP contoured body with super high-deck chassis stance',
      'Acoustic soundproof foam insulation & double-glazed thermopane glass',
      'Premium broad luxury push-back seats / sleeper berths with footrests',
      'RGB ambient ceiling mood lighting with starlight option',
      'Type-C fast charging + 220V laptop power sockets at all seats',
      'High-capacity 24kW sub-engine roof-mounted climate control AC',
      '32-inch Smart TV + PA system & Wi-Fi router setup',
      '4-Channel HD CCTV security system with cloud remote view',
      'Automatic fire detection & suppression system in engine bay',
      'Full AIS-052 & AIS-153 rollover safety certified structure'
    ]
  }
];
