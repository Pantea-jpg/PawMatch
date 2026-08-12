export interface Pet {
  name: string;
  type: "dog" | "cat";
  breed: string;
  age: number;
  gender: "male" | "female";
  size: "small" | "medium" | "large";
  city: string;
  vaccinated: boolean;
  neutered: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
  energyLevel: "low" | "medium" | "high";
  description: string;
  status: "available" | "pending" | "adopted";
}
