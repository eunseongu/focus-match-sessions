
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';
import { Target } from 'lucide-react';

const AuthEntry = () => {
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state || {};

  const handleStartSession = () => {
    setIsStarting(true);
    setTimeout(() => {
      navigate('/session', { state: sessionData });
    }, 1500);
  };

  if (isStarting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">집중 시작!</h1>
          <p className="text-gray-600">세션이 곧 시작됩니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">집중 준비 완료</h1>
          <p className="text-gray-600">집중 세션을 시작하세요</p>
        </div>

        <div className="space-y-6">
          {/* 목표 표시 */}
          {sessionData.goal && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-blue-700 mb-2 block">
                설정한 목표
              </Label>
              <p className="text-blue-800 font-medium">{sessionData.goal}</p>
            </div>
          )}

          {/* 세션 정보 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-blue-700 mb-1">집중 시간</p>
              <p className="text-lg font-bold text-blue-800">
                {Math.floor((sessionData.sessionTime || 600) / 60)}분 {((sessionData.sessionTime || 600) % 60)}초
              </p>
              {sessionData.selectedTag && (
                <p className="text-sm text-blue-600 mt-1">• {sessionData.selectedTag}</p>
              )}
            </div>
          </div>

          <Button 
            onClick={handleStartSession}
            className="w-full py-3 text-base"
          >
            집중 세션 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthEntry;
