import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SessionInfo } from '@healthcare/shared-services';

export function ActiveSessions() {
  const { authService } = useAuth();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      await authService.getActiveSessions();
      // Subscribe to session updates
      const unsubscribe = authService.sessionService.subscribe((state) => {
        setSessions(state.activeSessions);
        setError(state.error);
      });
      return unsubscribe;
    } catch (error) {
      setError('Failed to fetch active sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    fetchSessions()
      .then((unsubscribe) => {
        if (unsubscribe) cleanup = unsubscribe;
      })
      .catch(console.error);

    return () => {
      cleanup?.();
    };
  }, []);

  const handleTerminateSession = async (sessionId: string) => {
    try {
      setLoading(true);
      await authService.terminateSession(sessionId);
    } catch (error) {
      setError('Failed to terminate session');
    } finally {
      setLoading(false);
    }
  };

  const handleTerminateAllSessions = async () => {
    try {
      setLoading(true);
      await authService.terminateAllSessions();
    } catch (error) {
      setError('Failed to terminate all sessions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Active Sessions</h2>
        <Button
          variant="destructive"
          onClick={handleTerminateAllSessions}
          disabled={sessions.length === 0}
        >
          Sign out all devices
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md">{error}</div>
      )}

      <div className="grid gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">
                  {session.device}
                  {session.isCurrentSession && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Current session
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    Last active: {new Date(session.lastActive).toLocaleString()}
                  </p>
                  <p>Created: {new Date(session.createdAt).toLocaleString()}</p>
                  <p>Expires: {new Date(session.expiresAt).toLocaleString()}</p>
                </div>
              </div>
              {!session.isCurrentSession && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session.id)}
                >
                  Sign out
                </Button>
              )}
            </div>
          </Card>
        ))}

        {sessions.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No active sessions found
          </div>
        )}
      </div>
    </div>
  );
}
