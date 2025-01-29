/**
 * Formats an Ethereum address to a shortened display format
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Formats a number to ETH with specified decimal places
 */
export const formatEth = (value: number, decimals: number = 4): string => {
  return `${value.toFixed(decimals)} ETH`;
};

/**
 * Formats a date to a relative time string (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return date.toLocaleDateString();
};

/**
 * Formats a health score with a corresponding color class
 */
export const formatHealthScore = (score: number): { value: string; color: string } => {
  let color: string;
  
  if (score >= 80) {
    color = 'text-green-600';
  } else if (score >= 50) {
    color = 'text-yellow-600';
  } else {
    color = 'text-red-600';
  }

  return {
    value: `${Math.round(score)}/100`,
    color
  };
};

/**
 * Formats a risk severity to a color class
 */
export const getRiskSeverityColor = (severity: 'LOW' | 'MEDIUM' | 'HIGH'): string => {
  switch (severity) {
    case 'HIGH':
      return 'bg-red-100 text-red-800';
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-800';
    case 'LOW':
      return 'bg-green-100 text-green-800';
  }
};

/**
 * Formats a large number with appropriate suffixes (K, M, B)
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Formats a percentage value
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};