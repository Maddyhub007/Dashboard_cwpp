import React from 'react';
import { X, BarChart3, Activity, Shield, AlertTriangle } from 'lucide-react';
import { Widget } from '../types/dashboard';

interface WidgetCardProps {
  widget: Widget;
  categoryId: string;
  onRemove: (categoryId: string, widgetId: string) => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, categoryId, onRemove }) => {
  const getWidgetIcon = (type: Widget['type']) => {
    switch (type) {
      case 'chart':
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'metric':
        return <Activity className="w-5 h-5 text-green-600" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'scan':
        return <Shield className="w-5 h-5 text-red-600" />;
      default:
        return <BarChart3 className="w-5 h-5 text-gray-600" />;
    }
  };

  const getWidgetContent = () => {
    if (widget.text === 'No Graph data available!') {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">{widget.text}</p>
          </div>
        </div>
      );
    }

    if (widget.type === 'chart' && widget.id === 'risk-assessment') {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-8 border-red-200"></div>
            <div className="absolute inset-0 rounded-full border-8 border-red-500 border-t-transparent border-r-transparent animate-pulse"></div>
            <div className="absolute inset-4 rounded-full border-8 border-amber-200"></div>
            <div className="absolute inset-4 rounded-full border-8 border-amber-500 border-b-transparent border-l-transparent"></div>
            <div className="absolute inset-8 rounded-full border-8 border-green-200"></div>
            <div className="absolute inset-8 rounded-full border-8 border-green-500 border-t-transparent border-r-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">9659</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (widget.type === 'metric' && widget.id === 'cloud-accounts') {
      return (
        <div className="flex-1 flex items-center">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-8 border-blue-200"></div>
              <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent border-r-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
              </div>
            </div>
            <div className="space-y-2">
              {widget.text.split('\n').map((line, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-700">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1">
        <div className="space-y-3">
          {widget.text.split('\n').map((line, index) => {
            const parts = line.split('(');
            if (parts.length === 2) {
              const label = parts[0].trim();
              const value = parts[1].replace(')', '');
              let colorClass = 'text-gray-700';
              
              if (label.toLowerCase().includes('critical')) colorClass = 'text-red-600';
              else if (label.toLowerCase().includes('high')) colorClass = 'text-orange-500';
              else if (label.toLowerCase().includes('failed')) colorClass = 'text-red-500';
              else if (label.toLowerCase().includes('warning')) colorClass = 'text-amber-500';
              else if (label.toLowerCase().includes('passed')) colorClass = 'text-green-500';
              
              return (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className={`text-sm font-semibold ${colorClass}`}>{value}</span>
                </div>
              );
            }
            return (
              <div key={index} className="text-sm text-gray-700">{line}</div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group relative">
      <button
        onClick={() => onRemove(categoryId, widget.id)}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-100"
      >
        <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
      </button>
      
      <div className="flex items-center space-x-3 mb-4">
        {getWidgetIcon(widget.type)}
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{widget.name}</h3>
      </div>
      
      {getWidgetContent()}
    </div>
  );
};

export default WidgetCard;