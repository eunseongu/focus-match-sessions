
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Timer, Target } from 'lucide-react';

const SessionRequest = () => {
  const [sessionTime, setSessionTime] = useState(10); // 기본값 10분
  const [additionalSeconds, setAdditionalSeconds] = useState(0); // 기본 추가 초는 0초
  const [selectedTag, setSelectedTag] = useState('');
  const [goal, setGoal] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const sessionMode = location.state || {};

  const tags = [
    '공부', '업무', '독서', '프로젝트', '운동', '명상'
  ];

  // 미리 정의된 시간 옵션들
  const timeOptions = [
    { minutes: 10, seconds: 0, label: '10분' },
    { minutes: 15, seconds: 0, label: '15분' },
    { minutes: 30, seconds: 0, label: '30분' },
    { minutes: 45, seconds: 0, label: '45분' },
    { minutes: 60, seconds: 0, label: '1시간' }
  ];

  const handleTimeOptionClick = (minutes: number, seconds: number) => {
    setSessionTime(minutes);
    setAdditionalSeconds(seconds);
  };

  const handleRequestSession = () => {
    if (!selectedTag || !goal.trim()) {
      alert('집중 목적과 목표를 모두 입력해주세요.');
      return;
    }
    
    const totalSeconds = sessionTime * 60 + additionalSeconds;
    console.log('세션 신청:', { sessionTime: totalSeconds, selectedTag, goal, mode: sessionMode.mode });
    navigate('/matching', { 
      state: { 
        sessionTime: totalSeconds, 
        selectedTag, 
        goal, 
        mode: sessionMode.mode,
        partnerId: sessionMode.partnerId 
      } 
    });
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
            {sessionMode.mode === 'qr' ? 'QR 매칭' : '자동 매칭'} 세션을 설정하세요
          </p>
        </div>

        <div className="space-y-6">
          {/* 빠른 시간 선택 */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              집중 시간 선택
            </Label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {timeOptions.map(({ minutes, seconds, label }) => (
                <button
                  key={`${minutes}-${seconds}`}
                  onClick={() => handleTimeOptionClick(minutes, seconds)}
                  className={`p-2 text-sm rounded-lg border-2 transition-all ${
                    sessionTime === minutes && additionalSeconds === seconds
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 사용자 정의 시간 */}
          <div>
            <Label htmlFor="session-time" className="text-sm font-medium text-gray-700 mb-3 block">
              또는 직접 입력
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <Input
                  id="session-time"
                  type="number" 
                  value={sessionTime}
                  onChange={(e) => setSessionTime(Number(e.target.value))}
                  min="1"
                  max="120"
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">분</span>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number" 
                  value={additionalSeconds}
                  onChange={(e) => setAdditionalSeconds(Number(e.target.value))}
                  min="0"
                  max="59"
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">초</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              총 시간: {sessionTime}분 {additionalSeconds}초
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

          {/* 목표 입력 */}
          <div>
            <Label htmlFor="goal" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              오늘의 집중 목표
            </Label>
            <Textarea
              id="goal"
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

          <Button 
            onClick={handleRequestSession}
            disabled={!selectedTag || !goal.trim()}
            className="w-full py-3 text-base"
          >
            매칭 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionRequest;
