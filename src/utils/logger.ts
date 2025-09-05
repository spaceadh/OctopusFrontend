type LogType = 'log' | 'info' | 'warn' | 'error' | 'debug';

const getAllowedIps = (): string[] => {
  const ips = import.meta.env.VITE_ALLOWED_DEV_IPS || "";
  return ips.split(",").map((ip: string) => ip.trim()).filter((ip: string | any[]) => ip.length > 0);
};

const isIpAllowed = (clientIp?: string): boolean => {
  if (!clientIp) return false;
  const allowedIps = getAllowedIps();
  return allowedIps.includes(clientIp);
};

export const consoleLogger = (message: string, type: LogType = "log", module: string = "", data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}]${module ? ` [${module.toUpperCase()}]` : ''}`;
  if (import.meta.env.VITE_DEBUG_MODE || isIpAllowed()) {
    switch (type) {
      case 'info':
        console.info(`${prefix} ${message}`, data ?? '');
        break;
      case 'warn':
        console.warn(`${prefix} ${message}`, data ?? '');
        break;
      case 'error':
        console.error(`${prefix} ${message}`, data ?? '');
        break;
      case 'debug':
        console.debug(`${prefix} ${message}`, data ?? '');
        break;
      default:
        console.log(`${prefix} ${message}`, data ?? '');
    }
  } else {
    if (type === 'error' || type === 'warn') {
      console.error(`${prefix} ${message}`, data ?? '');
    }
  }
};