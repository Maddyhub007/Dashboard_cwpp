import React, { useState } from 'react';
import { Search, Plus, X, BarChart3, Shield, Scan, Ticket } from 'lucide-react';
import { Category, Widget, DashboardData } from '../types/dashboard';
import { initialDashboardData } from '../data/dashboardData';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboardData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category => 
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(widget => widget.id !== widgetId)
            }
          : category
      )
    }));
  };

  const handleAddWidget = (categoryId: string, widget: Widget) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              widgets: [...category.widgets, { ...widget, id: `${widget.id}-${Date.now()}` }]
            }
          : category
      )
    }));
  };

  const handleAddCustomWidget = (categoryId: string, widgetName: string, widgetText: string) => {
    const newWidget: Widget = {
      id: `custom-${Date.now()}`,
      name: widgetName,
      text: widgetText,
      type: 'metric'
    };
    
    handleAddWidget(categoryId, newWidget);
  };

  const openAddWidgetModal = (categoryId?: string) => {
    setSelectedCategory(categoryId || '');
    setIsAddWidgetModalOpen(true);
  };

  const filteredCategories = dashboardData.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'cspm':
        return <Shield className="w-5 h-5 text-blue-600" />;
      case 'cwpp':
        return <BarChart3 className="w-5 h-5 text-indigo-600" />;
      case 'registry':
        return <Scan className="w-5 h-5 text-green-600" />;
      case 'ticket':
        return <Ticket className="w-5 h-5 text-amber-600" />;
      default:
        return <BarChart3 className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">CNAPP Dashboard</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => openAddWidgetModal()}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Widget</span>
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(category.id)}
                <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
              </div>
              <button
                onClick={() => openAddWidgetModal(category.id)}
                className="inline-flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Widget</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.widgets.map((widget) => (
                <WidgetCard
                  key={`${category.id}-${widget.id}`}
                  widget={widget}
                  categoryId={category.id}
                  onRemove={handleRemoveWidget}
                />
              ))}
              
              {/* Add Widget Card */}
              <div
                onClick={() => openAddWidgetModal(category.id)}
                className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                  <Plus className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-gray-600 group-hover:text-blue-700 font-medium transition-colors">Add Widget</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Widget Modal */}
      {isAddWidgetModalOpen && (
        <AddWidgetModal
          dashboardData={dashboardData}
          selectedCategory={selectedCategory}
          onClose={() => setIsAddWidgetModalOpen(false)}
          onAddWidget={handleAddWidget}
          onAddCustomWidget={handleAddCustomWidget}
        />
      )}
    </div>
  );
};

export default Dashboard;