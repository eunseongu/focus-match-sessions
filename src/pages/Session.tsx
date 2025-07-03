import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import { Timer, Clock, Lock, AlertTriangle, Bot, Zap, Volume2, VolumeX, Users, MessageSquare, Send, Coffee } from 'lucide-react';

const Session = () => {
  const location = useLocation();
  const sessionData = location.state || {};
  const [timeLeft, setTimeLeft] = useState(600);
  const [isRunning, setIsRunning] = useState(true);
  const [partnerProgress] = useState(85);
  const [canExit, setCanExit] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [audioType, setAudioType] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [partnerAudio, setPartnerAudio] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: number, sender: string, message: string, time: string}>>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [currentPomodoroSession, setCurrentPomodoroSession] = useState(1);
  
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const userSessionTime = sessionData.sessionTime || 600;
  const isBot = sessionData.isBot || false;
  const isSolo = sessionData.isSolo || false;
  const isPartnerSession = !isSolo && (sessionData.mode === 'auto' || sessionData.mode === 'remote');
  const isPomodoroMode = sessionData.mode === 'pomodoro';
  const focusTime = sessionData.focusTime || 25;
  const breakTime = sessionData.breakTime || 5;
  
  const motivationMessages = [
    '지금 이 순간, 집중하고 있는 자신이 자랑스러워요!',
    `${isBot ? '도우미가' : isSolo ? '혼자서도' : '파트너도'} 함께 열심히 하고 있어요 💪`,
    '목표까지 한걸음씩 나아가고 있어요',
    '집중하는 시간이 쌓여 큰 성취가 될 거예요',
    '지금의 노력이 미래의 나를 만들어요'
  ];

  const audioOptions = [
    { type: 'whitenoise', name: '화이트 노이즈', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
    { type: 'lofi', name: '로파이 힙합', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
    { type: 'cafe', name: '카페 소음', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
    { type: 'rain', name: '빗소리', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' }
  ];

  // 뽀모도로 모드 처리
  useEffect(() => {
    if (isPomodoroMode) {
      const pomodoroTime = isBreakTime ? breakTime * 60 : focusTime * 60;
      setTimeLeft(pomodoroTime);
      
      // 휴식 시간에만 채팅 활성화
      if (isBreakTime && isPartnerSession) {
        setChatEnabled(true);
      } else {
        setChatEnabled(false);
        setIsChatOpen(false);
      }
    }
  }, [isPomodoroMode, isBreakTime, focusTime, breakTime, isPartnerSession]);

  // 파트너 세션에서만 파트너가 듣고 있는 소리 시뮬레이션
  useEffect(() => {
    if (isPartnerSession && Math.random() > 0.1) { // 프로토타입용으로 확률 높임
      const randomAudio = audioOptions[Math.floor(Math.random() * audioOptions.length)];
      setPartnerAudio(randomAudio.type);
    }
  }, [isPartnerSession]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (isPomodoroMode && !isBreakTime) {
            // 집중 시간 완료 -> 휴식 시간으로 전환
            setIsBreakTime(true);
            setTimeLeft(breakTime * 60);
            return breakTime * 60;
          } else if (isPomodoroMode && isBreakTime) {
            // 휴식 시간 완료 -> 다음 세션 또는 종료
            if (currentPomodoroSession < sessionData.totalSessions) {
              setCurrentPomodoroSession(prev => prev + 1);
              setIsBreakTime(false);
              setTimeLeft(focusTime * 60);
              return focusTime * 60;
            } else {
              setIsRunning(false);
              setCanExit(true);
              document.title = '🎉 세션 완료!';
              return 0;
            }
          } else {
            setIsRunning(false);
            setCanExit(true);
            document.title = '🎉 세션 완료!';
            return 0;
          }
        }
        
        const elapsedTime = (isPomodoroMode ? (isBreakTime ? breakTime * 60 : focusTime * 60) : 600) - prev;
        if (elapsedTime >= 3 && !canExit) {
          setCanExit(true);
        }
        
        // 브라우저 탭 타이틀 업데이트
        const minutes = Math.floor(prev / 60);
        const seconds = prev % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const totalTime = isPomodoroMode ? (isBreakTime ? breakTime * 60 : focusTime * 60) : 600;
        const progress = ((totalTime - prev) / totalTime) * 100;
        
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
  }, [isRunning, timeLeft, canExit, isPomodoroMode, isBreakTime, focusTime, breakTime, currentPomodoroSession, sessionData.totalSessions]);

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
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isPomodoroMode ? (isBreakTime ? breakTime * 60 : focusTime * 60) : 600;
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
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setAudioType(type);
      setIsAudioPlaying(true);
      const audioOption = audioOptions.find(a => a.type === type);
      if (audioOption && audioRef.current) {
        audioRef.current.src = audioOption.url;
        audioRef.current.loop = true;
        audioRef.current.play().catch(console.error);
      }
      console.log(`${type} 오디오 재생 시작`);
    }
  };

  const joinPartnerAudio = (type: string) => {
    setAudioType(type);
    setIsAudioPlaying(true);
    const audioOption = audioOptions.find(a => a.type === type);
    if (audioOption && audioRef.current) {
      audioRef.current.src = audioOption.url;
      audioRef.current.loop = true;
      audioRef.current.play().catch(console.error);
    }
    console.log(`파트너와 함께 ${type} 오디오 듣기 시작`);
  };

  const sendMessage = () => {
    if (!chatMessage.trim() || !chatEnabled) return;
    
    const newMessage = {
      id: Date.now(),
      sender: '나',
      message: chatMessage,
      time: new Date().toLocaleTimeString()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
    
    // 파트너 응답 시뮬레이션
    setTimeout(() => {
      const partnerMessage = {
        id: Date.now() + 1,
        sender: isBot ? '도우미' : '파트너',
        message: '화이팅! 함께 열심히 해요 💪',
        time: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, partnerMessage]);
    }, 2000);
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

  if (timeLeft === 0 && !isPomodoroMode) {
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
      <audio ref={audioRef} />
      
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden">
        {/* 뽀모도로 상태 표시 */}
        {isPomodoroMode && (
          <div className={`text-center p-3 rounded-lg mb-4 ${
            isBreakTime ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center justify-center mb-2">
              {isBreakTime ? (
                <Coffee className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Timer className="w-5 h-5 text-red-600 mr-2" />
              )}
              <span className={`font-semibold ${isBreakTime ? 'text-green-700' : 'text-red-700'}`}>
                {isBreakTime ? '🌟 휴식 시간' : '📚 집중 시간'}
              </span>
            </div>
            <p className={`text-sm ${isBreakTime ? 'text-green-600' : 'text-red-600'}`}>
              {currentPomodoroSession}/{sessionData.totalSessions} 세션
            </p>
            {isBreakTime && isPartnerSession && (
              <p className="text-xs text-green-600 mt-1">💬 채팅이 활성화되었습니다</p>
            )}
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isPomodoroMode ? '뽀모도로 세션 진행 중' : '집중 세션 진행 중'}
          </h1>
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
                className={`transition-all duration-1000 ${
                  isPomodoroMode && isBreakTime ? 'text-green-500' : 'text-purple-500'
                }`}
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

        {/* 소리 공유 기능 - 혼자 집중하기에서는 파트너 음악 없음 */}
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

        {/* 채팅 기능 - 뽀모도로 모드에서 파트너 세션일 때만 표시 */}
        {isPomodoroMode && isPartnerSession && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 text-gray-600 mr-2" />
                <p className="text-sm font-medium text-gray-700">파트너 채팅</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xs px-2 py-1 rounded-full ${
                  chatEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {chatEnabled ? '활성화' : '휴식 시간에만 가능'}
                </div>
                <Button
                  onClick={() => setChatEnabled(!chatEnabled)}
                  size="sm"
                  variant="outline"
                  className="text-xs h-6 px-2"
                >
                  테스트
                </Button>
              </div>
            </div>
            
            <div className={`border-2 rounded-lg p-3 transition-all ${
              chatEnabled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="h-24 overflow-y-auto mb-3 space-y-2">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-4">
                    {chatEnabled ? '메시지를 입력해보세요' : '휴식 시간에 채팅해보세요'}
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className={`text-sm ${
                      msg.sender === '나' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`inline-block p-2 rounded-lg max-w-xs ${
                        msg.sender === '나' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={chatEnabled ? "메시지 입력..." : "휴식 시간에 활성화됩니다"}
                  disabled={!chatEnabled}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="text-sm"
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  disabled={!chatEnabled || !chatMessage.trim()}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

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
