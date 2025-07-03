
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Timer, Coffee, ArrowLeft, User, Users, Link } from 'lucide-react';

const PomodoroMode = () => {
  const [totalSessions, setTotalSessions] = useState(4);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const navigate = useNavigate();

  const focusTimeOptions = [25, 30, 35, 40, 45];
  const breakTimeOptions = [3, 5, 10, 15];

  const handleStartPomodoro = (mode: string) => {
    const pomodoroSettings = {
      mode: 'pomodoro',
      sessionType: mode,
      totalSessions,
      focusTime,
      breakTime,
      currentSession: 1
    };
    
    if (mode === 'solo') {
      navigate('/session', { state: pomodoroSettings });
    } else {
      navigate('/session-request', { state: pomodoroSettings });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">뽀모도로 집중법</h1>
          <p className="text-gray-600 mb-4">
            효율적으로 집중하고 싶으신가요? 뽀모도로 학습법을 사용해보세요.
          </p>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-700">
              📚 25분 집중 → 5분 휴식을 반복하는 과학적 학습법
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 뽀모도로 설정 */}
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">세션 설정</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  총 세션 수
                </Label>
                <Select value={totalSessions.toString()} onValueChange={(value) => setTotalSessions(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num}회</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    집중 시간
                  </Label>
                  <Select value={focusTime.toString()} onValueChange={(value) => setFocusTime(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {focusTimeOptions.map((time) => (
                        <SelectItem key={time} value={time.toString()}>{time}분</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    휴식 시간
                  </Label>
                  <Select value={breakTime.toString()} onValueChange={(value) => setBreakTime(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {breakTimeOptions.map((time) => (
                        <SelectItem key={time} value={time.toString()}>{time}분</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-orange-50 p-3 rounded-lg">
              <p className="text-sm text-orange-700 text-center">
                <Coffee className="w-4 h-4 inline mr-1" />
                총 소요시간: 약 {Math.floor((focusTime + breakTime) * totalSessions / 60)}시간 {(focusTime + breakTime) * totalSessions % 60}분
              </p>
            </div>
          </div>

          {/* 모드 선택 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 text-center">집중 방식 선택</h3>
            
            {/* 혼자 집중하기 */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-800">혼자 집중하기</h4>
                    <p className="text-sm text-gray-600">나만의 뽀모도로 타임</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleStartPomodoro('solo')}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  시작
                </Button>
              </div>
            </div>

            {/* 자동 매칭 */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-800">자동 매칭</h4>
                    <p className="text-sm text-gray-600">파트너와 함께 뽀모도로</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleStartPomodoro('auto')}
                  size="sm"
                >
                  시작
                </Button>
              </div>
            </div>

            {/* 원격 매칭 */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link className="w-5 h-5 text-orange-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-800">원격 매칭</h4>
                    <p className="text-sm text-gray-600">친구와 함께 뽀모도로</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleStartPomodoro('remote')}
                  size="sm"
                  variant="outline"
                  className="border-orange-300 hover:bg-orange-50"
                >
                  시작
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/')}
          variant="ghost"
          className="w-full mt-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default PomodoroMode;
