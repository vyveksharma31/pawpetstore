// Realistic Seed Dataset for PawPetStore
// Features authentic brands, descriptions, high-resolution royalty-free Unsplash pet imagery, realistic prices, and tags.

const categories = [
  { id: 'cat-dog', name: 'Dogs', slug: 'dogs', petType: 'dog', description: 'Complete nutrition, fun toys, grooming, and health supplies for canines.' },
  { id: 'cat-cat', name: 'Cats', slug: 'cats', petType: 'cat', description: 'Gourmet meals, interactive scratching trees, litter, and fur care for felines.' },
  { id: 'cat-bird', name: 'Birds', slug: 'birds', petType: 'bird', description: 'Enriched seed blends, spacious flight cages, natural perches, and avian care.' },
  { id: 'cat-acc', name: 'Accessories', slug: 'accessories', petType: 'general', description: 'Universal travel crates, orthopedic bedding, stainless bowls, and hygiene tools.' },
];

const breeds = [
  // Dogs
  {
    id: 'breed-lab',
    name: 'Labrador Retriever',
    petType: 'dog',
    origin: 'Newfoundland, Canada',
    temperament: ['Outgoing', 'Even-tempered', 'Gentle', 'Agile'],
    size: 'Large (25-36 kg)',
    lifeSpan: '10-12 years',
    image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80',
    description: 'Friendly, enthusiastic, and highly trainable family companions. They thrive on physical exercise and balanced protein-rich diets.',
    careTips: 'Prone to weight gain; keep exercise frequent and monitor daily caloric intake.',
    recommendedCategories: ['Dry Food', 'Chew Toys', 'Joint Supplements']
  },
  {
    id: 'breed-golden',
    name: 'Golden Retriever',
    petType: 'dog',
    origin: 'Scotland',
    temperament: ['Intelligent', 'Friendly', 'Devoted', 'Playful'],
    size: 'Large (25-34 kg)',
    lifeSpan: '10-12 years',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned for their gentle nature, lush double coat, and affinity for retrieving. Exceptional family and therapy pets.',
    careTips: 'Brush double coat 2-3 times weekly to reduce shedding. Provide cognitive enrichment toys.',
    recommendedCategories: ['Grooming', 'Dry Food', 'Beds & Mats']
  },
  {
    id: 'breed-gsd',
    name: 'German Shepherd',
    petType: 'dog',
    origin: 'Germany',
    temperament: ['Loyal', 'Confident', 'Courageous', 'Alert'],
    size: 'Large (30-40 kg)',
    lifeSpan: '9-13 years',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80',
    description: 'Incredibly smart working dogs capable of complex obedience tasks and protective guardianship.',
    careTips: 'Requires daily mental agility challenges and high-protein nutrition to support muscular frame.',
    recommendedCategories: ['High Protein Food', 'Tactical Harness', 'Dental Chews']
  },
  {
    id: 'breed-beagle',
    name: 'Beagle',
    petType: 'dog',
    origin: 'England',
    temperament: ['Merry', 'Amiable', 'Curious', 'Determined'],
    size: 'Medium (9-11 kg)',
    lifeSpan: '12-15 years',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
    description: 'Compact scent hounds with expressive eyes and boundless curiosity. Loved for their gentle temperament around children.',
    careTips: 'Keep on leash during walks due to their strong tracking instinct. Regular ear hygiene is essential.',
    recommendedCategories: ['Leashes', 'Training Treats', 'Interactive Puzzles']
  },
  {
    id: 'breed-indie',
    name: 'Indian Pariah (Indie)',
    petType: 'dog',
    origin: 'India',
    temperament: ['Hardy', 'Intelligent', 'Devoted', 'Alert'],
    size: 'Medium (15-25 kg)',
    lifeSpan: '13-16 years',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80',
    description: 'Naturally evolved indigenous breed of the subcontinent. Extremely resilient, hypoallergenic coat, and naturally disease-resistant.',
    careTips: 'Very low grooming maintenance. Thrives on clean protein and consistent positive reinforcement.',
    recommendedCategories: ['Dry Food', 'Chew Bones', 'Collars']
  },
  {
    id: 'breed-shihtzu',
    name: 'Shih Tzu',
    petType: 'dog',
    origin: 'Tibet / China',
    temperament: ['Affectionate', 'Playful', 'Outgoing', 'Lively'],
    size: 'Small (4-7 kg)',
    lifeSpan: '10-16 years',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    description: 'Charming toy dog with a flowing silky coat and regal demeanor. Ideal for apartment living.',
    careTips: 'Daily facial wipe and coat combing to avoid tear stains and matting.',
    recommendedCategories: ['Small Breed Kibble', 'Tear Stain Remover', 'Soft Harness']
  },
  // Cats
  {
    id: 'breed-persian',
    name: 'Persian Cat',
    petType: 'cat',
    origin: 'Iran (Persia)',
    temperament: ['Quiet', 'Docile', 'Sweet-tempered', 'Calm'],
    size: 'Medium (3.5-5.5 kg)',
    lifeSpan: '12-17 years',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80',
    description: 'Celebrated for their luxurious pansy-like face and long plush coat. Perfect companion for peaceful indoor homes.',
    careTips: 'Daily combing required to manage hairballs. Feed hairball-control kibble.',
    recommendedCategories: ['Hairball Paste', 'Slicker Brush', 'Plush Bed']
  },
  {
    id: 'breed-siamese',
    name: 'Siamese',
    petType: 'cat',
    origin: 'Thailand',
    temperament: ['Vocal', 'Active', 'Affectionate', 'Social'],
    size: 'Medium (3.5-5 kg)',
    lifeSpan: '15-20 years',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    description: 'Striking blue almond eyes with contrast color points. Highly communicative and loves interacting with humans.',
    careTips: 'Provide cat trees and scratching posts to expend natural climbing energy.',
    recommendedCategories: ['Scratching Tree', 'Laser Toys', 'Wet Food Gravy']
  },
  {
    id: 'breed-indiecat',
    name: 'Indian Billi (Indie Cat)',
    petType: 'cat',
    origin: 'India',
    temperament: ['Agile', 'Independent', 'Loving', 'Clever'],
    size: 'Medium (3-5 kg)',
    lifeSpan: '14-18 years',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
    description: 'Naturally adapted domestic cat known for its sleek coat, keen hunting senses, and low veterinary demands.',
    careTips: 'Provide fresh drinking water fountain and daily interactive play.',
    recommendedCategories: ['Cat Litter', 'Fish Pate', 'Feather Wand']
  },
  {
    id: 'breed-mainecoon',
    name: 'Maine Coon',
    petType: 'cat',
    origin: 'United States (Maine)',
    temperament: ['Gentle Giant', 'Sociable', 'Intelligent', 'Playful'],
    size: 'Large (6-10 kg)',
    lifeSpan: '12-15 years',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
    description: 'The gentle giants of the feline world with thick water-repellent double coats, tufted ears, and majestic lion-like ruffs.',
    careTips: 'Needs sturdy, wide scratching posts and heavy-duty cat trees that support 8+ kg weights.',
    recommendedCategories: ['Large Cat Tree', 'High-Protein Kibble', 'Steel Grooming Comb']
  },
  {
    id: 'breed-bengal',
    name: 'Bengal Cat',
    petType: 'cat',
    origin: 'United States',
    temperament: ['Athletic', 'Curious', 'High Energy', 'Confident'],
    size: 'Medium-Large (4.5-7 kg)',
    lifeSpan: '12-16 years',
    image: 'https://images.unsplash.com/photo-1513360309081-38f076273999?auto=format&fit=crop&w=800&q=80',
    description: 'Striking wild rosette coat mimicking a miniature leopard. High intelligence and extraordinary athletic leaping prowess.',
    careTips: 'Requires significant mental stimulation, puzzle feeders, and high vertical climbing platforms.',
    recommendedCategories: ['Interactive Laser', 'Grain-Free Meat', 'Climbing Shelves']
  },
  // Birds
  {
    id: 'breed-budgie',
    name: 'Budgerigar (Budgie)',
    petType: 'bird',
    origin: 'Australia',
    temperament: ['Cheerful', 'Social', 'Curious', 'Playful'],
    size: 'Small (30-40 g)',
    lifeSpan: '7-12 years',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
    description: 'Bright, chirpy, and gentle parakeets that love mimicking simple sounds and social interaction.',
    careTips: 'Feed varied seed and pellet blend supplemented with leafy greens and cuttlefish bone.',
    recommendedCategories: ['Seed Blends', 'Swings', 'Mineral Block']
  },
  {
    id: 'breed-cockatiel',
    name: 'Cockatiel',
    petType: 'bird',
    origin: 'Australia',
    temperament: ['Gentle', 'Whistling', 'Cuddly', 'Expressive'],
    size: 'Medium (80-100 g)',
    lifeSpan: '14-20 years',
    image: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=800&q=80',
    description: 'Distinguished by their expressive yellow crest and orange cheek patches. Masters of whistling tunes.',
    careTips: 'Needs horizontal flight room inside cage. Avoid non-stick teflon fumes in household.',
    recommendedCategories: ['Flight Cage', 'Wooden Perches', 'Pellet Diet']
  },
  {
    id: 'breed-lovebird',
    name: 'Lovebird (Agapornis)',
    petType: 'bird',
    origin: 'Africa',
    temperament: ['Affectionate', 'Feisty', 'Monogamous', 'Lively'],
    size: 'Small (40-60 g)',
    lifeSpan: '10-15 years',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
    description: 'Deeply bonded pocket parrots with vibrant plumage and spirited, playful personalities.',
    careTips: 'Keep in bonded pairs or provide abundant daily attention and shreddable paper/wood toys.',
    recommendedCategories: ['Shredding Toys', 'Calcium Block', 'Cockatiel/Lovebird Seed']
  },
  {
    id: 'breed-africangrey',
    name: 'African Grey Parrot',
    petType: 'bird',
    origin: 'Equatorial Africa',
    temperament: ['Genius Intelligence', 'Empathetic', 'Vocal Mimic'],
    size: 'Large (400-500 g)',
    lifeSpan: '40-60 years',
    image: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned as the most cognitively gifted parrot in the world with astonishing vocabulary and associative speech.',
    careTips: 'Demands continuous mental challenges, puzzle foraging feeders, and daily out-of-cage interaction.',
    recommendedCategories: ['Large Parrot Cage', 'NutriBird Pellets', 'Foraging Puzzles']
  },
  {
    id: 'breed-finch',
    name: 'Zebra Finch',
    petType: 'bird',
    origin: 'Central Australia',
    temperament: ['Social Colony', 'Active', 'Gentle Beepers'],
    size: 'Tiny (12-18 g)',
    lifeSpan: '5-9 years',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
    description: 'Delightful tiny songbirds with distinctive zebra chest stripes and cheerful quiet beeping sounds.',
    careTips: 'Thrives in pairs or small flocks inside flight cages. Provide small-seed millet blends and fine grit.',
    recommendedCategories: ['Finch Seed Mix', 'Woven Nest Basket', 'Fine Mineral Grit']
  },
  {
    id: 'breed-canary',
    name: 'Atlantic Canary',
    petType: 'bird',
    origin: 'Macaronesia (Canary Islands)',
    temperament: ['Melodic Singer', 'Independent', 'Peaceful'],
    size: 'Small (20-28 g)',
    lifeSpan: '9-14 years',
    image: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=800&q=80',
    description: 'Famous worldwide for their astonishingly complex, operatic song repertoire and brilliant golden-yellow plumage.',
    careTips: 'Provide horizontal cage length for flight. Maintain consistent daylight and darkness cycles for molting health.',
    recommendedCategories: ['Canary Seed Blend', 'Singing Tonic', 'Natural Perches']
  }
];

