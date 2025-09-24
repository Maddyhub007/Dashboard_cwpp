import { DashboardData } from '../types/dashboard';

export const initialDashboardData: DashboardData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Connected (2)\nNot Connected (2)',
          type: 'metric'
        },
        {
          id: 'risk-assessment',
          name: 'Cloud Account Risk Assessment',
          text: 'Failed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)',
          type: 'chart'
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          type: 'alert'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          type: 'alert'
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          text: '1470 total vulnerabilities\nCritical (9)\nHigh (150)',
          type: 'scan'
        },
        {
          id: 'security-issues',
          name: 'Image Security Issues',
          text: '2 total images\nCritical (2)\nHigh (2)',
          type: 'scan'
        }
      ]
    }
  ],
  availableWidgets: {
    cspm: [
      {
        id: 'cloud-accounts',
        name: 'Cloud Accounts',
        text: 'Connected (2)\nNot Connected (2)',
        type: 'metric'
      },
      {
        id: 'risk-assessment',
        name: 'Cloud Account Risk Assessment', 
        text: 'Failed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)',
        type: 'chart'
      },
      {
        id: 'compliance-overview',
        name: 'Compliance Overview',
        text: 'Compliant (85%)\nNon-compliant (15%)',
        type: 'metric'
      },
      {
        id: 'security-score',
        name: 'Security Score',
        text: 'Overall Score: 78/100\nImprovement needed in 3 areas',
        type: 'metric'
      }
    ],
    cwpp: [
      {
        id: 'namespace-alerts',
        name: 'Top 5 Namespace Specific Alerts',
        text: 'No Graph data available!',
        type: 'alert'
      },
      {
        id: 'workload-alerts',
        name: 'Workload Alerts',
        text: 'No Graph data available!',
        type: 'alert'
      },
      {
        id: 'runtime-security',
        name: 'Runtime Security Events',
        text: 'Active threats: 12\nBlocked attacks: 45',
        type: 'alert'
      },
      {
        id: 'container-vulnerabilities',
        name: 'Container Vulnerabilities',
        text: 'Critical: 5\nHigh: 23\nMedium: 67',
        type: 'scan'
      }
    ],
    registry: [
      {
        id: 'image-risk',
        name: 'Image Risk Assessment',
        text: '1470 total vulnerabilities\nCritical (9)\nHigh (150)',
        type: 'scan'
      },
      {
        id: 'security-issues',
        name: 'Image Security Issues',
        text: '2 total images\nCritical (2)\nHigh (2)',
        type: 'scan'
      },
      {
        id: 'malware-scan',
        name: 'Malware Scan Results',
        text: 'Clean images: 156\nSuspicious: 3\nInfected: 1',
        type: 'scan'
      },
      {
        id: 'license-compliance',
        name: 'License Compliance',
        text: 'Approved: 89%\nReview needed: 11%',
        type: 'metric'
      }
    ],
    ticket: [
      {
        id: 'open-tickets',
        name: 'Open Support Tickets',
        text: 'High priority: 3\nMedium priority: 7\nLow priority: 15',
        type: 'metric'
      },
      {
        id: 'resolution-time',
        name: 'Average Resolution Time',
        text: 'Critical: 2.5 hours\nHigh: 8 hours\nMedium: 24 hours',
        type: 'metric'
      }
    ]
  }
};