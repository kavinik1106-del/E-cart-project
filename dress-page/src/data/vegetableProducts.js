export const vegetableProducts = [
  {
    id: 1,
    type: "Vegetable",
    name: "Carrot",
    price: 40,
    mrp: 60,
    image: "/carrot.webp",
    description: "Fresh, organic carrots rich in beta-carotene and perfect for all recipes.",
    highlights: ["100% Organic", "Fresh Daily", "No Pesticides"],
    rating: 4.6,
    reviews: 512,
    tag: "Fresh",
    specifications: {
      "Origin": "Local Farm",
      "Freshness": "Harvested Daily",
      "Weight": "Per kg",
      "Color": "Bright Orange",
      "Storage": "Keep in Refrigerator"
    },
    quantityGuide: {
      "250g": { price: 10, weight: "250g", description: "Quarter kg - Single serving" },
      "500g": { price: 20, weight: "500g", description: "Half kg - Small family" },
      "1kg": { price: 40, weight: "1 kg", description: "1 kg - Standard (Most Popular)" },
      "2kg": { price: 75, weight: "2 kg", description: "2 kg - Large family" },
      "5kg": { price: 180, weight: "5 kg", description: "5 kg - Bulk offer" }
    },
    careInstructions: ["Wash before use", "Store in cool place", "Best consumed within 5 days", "Remove greens if present"],
    warranty: "Freshness Guarantee - 5 days",
    weight: "1000g (1 kg)"
  },
  {
    id: 2,
    type: "Vegetable",
    name: "Beans",
    price: 60,
    mrp: 90,
    image: "/beans.webp",
    description: "Fresh green beans perfect for cooking with crispy texture.",
    highlights: ["Crispy", "Farm Fresh", "Nutrient Rich"],
    rating: 4.4,
    reviews: 289,
    specifications: {
      "Type": "French Beans",
      "Freshness": "Harvested Daily",
      "Color": "Green",
      "Texture": "Crispy",
      "Usage": "All Recipes"
    },
    quantityGuide: {
      "250g": { price: 15, weight: "250g", description: "Quarter kg - Single serving" },
      "500g": { price: 30, weight: "500g", description: "Half kg - Small family" },
      "1kg": { price: 60, weight: "1 kg", description: "1 kg - Standard (Most Popular)" },
      "2kg": { price: 110, weight: "2 kg", description: "2 kg - Large family" },
      "5kg": { price: 270, weight: "5 kg", description: "5 kg - Bulk offer" }
    },
    careInstructions: ["Wash thoroughly", "Store in refrigerator", "Use within 3-4 days", "Remove strings if needed"],
    warranty: "Freshness Guarantee - 4 days",
    weight: "1000g (1 kg)"
  },
  {
    id: 3,
    type: "Vegetable",
    name: "Tomato",
    price: 35,
    mrp: 55,
    image: "/tomo.jpg",
    description: "Ripe juicy tomatoes perfect for all recipes with authentic taste.",
    highlights: ["Ripe & Juicy", "No Chemicals", "Best Quality"],
    rating: 4.5,
    reviews: 678,
    tag: "Best Seller",
    specifications: {
      "Variety": "Hybrid",
      "Color": "Bright Red",
      "Firmness": "Medium",
      "Size": "Large",
      "Taste": "Sweet & Tangy"
    },
    quantityGuide: {
      "250g": { price: 9, weight: "250g", description: "Quarter kg - Single serving" },
      "500g": { price: 17, weight: "500g", description: "Half kg - Small family" },
      "1kg": { price: 35, weight: "1 kg", description: "1 kg - Standard (Most Popular)" },
      "2kg": { price: 65, weight: "2 kg", description: "2 kg - Large family" },
      "5kg": { price: 160, weight: "5 kg", description: "5 kg - Bulk offer" }
    },
    careInstructions: ["Store at room temperature", "Do not refrigerate", "Use within 5-7 days", "Choose firm tomatoes"],
    warranty: "Freshness Guarantee - 7 days",
    weight: "1000g (1 kg)"
  },
  {
    id: 4,
    type: "Spice",
    name: "Ginger",
    price: 120,
    mrp: 180,
    image: "/ginger.webp",
    description: "Fresh ginger for authentic flavors with natural aroma and health benefits.",
    highlights: ["Organic", "Aromatic", "Authentic"],
    rating: 4.7,
    reviews: 234,
    tag: "Premium",
    specifications: {
      "Type": "Fresh Root",
      "Aroma": "Strong & Natural",
      "Freshness": "Daily Harvest",
      "Usage": "Culinary & Medicinal",
      "Storage": "Cool Dry Place"
    },
    quantityGuide: {
      "100g": { price: 12, weight: "100g", description: "100g - Small quantity" },
      "250g": { price: 30, weight: "250g", description: "250g - Quarter kg (Most Popular)" },
      "500g": { price: 60, weight: "500g", description: "500g - Half kg" },
      "1kg": { price: 120, weight: "1 kg", description: "1 kg - Standard" }
    },
    careInstructions: ["Store in cool dry place", "Do not refrigerate", "Use within 2-3 weeks", "Peel before use"],
    warranty: "Freshness Guarantee - 3 weeks",
    weight: "1000g (1 kg)"
  },
  {
    id: 5,
    type: "Spice",
    name: "Turmeric Powder",
    price: 150,
    mrp: 250,
    image: "/ginger.webp",
    description: "Pure turmeric powder with vibrant golden color for authentic Indian recipes.",
    highlights: ["Pure", "No Additives", "High Quality"],
    rating: 4.8,
    reviews: 445,
    specifications: {
      "Type": "Ground Powder",
      "Purity": "100% Pure",
      "Color": "Golden Yellow",
      "Source": "Organic Farms",
      "Flavor": "Authentic"
    },
    quantityGuide: {
      "50g": { price: 15, weight: "50g", description: "50g - Trial size" },
      "100g": { price: 30, weight: "100g", description: "100g - Small pack" },
      "250g": { price: 75, weight: "250g", description: "250g - Medium (Most Popular)" },
      "500g": { price: 150, weight: "500g", description: "500g - Bulk" },
      "1kg": { price: 280, weight: "1 kg", description: "1 kg - Family pack" }
    },
    careInstructions: ["Store in airtight container", "Keep away from moisture", "Use dry spoon", "Store in cool place"],
    warranty: "Quality Guarantee - 1 year",
    weight: "250g (standard)"
  },
  {
    id: 6,
    type: "Vegetable",
    name: "Potato",
    price: 25,
    mrp: 40,
    image: "/carrot.webp",
    description: "Fresh potatoes perfect for all cuisines with excellent taste and texture.",
    highlights: ["Farm Fresh", "Starchy", "Versatile"],
    rating: 4.4,
    reviews: 567,
    tag: "Bestseller",
    specifications: {
      "Type": "Red Potato",
      "Freshness": "Harvested Weekly",
      "Color": "Brown",
      "Size": "Medium",
      "Usage": "All Recipes"
    },
    quantityGuide: {
      "500g": { price: 12, weight: "500g", description: "Half kg - Small family" },
      "1kg": { price: 25, weight: "1 kg", description: "1 kg - Standard (Most Popular)" },
      "2kg": { price: 45, weight: "2 kg", description: "2 kg - Large family" },
      "5kg": { price: 110, weight: "5 kg", description: "5 kg - Bulk offer" },
      "10kg": { price: 200, weight: "10 kg", description: "10 kg - Wholesale" }
    },
    careInstructions: ["Store in cool dark place", "Avoid moisture", "Use within 2 weeks", "Remove sprouted parts"],
    warranty: "Freshness Guarantee - 2 weeks",
    weight: "1000g (1 kg)"
  }
];