const clinicServices = [
  {
    id: 'srv-checkup',
    title: 'General Wellness & Health Screening',
    slug: 'general-wellness-checkup',
    category: 'Consultation',
    shortDescription: 'Comprehensive nose-to-tail physical exam by senior veterinary specialists.',
    fullDescription: 'Includes ophthalmic inspection, dental and gum evaluation, heart and lung auscultation, abdominal palpation, temperature, pulse, and weight benchmarking. Ideal for biannual health maintenance.',
    durationMinutes: 30,
    price: 499,
    targetPets: ['dog', 'cat', 'bird'],
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  },
  {
    id: 'srv-vaccine',
    title: 'Comprehensive Puppy/Kitten Vaccination',
    slug: 'puppy-kitten-vaccination',
    category: 'Preventive Care',
    shortDescription: 'DHPPiL, Anti-Rabies, or Tricat core vaccinations with certified health passport.',
    fullDescription: 'Essential immunization protocol to protect young pets against fatal viral diseases like Parvovirus, Distemper, Hepatitis, Leptospirosis, and Rabies. Administered with pre-shot temperature screening.',
    durationMinutes: 25,
    price: 899,
    targetPets: ['dog', 'cat'],
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  },
  {
    id: 'srv-dental',
    title: 'Ultrasonic Dental Scaling & Polishing',
    slug: 'dental-scaling-polishing',
    category: 'Dental Hygiene',
    shortDescription: 'Safe tartar removal, gingival irrigation, and enamel polishing under sedation.',
    fullDescription: 'Treats bad breath, swollen gums, and periodontal decay. Thorough ultrasonic scaling removes hardened calculus beneath the gumline, safeguarding your pet from systemic heart and kidney complications.',
    durationMinutes: 45,
    price: 1499,
    targetPets: ['dog', 'cat'],
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  },
  {
    id: 'srv-derma',
    title: 'Dermatology & Skin Allergy Consultation',
    slug: 'dermatology-skin-allergy',
    category: 'Specialized Care',
    shortDescription: 'Expert diagnosis for itchy skin, fungal lesions, hot spots, and flea/tick infestations.',
    fullDescription: 'Includes skin scrape cytology, Wood’s lamp fungal test, bacterial smear inspection, and personalized medicated bath or hypoallergenic diet plan formulated by veterinary dermatologists.',
    durationMinutes: 40,
    price: 699,
    targetPets: ['dog', 'cat'],
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  },
  {
    id: 'srv-nutrition',
    title: 'Veterinary Diet & Weight Management Plan',
    slug: 'diet-nutrition-consultation',
    category: 'Nutrition',
    shortDescription: 'Tailored calorie, protein, and micronutrient charts for life-stage & medical conditions.',
    fullDescription: 'Formulated specifically for obese pets, diabetic animals, renal or cardiac patients, and energetic working breeds. Get customized homemade recipe balancing or therapeutic commercial feed advice.',
    durationMinutes: 30,
    price: 549,
    targetPets: ['dog', 'cat', 'bird'],
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  },
  {
    id: 'srv-emergency',
    title: 'Urgent Care & Triage Consultation',
    slug: 'urgent-care-triage',
    category: 'Emergency',
    shortDescription: 'Immediate same-day clinical assessment for sudden illness, vomiting, or acute trauma.',
    fullDescription: 'Priority clinical attention for acute conditions including gastrointestinal distress, foreign body ingestion suspicion, sudden lethargy, eye injuries, or heatstroke stabilization.',
    durationMinutes: 45,
    price: 1199,
    targetPets: ['dog', 'cat', 'bird'],
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    isAvailable: true
  }
];

