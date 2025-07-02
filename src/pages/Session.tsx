
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Timer, Clock, Lock, AlertTriangle, Bot, Zap } from 'lucide-react';

const Session = () => {
  const location = useLocation();
  const sessionData = location.state || {};
  const [timeLeft, setTimeLeft] = useState(600); // 10분 고정
  const [isRunning, setIsRunning] = useState(true);
  const [partnerProgress] = useState(85);
  const [canExit, setCanExit] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [partnerEmoji, setPartnerEmoji] = useState('');
  const [sentEmoji, setSentEmoji] = useState('');
  const [emojiCooldown, setEmojiCooldown] = useState(false);
  
  const navigate = useNavigate();
  const userSessionTime = sessionData.sessionTime || 600;
  const isBot = sessionData.isBot || false;
  const emojis = ['👍', '❤️', '☕', '⚡', '🔥', '💪'];
  
  const motivationMessages = [
    '지금 이 순간, 집중하고 있는 자신이 자랑스러워요!',
    `${isBot ? '도우미가' : '파트너도'} 함께 열심히 하고 있어요 💪`,
    '목표까지 한걸음씩 나아가고 있어요',
    '집중하는 시간이 쌓여 큰 성취가 될 거예요',
    '지금의 노력이 미래의 나를 만들어요'
  ];

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setCanExit(true);
          return 0;
        }
        
        // 3초 후 퇴장 가능
        const elapsedTime = 600 - prev;
        if (elapsedTime >= 3 && !canExit) {
          setCanExit(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, canExit]);

  // 동기 메시지 카드
  useEffect(() => {
    const messageTimer = setInterval(() => {
      const randomMessage = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];
      setMotivationMessage(randomMessage);
      
      setTimeout(() => {
        setMotivationMessage('');
      }, 5000);
    }, 180000); // 3분마다

    return () => clearInterval(messageTimer);
  }, []);

  // 파트너/봇 이모지 시뮬레이션
  useEffect(() => {
    const emojiTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        setPartnerEmoji(randomEmoji);
        
        setTimeout(() => {
          setPartnerEmoji('');
        }, 3000);
      }
    }, isBot ? 20000 : 30000); // 봇은 더 자주 반응

    return () => clearInterval(emojiTimer);
  }, [isBot]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = 600;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const handleSendEmoji = (emoji: string) => {
    if (emojiCooldown) return;
    
    console.log('이모지 전송:', emoji);
    setSentEmoji(emoji);
    setEmojiCooldown(true);
    
    setTimeout(() => {
      setSentEmoji('');
    }, 2000);
    
    setTimeout(() => {
      setEmojiCooldown(false);
    }, 5000);
    
    if (isBot && Math.random() > 0.3) {
      setTimeout(() => {
        const responseEmojis = ['👍', '🔥', '💪', '❤️'];
        const randomResponse = responseEmojis[Math.floor(Math.random() * responseEmojis.length)];
        setPartnerEmoji(randomResponse);
        
        setTimeout(() => {
          setPartnerEmoji('');
        }, 3000);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleEndSession = () => {
    const halfTime = userSessionTime / 2;
    const elapsedTime = 600 - timeLeft;
    
    if (elapsedTime < halfTime) {
      alert(`아직 퇴장할 수 없습니다. ${Math.ceil((halfTime - elapsedTime) / 60)}분 더 집중해주세요.`);
      return;
    }
    navigate('/auth-exit', { state: sessionData });
  };

  const handleForceExit = () => {
    if (confirm('정말로 세션을 중단하시겠습니까? 이는 실패로 기록됩니다.')) {
      navigate('/session-mode');
    }
  };

  const handlePrototypeExit = () => {
    if (confirm('프로토타입용 성공 흐름으로 이동하시겠습니까?')) {
      navigate('/auth-exit', { state: sessionData });
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
          <p className="text-gray-600 mb-6">수고하셨습니다. 목표를 인증해주세요.</p>
          <Button onClick={handleEndSession} className="w-full py-3 text-base">
            목표 인증하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden">
        {/* 전송한 이모지 애니메이션 */}
        {sentEmoji && (
          <div className="absolute top-4 right-4 text-4xl animate-bounce z-10">
            {sentEmoji}
          </div>
        )}
        
        {/* 동기 메시지 카드 */}
        {motivationMessage && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg mb-6 text-center animate-fade-in">
            <p className="text-sm font-medium">{motivationMessage}</p>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">집중 세션 진행 중</h1>
          <p className="text-gray-600">
            {isBot ? '도우미와' : '파트너와'} 함께 집중하고 있습니다
          </p>
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

        {/* 파트너/봇 상태 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              {isBot && <Bot className="w-4 h-4 mr-1 text-purple-600" />}
              {isBot ? '도우미' : '파트너'} 진행률
            </span>
            {partnerEmoji && (
              <span className="text-3xl animate-pulse absolute -top-2 right-4">{partnerEmoji}</span>
            )}
            <span className="text-sm text-gray-600">{partnerProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isBot ? 'bg-purple-500' : 'bg-green-500'}`}
              style={{ width: `${partnerProgress}%` }}
            ></div>
          </div>
        </div>

        {/* 이모지 반응 */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3 text-center">
            {isBot ? '도우미에게' : '파트너에게'} 응원 보내기
            {emojiCooldown && <span className="text-xs text-gray-500 ml-2">(5초 후 재전송 가능)</span>}
          </p>
          <div className="grid grid-cols-6 gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSendEmoji(emoji)}
                disabled={emojiCooldown}
                className={`p-2 text-2xl rounded-lg transition-all ${
                  emojiCooldown 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-100 hover:scale-110 active:scale-95'
                }`}
              >
                {emoji}
              </button>
            ))}
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
            onClick={handlePrototypeExit}
            variant="secondary"
            className="w-full"
            size="sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            성공 완료하기 (프로토타입용)
          </Button>
          
          <Button 
            onClick={handleForceExit}
            variant="destructive"
            className="w-full"
            size="sm"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            중단하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Session;
