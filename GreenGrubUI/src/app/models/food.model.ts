export interface Food {
  id: string;
  name: string;
  desc?: string;
  quantity: number;
  unit: 'kg' | 'serving' | string;
  foodType: 'veg' | 'non-veg' | 'jain' | 'waste' | string;
  images: string[];
}