const products = [
  // --- DOG PRODUCTS (FOOD, TREATS, TOYS, ACCESSORIES, HEALTH) ---
  {
    id: 'prod-d01',
    name: 'Royal Canin Maxi Puppy Dry Dog Food (15kg)',
    slug: 'royal-canin-maxi-puppy-15kg',
    brand: 'Royal Canin',
    petType: 'dog',
    category: 'Dog Food',
    subCategory: 'Dry Food',
    price: 8450,
    discountPercentage: 12,
    stock: 24,
    rating: 4.8,
    reviewCount: 312,
    isFeatured: true,
    breedSuitability: ['Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Rottweiler'],
    images: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Specially crafted for large breed puppies (adult weight 26 to 44 kg) up to 15 months old. Promotes digestive health, optimal bone growth, and reinforces immune defenses with patented antioxidant complex.',
    specifications: {
      'Weight': '15 kg',
      'Life Stage': 'Puppy (2 - 15 months)',
      'Flavor': 'Poultry & Rice',
      'Protein': '30.0%',
      'Fat Content': '16.0%'
    }
  },
  {
    id: 'prod-d02',
    name: 'Pedigree Adult Chicken & Vegetables Complete Dry Food (10kg)',
    slug: 'pedigree-adult-chicken-vegetables-10kg',
    brand: 'Pedigree',
    petType: 'dog',
    category: 'Dog Food',
    subCategory: 'Dry Food',
    price: 2199,
    discountPercentage: 15,
    stock: 45,
    rating: 4.5,
    reviewCount: 520,
    isFeatured: true,
    breedSuitability: ['All Breeds', 'Labrador Retriever', 'Indie', 'Beagle'],
    images: [
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Wholesome everyday nutrition formulated with real chicken, selected vegetables, zinc, and omega-6 fatty acids to guarantee a shiny coat and vigorous energy.',
    specifications: {
      'Weight': '10 kg',
      'Life Stage': 'Adult (1+ years)',
      'Flavor': 'Chicken & Veg'
    }
  },
  {
    id: 'prod-d03',
    name: 'Drools Focus Adult Super Premium Dog Food (12kg)',
    slug: 'drools-focus-adult-12kg',
    brand: 'Drools',
    petType: 'dog',
    category: 'Dog Food',
    subCategory: 'Dry Food',
    price: 4500,
    discountPercentage: 18,
    stock: 19,
    rating: 4.6,
    reviewCount: 184,
    isFeatured: false,
    breedSuitability: ['All Breeds', 'German Shepherd', 'Golden Retriever'],
    images: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Zero wheat, corn, or soya formulation. Features real deboned chicken as number one ingredient for lean muscle mass and optimum joint health.',
    specifications: {
      'Weight': '12 kg',
      'Grain Free': 'Yes (No Wheat/Corn)',
      'Protein': '32.0%'
    }
  },
  {
    id: 'prod-d04',
    name: 'Pedigree Real Meat Gravy Pouches Multipack (100g x 15)',
    slug: 'pedigree-real-meat-gravy-multipack',
    brand: 'Pedigree',
    petType: 'dog',
    category: 'Dog Food',
    subCategory: 'Wet Food',
    price: 750,
    discountPercentage: 10,
    stock: 60,
    rating: 4.7,
    reviewCount: 290,
    isFeatured: true,
    breedSuitability: ['All Breeds', 'Shih Tzu', 'Pug', 'Indie'],
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tender meaty chunks immersed in savory gravy. Hydrates and entices picky eaters while delivering complete vitamins and minerals.',
    specifications: {
      'Pack Size': '15 pouches x 100g',
      'Flavor': 'Chicken & Liver Chunks in Gravy'
    }
  },
  {
    id: 'prod-d05',
    name: 'JerHigh Real Chicken Bacon Dog Treats (100g x 3)',
    slug: 'jerhigh-real-chicken-bacon-treats',
    brand: 'JerHigh',
    petType: 'dog',
    category: 'Dog Treats',
    subCategory: 'Treats',
    price: 680,
    discountPercentage: 8,
    stock: 35,
    rating: 4.8,
    reviewCount: 140,
    isFeatured: false,
    breedSuitability: ['All Breeds'],
    images: [
      'https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Made from real human-grade chicken meat with an irresistible smoky aroma. Ideal for positive reinforcement training rewards.',
    specifications: {
      'Weight': '300 g total',
      'Texture': 'Chewy Strips'
    }
  },
  {
    id: 'prod-d06',
    name: 'KONG Classic Durable Natural Rubber Dog Chew Toy (Large)',
    slug: 'kong-classic-rubber-toy-large',
    brand: 'KONG',
    petType: 'dog',
    category: 'Dog Toys',
    subCategory: 'Chew Toys',
    price: 1399,
    discountPercentage: 14,
    stock: 22,
    rating: 4.9,
    reviewCount: 410,
    isFeatured: true,
    breedSuitability: ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Beagle'],
    images: [
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The gold standard of dog toys. Made from ultra-durable red natural rubber. Fill with peanut butter or treats to alleviate anxiety and boredom.',
    specifications: {
      'Material': 'Ultra-Resilient Natural Rubber',
      'Size': 'Large (Dogs 15 - 30 kg)'
    }
  },
  {
    id: 'prod-d07',
    name: 'Tough Cotton Rope Tug & Chew Ball (Pack of 2)',
    slug: 'tough-cotton-rope-tug-ball',
    brand: 'PawPetStore Essentials',
    petType: 'dog',
    category: 'Dog Toys',
    subCategory: 'Interactive Toys',
    price: 499,
    discountPercentage: 20,
    stock: 50,
    rating: 4.6,
    reviewCount: 95,
    isFeatured: false,
    breedSuitability: ['All Breeds', 'Indie', 'Pug'],
    images: [
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80'
    ],
    description: '100% natural braided cotton fibers that gently floss teeth and massage gums during enthusiastic tug-of-war games.',
    specifications: {
      'Material': 'Chemical-Free Natural Cotton',
      'Washable': 'Yes'
    }
  },
  {
    id: 'prod-d08',
    name: 'Orthopedic Bolster Memory Foam Dog Bed (Extra Large)',
    slug: 'orthopedic-bolster-foam-bed-xl',
    brand: 'PawPetStore Comfort',
    petType: 'dog',
    category: 'Dog Beds',
    subCategory: 'Beds & Mats',
    price: 3499,
    discountPercentage: 25,
    stock: 12,
    rating: 4.9,
    reviewCount: 88,
    isFeatured: true,
    breedSuitability: ['Golden Retriever', 'German Shepherd', 'Labrador Retriever', 'Rottweiler'],
    images: [
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-density memory foam base with plush bolstered edges. Relieves joint pressure, hip dysplasia pain, and provides therapeutic comfort.',
    specifications: {
      'Dimensions': '105 x 85 x 22 cm',
      'Cover': 'Water-resistant, Machine-washable micro-velvet'
    }
  },
  {
    id: 'prod-d09',
    name: 'Tactical No-Pull Reflective Dog Harness with Padded Handle',
    slug: 'tactical-no-pull-dog-harness',
    brand: 'PawPetStore Gear',
    petType: 'dog',
    category: 'Collars & Leashes',
    subCategory: 'Collars & Leashes',
    price: 1249,
    discountPercentage: 15,
    stock: 28,
    rating: 4.7,
    reviewCount: 160,
    isFeatured: false,
    breedSuitability: ['All Breeds', 'German Shepherd', 'Labrador', 'Husky'],
    images: [
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Features 2 sturdy metal leash attachment rings (front chest ring for anti-pull training) and luminous reflective piping for night safety.',
    specifications: {
      'Color': 'Military Olive / Obsidian Black',
      'Features': 'Quick-release buckles, breathable air mesh'
    }
  },
  {
    id: 'prod-d10',
    name: 'Himalaya Erina EP Anti-Tick & Flea Herbal Shampoo (200ml)',
    slug: 'himalaya-erina-ep-anti-tick-shampoo-200ml',
    brand: 'Himalaya',
    petType: 'dog',
    category: 'Health Care',
    subCategory: 'Grooming',
    price: 285,
    discountPercentage: 5,
    stock: 80,
    rating: 4.5,
    reviewCount: 630,
    isFeatured: false,
    breedSuitability: ['All Breeds'],
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Formulated with Eucalyptus and Neem extracts to eradicate ticks, fleas, and lice while preventing skin irritation.',
    specifications: {
      'Volume': '200 ml',
      'Active Botanicals': 'Neem (Nimba), Eucalyptus (Tailaparna)'
    }
  },

  // --- CAT PRODUCTS (FOOD, TREATS, LITTER, TOYS, SCRATCHERS) ---
  {
    id: 'prod-c01',
    name: 'Whiskas Adult Ocean Fish Complete Dry Cat Food (7kg)',
    slug: 'whiskas-adult-ocean-fish-7kg',
    brand: 'Whiskas',
    petType: 'cat',
    category: 'Cat Food',
    subCategory: 'Cat Food',
    price: 2350,
    discountPercentage: 12,
    stock: 30,
    rating: 4.7,
    reviewCount: 390,
    isFeatured: true,
    breedSuitability: ['Persian Cat', 'Siamese', 'Indie Cat', 'All Cats'],
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Nutritionally balanced crunchy pockets bursting with savory ocean fish and salmon centers. Fortified with Vitamin A and Taurine for sharp eyesight.',
    specifications: {
      'Weight': '7 kg',
      'Life Stage': 'Adult (1+ years)',
      'Flavor': 'Ocean Fish'
    }
  },
  {
    id: 'prod-c02',
    name: 'Royal Canin Hairball Care Feline Nutrition (2kg)',
    slug: 'royal-canin-hairball-care-2kg',
    brand: 'Royal Canin',
    petType: 'cat',
    category: 'Cat Food',
    subCategory: 'Cat Food',
    price: 2100,
    discountPercentage: 8,
    stock: 18,
    rating: 4.8,
    reviewCount: 165,
    isFeatured: true,
    breedSuitability: ['Persian Cat', 'Maine Coon', 'Long-hair Breeds'],
    images: [
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Enriched with a specific blend of dietary fibers, including psyllium, to naturally stimulate intestinal transit and eliminate ingested hair via feces.',
    specifications: {
      'Weight': '2 kg',
      'Special Need': 'Hairball Reduction (Visible results in 14 days)'
    }
  },
  {
    id: 'prod-c03',
    name: 'Sheba Deluxe Succulent Chicken Loaf Gravy Pouches (70g x 12)',
    slug: 'sheba-deluxe-chicken-loaf-gravy',
    brand: 'Sheba',
    petType: 'cat',
    category: 'Cat Food',
    subCategory: 'Wet Food',
    price: 840,
    discountPercentage: 10,
    stock: 40,
    rating: 4.9,
    reviewCount: 220,
    isFeatured: false,
    breedSuitability: ['All Cats', 'Persian Cat', 'Siamese'],
    images: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Gourmet dining for feline connoisseurs. Made from finely flaked tender chicken in an enticing broth that ensures optimal hydration.',
    specifications: {
      'Pack Size': '12 cans/pouches x 70g',
      'Flavor': 'Premium Chicken Loaf'
    }
  },
  {
    id: 'prod-c04',
    name: 'Temptations Crunchy Salmon Outside Soft Inside Treats (85g)',
    slug: 'temptations-crunchy-salmon-treats-85g',
    brand: 'Temptations',
    petType: 'cat',
    category: 'Cat Treats',
    subCategory: 'Cat Treats',
    price: 199,
    discountPercentage: 10,
    stock: 75,
    rating: 4.8,
    reviewCount: 480,
    isFeatured: true,
    breedSuitability: ['All Cats'],
    images: [
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Irresistible dual-texture treats with fewer than 2 calories per piece. Shake the pouch and watch your cat come running!',
    specifications: {
      'Weight': '85 g',
      'Calories': '< 2 kcal per piece'
    }
  },
  {
    id: 'prod-c05',
    name: 'Natural Lavender Bentonite Ultra-Clumping Cat Litter (10L)',
    slug: 'lavender-bentonite-clumping-cat-litter-10l',
    brand: 'PawPetStore Clean',
    petType: 'cat',
    category: 'Cat Litter',
    subCategory: 'Cat Litter',
    price: 899,
    discountPercentage: 20,
    stock: 55,
    rating: 4.6,
    reviewCount: 310,
    isFeatured: true,
    breedSuitability: ['All Cats'],
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80'
    ],
    description: '99% dust-free 100% natural sodium bentonite granules with rapid moisture absorption and continuous lavender odor neutralization.',
    specifications: {
      'Volume': '10 Liters (~8 kg)',
      'Clump Speed': '< 3 seconds',
      'Fragrance': 'Soothing French Lavender'
    }
  },
  {
    id: 'prod-c06',
    name: 'Multi-Tier Deluxe Sisal Cat Tree Tower with Hammock & Condo',
    slug: 'multi-tier-sisal-cat-tree-condo',
    brand: 'PawPetStore Feline',
    petType: 'cat',
    category: 'Scratching Posts',
    subCategory: 'Scratching Posts',
    price: 4999,
    discountPercentage: 22,
    stock: 8,
    rating: 4.9,
    reviewCount: 74,
    isFeatured: true,
    breedSuitability: ['Siamese', 'Bengal Cat', 'Maine Coon', 'All Cats'],
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Solid engineered wood structure wrapped in resilient natural sisal rope. Includes plush sleeping condo, hanging pom-poms, and top lookout perch.',
    specifications: {
      'Height': '145 cm',
      'Weight Capacity': 'Up to 18 kg (Multiple cats)'
    }
  },
  {
    id: 'prod-c07',
    name: 'Automatic Rotating 3-in-1 Laser & Feather Wand Interactive Cat Toy',
    slug: 'automatic-laser-feather-wand-cat-toy',
    brand: 'PawPetStore Play',
    petType: 'cat',
    category: 'Interactive Toys',
    subCategory: 'Interactive Toys',
    price: 1299,
    discountPercentage: 15,
    stock: 32,
    rating: 4.8,
    reviewCount: 142,
    isFeatured: true,
    breedSuitability: ['Bengal Cat', 'Siamese', 'Indie Cat', 'All Cats'],
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Smart battery-operated feline entertainer featuring random 360-degree red laser trajectory, fluttering bell feather wand, and automatic 15-minute sleep timer to prevent over-exhaustion.',
    specifications: {
      'Battery': 'USB Rechargeable 800mAh',
      'Modes': 'Slow, Fast, Random, Manual Handheld',
      'Safety': 'Class 1 Eye-Safe Laser'
    }
  },
  {
    id: 'prod-c08',
    name: 'Me-O Creamy Lickable Treats Tuna with Scallop (15g x 4 pouches)',
    slug: 'me-o-creamy-lickable-treats-tuna-scallop',
    brand: 'Me-O',
    petType: 'cat',
    category: 'Cat Treats',
    subCategory: 'Cat Treats',
    price: 110,
    discountPercentage: 8,
    stock: 95,
    rating: 4.9,
    reviewCount: 388,
    isFeatured: false,
    breedSuitability: ['Persian Cat', 'Siamese', 'Maine Coon', 'All Cats'],
    images: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Silky smooth purée made from wild tuna and tender scallop meat. Packed with Green Tea extracts for oral hygiene, Zinc for coat radiance, and DL-Methionine for urinary tract support.',
    specifications: {
      'Net Weight': '60g (4 tubes x 15g)',
      'Life Stage': 'Kitten & Adult (2+ months)',
      'Flavor': 'Tuna with Scallop'
    }
  },
  {
    id: 'prod-c09',
    name: 'Beaphar Premium Catnip Play & Training Spray (125ml)',
    slug: 'beaphar-premium-catnip-spray-125ml',
    brand: 'Beaphar',
    petType: 'cat',
    category: 'Grooming & Care',
    subCategory: 'Grooming & Hairball Care',
    price: 475,
    discountPercentage: 10,
    stock: 42,
    rating: 4.6,
    reviewCount: 88,
    isFeatured: false,
    breedSuitability: ['All Cats', 'Indie Cat', 'Persian Cat'],
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
    ],
    description: '100% natural Nepeta Cataria distillate. Spray on scratching posts, new beds, or travel carriers to encourage healthy scratching behavior and alleviate carrier travel anxiety.',
    specifications: {
      'Volume': '125 ml',
      'Ingredients': 'Concentrated Catnip Essential Oil & Purified Water',
      'Origin': 'Netherlands'
    }
  },
  {
    id: 'prod-c10',
    name: 'Stainless Steel High-Sided Anti-Scatter Cat Litter Box with Scoop',
    slug: 'stainless-steel-high-sided-cat-litter-box',
    brand: 'PawPetStore Clean',
    petType: 'cat',
    category: 'Cat Litter',
    subCategory: 'Cat Litter & Scoops',
    price: 2499,
    discountPercentage: 18,
    stock: 20,
    rating: 4.9,
    reviewCount: 65,
    isFeatured: true,
    breedSuitability: ['Maine Coon', 'Persian Cat', 'Bengal Cat', 'All Cats'],
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Medical-grade non-porous stainless steel basin that never absorbs foul ammonia odors or urine stains. Features 15cm translucent snap-on splash guard and ergonomic sifting scoop.',
    specifications: {
      'Dimensions': '50 x 35 x 20 cm',
      'Material': 'SUS304 Stainless Steel + PP Shield',
      'Odor Resistance': '100% Non-Staining'
    }
  },

  // --- BIRD PRODUCTS (FOOD, CAGES, ACCESSORIES, TOYS) ---
  {
    id: 'prod-b01',
    name: 'Versele-Laga Prestige Premium Budgies Seed Mix (1kg)',
    slug: 'versele-laga-prestige-budgies-1kg',
    brand: 'Versele-Laga',
    petType: 'bird',
    category: 'Bird Food',
    subCategory: 'Daily Food',
    price: 520,
    discountPercentage: 10,
    stock: 35,
    rating: 4.8,
    reviewCount: 145,
    isFeatured: true,
    breedSuitability: ['Budgerigar', 'Lovebird', 'Finches'],
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Enriched seed mixture with VAM pellets containing essential vitamins, amino acids, and minerals. Supplemented with florastimul for optimal digestion.',
    specifications: {
      'Weight': '1 kg',
      'Ingredients': 'Canary seed, yellow millet, red millet, peeled oats'
    }
  },
  {
    id: 'prod-b02',
    name: 'Vitapol Cockatiel Nut & Fruit Gourmet Blend (1kg)',
    slug: 'vitapol-cockatiel-nut-fruit-blend-1kg',
    brand: 'Vitapol',
    petType: 'bird',
    category: 'Bird Food',
    subCategory: 'Daily Food',
    price: 640,
    discountPercentage: 12,
    stock: 25,
    rating: 4.7,
    reviewCount: 89,
    isFeatured: false,
    breedSuitability: ['Cockatiel', 'Conure', 'Small Parrots'],
    images: [
      'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Rich balanced diet loaded with striped sunflower seeds, dehydrated bananas, apples, and crushed hazelnuts for energetic plumage.',
    specifications: {
      'Weight': '1 kg',
      'Origin': 'Poland'
    }
  },
  {
    id: 'prod-b03',
    name: 'Spacious Non-Toxic Wrought Iron Flight Cage with Stand',
    slug: 'wrought-iron-flight-cage-with-stand',
    brand: 'PawPetStore Avian',
    petType: 'bird',
    category: 'Bird Cages',
    subCategory: 'Cages',
    price: 5899,
    discountPercentage: 15,
    stock: 6,
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    breedSuitability: ['Budgerigar', 'Cockatiel', 'Lovebird', 'Canary'],
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavy-duty lead-free powder coated avian cage with 4 rolling casters, pull-out bottom waste grille and tray, and 4 feeder cups.',
    specifications: {
      'Dimensions': '78 x 46 x 132 cm',
      'Bar Spacing': '1.2 cm (Safe for small birds)'
    }
  },
  {
    id: 'prod-b04',
    name: 'Natural Calcium Cuttlefish Bone Mineral Chews (Pack of 3)',
    slug: 'natural-cuttlefish-bone-chews-pack-3',
    brand: 'PawPetStore Avian',
    petType: 'bird',
    category: 'Bird Accessories',
    subCategory: 'Supplements',
    price: 299,
    discountPercentage: 15,
    stock: 50,
    rating: 4.6,
    reviewCount: 110,
    isFeatured: false,
    breedSuitability: ['All Birds'],
    images: [
      'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Essential source of calcium carbonate and trace minerals for healthy beak trimming and strong eggshell formation.',
    specifications: {
      'Includes': '3 Cuttlebones with metal cage holders'
    }
  },
  {
    id: 'prod-b05',
    name: 'Natural Hardwood Multi-Branch Perch & Cotton Climbing Rope Spiral',
    slug: 'natural-hardwood-perch-cotton-rope-spiral',
    brand: 'PawPetStore Avian',
    petType: 'bird',
    category: 'Bird Accessories',
    subCategory: 'Perches & Swings',
    price: 799,
    discountPercentage: 12,
    stock: 28,
    rating: 4.8,
    reviewCount: 94,
    isFeatured: true,
    breedSuitability: ['Cockatiel', 'Lovebird', 'Budgerigar', 'African Grey'],
    images: [
      'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Variable diameter wild pepperwood branch that exercises avian foot muscles naturally and prevents bumblefoot sores. Equipped with stainless wing nut cage clamp.',
    specifications: {
      'Length': '35 cm',
      'Material': '100% Organic Pepperwood + Cotton Rope',
      'Mount': 'Universal Cage Bolt'
    }
  },
  {
    id: 'prod-b06',
    name: 'Versele-Laga NutriBird P15 Tropical Maintenance Pellets (1kg)',
    slug: 'versele-laga-nutribird-p15-tropical-1kg',
    brand: 'Versele-Laga',
    petType: 'bird',
    category: 'Bird Food',
    subCategory: 'Pellets',
    price: 1450,
    discountPercentage: 10,
    stock: 18,
    rating: 4.9,
    reviewCount: 67,
    isFeatured: true,
    breedSuitability: ['African Grey Parrot', 'Amazon Parrot', 'Conure'],
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Scientifically validated maintenance pellet for medium to large parrots. Contains selected grains, fresh fruit extracts, and peanuts with zero seed-sorting waste.',
    specifications: {
      'Weight': '1 kg',
      'Protein': '15.0%',
      'Fat': '16.0%'
    }
  },
  {
    id: 'prod-b07',
    name: 'Automatic Gravity Avian Siphon Feeder & Water Drinker Set (200ml)',
    slug: 'automatic-gravity-feeder-drinker-set',
    brand: 'PawPetStore Avian',
    petType: 'bird',
    category: 'Bird Accessories',
    subCategory: 'Feeding Bowls & Waterers',
    price: 349,
    discountPercentage: 15,
    stock: 60,
    rating: 4.7,
    reviewCount: 152,
    isFeatured: false,
    breedSuitability: ['Budgerigar', 'Zebra Finch', 'Canary', 'Lovebird'],
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crystal-clear food-grade acrylic siphon drinkers that lock onto cage bars. Automatically replenishes clean water and seed while shielding supplies from droppings.',
    specifications: {
      'Capacity': '200 ml each',
      'Attachment': 'Fits wire bars up to 1.8cm spacing'
    }
  },
  {
    id: 'prod-b08',
    name: 'Handcrafted Coconut Foraging Shell with Rattan Shredding Balls',
    slug: 'coconut-foraging-shell-bird-toy',
    brand: 'PawPetStore Play',
    petType: 'bird',
    category: 'Bird Toys',
    subCategory: 'Bird Toys',
    price: 499,
    discountPercentage: 20,
    stock: 35,
    rating: 4.8,
    reviewCount: 88,
    isFeatured: false,
    breedSuitability: ['Lovebird', 'Cockatiel', 'Budgerigar', 'African Grey'],
    images: [
      'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Eco-friendly natural coconut shell hanging toy stuffed with edible crinkle paper, chewable rattan balls, and loofah slices to satisfy natural foraging instincts.',
    specifications: {
      'Materials': 'Coconut Shell, Bamboo, Loofah, Food-safe Vegetable Dye'
    }
  },
  {
    id: 'prod-b09',
    name: 'ZuPreem FruitBlend Flavor Pellets for Cockatiels & Lovebirds (900g)',
    slug: 'zupreem-fruitblend-cockatiel-lovebird-900g',
    brand: 'ZuPreem',
    petType: 'bird',
    category: 'Bird Food',
    subCategory: 'Pellets',
    price: 1199,
    discountPercentage: 8,
    stock: 22,
    rating: 4.9,
    reviewCount: 115,
    isFeatured: true,
    breedSuitability: ['Cockatiel', 'Lovebird', 'Small Parrots'],
    images: [
      'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bursting with natural fruit flavors (banana, orange, apple, grape). Provides 21 vitamins and minerals without artificial preservatives.',
    specifications: {
      'Weight': '900 g',
      'Pellet Size': 'Cockatiel / Lovebird'
    }
  },
  {
    id: 'prod-b10',
    name: 'Iodine Calcium Bell Mineral Block with Seed Cluster (Pack of 2)',
    slug: 'iodine-calcium-bell-mineral-block-pack-2',
    brand: 'Vitapol',
    petType: 'bird',
    category: 'Bird Accessories',
    subCategory: 'Mineral Blocks',
    price: 249,
    discountPercentage: 10,
    stock: 55,
    rating: 4.6,
    reviewCount: 92,
    isFeatured: false,
    breedSuitability: ['Budgerigar', 'Canary', 'Zebra Finch', 'All Birds'],
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fortified with essential iodine to guard against avian thyroid disorders and calcium for sturdy beak development.',
    specifications: {
      'Pack': '2 Mineral Bells with hanger clips'
    }
  },

  // --- ACCESSORIES & GENERAL PET CARE ---
  {
    id: 'prod-a01',
    name: 'Heavy-Duty Anti-Skid Stainless Steel Feeding Bowls (Set of 2)',
    slug: 'anti-skid-stainless-steel-bowls-set',
    brand: 'PawPetStore Essentials',
    petType: 'general',
    category: 'Accessories',
    subCategory: 'Bowls',
    price: 699,
    discountPercentage: 20,
    stock: 65,
    rating: 4.8,
    reviewCount: 280,
    isFeatured: true,
    breedSuitability: ['All Breeds'],
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Food-grade rustproof stainless steel bowls with bonded non-marking rubber ring base preventing tip-overs and noisy sliding during meals.',
    specifications: {
      'Capacity': '900 ml each',
      'Dishwasher Safe': 'Yes'
    }
  },
  {
    id: 'prod-a02',
    name: 'Airline-Approved Ventilated Pet Travel Carrier Crate',
    slug: 'airline-approved-pet-travel-carrier',
    brand: 'PawPetStore Travel',
    petType: 'general',
    category: 'Accessories',
    subCategory: 'Carriers',
    price: 2899,
    discountPercentage: 18,
    stock: 14,
    rating: 4.9,
    reviewCount: 96,
    isFeatured: true,
    breedSuitability: ['Shih Tzu', 'Persian Cat', 'Pug', 'Beagle'],
    images: [
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Durable impact-resistant polypropylene hard crate with 360-degree ventilation slats, spring-loaded safety steel latch, and top carry handle.',
    specifications: {
      'Dimensions': '60 x 40 x 38 cm',
      'Max Weight': '12 kg'
    }
  },
  {
    id: 'prod-a03',
    name: 'Self-Cleaning Slicker Deshedding Pet Brush',
    slug: 'self-cleaning-slicker-brush',
    brand: 'PawPetStore Care',
    petType: 'general',
    category: 'Accessories',
    subCategory: 'Grooming',
    price: 499,
    discountPercentage: 25,
    stock: 48,
    rating: 4.7,
    reviewCount: 195,
    isFeatured: false,
    breedSuitability: ['Golden Retriever', 'Persian Cat', 'German Shepherd'],
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fine bent wire bristles with protective massage beads penetrate thick undercoats without scratching sensitive skin. One-click button retracts bristles for effortless hair release.',
    specifications: {
      'Grip': 'Ergonomic Non-slip Silicone'
    }
  }
];

module.exports = {
  categories,
  breeds,
  clinicServices,
  products
};
