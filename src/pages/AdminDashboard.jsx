import React, { useState } from 'react';
import { useWatch } from '../context/WatchContext';
import { getAssetUrl } from '../utils/assets';
import { 
  Layers, 
  Package, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Check, 
  X, 
  Search,
  Sparkles,
  Award
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    watches, 
    orders, 
    appointments, 
    inquiries, 
    formatPrice, 
    updateWatch, 
    addWatch, 
    deleteWatch, 
    updateOrderStatus, 
    updateAppointmentStatus, 
    updateInquiryStatus,
    navigateTo 
  } = useWatch();

  const [activeAdminTab, setActiveAdminTab] = useState('inventory'); // 'inventory' | 'orders' | 'appointments' | 'inquiries' | 'analytics'
  const [editingWatch, setEditingWatch] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Watch State
  const [newWatchData, setNewWatchData] = useState({
    id: `chr-${Math.floor(1000 + Math.random() * 9000)}`,
    name: '',
    ref: 'Ref. ',
    collection: 'Grand Complications',
    price: 95000,
    calibre: 'Calibre CHR-324',
    movementType: 'Self-Winding Automatic',
    caseMaterial: '18K Rose Gold',
    dialColor: 'Sunburst Anthracite',
    powerReserve: '48 Hours',
    jewels: 32,
    components: 320,
    frequency: '28,800 vph (4 Hz)',
    hallmark: 'Poinçon de Genève',
    availability: 'In Stock',
    images: [getAssetUrl('images/image-1.png')],
    complications: ['Perpetual Calendar', 'Moon Phases'],
    tagline: 'Precision Swiss mechanical horology engineered for timeless elegance.'
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);

  const handleCreateWatch = (e) => {
    e.preventDefault();
    addWatch({
      ...newWatchData,
      id: `chr-${Date.now()}`
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateWatch(editingWatch);
    setEditingWatch(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] pt-8 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-cinzel tracking-[0.3em] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Maison Chronova Concierge & Command</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-100">
              Geneva Master Atelier Console
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-wider rounded shadow flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Timepiece</span>
            </button>
            <button 
              onClick={() => navigateTo('home')}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs uppercase tracking-wider rounded border border-white/10"
            >
              Exit to Maison
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#0D1018] border border-amber-500/20 rounded-xl p-5 shadow-xl">
            <div className="flex justify-between items-center text-slate-400 text-xs uppercase font-cinzel">
              <span>Acquisition Volume</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-cinzel text-2xl font-bold text-amber-300 mt-2">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">2 Live High-Complication Orders</div>
          </div>

          <div className="bg-[#0D1018] border border-amber-500/20 rounded-xl p-5 shadow-xl">
            <div className="flex justify-between items-center text-slate-400 text-xs uppercase font-cinzel">
              <span>Timepieces in Vault</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-cinzel text-2xl font-bold text-slate-100 mt-2">
              {watches.length} Models
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Across 5 Horological Collections</div>
          </div>

          <div className="bg-[#0D1018] border border-amber-500/20 rounded-xl p-5 shadow-xl">
            <div className="flex justify-between items-center text-slate-400 text-xs uppercase font-cinzel">
              <span>VIP Salon Bookings</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-cinzel text-2xl font-bold text-slate-100 mt-2">
              {appointments.length} Scheduled
            </div>
            <div className="text-[11px] text-amber-400 mt-1">Geneva & London Flagships</div>
          </div>

          <div className="bg-[#0D1018] border border-amber-500/20 rounded-xl p-5 shadow-xl">
            <div className="flex justify-between items-center text-slate-400 text-xs uppercase font-cinzel">
              <span>Client Inquiries</span>
              <MessageSquare className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-cinzel text-2xl font-bold text-slate-100 mt-2">
              {inquiries.length} Active
            </div>
            <div className="text-[11px] text-amber-400 mt-1">Bespoke Commissions Pending</div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex border-b border-white/10 overflow-x-auto space-x-8 mb-8 text-xs uppercase tracking-[0.25em] font-cinzel">
          <button
            onClick={() => setActiveAdminTab('inventory')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeAdminTab === 'inventory' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Watch Inventory ({watches.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeAdminTab === 'orders' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Client Acquisitions ({orders.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('appointments')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeAdminTab === 'appointments' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Salon Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('inquiries')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeAdminTab === 'inquiries' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Client Inquiries ({inquiries.length})
          </button>
        </div>

        {/* TAB 1: WATCH INVENTORY TABLE */}
        {activeAdminTab === 'inventory' && (
          <div className="bg-[#0B0D14] border border-amber-500/20 rounded-xl overflow-x-auto shadow-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#08090C] border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-400 font-cinzel">
                <tr>
                  <th className="p-4">Timepiece Model</th>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Calibre</th>
                  <th className="p-4">Collection</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {watches.map(watch => (
                  <tr key={watch.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={watch.images[0]} alt={watch.name} className="w-10 h-10 object-contain" />
                      <div>
                        <span className="font-serif font-bold text-slate-100 block">{watch.name}</span>
                        <span className="text-[10px] text-slate-500">{watch.movementType}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-400">{watch.ref}</td>
                    <td className="p-4 font-mono text-slate-200">{watch.calibre}</td>
                    <td className="p-4 text-amber-400">{watch.collection}</td>
                    <td className="p-4 font-cinzel font-bold text-amber-300">{formatPrice(watch.price)}</td>
                    <td className="p-4">
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                        {watch.availability}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => setEditingWatch(watch)}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/15 text-amber-300"
                        title="Edit Specs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteWatch(watch.id)}
                        className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-red-400"
                        title="Delete from Catalog"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-4">
            {orders.map(order => (
              <div 
                key={order.id}
                className="bg-[#0B0E16] border border-amber-500/20 rounded-xl p-6 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400">{order.id}</span>
                    <h3 className="font-serif text-lg font-bold text-slate-100">{order.watchName} ({order.ref})</h3>
                    <p className="text-xs text-slate-400">Patron: {order.customerName} ({order.customerEmail})</p>
                  </div>
                  <div className="text-right">
                    <div className="font-cinzel text-lg font-bold text-amber-300">{formatPrice(order.price)}</div>
                    <div className="text-xs text-slate-400">{order.paymentMethod}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10 text-xs">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">Update Status:</span>
                  {[
                    "Order Confirmed — Handcrafting",
                    "Calibre Tested & Certified",
                    "Armored Courier In Transit",
                    "Delivered & Certified"
                  ].map(status => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(order.id, status)}
                      className={`px-3 py-1 rounded text-[11px] border transition-colors ${
                        order.status === status
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SALON APPOINTMENTS MANAGEMENT */}
        {activeAdminTab === 'appointments' && (
          <div className="space-y-4">
            {appointments.map(apt => (
              <div 
                key={apt.id}
                className="bg-[#0B0E16] border border-amber-500/20 rounded-xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-amber-400">{apt.id}</span>
                    <h3 className="font-serif text-base font-bold text-slate-100">{apt.name}</h3>
                    <span className="text-xs text-slate-400">({apt.email} • {apt.phone})</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Salon: <strong>{apt.boutiqueName}</strong> • Date: <strong>{apt.date} at {apt.timeSlot}</strong>
                  </div>
                  <div className="text-xs text-slate-400">
                    Timepiece Interest: <em>{apt.timepieceInterest}</em> • Concierge: <em>{apt.conciergeAssigned}</em>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateAppointmentStatus(apt.id, 'Confirmed & Salon Prepared')}
                    className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded text-xs"
                  >
                    Confirm Salon
                  </button>
                  <button 
                    onClick={() => updateAppointmentStatus(apt.id, 'Reschedule Requested')}
                    className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded text-xs"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: INQUIRIES MANAGEMENT */}
        {activeAdminTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.map(inq => (
              <div 
                key={inq.id}
                className="bg-[#0B0E16] border border-amber-500/20 rounded-xl p-6 shadow-xl space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-amber-400">{inq.id}</span>
                    <h3 className="font-serif text-base font-bold text-slate-100">{inq.subject}</h3>
                    <div className="text-xs text-slate-400">From: {inq.name} ({inq.email}) • Date: {inq.date}</div>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {inq.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 bg-[#08090E] p-3 rounded border border-white/5">
                  "{inq.message}"
                </p>
                <div className="flex space-x-2 pt-2">
                  <button 
                    onClick={() => updateInquiryStatus(inq.id, 'Replied via Geneva Concierge')}
                    className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-xs"
                  >
                    Mark as Replied
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ADD TIMEPIECE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative bg-[#0E1119] border border-amber-500/40 rounded-xl max-w-xl w-full p-6 shadow-2xl z-10 text-slate-200">
            <h3 className="font-cinzel text-lg font-bold text-amber-200">Catalog New Masterpiece</h3>
            
            <form onSubmit={handleCreateWatch} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Timepiece Model Name</label>
                <input 
                  type="text" 
                  value={newWatchData.name}
                  onChange={(e) => setNewWatchData({ ...newWatchData, name: e.target.value })}
                  placeholder="e.g. Celestial Tourbillon Chrono"
                  required
                  className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Reference</label>
                  <input 
                    type="text" 
                    value={newWatchData.ref}
                    onChange={(e) => setNewWatchData({ ...newWatchData, ref: e.target.value })}
                    required
                    className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Price in CHF</label>
                  <input 
                    type="number" 
                    value={newWatchData.price}
                    onChange={(e) => setNewWatchData({ ...newWatchData, price: Number(e.target.value) })}
                    required
                    className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Collection</label>
                  <select 
                    value={newWatchData.collection}
                    onChange={(e) => setNewWatchData({ ...newWatchData, collection: e.target.value })}
                    className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Grand Complications">Grand Complications</option>
                    <option value="Complications">Complications</option>
                    <option value="Calatrava & Dress">Calatrava & Dress</option>
                    <option value="Aquanautic Sport">Aquanautic Sport</option>
                    <option value="Skeleton Heritage">Skeleton Heritage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Case Material</label>
                  <input 
                    type="text" 
                    value={newWatchData.caseMaterial}
                    onChange={(e) => setNewWatchData({ ...newWatchData, caseMaterial: e.target.value })}
                    className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Calibre Designation</label>
                <input 
                  type="text" 
                  value={newWatchData.calibre}
                  onChange={(e) => setNewWatchData({ ...newWatchData, calibre: e.target.value })}
                  className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex space-x-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2.5 px-4 bg-white/5 rounded text-slate-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold uppercase text-xs tracking-wider rounded"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TIMEPIECE MODAL */}
      {editingWatch && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setEditingWatch(null)} />
          <div className="relative bg-[#0E1119] border border-amber-500/40 rounded-xl max-w-xl w-full p-6 shadow-2xl z-10 text-slate-200">
            <h3 className="font-cinzel text-lg font-bold text-amber-200">Edit Timepiece: {editingWatch.name}</h3>
            
            <form onSubmit={handleSaveEdit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Timepiece Model Name</label>
                <input 
                  type="text" 
                  value={editingWatch.name}
                  onChange={(e) => setEditingWatch({ ...editingWatch, name: e.target.value })}
                  className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Price (CHF)</label>
                  <input 
                    type="number" 
                    value={editingWatch.price}
                    onChange={(e) => setEditingWatch({ ...editingWatch, price: Number(e.target.value) })}
                    className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Availability</label>
                  <input 
                    type="text" 
                    value={editingWatch.availability}
                    onChange={(e) => setEditingWatch({ ...editingWatch, availability: e.target.value })}
                    className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setEditingWatch(null)}
                  className="py-2.5 px-4 bg-white/5 rounded text-slate-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold uppercase text-xs tracking-wider rounded"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
