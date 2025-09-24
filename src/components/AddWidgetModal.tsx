import React, { useState } from 'react';
import { X, Plus, Shield, BarChart3, Scan, Ticket } from 'lucide-react';
import { Widget, DashboardData } from '../types/dashboard';

interface AddWidgetModalProps {
  dashboardData: DashboardData;
  selectedCategory: string;
  onClose: () => void;
  onAddWidget: (categoryId: string, widget: Widget) => void;
  onAddCustomWidget: (categoryId: string, widgetName: string, widgetText: string) => void;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  dashboardData,
  selectedCategory,
  onClose,
  onAddWidget,
  onAddCustomWidget
}) => {
  const [activeTab, setActiveTab] = useState(selectedCategory || 'cspm');
  const [selectedWidgets, setSelectedWidgets] = useState<{ [key: string]: boolean }>({});
  const [customWidgetName, setCustomWidgetName] = useState('');
  const [customWidgetText, setCustomWidgetText] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  const categories = [
    { id: 'cspm', name: 'CSPM', icon: Shield, color: 'text-blue-600' },
    { id: 'cwpp', name: 'CWPP', icon: BarChart3, color: 'text-indigo-600' },
    { id: 'registry', name: 'Image', icon: Scan, color: 'text-green-600' },
    { id: 'ticket', name: 'Ticket', icon: Ticket, color: 'text-amber-600' }
  ];

  const handleWidgetToggle = (categoryId: string, widgetId: string) => {
    const key = `${categoryId}-${widgetId}`;
    setSelectedWidgets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleConfirm = () => {
    // Add selected widgets
    Object.entries(selectedWidgets).forEach(([key, isSelected]) => {
      if (isSelected) {
        const [categoryId, widgetId] = key.split('-');
        const widget = dashboardData.availableWidgets[categoryId]?.find(w => w.id === widgetId);
        if (widget) {
          onAddWidget(categoryId, widget);
        }
      }
    });

    // Add custom widget if form is filled
    if (showCustomForm && customWidgetName.trim() && customWidgetText.trim()) {
      onAddCustomWidget(activeTab, customWidgetName.trim(), customWidgetText.trim());
    }

    onClose();
  };

  const isWidgetAlreadyAdded = (categoryId: string, widgetId: string) => {
    const category = dashboardData.categories.find(cat => cat.id === categoryId);
    return category?.widgets.some(widget => widget.id === widgetId) || false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Widget</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <p className="text-gray-600 mb-6">
            Personalise your dashboard by adding the following widget
          </p>

          {/* Category Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all font-medium ${
                    activeTab === category.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${category.color}`} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Widget List */}
          <div className="space-y-3 mb-6">
            {dashboardData.availableWidgets[activeTab]?.map((widget) => {
              const key = `${activeTab}-${widget.id}`;
              const isAlreadyAdded = isWidgetAlreadyAdded(activeTab, widget.id);
              
              return (
                <div
                  key={widget.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                    isAlreadyAdded
                      ? 'bg-gray-50 border-gray-200'
                      : selectedWidgets[key]
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={key}
                      checked={selectedWidgets[key] || false}
                      disabled={isAlreadyAdded}
                      onChange={() => handleWidgetToggle(activeTab, widget.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <label
                      htmlFor={key}
                      className={`font-medium cursor-pointer ${
                        isAlreadyAdded ? 'text-gray-500' : 'text-gray-900'
                      }`}
                    >
                      {widget.name}
                      {isAlreadyAdded && (
                        <span className="ml-2 text-xs text-gray-500">(Already added)</span>
                      )}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Widget Form */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Widget</span>
            </button>

            {showCustomForm && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Widget Name
                  </label>
                  <input
                    type="text"
                    value={customWidgetName}
                    onChange={(e) => setCustomWidgetName(e.target.value)}
                    placeholder="Enter widget name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Widget Text
                  </label>
                  <textarea
                    value={customWidgetText}
                    onChange={(e) => setCustomWidgetText(e.target.value)}
                    placeholder="Enter widget content..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;