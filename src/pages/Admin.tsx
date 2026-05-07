import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'motion/react';
import { Plus, Trash2, LogOut, Save, Image as ImageIcon, Mail, FileText, Bell, CheckCircle, Clock, GripVertical } from 'lucide-react';
import { useFirebase } from '@/src/components/FirebaseProvider';
import { auth, db } from '@/src/lib/firebase';
import { getArtworks, addArtwork, deleteArtwork, updateArtworksOrder } from '@/src/services/galleryService';
import { getInquiries, InquiryData } from '@/src/services/inquiryService';
import { Artwork, Collection } from '@/src/constants';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const COLLECTIONS: Collection[] = ['Gedolim', 'Eretz Yisrael', 'The Jewish Mosaic', 'Tefillot'];

type AdminTab = 'inventory' | 'inquiries';

export default function Admin() {
  const { user } = useFirebase();
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('inventory');
  const [isAdding, setIsAdding] = useState(false);
  const [imageUrlPreview, setImageUrlPreview] = useState('');
  const [orientationPreview, setOrientationPreview] = useState<'portrait' | 'landscape'>('portrait');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);

  const loadArt = async () => {
    const data = await getArtworks();
    setArtworks(data || []);
  };

  useEffect(() => {
    if (!user || user.email !== 'thejerusalemcanvas@gmail.com') {
      navigate('/');
      return;
    }

    const init = async () => {
      await loadArt();
      setLoading(false);
    };
    init();

    // Listen for new inquiries in real-time
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as InquiryData[];
      setInquiries(data);
      
      // We could use local storage to track seen inquiries, 
      // but for now let's just show a simple badge if there are any
      if (data.length > 0) {
        setUnreadCount(data.length);
      }
    });

    return () => unsubscribe();
  }, [user, navigate]);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newArt = {
      title: formData.get('title') as string,
      collection: formData.get('collection') as Collection,
      imageUrl: formData.get('imageUrl') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string || undefined,
      orientation: formData.get('orientation') as 'portrait' | 'landscape',
    };

    setIsAdding(true);
    try {
      await addArtwork(newArt);
      await loadArt();
      setImageUrlPreview('');
      (e.target as HTMLFormElement).reset();
      alert('Painting added successfully!');
    } catch (err) {
      alert('Failed to add painting.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleSaveOrder = async () => {
    setIsSavingOrder(true);
    try {
      const orderUpdates = artworks.map((art, index) => ({
        id: art.id,
        order: index
      }));
      await updateArtworksOrder(orderUpdates);
      setOrderChanged(false);
      alert('Order saved successfully!');
    } catch (err) {
      alert('Failed to save order.');
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArtwork(id);
      await loadArt();
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete artwork.');
    }
  };

  if (loading) return <div className="pt-32 text-center">Loading Studio Manager...</div>;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h1 className="text-3xl font-serif text-gray-900 italic">Studio Manager</h1>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-2">Welcome back, Artist</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-2 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
              <button 
                onClick={() => setActiveTab('inventory')}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === 'inventory' ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-900"
                )}
              >
                Inventory
              </button>
              <button 
                onClick={() => {
                  setActiveTab('inquiries');
                  setUnreadCount(0);
                }}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all relative",
                  activeTab === 'inquiries' ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-900"
                )}
              >
                Inquiries
                {unreadCount > 0 && activeTab !== 'inquiries' && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
            </nav>

            <button 
              type="button"
              onClick={() => auth.signOut()}
              className="flex items-center text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <LogOut size={14} className="mr-2" /> Sign Out
            </button>
          </div>
        </div>

        {activeTab === 'inventory' ? (
          <>
            {/* Add New Painting Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 gold-border shadow-xl mb-16"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-grow">
                  <h2 className="text-xl font-serif text-gray-900 mb-8 border-b pb-4">Add New Masterpiece</h2>
                  <form onSubmit={handleAdd} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Painting Title</label>
                        <input name="title" required className="w-full bg-gray-50 border-gray-100 p-3 outline-none focus:border-brand-gold" placeholder="e.g., Jerusalem Sunrise" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Collection</label>
                        <select name="collection" required className="w-full bg-gray-50 border-gray-100 p-3 outline-none focus:border-brand-gold appearance-none">
                          {COLLECTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Image URL</label>
                      <div className="flex space-x-2">
                        <div className="bg-gray-50 p-3 border-gray-100 flex items-center text-gray-400"><ImageIcon size={18} /></div>
                        <input 
                          name="imageUrl" 
                          required 
                          onChange={(e) => setImageUrlPreview(e.target.value)}
                          className="w-full bg-gray-50 border-gray-100 p-3 outline-none focus:border-brand-gold" 
                          placeholder="https://..." 
                        />
                      </div>
                      <div className="bg-brand-pink/5 p-3 text-[10px] text-gray-500 leading-relaxed rounded-sm border border-brand-pink/10">
                        <p className="font-bold uppercase mb-1">How to get a link from Imgur:</p>
                        <ol className="list-decimal list-inside space-y-1">
                          <li>Upload your photo to Imgur.com</li>
                          <li>Right-click the image and select <strong>"Copy Image Address"</strong> (it should end in .jpg or .png)</li>
                        </ol>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Description</label>
                        <input name="description" required className="w-full bg-gray-50 border-gray-100 p-3 outline-none focus:border-brand-gold" placeholder="Brief story behind the piece" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Price (Optional)</label>
                        <input name="price" className="w-full bg-gray-50 border-gray-100 p-3 outline-none focus:border-brand-gold" placeholder="e.g. $1,200 or Inquire" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Display Orientation</label>
                      <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                          <input 
                            type="radio" 
                            name="orientation" 
                            value="portrait" 
                            defaultChecked 
                            onChange={() => setOrientationPreview('portrait')}
                            className="peer sr-only" 
                          />
                          <div className="p-3 text-center border bg-gray-50 text-gray-400 peer-checked:border-brand-gold peer-checked:text-brand-gold peer-checked:bg-brand-gold/5 transition-all text-xs font-bold uppercase tracking-widest">
                            Portrait (Tall)
                          </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                          <input 
                            type="radio" 
                            name="orientation" 
                            value="landscape" 
                            onChange={() => setOrientationPreview('landscape')}
                            className="peer sr-only" 
                          />
                          <div className="p-3 text-center border bg-gray-50 text-gray-400 peer-checked:border-brand-gold peer-checked:text-brand-gold peer-checked:bg-brand-gold/5 transition-all text-xs font-bold uppercase tracking-widest">
                            Landscape (Wide)
                          </div>
                        </label>
                      </div>
                    </div>

                    <button 
                      disabled={isAdding}
                      className="w-full bg-gray-900 text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-colors flex items-center justify-center disabled:opacity-50"
                    >
                      {isAdding ? 'Adding...' : <><Plus size={14} className="mr-2" /> Add to Gallery</>}
                    </button>
                  </form>
                </div>
                
                {/* Live Preview Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">Preview</h3>
                  <div 
                    className={cn(
                      "bg-gray-50 border-2 border-dashed border-gray-100 rounded-sm overflow-hidden flex items-center justify-center relative transition-all duration-300",
                      orientationPreview === 'landscape' ? "aspect-[4/3]" : "aspect-[3/4]"
                    )}
                  >
                    {imageUrlPreview ? (
                      <img 
                        src={imageUrlPreview.trim()} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x800?text=Invalid+Image+Link';
                        }}
                      />
                    ) : (
                      <div className="text-center p-6">
                        <ImageIcon size={32} className="mx-auto text-gray-200 mb-2" />
                        <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold px-2">Image will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Existing Inventory List */}
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-400 font-primary">
                  Current Inventory ({artworks.length})
                  {orderChanged && <span className="ml-2 text-brand-gold lowercase italic normal-case tracking-normal">— order changed</span>}
                </h2>
                {orderChanged && (
                  <button 
                    onClick={handleSaveOrder}
                    disabled={isSavingOrder}
                    className="flex items-center px-4 py-2 bg-brand-gold text-white text-[10px] uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors disabled:opacity-50"
                  >
                    <Save size={14} className="mr-2" /> {isSavingOrder ? 'Saving...' : 'Save New Order'}
                  </button>
                )}
              </div>

              <div className="bg-brand-pink/5 p-4 rounded-sm border border-brand-pink/10 mb-6 flex items-center">
                <GripVertical size={16} className="text-brand-pink mr-3" />
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  Tip: Click and drag the images to rearrange the order in the gallery.
                </p>
              </div>

              <Reorder.Group 
                axis="y" 
                values={artworks} 
                onReorder={(newOrder) => {
                  setArtworks(newOrder);
                  setOrderChanged(true);
                }}
                className="space-y-2"
              >
                {artworks.map(art => (
                  <Reorder.Item 
                    key={art.id} 
                    value={art}
                    className="bg-white p-4 border border-gray-100 flex items-center justify-between group touch-none cursor-grab active:cursor-grabbing hover:border-brand-gold/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-300 group-hover:text-brand-gold transition-colors">
                        <GripVertical size={18} />
                      </div>
                      <img src={art.imageUrl} className="w-12 h-12 object-cover rounded-sm group-hover:scale-110 transition-transform" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{art.title}</h4>
                        <p className="text-[10px] uppercase text-gray-400 tracking-tighter">{art.collection} • {art.orientation || 'portrait'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-[10px] text-gray-400">{art.price || 'P.O.A.'}</span>
                      {confirmDeleteId === art.id ? (
                        <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-2 duration-300">
                          <button 
                            type="button"
                            onClick={() => handleDelete(art.id)}
                            className="text-[10px] bg-red-500 text-white px-2 py-1 uppercase font-bold rounded-sm hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            Confirm
                          </button>
                          <button 
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="text-[10px] text-gray-400 uppercase font-bold hover:text-gray-600 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button"
                          onClick={() => setConfirmDeleteId(art.id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer relative z-10"
                          title="Remove from gallery"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </>
        ) : (
          /* Inquiries Tab */
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-serif text-gray-900 italic">Incoming Inquiries</h2>
              <div className="bg-brand-sage/10 text-brand-sage px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center">
                <CheckCircle size={12} className="mr-2" /> Live Connection Active
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white p-20 text-center gold-border">
                <Mail size={48} className="mx-auto text-gray-100 mb-4" />
                <p className="text-gray-400 font-serif italic text-lg">No inquiries yet. They will appear here as soon as they arrive.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {inquiries.map((inquiry) => (
                  <motion.div 
                    layout
                    key={inquiry.id} 
                    className="bg-white p-8 border border-gray-100 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold" />
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold">
                            <FileText size={18} />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{inquiry.name}</h4>
                            <p className="text-xs text-brand-gold font-medium">{inquiry.email}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-sm">
                          <div className="flex items-center gap-2 mb-2">
                             <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Type:</span>
                             <span className="text-[10px] uppercase tracking-widest font-bold text-gray-900 bg-brand-pink/20 px-2 py-0.5 rounded-sm">{inquiry.type}</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">{inquiry.message}</p>
                        </div>
                      </div>

                      <div className="text-right flex flex-col justify-between">
                        <div className="text-[10px] uppercase tracking-widest font-bold text-gray-300 flex items-center justify-end">
                          <Clock size={12} className="mr-1" />
                          {inquiry.createdAt ? new Date(inquiry.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                        </div>
                        <a 
                          href={`mailto:${inquiry.email}?subject=Re: The Jerusalem Canvas Inquiry - ${inquiry.type}`}
                          className="mt-4 px-6 py-3 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors inline-block"
                        >
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-12 p-6 bg-brand-pink/10 rounded-lg border border-brand-pink/20">
              <div className="flex items-start gap-4">
                <Bell size={20} className="text-brand-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Pro Tip: Enable Email Notifications</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Would you like to receive an email as soon as an inquiry arrives? You can enable the <strong>"Trigger Email from Firestore"</strong> extension in your Firebase Console. It will automatically forward these entries to your inbox.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
