
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Bot } from 'lucide-react';
import ConnectionLog from './ConnectionLog';

const RobotConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [logs, setLogs] = useState<Array<{id: number, message: string, timestamp: string, type: 'info' | 'success' | 'error'}>>([
    { id: 1, message: 'System initialized', timestamp: new Date().toLocaleTimeString(), type: 'info' }
  ]);

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const newLog = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      type
    };
    setLogs(prev => [...prev, newLog]);
  };

  const handleConnect = async () => {
    if (isConnected) {
      // Disconnect
      setIsConnecting(true);
      addLog('Disconnecting from robot...', 'info');
      
      setTimeout(() => {
        setIsConnected(false);
        setIsConnecting(false);
        addLog('Robot disconnected successfully', 'info');
      }, 1500);
    } else {
      // Connect
      setIsConnecting(true);
      addLog('Attempting to connect to robot...', 'info');
      
      // Simulate connection process
      setTimeout(() => {
        addLog('Scanning for available robots...', 'info');
      }, 500);
      
      setTimeout(() => {
        addLog('Robot found: RX-7 Unit', 'info');
      }, 1200);
      
      setTimeout(() => {
        addLog('Establishing secure connection...', 'info');
      }, 2000);
      
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
        addLog('Robot connected successfully!', 'success');
        addLog('All systems operational', 'success');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Bot className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Robot Control Interface</h1>
          </div>
          <p className="text-slate-300 text-lg">Connect and manage your robot remotely</p>
        </div>

        {/* Main Control Panel */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center space-x-3">
              {isConnected ? (
                <>
                  <Wifi className="w-6 h-6 text-green-400" />
                  <span>Connected</span>
                  <Badge variant="outline" className="bg-green-400/20 text-green-400 border-green-400">
                    Online
                  </Badge>
                </>
              ) : (
                <>
                  <WifiOff className="w-6 h-6 text-slate-400" />
                  <span>Disconnected</span>
                  <Badge variant="outline" className="bg-slate-600/20 text-slate-400 border-slate-600">
                    Offline
                  </Badge>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              size="lg"
              className={`px-12 py-6 text-lg font-semibold transition-all duration-300 ${
                isConnected
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } ${isConnecting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isConnecting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isConnected ? 'Disconnecting...' : 'Connecting...'}</span>
                </div>
              ) : (
                <span>{isConnected ? 'Disconnect Robot' : 'Connect Robot'}</span>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Connection Log */}
        <ConnectionLog logs={logs} />
      </div>
    </div>
  );
};

export default RobotConnection;
