// CHRONOVA - Swiss Mechanical Watches Haute Horlogerie Database

export const INITIAL_WATCHES = [
  {
    id: "chr-6002g",
    name: "Celestial Sky Grand Tourbillon",
    ref: "Ref. 6002G-010",
    collection: "Grand Complications",
    tagline: "The pinnacle of dual-faced astronomical horology and cathedral minute repeater.",
    price: 345000,
    priceFormatted: "345,000 CHF",
    images: [
      "/images/image-1.png",
      "/images/image-14.png",
      "/images/image-18.png",
      "/images/image-22.png"
    ],
    video: "/videos/204582-925146042_medium.mp4",
    featured: true,
    isNew: true,
    bestseller: false,
    rating: 5.0,
    reviewsCount: 14,
    availability: "Made to Order (Geneva Atelier Allocation)",
    leadTime: "6 to 8 weeks hand-crafting",
    certificateId: "CH-GE-6002G-884920",
    
    // Quick specs
    movementType: "Manual Wind Mechanical",
    calibre: "Calibre CHR R TO 27 PS QR SID LU CL",
    caseMaterial: "18K White Gold Hand-Engraved",
    dialColor: "Grand Feu Blue Enamel & Champlevé",
    strapMaterial: "Hand-stitched shiny black Alligator Mississippiensis",
    caseDiameter: "44.0 mm",
    caseThickness: "12.6 mm",
    waterResistance: "30 m (Humidity Resistant)",
    powerReserve: "48 Hours",
    jewels: 55,
    components: 705,
    frequency: "21,600 vph (3 Hz)",
    hallmark: "Poinçon de Genève (Geneva Seal)",

    // Complications
    complications: [
      "Minute Repeater with Cathedral Gongs",
      "Tourbillon Escapement",
      "Perpetual Calendar with Retrograde Date",
      "Moon Age & Phases",
      "Sidereal Time & Celestial Sky Chart",
      "Orbit of the Moon & Meridian Passage of Sirius"
    ],

    description: `A masterwork of astronomical mechanics and rare handcrafts. The Celestial Sky Grand Tourbillon features a dual-dial structure: the front displays the perpetual calendar with retrograde date hand and champlevé enamel relief, while the reverse reveals the celestial chart of the northern hemisphere sky with sidereal time. Accompanied by two cathedral-length gongs chiming the hours, quarter-hours, and exact minutes.`,

    specs: {
      movement: {
        calibre: "CHR-27-SID",
        type: "Mechanical manual winding",
        diameter: "38.0 mm",
        thickness: "8.6 mm",
        jewels: "55 jewels",
        parts: "705 meticulously chamfered components",
        powerReserve: "Min. 48 hours",
        balance: "Gyromax® balance wheel with Breguet balance spring",
        finishing: "Circular Côtes de Genève, mirror-polished tourbillon cage, hand-beveled bridges"
      },
      case: {
        material: "18K White Gold (750/1000)",
        finishing: "Entirely hand-carved with volutes and arabesques (over 100 hours of master engraving)",
        glass: "Anti-reflective sapphire crystal front and reverse",
        dimensions: "Diameter: 44.0 mm | Height: 12.6 mm",
        crown: "Set with cabochon sapphire and Calatrava cross"
      },
      dial: {
        front: "Grand Feu blue enamel, 18K gold Roman numerals, gold leaf hands",
        back: "Celestial disc in sapphire crystal with northern sky chart, Milky Way, and Sirius progression"
      },
      strap: {
        material: "Square scale alligator with square scales, hand-stitched",
        clasp: "18K White Gold fold-over clasp, master hand-engraved"
      }
    }
  },

  {
    id: "chr-5270p",
    name: "Perpetual Calendar Flyback Chronograph",
    ref: "Ref. 5270P-001",
    collection: "Grand Complications",
    tagline: "The quintessential balance of high-complication stopwatch precision and royal perpetual memory.",
    price: 218000,
    priceFormatted: "218,000 CHF",
    images: [
      "/images/image-15.png",
      "/images/image-19.png",
      "/images/image-24.png",
      "/images/image-29.png"
    ],
    video: "/videos/34855-403777679_medium.mp4",
    featured: true,
    isNew: false,
    bestseller: true,
    rating: 4.9,
    reviewsCount: 29,
    availability: "In Stock (Geneva Salon)",
    leadTime: "Express Armored Courier (3-5 Days)",
    certificateId: "CH-GE-5270P-391048",

    movementType: "Manual Wind Mechanical",
    calibre: "Calibre CHR 29-535 PS Q",
    caseMaterial: "Platinum 950 (Flawless Diamond set at 6 o'clock)",
    dialColor: "Salmon Lacquered Opaline",
    strapMaterial: "Matte Chocolate Alligator Leather",
    caseDiameter: "41.0 mm",
    caseThickness: "12.4 mm",
    waterResistance: "30 m",
    powerReserve: "65 Hours",
    jewels: 33,
    components: 456,
    frequency: "28,800 vph (4 Hz)",
    hallmark: "Chronova Hallmark of Precision",

    complications: [
      "Perpetual Calendar",
      "Column-Wheel Flyback Chronograph",
      "Instantaneous 30-Minute Counter",
      "Day/Night Indicator",
      "Leap Year Cycle Display",
      "Moon Phases Accurate to 122 Years"
    ],

    description: `Heir to a grand tradition of perpetual calendar chronographs created since 1941. The Ref. 5270P combines platinum 950 with an iconic salmon opaline dial and blackened gold feuille hands. Powered by the completely in-house CHR 29-535 PS Q calibre featuring 6 patented chronograph innovations.`,

    specs: {
      movement: {
        calibre: "CHR 29-535 PS Q",
        type: "Mechanical manual winding",
        diameter: "32.0 mm",
        thickness: "7.0 mm",
        jewels: "33 jewels",
        parts: "456 hand-finished parts",
        powerReserve: "65 hours (with chronograph disengaged)",
        balance: "Gyromax® with Spiromax® balance spring in Silinvar®",
        finishing: "Anglage executed by master artisans, Geneva striping, polished screw heads"
      },
      case: {
        material: "Solid Platinum 950",
        finishing: "High mirror polish with discreet Top Wesselton brilliant diamond set into the case flank between lower lugs",
        glass: "Interchangeable full back and sapphire crystal caseback",
        dimensions: "Diameter: 41.0 mm | Height: 12.4 mm",
        crown: "Fluted platinum with embossed insignia"
      },
      dial: {
        front: "Golden opaline salmon, blackened gold applied hour markers, tachymeter scale, dual aperture day/month"
      },
      strap: {
        material: "Hand-stitched matte chocolate brown alligator",
        clasp: "Platinum 950 fold-over deployant clasp"
      }
    }
  },

  {
    id: "chr-5303r",
    name: "Minute Repeater Tourbillon Skeleton",
    ref: "Ref. 5303R-001",
    collection: "Skeleton Heritage",
    tagline: "An open architecture symphony displaying the hammers, gongs, and tourbillon cage.",
    price: 385000,
    priceFormatted: "385,000 CHF",
    images: [
      "/images/image-18.png",
      "/images/image-1.png",
      "/images/image-16.png",
      "/images/image-28.png"
    ],
    video: "/videos/10853-226632937_medium.mp4",
    featured: true,
    isNew: true,
    bestseller: false,
    rating: 5.0,
    reviewsCount: 8,
    availability: "Private Client Allocation Only",
    leadTime: "Private Viewing in Geneva / Zurich",
    certificateId: "CH-GE-5303R-772911",

    movementType: "Manual Wind Skeleton",
    calibre: "Calibre CHR R TO 27 PS Squelette",
    caseMaterial: "18K Rose Gold with White Gold Intarsia Inlays",
    dialColor: "Sapphire Crystal Skeletonized with Rose Gilded Geometry",
    strapMaterial: "Shiny Black Alligator with Fold-over Clasp",
    caseDiameter: "42.0 mm",
    caseThickness: "12.1 mm",
    waterResistance: "Humidity & Dust Protected",
    powerReserve: "48 Hours",
    jewels: 29,
    components: 356,
    frequency: "21,600 vph (3 Hz)",
    hallmark: "Poinçon de Genève (Geneva Seal)",

    complications: [
      "Minute Repeater on 2 Classic Gongs",
      "Tourbillon Visible from the Dial Side",
      "Subdial Small Seconds at 6 o'clock",
      "Openworked Striking Mechanism"
    ],

    description: `Chronova presents its first grand complication skeleton watch featuring the striking mechanism visible directly on the dial side without removing the watch from the wrist. The chiming hammers and classic gongs can be observed in real time as they resonate pure horological chords.`,

    specs: {
      movement: {
        calibre: "CHR R TO 27 PS Squelette",
        type: "Mechanical manual winding",
        diameter: "28.0 mm",
        thickness: "6.9 mm",
        jewels: "29 jewels",
        parts: "356 hand-skeletonized and engraved components",
        powerReserve: "48 hours",
        balance: "Gyromax® with 0.3-gram titanium tourbillon cage",
        finishing: "Hand-engraved foliage motifs, hand-beveled anglage, circular graining"
      },
      case: {
        material: "18K Rose Gold (4N) with 18K White Gold side inserts pierced with leaf arabesques",
        finishing: "Satin-brushed flanks and mirror-polished bezel",
        glass: "Curved sapphire crystal dial and display back",
        dimensions: "Diameter: 42.0 mm | Height: 12.1 mm",
        crown: "Rose gold with engraved repeater slide piece"
      },
      dial: {
        front: "Transparent sapphire crystal, black lacquered ring with powdered rose gold markers",
        hands: "Skeletonized leaf-shaped hands in blackened 18K gold"
      },
      strap: {
        material: "Black shiny alligator leather, hand-stitched",
        clasp: "18K Rose Gold deployant clasp"
      }
    }
  },

  {
    id: "chr-5990r",
    name: "Aquanautic Travel Time Flyback",
    ref: "Ref. 5990/1R-001",
    collection: "Aquanautic Sport",
    tagline: "The sovereign luxury sports timepiece with dual time zones and integrated rose gold bracelet.",
    price: 115000,
    priceFormatted: "115,000 CHF",
    images: [
      "/images/image-14.png",
      "/images/image-20.png",
      "/images/image-25.png",
      "/images/image-10.png"
    ],
    video: "/videos/55760-503981016_medium.mp4",
    featured: true,
    isNew: false,
    bestseller: true,
    rating: 4.9,
    reviewsCount: 42,
    availability: "In Stock (Select Boutiques)",
    leadTime: "Immediate Dispatch",
    certificateId: "CH-GE-5990R-109283",

    movementType: "Self-Winding Automatic",
    calibre: "Calibre CHR CH 28-520 C FUS",
    caseMaterial: "18K Rose Gold (Solid Link Bracelet)",
    dialColor: "Sunburst Blue with Horizontal Embossing",
    strapMaterial: "18K Rose Gold Integrated Bracelet with Patented Micro-Adjustment",
    caseDiameter: "40.5 mm",
    caseThickness: "12.5 mm",
    waterResistance: "120 m (12 ATM Screw-down Crown)",
    powerReserve: "55 Hours",
    jewels: 34,
    components: 370,
    frequency: "28,800 vph (4 Hz)",
    hallmark: "Chronova Precision Seal",

    complications: [
      "Flyback Chronograph",
      "Dual Time Zone (Local & Home Time)",
      "Day/Night Indication for Both Zones",
      "Date Synchronized with Local Time",
      "Central Chronograph Sweep Seconds"
    ],

    description: `Combining three highly sought-after complications in a solid 18K rose gold casing: a self-winding flyback chronograph, an intuitive dual time-zone mechanism, and a local-date indication. The sunburst blue dial radiates with horizontal embossed contours and luminous gold indices.`,

    specs: {
      movement: {
        calibre: "CHR CH 28-520 C FUS",
        type: "Mechanical self-winding with 21K gold central rotor",
        diameter: "31.0 mm",
        thickness: "6.95 mm",
        jewels: "34 jewels",
        parts: "370 parts",
        powerReserve: "Up to 55 hours",
        balance: "Gyromax® balance",
        finishing: "Circular Côtes de Genève on bridges, 21K gold oscillating weight with Calatrava cross"
      },
      case: {
        material: "18K Rose Gold",
        finishing: "Vertical satin-finished octagonal bezel with chamfered polished bevels",
        glass: "Sapphire crystal caseback",
        dimensions: "Diameter (10 to 4 o'clock): 40.5 mm | Height: 12.5 mm",
        crown: "Screw-down crown with Chronova logo"
      },
      dial: {
        front: "Sunburst blue, horizontal embossed pattern, gold applied numerals with luminescent coating",
        hands: "Luminescent rose gold local hour hand and skeletonized home hour hand"
      },
      strap: {
        material: "Solid 18K Rose Gold bracelet",
        clasp: "Patented fold-over clasp with quadruple catch system"
      }
    }
  },

  {
    id: "chr-5231j",
    name: "World Time Cloisonné Enamel",
    ref: "Ref. 5231J-001",
    collection: "Complications",
    tagline: "The world at your wrist, rendered in rare miniature grand feu cloisonné enamel.",
    price: 94000,
    priceFormatted: "94,000 CHF",
    images: [
      "/images/image-12.png",
      "/images/image-11.png",
      "/images/image-26.png",
      "/images/image-4.png"
    ],
    video: "/videos/204582-925146042_medium.mp4",
    featured: false,
    isNew: false,
    bestseller: true,
    rating: 4.8,
    reviewsCount: 19,
    availability: "In Stock (Geneva Atelier)",
    leadTime: "3 Business Days",
    certificateId: "CH-GE-5231J-455201",

    movementType: "Ultra-Thin Self-Winding",
    calibre: "Calibre CHR 240 HU Micro-Rotor",
    caseMaterial: "18K Yellow Gold (Winglet Lugs)",
    dialColor: "Cloisonné Enamel Planisphere (Europe, Africa, Americas)",
    strapMaterial: "Shiny Chocolate Brown Alligator",
    caseDiameter: "38.5 mm",
    caseThickness: "10.2 mm",
    waterResistance: "30 m",
    powerReserve: "48 Hours",
    jewels: 33,
    components: 239,
    frequency: "21,600 vph (3 Hz)",
    hallmark: "Chronova Hallmark",

    complications: [
      "24-Time Zone World Time Display",
      "24-Hour Day/Night Indicator Ring",
      "Quick-Step Pusher at 10 o'clock for Instant City Correction",
      "Miniature Cloisonné Master Enameling"
    ],

    description: `Chronova pays tribute to the golden age of intercontinental travel. The dial center features an extraordinary map of Europe, Africa, and the Americas painstakingly created with fine 24K gold wire (0.05 mm thick) filled with vibrant Grand Feu enamels fired at over 850°C.`,

    specs: {
      movement: {
        calibre: "CHR 240 HU",
        type: "Ultra-thin mechanical self-winding with 22K gold off-center micro-rotor",
        diameter: "27.5 mm",
        thickness: "3.88 mm",
        jewels: "33 jewels",
        parts: "239 parts",
        powerReserve: "48 hours",
        balance: "Gyromax® balance with Spiromax® spring",
        finishing: "Geneva striping, perlage on baseplate, gold micro-rotor"
      },
      case: {
        material: "18K Yellow Gold",
        finishing: "Polished bezel and distinctive winglet lugs inspired by 1950s historical references",
        glass: "Sapphire crystal display back",
        dimensions: "Diameter: 38.5 mm | Height: 10.2 mm",
        crown: "Yellow gold with single time-zone pusher"
      },
      dial: {
        front: "Grand Feu cloisonné enamel map, 24-hour ring with day/night zones, 24 reference world cities ring"
      },
      strap: {
        material: "Hand-stitched shiny chocolate brown alligator",
        clasp: "18K Yellow Gold fold-over clasp"
      }
    }
  },

  {
    id: "chr-6119g",
    name: "Calatrava Clous de Paris Guilloché",
    ref: "Ref. 6119G-001",
    collection: "Calatrava & Dress",
    tagline: "The archetypal dress watch with guilloché hobnail bezel and 65-hour power reserve.",
    price: 32000,
    priceFormatted: "32,000 CHF",
    images: [
      "/images/image-16.png",
      "/images/image-17.png",
      "/images/image-21.png",
      "/images/image-5.png"
    ],
    video: "/videos/10853-226632937_medium.mp4",
    featured: false,
    isNew: true,
    bestseller: true,
    rating: 4.9,
    reviewsCount: 36,
    availability: "In Stock",
    leadTime: "24-48 Hours Express",
    certificateId: "CH-GE-6119G-881290",

    movementType: "Manual Wind Mechanical",
    calibre: "Calibre CHR 30-255 PS Dual-Barrel",
    caseMaterial: "18K White Gold",
    dialColor: "Charcoal Grey Vertical Satin-Finished",
    strapMaterial: "Shiny Black Alligator with Prong Buckle",
    caseDiameter: "39.0 mm",
    caseThickness: "8.08 mm",
    waterResistance: "30 m",
    powerReserve: "65 Hours",
    jewels: 27,
    components: 164,
    frequency: "28,800 vph (4 Hz)",
    hallmark: "Chronova Seal",

    complications: [
      "Small Seconds at 6 o'clock",
      "Dual Mainspring Barrels in Parallel",
      "Stop-Seconds Hacking Mechanism"
    ],

    description: `A contemporary rebirth of the iconic Calatrava. Its bezel is adorned with a double row of Guilloché Clous de Paris (hobnail pattern) that catches light from every angle. The slim 8.08 mm profile slips effortlessly under a bespoke shirt cuff.`,

    specs: {
      movement: {
        calibre: "CHR 30-255 PS",
        type: "Manual winding mechanical movement",
        diameter: "31.0 mm",
        thickness: "2.55 mm (Ultra-thin)",
        jewels: "27 jewels",
        parts: "164 components",
        powerReserve: "65 hours from dual synchronized barrels",
        balance: "Gyromax® balance wheel",
        finishing: "Classic Côtes de Genève, mirror-beveled bridge contours"
      },
      case: {
        material: "18K White Gold",
        finishing: "Double-row Clous de Paris hobnail bezel, satin-brushed flanks",
        glass: "Sapphire crystal caseback",
        dimensions: "Diameter: 39.0 mm | Height: 8.08 mm",
        crown: "White gold with embossed brand emblem"
      },
      dial: {
        front: "Charcoal grey vertical satin-finished, 18K white gold applied faceted 'obus' hour markers",
        hands: "Faceted Dauphine hands in 18K white gold"
      },
      strap: {
        material: "Shiny black alligator with square scales",
        clasp: "18K White Gold prong buckle"
      }
    }
  },

  {
    id: "chr-5396r",
    name: "Annual Calendar Moon Phases",
    ref: "Ref. 5396R-015",
    collection: "Complications",
    tagline: "Invented by Chronova in 1996 — requires only one manual date correction per year.",
    price: 58000,
    priceFormatted: "58,000 CHF",
    images: [
      "/images/image-22.png",
      "/images/image-15.png",
      "/images/image-27.png",
      "/images/image-13.png"
    ],
    video: "/videos/34855-403777679_medium.mp4",
    featured: false,
    isNew: false,
    bestseller: true,
    rating: 4.9,
    reviewsCount: 51,
    availability: "In Stock",
    leadTime: "Immediate Dispatch",
    certificateId: "CH-GE-5396R-612004",

    movementType: "Self-Winding Automatic",
    calibre: "Calibre CHR 324 S QA LU 24H/303",
    caseMaterial: "18K Rose Gold",
    dialColor: "Sunburst Blue with Baguette Diamond Hour Markers",
    strapMaterial: "Navy Blue Shiny Alligator Leather",
    caseDiameter: "38.5 mm",
    caseThickness: "11.2 mm",
    waterResistance: "30 m",
    powerReserve: "45 Hours",
    jewels: 34,
    components: 347,
    frequency: "28,800 vph (4 Hz)",
    hallmark: "Geneva Seal",

    complications: [
      "Annual Calendar (Day, Date, Month in apertures)",
      "Moon Phase Display (Precision gear train)",
      "24-Hour Day/Night Indicator Subdial",
      "Sweep Center Seconds"
    ],

    description: `The patented Annual Calendar mechanism automatically accounts for months with 30 and 31 days, requiring adjustment only on March 1st. Set in warm 18K rose gold with 12 Top Wesselton baguette diamond hour markers on a nocturnal sunburst blue dial.`,

    specs: {
      movement: {
        calibre: "CHR 324 S QA LU",
        type: "Mechanical self-winding with 21K gold central rotor",
        diameter: "32.6 mm",
        thickness: "5.78 mm",
        jewels: "34 jewels",
        parts: "347 parts",
        powerReserve: "45 hours",
        balance: "Gyromax® with Spiromax® balance spring",
        finishing: "Circular graining, chamfered bridges, gold rotor engraved with Maison crest"
      },
      case: {
        material: "18K Rose Gold (4N)",
        finishing: "High polish mirror finish with rounded bezel",
        glass: "Sapphire crystal display back",
        dimensions: "Diameter: 38.5 mm | Height: 11.2 mm",
        crown: "Rose gold fluted crown"
      },
      dial: {
        front: "Sunburst blue dial, 12 baguette diamond hour markers (~0.26 ct), dual day/month apertures at 12 o'clock"
      },
      strap: {
        material: "Navy blue shiny alligator with square scales",
        clasp: "18K Rose Gold fold-over clasp"
      }
    }
  },

  {
    id: "chr-5180r",
    name: "Skeleton Calibre Squelette Hand-Engraved",
    ref: "Ref. 5180/1R-001",
    collection: "Skeleton Heritage",
    tagline: "A master engraver spends 130 hours carving filigree openwork into every gear and bridge.",
    price: 110000,
    priceFormatted: "110,000 CHF",
    images: [
      "/images/image-28.png",
      "/images/image-18.png",
      "/images/image-30.png",
      "/images/image-23.png"
    ],
    video: "/videos/10853-226632937_medium.mp4",
    featured: true,
    isNew: false,
    bestseller: false,
    rating: 5.0,
    reviewsCount: 11,
    availability: "Limited Edition (Geneva Atelier)",
    leadTime: "4 Weeks Allocation",
    certificateId: "CH-GE-5180R-901824",

    movementType: "Ultra-Thin Self-Winding Skeleton",
    calibre: "Calibre CHR 240 SQU Squelette",
    caseMaterial: "18K Rose Gold",
    dialColor: "Openworked Filigree with Rose Gold Hour Ring",
    strapMaterial: "18K Rose Gold Hand-Polished Mesh Bracelet",
    caseDiameter: "39.0 mm",
    caseThickness: "6.7 mm (Ultra-Thin)",
    waterResistance: "30 m",
    powerReserve: "48 Hours",
    jewels: 27,
    components: 159,
    frequency: "21,600 vph (3 Hz)",
    hallmark: "Poinçon de Genève",

    complications: [
      "Ultra-Thin Skeletonized Openwork Architecture",
      "Off-Center 22K Gold Micro-Rotor Engraved with Arabesques",
      "Hand-Beveled Anglage on every wheel tooth"
    ],

    description: `A triumph of artisanal horology. The Calibre 240 is openworked to the absolute limits of structural integrity without compromising chronometric rigor. Every surface, bridge, and wheel is hand-engraved with floral arabesques by Master Enamellers.`,

    specs: {
      movement: {
        calibre: "CHR 240 SQU",
        type: "Ultra-thin mechanical self-winding skeleton",
        diameter: "27.5 mm",
        thickness: "2.53 mm",
        jewels: "27 jewels",
        parts: "159 completely hand-pierced components",
        powerReserve: "48 hours",
        balance: "Gyromax® balance wheel",
        finishing: "Entirely pierced and hand-engraved with foliage scrolls, 22K gold mini-rotor"
      },
      case: {
        material: "18K Rose Gold",
        finishing: "Polished rounded bezel, skeletonized sapphire crystal front and back",
        glass: "Anti-reflective double sapphire crystal",
        dimensions: "Diameter: 39.0 mm | Height: 6.7 mm",
        crown: "Rose gold set with signature emblem"
      },
      dial: {
        front: "Skeletonized dial ring in 18K rose gold with 12 applied baton hour markers",
        hands: "Leaf-shaped hands in blackened 18K rose gold"
      },
      strap: {
        material: "18K Rose Gold supple link bracelet",
        clasp: "18K Rose Gold fold-over clasp"
      }
    }
  }
];

