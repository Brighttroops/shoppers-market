import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Package, DollarSign, Leaf, Heart } from 'lucide-react';
import { AnalyticsData } from '../types';

interface AnalyticsDashboardProps {
  analytics: AnalyticsData;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ analytics }) => {
  const COLORS = ['#4F46E5', '#F43F5E', '#10B981', '#F59E0B'];

  const sustainabilityMetrics = {
    carbonSaved: 1250,
    charityRaised: 3420,
    ecoFriendlyProducts: 15
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalSales.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12.5%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+8.2%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Carbon Saved</p>
              <p className="text-2xl font-bold text-gray-900">{sustainabilityMetrics.carbonSaved} kg</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600">Sustainability Impact</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Charity Raised</p>
              <p className="text-2xl font-bold text-gray-900">${sustainabilityMetrics.charityRaised}</p>
            </div>
            <div className="p-3 bg-rose-100 rounded-full">
              <Heart className="h-6 w-6 text-rose-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-rose-600">Community Impact</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                //@ts-ignore
                label={({ category, value }) => `${category}: $${value.toLocaleString()}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="sales"
              >
                {analytics.salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analytics.topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-indigo-600">#{index + 1}</span>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Leaf className="h-5 w-5 text-green-600 mr-2" />
          Sustainability Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{sustainabilityMetrics.carbonSaved} kg</div>
            <div className="text-sm text-gray-600">CO₂ Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">${sustainabilityMetrics.charityRaised}</div>
            <div className="text-sm text-gray-600">Charity Donations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{sustainabilityMetrics.ecoFriendlyProducts}</div>
            <div className="text-sm text-gray-600">Eco-Friendly Products</div>
          </div>
        </div>
      </div>
    </div>
  );
};