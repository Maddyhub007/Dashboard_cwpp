export interface Widget {
  id: string;
  name: string;
  text: string;
  type: 'chart' | 'metric' | 'alert' | 'scan';
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
  availableWidgets: {
    [categoryId: string]: Widget[];
  };
}