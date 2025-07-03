import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Timer, Clock, Lock, AlertTriangle, Bot, Zap, Volume2, VolumeX, Users } from 'lucide-react';

const Session = () => {
  const location = useLocation();
  const sessionData = location.state || {};
  const [timeLeft, setTimeLeft] = useState(600); // 10분 고정
  const [isRunning, setIsRunning] = useState(true);
  const [partnerProgress] = useState(85);
  const [canExit, setCanExit] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [audioType, setAudioType] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [partnerAudio, setPartnerAudio] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const userSessionTime = sessionData.sessionTime || 600;
  const isBot = sessionData.isBot || false;
  const isSolo = sessionData.isSolo || false;
  const isPartnerSession = !isSolo && (sessionData.mode === 'auto' || sessionData.mode === 'remote');
  
  const motivationMessages = [
    '지금 이 순간, 집중하고 있는 자신이 자랑스러워요!',
    `${isBot ? '도우미가' : isSolo ? '혼자서도' : '파트너도'} 함께 열심히 하고 있어요 💪`,
    '목표까지 한걸음씩 나아가고 있어요',
    '집중하는 시간이 쌓여 큰 성취가 될 거예요',
    '지금의 노력이 미래의 나를 만들어요'
  ];

  const audioOptions = [
    { type: 'whitenoise', name: '화이트 노이즈' },
    { type: 'lofi', name: '로파이 힙합' },
    { type: 'cafe', name: '카페 소음' },
    { type: 'rain', name: '빗소리' }
  ];

  // 파트너 세션에서만 파트너가 듣고 있는 소리 시뮬레이션
  useEffect(() => {
    if (isPartnerSession && Math.random() > 0.3) { // 프로토타입용으로 확률 높임
      const randomAudio = audioOptions[Math.floor(Math.random() * audioOptions.length)];
      setPartnerAudio(randomAudio.type);
    }
  }, [isPartnerSession]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setCanExit(true);
          document.title = '🎉 세션 완료!';
          return 0;
        }
        
        const elapsedTime = 600 - prev;
        if (elapsedTime >= 3 && !canExit) {
          setCanExit(true);
        }
        
        // 브라우저 탭 타이틀 업데이트 - 새로운 형식
        const minutes = Math.floor(prev / 60);
        const seconds = prev % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const progress = ((600 - prev) / 600) * 100;
        
        // 진행도 바 생성 (총 6개 블록)
        const totalBlocks = 6;
        const filledBlocks = Math.floor((progress / 100) * totalBlocks);
        const progressBar = '▣'.repeat(filledBlocks) + '▢'.repeat(totalBlocks - filledBlocks);
        const dots = '⠂⠂⠂';
        
        document.title = `${timeString} ${dots}${progressBar} ${Math.round(progress)}%`;
        
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

  // 컴포넌트 언마운트 시 타이틀 복원
  useEffect(() => {
    return () => {
      document.title = 'FocusMatch';
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = 600;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getExitButtonText = () => {
    const halfTime = userSessionTime / 2;
    const elapsedTime = 600 - timeLeft;
    
    if (elapsedTime < halfTime) {
      const remainingMinutes = Math.ceil((halfTime - elapsedTime) / 60);
      return `${remainingMinutes}분 후 퇴장 가능`;
    }
    return '조기 종료하기';
  };

  const toggleAudio = (type: string) => {
    if (audioType === type && isAudioPlaying) {
      setIsAudioPlaying(false);
      setAudioType(null);
    } else {
      setAudioType(type);
      setIsAudioPlaying(true);
      console.log(`${type} 오디오 재생 시작`);
    }
  };

  const joinPartnerAudio = (type: string) => {
    setAudioType(type);
    setIsAudioPlaying(true);
    console.log(`파트너와 함께 ${type} 오디오 듣기 시작`);
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
            {isSolo ? '혼자서 집중하고 있습니다' : 
             isBot ? '도우미와 함께 집중하고 있습니다' : 
             '파트너와 함께 집중하고 있습니다'}
          </p>
        </div>

        {/* 원형 타이머 */}
        <div className="text-center mb-8">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                className="text-purple-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-purple-600">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round(getProgress())}% 완료
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 파트너가 듣고 있는 음악 표시 - 파트너 세션에서만 */}
        {partnerAudio && isPartnerSession && (
          <div className="mb-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700">
                    파트너가 {audioOptions.find(a => a.type === partnerAudio)?.name} 듣는 중
                  </span>
                </div>
                <Button
                  onClick={() => joinPartnerAudio(partnerAudio)}
                  size="sm"
                  variant="outline"
                  className="text-xs border-blue-300 hover:bg-blue-50"
                >
                  같이 듣기
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 소리 공유 기능 */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3 text-center">
            🎧 집중 배경음
          </p>
          <div className="grid grid-cols-2 gap-2">
            {audioOptions.map((audio) => (
              <button
                key={audio.type}
                onClick={() => toggleAudio(audio.type)}
                className={`p-3 text-sm rounded-lg border-2 transition-all flex items-center justify-center ${
                  audioType === audio.type && isAudioPlaying
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {audioType === audio.type && isAudioPlaying ? (
                  <Volume2 className="w-4 h-4 mr-2" />
                ) : (
                  <VolumeX className="w-4 h-4 mr-2" />
                )}
                {audio.name}
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
            disabled={!canExit && (600 - timeLeft) < userSessionTime / 2}
          >
            <Clock className="w-4 h-4 mr-2" />
            {getExitButtonText()}
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
