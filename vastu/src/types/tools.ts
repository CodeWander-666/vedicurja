export interface KundaliFormData {
  name: string;
  birthDate: string;
  birthTime: string;
  location: {
    lat: number;
    lng: number;
    timezone: string;
    displayName: string;
  };
}

export interface Planet {
  name: string;
  sign: string;
  degree: number;
  house: number;
  retrograde: boolean;
}

export interface KundaliChart {
  ascendant: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  planets: Planet[];
  houses: { number: number; sign: string; degree: number }[];
}

export interface NameSuggestion {
  syllable: string;
  description: string;
}
