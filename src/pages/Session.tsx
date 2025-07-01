
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Timer, Clock } from 'lucide-react';

const Session = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25분을 초로 변환
  const [isRunning, setIsRunning] = useState(true);
  const [partnerProgress] = useState(85); // 상대방 진행률 시뮬레이션
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = 25 * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const handleEndSession = () => {
    navigate('/auth-exit');
  };

  const handleEmergencyExit = () => {
    if (confirm('정말로 세션을 중단하시겠습니까? 이는 실패로 기록됩니다.')) {
      navigate('/');
    }
  };

  if (timeLeft === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Timer className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">세션 완료!</h1>
          <p className="text-gray-600 mb-6">수고하셨습니다. 집중 시간이 끝났습니다.</p>
          <Button onClick={handleEndSession} className="w-full py-3 text-base">
            퇴장 인증하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">집중 세션 진행 중</h1>
          <p className="text-gray-600">파트너와 함께 집중하고 있습니다</p>
        </div>

        {/* 타이머 표시 */}
        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold text-purple-600 mb-4">
            {formatTime(timeLeft)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-purple-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            진행률: {Math.round(getProgress())}%
          </p>
        </div>

        {/* 파트너 상태 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">파트너 진행률</span>
            <span className="text-sm text-gray-600">{partnerProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${partnerProgress}%` }}
            ></div>
          </div>
        </div>

        {/* 컨트롤 버튼 */}
        <div className="space-y-3">
          <Button 
            onClick={handleEndSession}
            variant="outline"
            className="w-full"
          >
            <Clock className="w-4 h-4 mr-2" />
            조기 종료하기
          </Button>
          <Button 
            onClick={handleEmergencyExit}
            variant="destructive"
            className="w-full"
            size="sm"
          >
            긴급 중단
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Session;
