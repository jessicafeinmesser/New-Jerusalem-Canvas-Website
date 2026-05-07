export type Collection = 'Gedolim' | 'Eretz Yisrael' | 'The Jewish Mosaic' | 'Tefillot' | 'All';

export interface Artwork {
  id: string;
  title: string;
  collection: Collection;
  imageUrl: string;
  description: string;
  price?: string;
  orientation?: 'portrait' | 'landscape';
  order?: number;
}

export const ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'The Eternal Scholar',
    collection: 'Gedolim',
    imageUrl: 'https://picsum.photos/seed/gedolim1/800/1000',
    description: 'A study in wisdom and devotion.'
  },
  {
    id: '2',
    title: 'Morning over Jerusalem',
    collection: 'Eretz Yisrael',
    imageUrl: 'https://picsum.photos/seed/eretz1/1000/800',
    description: 'The golden light of the Judean hills.'
  },
  {
    id: '3',
    title: 'Colors of Shabbat',
    collection: 'The Jewish Mosaic',
    imageUrl: 'https://picsum.photos/seed/mosaic1/800/800',
    description: 'A celebration of Jewish tradition.'
  },
  {
    id: '4',
    title: 'Moda Ani',
    collection: 'Tefillot',
    imageUrl: 'https://picsum.photos/seed/tefillot1/800/1200',
    description: 'Calligraphy of gratitude.'
  },
  {
    id: '5',
    title: 'The Rav',
    collection: 'Gedolim',
    imageUrl: 'https://picsum.photos/seed/gedolim2/800/1000',
    description: 'A portrait of profound leadership.'
  },
  {
    id: '6',
    title: 'Olive Groves of Galilee',
    collection: 'Eretz Yisrael',
    imageUrl: 'https://picsum.photos/seed/eretz2/1000/700',
    description: 'Ancient trees under the Mediterranean sun.'
  },
  {
    id: '7',
    title: 'The Kotel Walls',
    collection: 'Eretz Yisrael',
    imageUrl: 'https://picsum.photos/seed/eretz3/800/1000',
    description: 'Stones that breathe history.'
  },
  {
    id: '8',
    title: 'Siddur Petals',
    collection: 'Tefillot',
    imageUrl: 'https://picsum.photos/seed/tefillot2/800/800',
    description: 'Prayer in bloom.'
  }
];

export const SERVICES = [
  {
    title: 'Originals',
    description: 'One-of-a-kind hand-painted masterpieces on high-quality canvas.',
    icon: 'Pallet'
  },
  {
    title: 'Prints',
    description: 'Giclée prints on paper or canvas, maintaining every detail of the original.',
    icon: 'Printer'
  },
  {
    title: 'Commissions',
    description: 'Custom art tailored to your vision, space, and personal story.',
    icon: 'PenTool'
  },
  {
    title: 'Monograms',
    description: 'Personalized Jewish monograms combining typography and art.',
    icon: 'Type'
  }
];
