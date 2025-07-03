
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Timer, Bot, Link } from 'lucide-react';

const Matching = () => {
  const [isMatching, setIsMatching] = useState(true);
  const [matchedUser, setMatchedUser] = useState<string | null>(null);
  const [isBot, setIsBot] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state || {};

  // 매칭 시뮬레이션
  useEffect(() => {
    const matchingTimer = setTimeout(() => {
      setIsMatching(false);
      
      if (sessionData.mode === 'remote') {
        // 원격 매칭의 경우
        setMatchedUser(`사용자${Math.floor(Math.random() * 999)}`);
      } else if (sessionData.mode === 'auto' && Math.random() > 0.5) {
        // Bot 매칭 시뮬레이션
        setIsBot(true);
        const botNames = ['집중 도우미 준', '포커스봇 소영', '몰입이', '집중러 민수'];
        setMatchedUser(botNames[Math.floor(Math.random() * botNames.length)]);
      } else {
        setMatchedUser('사용자123');
      }
    }, 3000);

    return () => clearTimeout(matchingTimer);
  }, [sessionData.mode]);

  const handleStartSession = () => {
    navigate('/session', { state: { ...sessionData, isBot, matchedUser } });
  };

  const handleCancel = () => {
    navigate('/session-mode');
  };

  if (isMatching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="animate-spin w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full mx-auto mb-6"></div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">매칭 중...</h1>
          <p className="text-gray-600 mb-4">
            {sessionData.mode === 'qr' ? 'QR 파트너와 연결' : 
             sessionData.mode === 'remote' ? '원격 파트너를 찾고 있습니다' :
             '집중 파트너를 찾고 있습니다'}
          </p>
          
          {/* 선택한 조건 표시 */}
          {sessionData.selectedTag && (
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-orange-700">
                {Math.floor(sessionData.sessionTime / 60)}분 {sessionData.sessionTime % 60}초 • {sessionData.selectedTag}
              </p>
              {sessionData.goal && (
                <p className="text-xs text-orange-600 mt-1">
                  목표: {sessionData.goal.length > 30 ? sessionData.goal.substring(0, 30) + '...' : sessionData.goal}
                </p>
              )}
            </div>
          )}
          
          {sessionData.roomCode && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-700">
                참여 코드: <span className="font-mono font-bold">{sessionData.roomCode}</span>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                친구에게 이 코드를 공유하세요
              </p>
            </div>
          )}
          
          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-orange-700">
              {sessionData.mode === 'auto' 
                ? '30초 내에 상대가 없으면 봇과 자동 매칭됩니다' 
                : sessionData.mode === 'remote'
                ? '참여 코드를 입력한 상대와 매칭됩니다'
                : '상대방이 연결될 때까지 기다려주세요'}
            </p>
          </div>

          <Button variant="outline" onClick={handleCancel} className="w-full">
            매칭 취소
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isBot ? 'bg-purple-100' : 
          sessionData.mode === 'remote' ? 'bg-orange-100' :
          'bg-green-100'
        }`}>
          {isBot ? (
            <Bot className="w-8 h-8 text-purple-600" />
          ) : sessionData.mode === 'remote' ? (
            <Link className="w-8 h-8 text-orange-600" />
          ) : (
            <Timer className="w-8 h-8 text-green-600" />
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">매칭 완료!</h1>
        <p className="text-gray-600 mb-6">
          <span className={`font-semibold ${
            isBot ? 'text-purple-600' : 
            sessionData.mode === 'remote' ? 'text-orange-600' :
            'text-green-600'
          }`}>
            {matchedUser}
          </span>
          {isBot ? '(AI 도우미)' : ''}님과 매칭되었습니다
        </p>
        
        {isBot && (
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-purple-700">
              집중 도우미가 함께 응원하며 세션을 진행합니다
            </p>
          </div>
        )}

        <Button onClick={handleStartSession} className="w-full">
          집중 세션 시작하기
        </Button>
      </div>
    </div>
  );
};

export default Matching;
