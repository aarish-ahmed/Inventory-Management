import { useState, useEffect } from "react";
import { dashboardApi } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [dashboardData, setDashboardData] = useState({
    summary: {},
    monthly: [],
    recentSales: [],
    recentPurchases: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const getAnalytics = async () => {
    try {
      const { res, data } = await dashboardApi();
      if (res.ok) {
        setDashboardData(data);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-slate-500 font-sans h-screen flex items-center justify-center bg-slate-100">Loading dashboard...</div>;
  }

  return (
    <div className="flex h-screen bg-[#f4f7fe] font-sans overflow-hidden">
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-14 bg-white flex items-center justify-end px-6 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-5">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">⚙️</button>
            <div className="relative cursor-pointer">
              <span className="text-slate-400 hover:text-slate-600 transition-colors">🔔</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-100 pl-5 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-lg">
                🧑‍💼
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">{user?.username || 'User'}</span>
                <span className="text-xs text-slate-400 font-medium">{user?.role || 'Admin'}</span>
              </div>
              <span className="text-xs text-slate-400 ml-1">▼</span>
            </div>
          </div>
        </header>

        {/* DASHBOARD AREA - Flex container to manage vertical space */}
        <main className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
          
          {message && (
            <div className="p-3 bg-red-100 text-red-700 rounded-xl font-medium shrink-0">
              {message}
            </div>
          )}

          {/* PAGE TITLE & DATE FILTER */}
          <div className="flex justify-between items-center shrink-0">
            <h1 className="text-xl font-bold text-indigo-900">Dashboard</h1>
            <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-500 font-medium flex items-center gap-2 cursor-pointer shadow-sm">
              Current Year Analytics
            </div>
          </div>

          {/* SUMMARY CARDS (Top Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xl shadow-md shadow-blue-500/30">
                📊
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  ৳{Number(dashboardData.summary.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h3>
                <p className="text-slate-400 text-xs font-medium mt-0.5">Total Sales Revenue</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center text-white text-xl shadow-md shadow-purple-600/30">
                💲
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  ৳{Number(dashboardData.summary.totalPurchaseCost || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h3>
                <p className="text-slate-400 text-xs font-medium mt-0.5">Total Purchase Cost</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-pink-500 flex items-center justify-center text-white text-xl shadow-md shadow-pink-500/30">
                📦
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {dashboardData.summary.totalUnitsSold || 0}
                </h3>
                <p className="text-slate-400 text-xs font-medium mt-0.5">Total Units Sold</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-sky-400 flex items-center justify-center text-white text-xl shadow-md shadow-sky-400/30">
                📥
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {dashboardData.summary.totalProducts || 0}
                </h3>
                <p className="text-slate-400 text-xs font-medium mt-0.5">Total Product Types</p>
              </div>
            </div>

          </div>

          {/* CHARTS (Middle Row) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 shrink-0 h-48 lg:h-56">
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex justify-between items-center mb-2 shrink-0">
                <h3 className="text-indigo-900 font-bold text-sm">Revenue vs Costs</h3>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.monthly}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(value) => `${value >= 1000 ? (value / 1000) + 'k' : value}`} dx={-5} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', top: -10 }} />
                    <Line type="monotone" name="Revenue" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} />
                    <Line type="monotone" name="Cost" dataKey="cost" stroke="#38bdf8" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex justify-between items-center mb-2 shrink-0">
                <h3 className="text-indigo-900 font-bold text-sm">Purchase Summary</h3>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.monthly}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(value) => `${value >= 1000 ? (value / 1000) + 'k' : value}`} dx={-5} />
                    <Tooltip />
                    <Line type="monotone" dataKey="purchases" name="Purchases" stroke="#38bdf8" strokeWidth={2} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex justify-between items-center mb-2 shrink-0">
                <h3 className="text-indigo-900 font-bold text-sm">Units Sold</h3>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.monthly} barSize={8}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(value) => `${value >= 1000 ? (value / 1000) + 'k' : value}`} dx={-5} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="unitsSold" name="Units" fill="#38bdf8" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* TABLES (Bottom Row) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
            
            {/* Sales Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-50 shrink-0">
                <h3 className="text-indigo-900 font-bold text-sm">Recent Sales</h3>
              </div>
              <div className="overflow-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-slate-100">
                      <th className="py-2 px-4 text-slate-500 text-xs font-semibold">Order ID</th>
                      <th className="py-2 px-4 text-slate-500 text-xs font-semibold">Date</th>
                      <th className="py-2 px-4 text-slate-500 text-xs font-semibold text-center">Quantity</th>
                      <th className="py-2 px-4 text-slate-500 text-xs font-semibold text-right">Order Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentSales.map((sale) => (
                      <tr key={sale._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                        <td className="py-2.5 px-4 text-slate-800 font-medium text-xs">
                          OR-{sale._id.toString().substring(0, 6).toUpperCase()}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500 text-xs">
                          {new Date(sale.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500 text-xs text-center">
                          {sale.quantity || 0}
                        </td>
                        <td className="py-2.5 px-4 text-right text-slate-800 font-bold text-xs">
                          ৳{Number(sale.subtotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                    {dashboardData.recentSales.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-4 text-center text-slate-500 text-sm">No recent sales found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Purchase Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-50 shrink-0">
                <h3 className="text-indigo-900 font-bold text-sm">Recent Purchases</h3>
              </div>
              <div className="overflow-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-slate-100">
                      <th className="py-2 px-4 text-slate-500 text-xs font-semibold">Order ID</th>
                      <th className="py-2 px-4 text-slate-500 text-xs font-semibold">Date</th>
                      <th className="py-2 px-4 text-slate-500 text-xs font-semibold text-center">Quantity</th>
                      <th className="py-2 px-4 text-slate-500 text-xs font-semibold text-right">Order Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentPurchases.map((purchase) => (
                      <tr key={purchase._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                        <td className="py-2.5 px-4 text-slate-800 font-medium text-xs">
                          PO-{purchase._id.toString().substring(0, 6).toUpperCase()}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500 text-xs">
                          {new Date(purchase.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500 text-xs text-center">
                          {purchase.quantity || 0}
                        </td>
                        <td className="py-2.5 px-4 text-right text-slate-800 font-bold text-xs">
                          ৳{Number(purchase.subtotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                    {dashboardData.recentPurchases.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-4 text-center text-slate-500 text-sm">No recent purchases found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;