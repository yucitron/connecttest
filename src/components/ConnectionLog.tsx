
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Terminal, Info, CheckCircle, XCircle } from 'lucide-react';

interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'error';
}

interface ConnectionLogProps {
  logs: LogEntry[];
}

const ConnectionLog: React.FC<ConnectionLogProps> = ({ logs }) => {
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-slate-300';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-400/20 text-green-400 border-green-400';
      case 'error':
        return 'bg-red-400/20 text-red-400 border-red-400';
      default:
        return 'bg-blue-400/20 text-blue-400 border-blue-400';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Terminal className="w-5 h-5" />
          <span>Connection Log</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full rounded-md border border-slate-700 bg-slate-900/50 p-4">
          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-3 text-sm font-mono"
              >
                <Badge
                  variant="outline"
                  className={`${getBadgeVariant(log.type)} text-xs px-2 py-1 min-w-fit`}
                >
                  {log.timestamp}
                </Badge>
                <div className="flex items-center space-x-2 flex-1">
                  {getLogIcon(log.type)}
                  <span className={getLogColor(log.type)}>{log.message}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ConnectionLog;
