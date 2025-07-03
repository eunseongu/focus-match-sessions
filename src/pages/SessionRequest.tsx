
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import { Timer, Target, ChevronDown, ChevronUp } from 'lucide-react';

const SessionRequest = () => {
  const [sessionTime, setSessionTime] = useState(10); // 기본값 10분
  const [selectedTag, setSelectedTag] = useState('');
  const [goal, setGoal] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionMode = location.state || {};

  // 이전 설정값을 로컬스토리지에서 불러오기
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('focusMatch_lastSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSessionTime(settings.sessionTime || 10);
      setSelectedTag(settings.selectedTag || '');
    }
  }, []);

  const tags = [
    '공부', '업무', '독서', '프로젝트', '운동', '명상'
  ];

  // 고정된 시간 옵션들만 제공
  const timeOptions = [
    { minutes: 10, label: '10분' },
    { minutes: 15, label: '15분' },
    { minutes: 30, label: '30분' },
    { minutes: 45, label: '45분' },
    { minutes: 60, label: '1시간' }
  ];

  const handleTimeOptionClick = (minutes: number) => {
    setSessionTime(minutes);
  };

  const handleRequestSession = () => {
    if (!selectedTag) {
      alert('집중 목적을 선택해주세요.');
      return;
    }
    
    // 설정값 저장
    const settings = {
      sessionTime,
      selectedTag
    };
    localStorage.setItem('focusMatch_lastSettings', JSON.stringify(settings));
    
    const totalSeconds = sessionTime * 60;
    console.log('세션 신청:', { sessionTime: totalSeconds, selectedTag, goal, mode: sessionMode.mode });
    
    // 혼자 집중하기인 경우 바로 세션으로
    if (sessionMode.mode === 'solo') {
      navigate('/session', { 
        state: { 
          sessionTime: totalSeconds, 
          selectedTag, 
          goal, 
          mode: sessionMode.mode,
          isBot: false,
          isSolo: true
        } 
      });
    } else {
      navigate('/matching', { 
        state: { 
          sessionTime: totalSeconds, 
          selectedTag, 
          goal, 
          mode: sessionMode.mode,
          partnerId: sessionMode.partnerId,
          roomCode: sessionMode.roomCode
        } 
      });
    }
  };

  const getModeTitle = () => {
    switch (sessionMode.mode) {
      case 'solo': return '혼자 집중하기';
      case 'remote': return '원격 매칭';
      case 'qr': return 'QR 매칭';
      default: return '자동 매칭';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">집중 세션 설정</h1>
          <p className="text-gray-600">
            {getModeTitle()} 세션을 설정하세요
          </p>
          {sessionMode.roomCode && (
            <div className="bg-orange-50 p-3 rounded-lg mt-4">
              <p className="text-sm text-orange-700">
                참여 코드: <span className="font-mono font-bold">{sessionMode.roomCode}</span>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* 집중 시간 선택 */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              집중 시간 선택
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {timeOptions.map(({ minutes, label }) => (
                <button
                  key={minutes}
                  onClick={() => handleTimeOptionClick(minutes)}
                  className={`p-3 text-sm rounded-lg border-2 transition-all ${
                    sessionTime === minutes
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              선택된 시간: {sessionTime}분
            </p>
          </div>

          {/* 태그 선택 */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              집중 목적
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`p-3 text-sm rounded-lg border-2 transition-all ${
                    selectedTag === tag
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 목표 입력 - 선택사항 */}
          <div>
            <button
              onClick={() => setShowGoalInput(!showGoalInput)}
              className="flex items-center justify-between w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all"
            >
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                오늘의 집중 목표 (선택사항)
              </span>
              {showGoalInput ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {showGoalInput && (
              <div className="mt-3">
                <Textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="예: 수학 문제 10개 풀기, 보고서 2페이지 작성하기"
                  className="min-h-[80px] resize-none"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {goal.length}/200자 • 구체적인 목표를 입력해주세요
                </p>
              </div>
            )}
          </div>

          <Button 
            onClick={handleRequestSession}
            disabled={!selectedTag}
            className="w-full py-3 text-base"
          >
            {sessionMode.mode === 'solo' ? '혼자 집중 시작하기' : '매칭 시작하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionRequest;
