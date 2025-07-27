export const cuisineData = {
  cuisineRegion: {
    "Latin American": [
      "Peruvian",
      "Mexican",
      "Brazilian",
      "Colombian",
      "Cuban",
      "Other",
    ],
    Caribbean: ["Jamaican", "Haitian", "Dominican", "Other"],
    "North American": [
      "Southern American",
      "Tex-Mex",
      "Cajun",
      "American",
      "Canadian",
      "Other",
    ],
    "Middle Eastern": ["Turkish", "Lebanese", "Persian", "Other"],
    "East Asian": ["Chinese", "Japanese", "Korean", "Other"],
    "Southeast Asian": ["Thai", "Vietnamese", "Filipino", "Other"],
    "South Asian": ["Nepali", "Indian", "Pakistani", "Other"],
    European: ["Italian", "French", "Spanish", "German", "Greek", "Other"],
    African: [
      "Ethiopian",
      "Nigerian",
      "Moroccan",
      "Ghanian",
      "Egyptian",
      "Other",
    ],
    "Hawaiian / Pacific Islands": ["Hawaiian", "Fijian", "Other"],
  },
  proteinChoice: [
    "Plant-Based",
    "Chicken",
    "Fish",
    "Shellfish",
    "Beef",
    "Pork",
    "Lamb",
    "Egg",
    "Meat - Other / Mixed",
  ],
  dietaryRestriction: [
    "Vegan",
    "Vegetarian",
    "Pescatarian",
    "Nut-Free",
    "Gluten-Free",
    "Dairy-Free",
    "Shellfish-Free",
    "Paleo",
    "Keto",
    "Low-Carb",
  ],
  religiousRestriction: [
    "Halal",
    "Kosher",
    "Kosher Parve",
    "Hindu (Satvik)",
    /*  
    "Ahimsa (Buddhist)*",
    "Ahimsa (Jain)*",
    "Jhatka*",
    "Lenten?*",
    */
  ],
};

export const CUISINE_REGION_ENUM = Object.freeze({
  Other: 0,
  "North American": 1,
  "Latin American": 2,
  Caribbean: 3,
  "Middle Eastern": 4,
  "East Asian": 5,
  "Southeast Asian": 6,
  "South Asian": 7,
  European: 8,
  African: 9,
  "Hawaiian / Pacific Islands": 10,
});

export const CUISINE_SUBREGION_ENUM = Object.freeze({
  0: ["None"],
  1: ["Southern American", "Tex-Mex", "Cajun", "American", "Canadian", "Other"],
  2: ["Peruvian", "Mexican", "Brazilian", "Colombian", "Cuban", "Other"],
  3: ["Jamaican", "Haitian", "Dominican", "Other"],
  4: ["Turkish", "Lebanese", "Persian", "Other"],
  5: ["Chinese", "Japanese", "Korean", "Other"],
  6: ["Thai", "Vietnamese", "Filipino", "Other"],
  7: ["Nepali", "Indian", "Pakistani", "Other"],
  8: ["Italian", "French", "Spanish", "German", "Greek", "Other"],
  9: ["Ethiopian", "Nigerian", "Moroccan", "Ghanian", "Egyptian", "Other"],
  10: ["Hawaiian", "Fijian", "Other"],
});

export const PROTEIN_CHOICE_ENUM = Object.freeze({
  None: 0,
  "Plant-Based": 1,
  "Dairy-Based": 2,
  Chicken: 3,
  Fish: 4,
  Shellfish: 5,
  Beef: 6,
  Pork: 7,
  Lamb: 8,
  "Egg": 9,
  "Meat - Other / Mixed": 10,
});

export const DIETARY_RESTRICTION_ENUM = Object.freeze({
  None: 0,
  Vegan: 1,
  Vegetarian: 2,
  Pescatarian: 3,
  "Nut-Free": 4,
  "Gluten-Free": 5,
  "Dairy-Free": 6,
  "Shellfish-Free": 7,
  Paleo: 8,
  Keto: 9,
  "Low-Carb": 10,
});

export const RELIGIOUS_RESTRICTION_ENUM = Object.freeze({
  None: 0,
  Halal: 1,
  Kosher: 2,
  "Kosher Parve": 3,
  "Hindu (Satvik)": 4,
});
