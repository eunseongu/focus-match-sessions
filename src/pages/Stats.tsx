
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Timer, Trophy, Lock } from 'lucide-react';
import { ROLE_BADGES, SPECIAL_BADGES, Badge as BadgeType } from '@/types/badge';

const Stats = () => {
  const navigate = useNavigate();
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);

  const stats = {
    totalSessions: 12,
    totalTime: 450, // 분
  };

  const allBadges = [...ROLE_BADGES, ...SPECIAL_BADGES];
  
  // 시뮬레이션용 - 일부 뱃지 해제
  const unlockedBadges = allBadges.map(badge => ({
    ...badge,
    isUnlocked: badge.id === 'elementary' || badge.id === 'morning-owl'
  }));

  const handleBadgeClick = (badge: BadgeType) => {
    setSelectedBadge(badge);
  };

  const closeBadgeModal = () => {
    setSelectedBadge(null);
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

        {/* 주요 통계 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Timer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.totalSessions}</div>
            <div className="text-sm text-gray-600">총 세션 수</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Timer className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{Math.floor(stats.totalTime / 60)}시간</div>
            <div className="text-sm text-gray-600">총 집중 시간</div>
          </div>
        </div>

        {/* 역할 기반 뱃지 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            역할별 집중 뱃지
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
                    <div className="text-xs text-gray-600">{badge.theme}</div>
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
                    <div className="text-xs text-gray-600">{badge.theme}</div>
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
                  <p>
                    {selectedBadge.condition.type === 'time' && 
                      `${selectedBadge.condition.value}분 이상 집중 세션 완료`}
                    {selectedBadge.condition.type === 'timeOfDay' && 
                      `오전 5-7시 집중 세션 성공`}
                    {selectedBadge.condition.type === 'frequency' && 
                      `하루 2회 이상 집중 세션 성공`}
                    {selectedBadge.condition.type === 'special' && 
                      selectedBadge.condition.value === 'weekend' && 
                      `주말 집중 세션 성공`}
                  </p>
                </div>
              )}
              
              <Button onClick={closeBadgeModal} variant="outline" className="w-full">
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
