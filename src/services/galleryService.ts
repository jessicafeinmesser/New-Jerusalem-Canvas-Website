import { collection, getDocs, query, orderBy, addDoc, serverTimestamp, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { Artwork } from '../constants';

const ARTWORKS_COLLECTION = 'artworks';

/**
 * Ensures image URLs are direct links (especially for Imgur)
 * Removes thumbnail suffixes and quality parameters that cause blurriness.
 */
function cleanImageUrl(url: string): string {
  if (!url) return '';
  let cleaned = url.trim();

  // Remove query parameters
  if (cleaned.includes('?')) {
    cleaned = cleaned.split('?')[0];
  }

  // Handle Imgur links
  if (cleaned.includes('imgur.com')) {
    // Extract the filename part
    const parts = cleaned.split('/');
    let filename = parts[parts.length - 1];
    
    // Check if it's an album or gallery link
    if (cleaned.includes('/a/') || cleaned.includes('/gallery/')) {
      const id = filename;
      if (id && id.length >= 5) {
        return `https://i.imgur.com/${id}.jpg`;
      }
    }

    // Extract ID and Extension
    const extMatch = filename.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    const ext = extMatch ? extMatch[0] : '.jpg';
    let id = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');

    // 1. Remove _d suffix (very common in mobile/fidelity links)
    id = id.replace(/_d$/, '');

    // 2. Remove standard quality suffixes (s, t, m, l, h, b)
    // ONLY if the resulting ID length is 5 or 7.
    // This prevents breaking valid 7-character IDs that happen to end in these letters.
    const lastChar = id.charAt(id.length - 1).toLowerCase();
    const suffixes = ['s', 't', 'm', 'l', 'h', 'b'];
    
    if (suffixes.includes(lastChar)) {
      const potentialBaseId = id.substring(0, id.length - 1);
      if (potentialBaseId.length === 5 || potentialBaseId.length === 7) {
        id = potentialBaseId;
      }
    }

    return `https://i.imgur.com/${id}${ext}`;
  }

  return cleaned;
}

export async function getArtworks(): Promise<Artwork[]> {
  try {
    // We'll fetch by createdAt first. In the application logic, we will handle the sorting.
    // This ensures that older items (without the 'order' field) still show up.
    // Note: To return older items without 'order', we must avoid ordering by 'order' in the query.
    const q = query(
      collection(db, ARTWORKS_COLLECTION), 
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => {
      const art = doc.data() as Artwork;
      // Fix IDs on the fly if they were saved with suffixes
      if (art.imageUrl) {
        art.imageUrl = cleanImageUrl(art.imageUrl);
      }
      return {
        id: doc.id,
        ...art
      };
    });

    // Sort manually in JS: items with order first, then those without
    return data.sort((a, b) => {
      const orderA = a.order ?? 9999;
      const orderB = b.order ?? 9999;
      return orderA - orderB;
    });
  } catch (error) {
    handleFirestoreError(error, 'list', ARTWORKS_COLLECTION);
    return [];
  }
}

export async function addArtwork(artwork: Omit<Artwork, 'id'>) {
  try {
    // Remove undefined values and clean image URL
    const cleanData = Object.fromEntries(
      Object.entries(artwork).filter(([_, v]) => v !== undefined)
    );
    
    if (cleanData.imageUrl) {
      cleanData.imageUrl = cleanImageUrl(cleanData.imageUrl as string);
    }

    const docRef = await addDoc(collection(db, ARTWORKS_COLLECTION), {
      ...cleanData,
      order: artwork.order ?? 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, 'create', ARTWORKS_COLLECTION);
  }
}

export async function deleteArtwork(id: string) {
  try {
    await deleteDoc(doc(db, ARTWORKS_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, 'delete', ARTWORKS_COLLECTION);
  }
}

export async function updateArtwork(id: string, updates: Partial<Artwork>) {
  try {
    const cleanData = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    
    if (cleanData.imageUrl) {
      cleanData.imageUrl = cleanImageUrl(cleanData.imageUrl as string);
    }

    await updateDoc(doc(db, ARTWORKS_COLLECTION, id), {
      ...cleanData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, 'update', ARTWORKS_COLLECTION);
  }
}

export async function updateArtworksOrder(artworks: { id: string, order: number }[]) {
  try {
    // We update them sequentially for simplicity in this small scale app
    // In larger apps, use writeBatch
    for (const art of artworks) {
      await updateDoc(doc(db, ARTWORKS_COLLECTION, art.id), {
        order: art.order,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    handleFirestoreError(error, 'update', ARTWORKS_COLLECTION);
  }
}

// Seed function to move static constants to Firestore
export async function seedArtworks(artworks: Artwork[]) {
  try {
    for (const art of artworks) {
      const { id, ...data } = art;
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );
      
      if (cleanData.imageUrl) {
        cleanData.imageUrl = cleanImageUrl(cleanData.imageUrl as string);
      }

      await setDoc(doc(db, ARTWORKS_COLLECTION, id), {
        ...cleanData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error seeding artworks:', error);
  }
}
