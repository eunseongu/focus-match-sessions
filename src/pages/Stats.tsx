
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Timer, Trophy, Lock, BarChart3, X } from 'lucide-react';
import { ROLE_BADGES, SPECIAL_BADGES, Badge as BadgeType } from '@/types/badge';

const Stats = () => {
  const navigate = useNavigate();
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const stats = {
    totalSessions: 12,
    totalTime: 450, // 분
    weeklyData: [
      { day: '월', sessions: 2, time: 60 },
      { day: '화', sessions: 1, time: 30 },
      { day: '수', sessions: 3, time: 90 },
      { day: '목', sessions: 2, time: 75 },
      { day: '금', sessions: 1, time: 45 },
      { day: '토', sessions: 2, time: 90 },
      { day: '일', sessions: 1, time: 60 },
    ]
  };

  const allBadges = [...ROLE_BADGES, ...SPECIAL_BADGES];
  
  // 시뮬레이션용 - 일부 뱃지 해제 (신생아와 초등학생 뱃지 해제)
  const unlockedBadges = allBadges.map(badge => ({
    ...badge,
    isUnlocked: badge.id === 'newborn' || badge.id === 'elementary'
  }));

  const handleBadgeClick = (badge: BadgeType) => {
    setSelectedBadge(badge);
  };

  const closeBadgeModal = () => {
    setSelectedBadge(null);
  };

  const handleStatsCardClick = () => {
    setShowStatsModal(true);
  };

  const closeStatsModal = () => {
    setShowStatsModal(false);
  };

  const handleBadgeCollectionClick = () => {
    // 뱃지함 카드 전체가 클릭 가능하므로 아무것도 하지 않음 (이미 이 페이지에 있음)
  };

  const getConditionText = (badge: BadgeType) => {
    switch (badge.condition.type) {
      case 'time':
        return `${badge.condition.value}분 집중`;
      case 'timeOfDay':
        return '오전 5-7시 집중';
      case 'frequency':
        return '하루 2회 집중';
      case 'special':
        if (badge.condition.value === 'weekend') return '주말 집중';
        if (badge.condition.value === 'hidden') return '???';
        return '특수 조건';
      case 'firstSession':
        return '첫 세션 완료';
      default:
        return '조건 달성';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">내 집중 기록</h1>
            <p className="text-gray-600">집중 시간과 획득한 뱃지를 확인해보세요</p>
          </div>
        </div>

        {/* 주요 통계 - 클릭 가능 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleStatsCardClick}
            className="bg-white rounded-xl shadow-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <Timer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.totalSessions}</div>
            <div className="text-sm text-gray-600">총 세션 수</div>
          </button>
          
          <button
            onClick={handleStatsCardClick}
            className="bg-white rounded-xl shadow-lg p-4 text-center hover:bg-gray-50 transition-colors"
          >
            <Timer className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{Math.floor(stats.totalTime / 60)}시간</div>
            <div className="text-sm text-gray-600">총 집중 시간</div>
          </button>
        </div>

        {/* 포커스 뱃지 (기존 역할별 집중 뱃지) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            포커스 뱃지
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {unlockedBadges.filter(badge => badge.type === 'role').map((badge) => (
              <button
                key={badge.id}
                onClick={() => handleBadgeClick(badge)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  badge.isUnlocked
                    ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{badge.character}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">{badge.name}</span>
                      {!badge.isUnlocked && <Lock className="w-3 h-3 text-gray-400" />}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{badge.theme}</div>
                    <div className="text-xs text-blue-600 font-medium">
                      {getConditionText(badge)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 특수 조건 뱃지 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-purple-500" />
            특수 조건 뱃지
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {unlockedBadges.filter(badge => badge.type === 'special').map((badge) => (
              <button
                key={badge.id}
                onClick={() => handleBadgeClick(badge)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  badge.isUnlocked
                    ? 'border-purple-300 bg-purple-50 hover:bg-purple-100'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{badge.character}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">{badge.name}</span>
                      {!badge.isUnlocked && <Lock className="w-3 h-3 text-gray-400" />}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{badge.theme}</div>
                    <div className="text-xs text-purple-600 font-medium">
                      {getConditionText(badge)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
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

      {/* 뱃지 상세 모달 */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center">
              <span className="text-6xl mb-4 block">{selectedBadge.character}</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedBadge.name}</h3>
              <p className="text-gray-600 mb-4">{selectedBadge.description}</p>
              
              {selectedBadge.isUnlocked ? (
                <Badge variant="default" className="mb-4">
                  획득 완료
                </Badge>
              ) : (
                <div className="text-sm text-gray-500 mb-4">
                  <Badge variant="outline" className="mb-2">
                    도전 중
                  </Badge>
                  <p>{getConditionText(selectedBadge)} 필요</p>
                </div>
              )}
              
              <Button onClick={closeBadgeModal} variant="outline" className="w-full">
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 통계 상세 모달 */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">주간 집중 통계</h3>
              <button onClick={closeStatsModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {stats.weeklyData.map((day, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded">
                    <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                    <div className="font-bold text-blue-600">{day.sessions}</div>
                    <div className="text-xs text-gray-500">{day.time}분</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {stats.weeklyData.reduce((acc, day) => acc + day.sessions, 0)}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">이번 주 총 세션</div>
                  <div className="text-lg font-semibold text-purple-600">
                    {Math.floor(stats.weeklyData.reduce((acc, day) => acc + day.time, 0) / 60)}시간 
                    {stats.weeklyData.reduce((acc, day) => acc + day.time, 0) % 60}분
                  </div>
                  <div className="text-xs text-gray-500">이번 주 총 집중 시간</div>
                </div>
              </div>
            </div>
            
            <Button onClick={closeStatsModal} className="w-full mt-4">
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
