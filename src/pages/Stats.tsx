
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Timer, Clock, FileText } from 'lucide-react';

const Stats = () => {
  const navigate = useNavigate();

  const stats = {
    totalSessions: 12,
    totalTime: 450, // 분
    successRate: 83,
    weeklyGoal: 7,
    currentStreak: 3
  };

  const recentSessions = [
    { date: '2024-07-01', duration: 25, focus: 4, status: '완료' },
    { date: '2024-06-30', duration: 30, focus: 5, status: '완료' },
    { date: '2024-06-29', duration: 25, focus: 3, status: '완료' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">집중 통계</h1>
            <p className="text-gray-600">나의 집중 기록을 확인해보세요</p>
          </div>
        </div>

        {/* 주요 통계 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Timer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.totalSessions}</div>
            <div className="text-sm text-gray-600">총 세션 수</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{Math.floor(stats.totalTime / 60)}시간</div>
            <div className="text-sm text-gray-600">총 집중 시간</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.successRate}%</div>
            <div className="text-sm text-gray-600">성공률</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
            <div className="text-sm text-gray-600">연속 성공</div>
          </div>
        </div>

        {/* 최근 세션 기록 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">최근 세션 기록</h2>
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-800">{session.date}</div>
                    <div className="text-sm text-gray-600">{session.duration}분 세션</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">집중도 {session.focus}/5</div>
                  <div className="text-xs text-green-600">{session.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주간 목표 진행률 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">이번 주 목표</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>세션 완료</span>
              <span>{Math.min(stats.currentStreak, stats.weeklyGoal)}/{stats.weeklyGoal}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${(Math.min(stats.currentStreak, stats.weeklyGoal) / stats.weeklyGoal) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            목표 달성까지 {Math.max(0, stats.weeklyGoal - stats.currentStreak)}회 남았어요!
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')}
            className="w-full py-3 text-base"
          >
            새 세션 시작하기
          </Button>
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full"
          >
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
