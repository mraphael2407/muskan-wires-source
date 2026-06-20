import { useEffect, useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Mail,
  Handshake,
  Newspaper,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Phone,
  MapPin,
  Calendar,
  Tag,
  MessageSquare,
  CheckCircle,
  Eye,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  Circle,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Check,
  Ban,
  CircleCheck,
  Star,
  Settings,
  LogOut,
  TrendingUp,
  Package,
  BarChart3,
  CircleDot,
  ArrowLeft,
  ExternalLink,
  Copy,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const edgeFnHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${supabaseAnonKey}`,
};

const tabs = [
  { id: 'leads', label: 'Leads', icon: Users, count: 0, table: 'Leads' },
  { id: 'quotes', label: 'Quote Requests', icon: FileText, count: 0, table: 'Quote Requests' },
  { id: 'dealers', label: 'Dealer Applications', icon: Handshake, count: 0, table: 'Dealer Applications' },
  { id: 'contacts', label: 'Contact Messages', icon: Mail, count: 0, table: 'Contact Messages' },
  { id: 'newsletter', label: 'Newsletter', icon: Newspaper, count: 0, table: 'Newsletter Subscribers' },
];

const statusOptions: Record<string, string[]> = {
  leads: ['new', 'contacted', 'qualified', 'converted', 'lost'],
  quotes: ['pending', 'reviewing', 'quoted', 'accepted', 'rejected'],
  dealers: ['pending', 'reviewing', 'approved', 'rejected'],
  contacts: ['unread', 'read', 'replied'],
  newsletter: ['active', 'inactive'],
};

const statusColors: Record<string, { bg: string; text: string; border: string; icon: any }> = {
  new: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: CircleDot },
  contacted: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', icon: Phone },
  qualified: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: Star },
  converted: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  lost: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: XCircle },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
  reviewing: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: Eye },
  quoted: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: FileText },
  accepted: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: Ban },
  approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  unread: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: CircleDot },
  read: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: Eye },
  replied: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  active: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  inactive: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: XCircle },
};

function formatDate(dateStr: string) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatDateShort(dateStr: string) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function StatusBadge({ status }: { status: string }) {
  const config = statusColors[status] || statusColors.new;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="capitalize">{status}</span>
    </span>
  );
}

function DetailModal({ item, tab, onClose, onUpdate }: { item: any; tab: string; onClose: () => void; onUpdate: (id: string, status: string) => void }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const options = statusOptions[tab] || [];

  const handleUpdate = async (status: string) => {
    setIsUpdating(true);
    await onUpdate(item.id, status);
    setIsUpdating(false);
  };

  const fields = tab === 'leads' ? [
    { label: 'Name', value: item.name },
    { label: 'Phone', value: item.phone },
    { label: 'Email', value: item.email },
    { label: 'Company', value: item.company },
    { label: 'City', value: item.city },
    { label: 'Product Interest', value: item.product_interest?.join(', ') },
    { label: 'Project Type', value: item.project_type },
    { label: 'Quantity', value: item.quantity },
    { label: 'Timeline', value: item.timeline },
    { label: 'Budget', value: item.budget },
    { label: 'Specifications', value: item.specifications },
    { label: 'Additional Info', value: item.additional_info },
    { label: 'Source', value: item.source },
    { label: 'Status', value: item.status },
    { label: 'Created', value: formatDate(item.created_at) },
  ] : tab === 'quotes' ? [
    { label: 'Name', value: item.name },
    { label: 'Phone', value: item.phone },
    { label: 'Email', value: item.email },
    { label: 'Company', value: item.company },
    { label: 'City', value: item.city },
    { label: 'Products', value: item.products?.join(', ') },
    { label: 'Project Type', value: item.project_type },
    { label: 'Quantity', value: item.quantity },
    { label: 'Timeline', value: item.timeline },
    { label: 'Budget', value: item.budget },
    { label: 'Specifications', value: item.specifications },
    { label: 'Additional Info', value: item.additional_info },
    { label: 'Status', value: item.status },
    { label: 'Created', value: formatDate(item.created_at) },
  ] : tab === 'dealers' ? [
    { label: 'Name', value: item.name },
    { label: 'Phone', value: item.phone },
    { label: 'Email', value: item.email },
    { label: 'Business Name', value: item.business_name },
    { label: 'Business Type', value: item.business_type },
    { label: 'City', value: item.city },
    { label: 'State', value: item.state },
    { label: 'Experience', value: item.experience },
    { label: 'Investment Capacity', value: item.investment_capacity },
    { label: 'Storage Capacity', value: item.storage_capacity },
    { label: 'Message', value: item.message },
    { label: 'Status', value: item.status },
    { label: 'Created', value: formatDate(item.created_at) },
  ] : tab === 'contacts' ? [
    { label: 'Name', value: item.name },
    { label: 'Phone', value: item.phone },
    { label: 'Email', value: item.email },
    { label: 'Subject', value: item.subject },
    { label: 'Message', value: item.message },
    { label: 'Status', value: item.status },
    { label: 'Created', value: formatDate(item.created_at) },
  ] : [
    { label: 'Email', value: item.email },
    { label: 'Status', value: item.is_active ? 'Active' : 'Inactive' },
    { label: 'Subscribed', value: formatDate(item.subscribed_at) },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-forge">
              {tab === 'newsletter' ? item.email : item.name || 'Detail'}
            </h2>
            <p className="text-sm text-steel mt-1">
              {tab === 'newsletter' ? 'Newsletter Subscriber' : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Entry`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={item.status} />
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-steel" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {tab !== 'newsletter' && (
            <div className="flex flex-wrap gap-2 mb-4">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleUpdate(opt)}
                  disabled={isUpdating || item.status === opt}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    item.status === opt
                      ? 'bg-forge text-white'
                      : 'bg-gray-100 text-steel hover:bg-gray-200'
                  }`}
                >
                  {isUpdating && item.status !== opt ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin inline mr-1" />
                  ) : null}
                  <span className="capitalize">{opt}</span>
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {fields.map((f, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-medium text-galvanized uppercase w-28 flex-shrink-0">{f.label}</span>
                <span className="text-sm text-forge">{f.value || '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('leads');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState<string>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({ total: 0, new: 0, thisMonth: 0, today: 0 });
  const pageSize = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/admin-data/${activeTab}`, {
        headers: edgeFnHeaders,
      });
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json.data || []);
      setCurrentPage(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const newItems = data.filter((d) => {
      const status = d.status || 'new';
      return status === 'new' || status === 'pending' || status === 'unread';
    });
    const monthItems = data.filter((d) => d.created_at && new Date(d.created_at) >= monthStart);
    const todayItems = data.filter((d) => d.created_at && new Date(d.created_at) >= todayStart);
    setStats({
      total: data.length,
      new: newItems.length,
      thisMonth: monthItems.length,
      today: todayItems.length,
    });
  }, [data]);

  const filteredData = useMemo(() => {
    let d = [...data];
    if (search.trim()) {
      const s = search.toLowerCase();
      d = d.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(s)
        )
      );
    }
    if (statusFilter !== 'all') {
      d = d.filter((row) => row.status === statusFilter);
    }
    d.sort((a, b) => {
      const aVal = a[sortKey] || '';
      const bVal = b[sortKey] || '';
      if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
    return d;
  }, [data, search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginated = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/admin-data/${activeTab}/${id}`, {
        method: 'PUT',
        headers: edgeFnHeaders,
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Update failed');
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status });
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 text-galvanized" />;
    return sortDir === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-rust" /> : <ArrowDown className="w-3.5 h-3.5 text-rust" />;
  };

  const columns = {
    leads: [
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'city', label: 'City' },
      { key: 'product_interest', label: 'Products' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Date' },
    ],
    quotes: [
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'city', label: 'City' },
      { key: 'products', label: 'Products' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Date' },
    ],
    dealers: [
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'business_name', label: 'Business' },
      { key: 'city', label: 'City' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Date' },
    ],
    contacts: [
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'subject', label: 'Subject' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Date' },
    ],
    newsletter: [
      { key: 'email', label: 'Email' },
      { key: 'is_active', label: 'Active' },
      { key: 'subscribed_at', label: 'Date' },
    ],
  };

  const cellValue = (row: any, key: string) => {
    if (key === 'created_at' || key === 'subscribed_at') return formatDateShort(row[key]);
    if (key === 'status') return <StatusBadge status={row[key]} />;
    if (key === 'is_active') return row[key] ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-500" />;
    if (key === 'product_interest') return row[key]?.join(', ') || '—';
    if (key === 'products') return row[key]?.join(', ') || '—';
    return row[key] || '—';
  };

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const currentColumns = columns[activeTab as keyof typeof columns] || columns.leads;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-forge text-white flex-shrink-0 transition-all duration-300 flex flex-col`}
      >
        <div className={`h-16 flex items-center border-b border-white/10 ${sidebarCollapsed ? 'justify-center' : 'px-6'}`}>
          {!sidebarCollapsed && (
            <>
              <div className="w-8 h-8 bg-rust rounded flex items-center justify-center mr-3">
                <span className="font-barlow-condensed font-extrabold text-sm">MW</span>
              </div>
              <span className="font-barlow-condensed font-bold text-lg tracking-wide">Admin</span>
            </>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-rust rounded flex items-center justify-center">
              <span className="font-barlow-condensed font-extrabold text-sm">MW</span>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all relative ${
                  isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title={tab.label}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">{tab.label}</span>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{stats.total}</span>
                  </>
                )}
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-rust" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm text-steel">
            <LayoutDashboard className="w-4 h-4" />
            <span className="font-medium text-forge">Dashboard</span>
            <span className="text-gray-300">/</span>
            <span className="capitalize">{currentTab.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-steel hover:text-rust flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {[
            { label: 'Total Entries', value: stats.total, icon: BarChart3, color: 'bg-blue-50 text-blue-600' },
            { label: 'New / Pending', value: stats.new, icon: CircleDot, color: 'bg-amber-50 text-amber-600' },
            { label: 'This Month', value: stats.thisMonth, icon: Calendar, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Today', value: stats.today, icon: TrendingUp, color: 'bg-rust/10 text-rust' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-lg border border-gray-100 p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-forge">{stat.value}</p>
                  <p className="text-xs text-steel">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="px-6 pb-4">
          <div className="bg-white rounded-lg border border-gray-100 p-4 flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-galvanized" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search by name, email, phone, city..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-forge focus:border-rust focus:ring-1 focus:ring-rust outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-galvanized" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-forge focus:border-rust focus:outline-none"
              >
                <option value="all">All Status</option>
                {(statusOptions[activeTab] || []).map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-steel hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 px-6 pb-6 overflow-hidden">
          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden flex flex-col h-full">
            {/* Table Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-forge text-sm">{currentTab.table}</h3>
              <span className="text-xs text-steel">{filteredData.length} entries</span>
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-rust animate-spin" />
              </div>
            ) : error ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                  <button onClick={fetchData} className="mt-3 text-sm text-rust hover:underline">Try again</button>
                </div>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Search className="w-10 h-10 text-galvanized mx-auto mb-2" />
                  <p className="text-sm text-steel font-medium">No entries found</p>
                  <p className="text-xs text-galvanized mt-1">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-auto flex-1">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {currentColumns.map((col) => (
                          <th
                            key={col.key}
                            onClick={() => handleSort(col.key)}
                            className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                          >
                            <div className="flex items-center gap-1">
                              {col.label}
                              <SortIcon col={col.key} />
                            </div>
                          </th>
                        ))}
                        <th className="text-left px-4 py-3 text-xs font-semibold text-steel uppercase tracking-wider w-16">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginated.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                          onClick={() => setSelectedItem(row)}
                        >
                          {currentColumns.map((col) => (
                            <td key={col.key} className="px-4 py-3 text-forge whitespace-nowrap">
                              {cellValue(row, col.key)}
                            </td>
                          ))}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedItem(row); }}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                title="View details"
                              >
                                <Eye className="w-4 h-4 text-steel" />
                              </button>
                              {activeTab !== 'newsletter' && (
                                <div className="relative">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); }}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Change status"
                                  >
                                    <ChevronDown className="w-4 h-4 text-steel" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                  <span className="text-xs text-steel">
                    Showing {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)}–{Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                          currentPage === p
                            ? 'bg-rust text-white'
                            : 'text-steel hover:bg-gray-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          tab={activeTab}
          onClose={() => setSelectedItem(null)}
          onUpdate={handleUpdateStatus}
        />
      )}
    </div>
  );
}