export const COLLECTIONS_LIST = [
  {
    id: "all",
    name: "All Masterpieces",
    count: 8,
    desc: "The complete haute horlogerie repertoire of Chronova timepieces."
  },
  {
    id: "Grand Complications",
    name: "Grand Complications",
    count: 3,
    desc: "The supreme expression of Swiss watchmaking: Minute Repeaters, Tourbillons, and Perpetual Calendars."
  },
  {
    id: "Complications",
    name: "Complications",
    count: 2,
    desc: "Useful horological artistry: World Time, Annual Calendars, and Flyback Chronographs."
  },
  {
    id: "Calatrava & Dress",
    name: "Calatrava & Pure Elegance",
    count: 1,
    desc: "Pure round watch design defined by timeless simplicity and Clous de Paris hobnail guilloché."
  },
  {
    id: "Aquanautic Sport",
    name: "Aquanautic Sport",
    count: 1,
    desc: "Dynamic luxury sports timepieces engineered with precious gold and water resistance up to 120m."
  },
  {
    id: "Skeleton Heritage",
    name: "Skeleton & Metiers d'Art",
    count: 2,
    desc: "Filigree openwork and hand-carved arabesques showcasing the mechanical soul within."
  }
];

export const BOUTIQUES = [
  {
    id: "geneva",
    city: "Geneva (Maison Salon)",
    address: "41, Rue du Rhône, 1204 Genève, Switzerland",
    phone: "+41 22 710 88 00",
    email: "geneva.salon@chronova-watches.ch",
    hours: "Monday – Saturday: 10:00 – 18:30 CET",
    privateSalon: "Grand Salon VIP 'Le Belvédère'",
    image: "/images/image-1.png",
    coordinates: "46.2044° N, 6.1432° E",
    curator: "Jean-Pierre de Valmont, Master Horologist"
  },
  {
    id: "zurich",
    city: "Zurich",
    address: "Bahnhofstrasse 32, 8001 Zürich, Switzerland",
    phone: "+41 44 211 44 90",
    email: "zurich.boutique@chronova-watches.ch",
    hours: "Monday – Friday: 09:30 – 19:00, Saturday: 09:30 – 18:00",
    privateSalon: "Salon Helvetia",
    image: "/images/image-15.png",
    coordinates: "47.3700° N, 8.5390° E",
    curator: "Katharina S. Hirsbrunner"
  },
  {
    id: "london",
    city: "London Mayfair",
    address: "16 New Bond Street, Mayfair, London W1S 3SU, UK",
    phone: "+44 20 7493 8866",
    email: "london.mayfair@chronova-watches.com",
    hours: "Monday – Saturday: 10:00 – 18:00 GMT",
    privateSalon: "The Duke’s Watch Library",
    image: "/images/image-14.png",
    coordinates: "51.5115° N, 0.1436° W",
    curator: "Lord Alistair Sterling"
  },
  {
    id: "new-york",
    city: "New York",
    address: "730 Fifth Avenue, Crown Building, New York, NY 10019, USA",
    phone: "+1 212 555 9080",
    email: "fifthave@chronova-watches.com",
    hours: "Monday – Saturday: 10:00 – 18:30 EST",
    privateSalon: "The Manhattan Vault Suite",
    image: "/images/image-18.png",
    coordinates: "40.7628° N, 73.9748° W",
    curator: "Alexander Vance, Senior Horological Advisor"
  },
  {
    id: "paris",
    city: "Paris Place Vendôme",
    address: "12, Place Vendôme, 75001 Paris, France",
    phone: "+33 1 42 61 70 00",
    email: "vendome@chronova-watches.fr",
    hours: "Monday – Saturday: 10:30 – 19:00 CET",
    privateSalon: "Salon Lumière & Haute Joaillerie",
    image: "/images/image-22.png",
    coordinates: "48.8675° N, 2.3294° E",
    curator: "Éléonore de Montmirail"
  },
  {
    id: "tokyo",
    city: "Tokyo Ginza",
    address: "6-10-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan",
    phone: "+81 3 3572 6600",
    email: "ginza@chronova-watches.jp",
    hours: "Everyday: 11:00 – 20:00 JST",
    privateSalon: "The Imperial Horology Chamber",
    image: "/images/image-28.png",
    coordinates: "35.6696° N, 139.7649° E",
    curator: "Kenjiro Takahashi"
  },
  {
    id: "dubai",
    city: "Dubai DIFC",
    address: "Gate Village Building 03, DIFC, Dubai, UAE",
    phone: "+971 4 362 7000",
    email: "dubai.difc@chronova-watches.ae",
    hours: "Sunday – Friday: 10:00 – 21:00 GST",
    privateSalon: "The Royal Majlis Lounge",
    image: "/images/image-12.png",
    coordinates: "25.2048° N, 55.2708° E",
    curator: "Tariq Al-Mansoor"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-2026-9481",
    customerName: "Lord Julian Blackwood",
    customerEmail: "j.blackwood@mayfair-estates.co.uk",
    timepieceId: "chr-6002g",
    watchName: "Celestial Sky Grand Tourbillon",
    ref: "Ref. 6002G-010",
    price: 345000,
    status: "Armored Courier In Transit",
    orderDate: "2026-09-28",
    deliveryEstimate: "2026-10-08",
    deliveryType: "White-Glove Armored Escort (Brinks Global)",
    serialNumber: "CHR-6002-884920",
    certificateId: "CH-GE-6002G-884920",
    engraving: "J.B. — AD ASTRA PER ARDUA",
    paymentMethod: "Swiss Bank Wire Escrow",
    destination: "Mayfair, London, UK"
  },
  {
    id: "ORD-2026-9420",
    customerName: "Madame Hélène Vance",
    customerEmail: "helene.vance@genevacapital.ch",
    timepieceId: "chr-5270p",
    watchName: "Perpetual Calendar Flyback Chronograph",
    ref: "Ref. 5270P-001",
    price: 218000,
    status: "Delivered & Certified",
    orderDate: "2026-09-15",
    deliveryEstimate: "2026-09-20",
    deliveryType: "Geneva Boutique Handover",
    serialNumber: "CHR-5270-391048",
    certificateId: "CH-GE-5270P-391048",
    engraving: "H.V. — MMXXVI",
    paymentMethod: "Centurion Vault Direct",
    destination: "Cologny, Geneva, Switzerland"
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-8831",
    name: "Baron Antoine de Chamonix",
    email: "a.chamonix@alps-private.com",
    phone: "+41 79 330 19 28",
    boutiqueId: "geneva",
    boutiqueName: "Geneva (Maison Salon)",
    date: "2026-10-12",
    timeSlot: "14:30 CET",
    timepieceInterest: "Celestial Sky Grand Tourbillon (Ref. 6002G-010)",
    guests: "2 Guests",
    preferences: ["Champagne Reception", "Master Watchmaker Consultation", "Private Viewing Salon"],
    status: "Confirmed",
    conciergeAssigned: "Jean-Pierre de Valmont"
  },
  {
    id: "APT-8832",
    name: "Victoria Sterling",
    email: "v.sterling@sterlinghorology.com",
    phone: "+44 7700 900123",
    boutiqueId: "london",
    boutiqueName: "London Mayfair",
    date: "2026-10-16",
    timeSlot: "16:00 GMT",
    timepieceInterest: "Aquanautic Travel Time Flyback (Ref. 5990/1R-001)",
    guests: "1 Guest",
    preferences: ["Private Salon", "Wrist Sizing & Customization"],
    status: "Pending Concierge Review",
    conciergeAssigned: "Lord Alistair Sterling"
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: "INQ-5510",
    name: "Dr. Maximilian Roth",
    email: "m.roth@zurich-biotech.ch",
    phone: "+41 44 882 11 00",
    subject: "Bespoke Caseback Engraving & Diamond Setting for Ref. 5303R",
    timepiece: "Minute Repeater Tourbillon Skeleton (Ref. 5303R-001)",
    message: "I am interested in acquiring the Ref. 5303R with a custom family coat of arms hand-engraved onto the winding micro-rotor and custom baguette markers. Kindly advise on atelier lead time.",
    date: "2026-10-04",
    status: "Under Review by Head Engraver",
    priority: "High (VIP Collector)"
  },
  {
    id: "INQ-5511",
    name: "Arthur Pendelton",
    email: "arthur@pendelton-holdings.sg",
    phone: "+65 6789 0123",
    subject: "Allocation Availability for Ref. 5990/1R in Singapore or Tokyo Salon",
    timepiece: "Aquanautic Travel Time (Ref. 5990/1R-001)",
    message: "Seeking allocation for immediate handover during my upcoming visit to Tokyo Ginza Salon next month. Can payment be settled through SG DBS Private Banking?",
    date: "2026-10-02",
    status: "Replied",
    priority: "Medium"
  }
];
