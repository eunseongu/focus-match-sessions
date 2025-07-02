
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Timer, FileText, Trophy, Target, Star, Gift } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // 시뮬레이션용 데이터
  const recentBadge = {
    character: '🐤',
    name: '초등학생',
    theme: '책 읽는 병아리'
  };

  const todayMission = {
    time: 30,
    description: '오늘 30분 집중으로 새로운 뱃지에 도전해보세요!'
  };

  const badgeStats = {
    total: 9,
    unlocked: 2
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      {/* 헤더 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-12 h-12 rounded-2xl flex items-center justify-center">
              <Timer className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">FocusMatch</h1>
              <p className="text-sm text-gray-600">함께하는 집중, 더 깊은 몰입</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/stats')}
            variant="outline"
            size="sm"
            className="border-orange-200 hover:bg-orange-50"
          >
            <Trophy className="w-4 h-4 mr-2" />
            내 뱃지함
          </Button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* 오늘의 집중 미션 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/30">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">🎯 오늘의 집중 미션</h2>
            <p className="text-gray-600 mb-4">{todayMission.description}</p>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-4 py-1">
              추천 시간: {todayMission.time}분
            </Badge>
          </div>
        </div>

        {/* 최근 받은 뱃지 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/30">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            🏅 최근 받은 뱃지
          </h2>
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl text-center">
            <div className="text-6xl mb-3 animate-bounce">{recentBadge.character}</div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{recentBadge.name}</h3>
            <p className="text-sm text-gray-600">{recentBadge.theme}</p>
            <Badge className="mt-3 bg-yellow-500 hover:bg-yellow-600">
              새로 획득!
            </Badge>
          </div>
        </div>

        {/* 나의 뱃지함 바로가기 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-purple-500" />
              📦 나의 뱃지함
            </h2>
            <Button 
              onClick={() => navigate('/stats')}
              variant="outline"
              size="sm"
              className="border-purple-200 hover:bg-purple-50"
            >
              전체 보기
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{badgeStats.unlocked}</div>
              <div className="text-sm text-green-700">획득한 뱃지</div>
            </div>
            <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-gray-600 mb-1">{badgeStats.total - badgeStats.unlocked}</div>
              <div className="text-sm text-gray-700">도전 중인 뱃지</div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              총 {badgeStats.total}개 중 {badgeStats.unlocked}개 수집 완료
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                style={{ width: `${(badgeStats.unlocked / badgeStats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 세션 시작 카드 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 shadow-xl text-white text-center">
          <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Timer className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">🚀 새로운 집중 세션 시작</h2>
          <p className="text-purple-100 mb-6 text-lg">
            파트너와 함께 깊은 집중을 경험하고<br />
            새로운 뱃지를 획득해보세요
          </p>
          <Button 
            onClick={() => navigate('/session-mode')}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
          >
            <Timer className="w-5 h-5 mr-2" />
            집중 세션 시작하기
          </Button>
        </div>

        {/* 동물 친구들 섹션 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/30">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            🐾 집중 동물 친구들과 함께해요
          </h2>
          <div className="flex justify-center space-x-4 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🐤</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🐰</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🐻</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🦊</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🐯</span>
          </div>
          <p className="text-center text-gray-600 mt-4">
            각 동물마다 특별한 집중 시간이 있어요. 어떤 친구와 만날까요?
          </p>
        </div>

        {/* 통계 미리보기 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/30">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">오늘의 집중 현황</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">142</div>
              <div className="text-sm text-gray-600">현재 세션 수</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">평균 성공률</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2.3분</div>
              <div className="text-sm text-gray-600">평균 매칭 시간</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">1,247</div>
              <div className="text-sm text-gray-600">오늘 총 시간(분)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
