export interface Trip {
  id: string;
  title: string;
  price: number; // Quad price
  priceTriple?: number; // Triple Sharing price (optional)
  priceTwin?: number;   // Twin Sharing price (optional)
  duration: string;
  itinerary: string[];
  imageUrl: string; // If you're using multiple images, change to imageUrls: string[]
  featured: boolean;
  comingSoon: boolean;
  createdAt: Date;
}


export interface LegalPage {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
  read: boolean;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}