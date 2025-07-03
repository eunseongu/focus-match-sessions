
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Trophy, Star, Target, ArrowLeft } from 'lucide-react';

const AuthExit = () => {
  const [focusLevel, setFocusLevel] = useState(3);
  const [goalAchievement, setGoalAchievement] = useState(3);
  const [reflection, setReflection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state || {};

  // 뱃지 시스템 - 신생아 뱃지를 동물 이모지로 변경
  const badges = [
    {
      id: 'first_session',
      character: '🐣',
      name: '첫 걸음마',
      theme: '첫 집중 세션 완료',
      condition: { type: 'session_count', value: 1 },
      unlocked: true
    },
    {
      id: 'early_bird',
      character: '🐤',
      name: '새벽 집중러',
      theme: '오전 6-8시 집중',
      condition: { type: 'time_range', value: '06:00-08:00' },
      unlocked: false
    },
    {
      id: 'focus_master',
      character: '🦊',
      name: '집중 마스터',
      theme: '연속 성공 세션',
      condition: { type: 'streak', value: 5 },
      unlocked: false
    },
    {
      id: 'partner_loyal',
      character: '🐰',
      name: '단짝 친구',
      theme: '같은 파트너와 5회',
      condition: { type: 'partner_sessions', value: 5 },
      unlocked: false,
      hidden: true
    },
    {
      id: 'night_owl',
      character: '🦉',
      name: '올빼미',
      theme: '자정 이후 집중',
      condition: { type: 'time_range', value: '00:00-06:00' },
      unlocked: false,
      hidden: true
    },
    {
      id: 'marathon_runner',
      character: '🐻',
      name: '집중 마라토너',
      theme: '2시간 이상 연속',
      condition: { type: 'session_length', value: 120 },
      unlocked: false,
      hidden: true
    }
  ];

  // 랜덤 팁 시스템
  const learningTips = [
    "🌅 다양한 시간대에 집중해보세요. 뇌가 가장 활발한 시간을 찾을 수 있어요!",
    "👥 한 파트너와 루틴을 만들어보세요. 서로에게 좋은 자극이 됩니다.",
    "⏰ 짧은 세션부터 시작해서 점차 늘려가세요. 집중력도 근육처럼 키워집니다.",
    "🎧 배경음을 바꿔가며 집중해보세요. 뇌에게 새로운 자극을 줄 수 있어요.",
    "📝 구체적인 목표를 설정하면 집중력이 더욱 향상됩니다.",
    "🌙 일정한 시간에 집중하는 습관을 만들어보세요.",
    "💪 실패해도 괜찮아요. 꾸준함이 가장 중요합니다!"
  ];

  const getRandomTip = () => {
    return learningTips[Math.floor(Math.random() * learningTips.length)];
  };

  // 뱃지 획득 조건 체크
  const checkBadgeEligibility = (badge: any) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const sessionMinutes = Math.floor((sessionData.sessionTime || 600) / 60);

    switch (badge.condition.type) {
      case 'session_count':
        return typeof badge.condition.value === 'number' && 1 >= badge.condition.value;
      case 'session_length':
        return typeof badge.condition.value === 'number' && sessionMinutes >= badge.condition.value;
      case 'time_range':
        if (badge.condition.value === '06:00-08:00') {
          return currentHour >= 6 && currentHour < 8;
        }
        if (badge.condition.value === '00:00-06:00') {
          return currentHour >= 0 && currentHour < 6;
        }
        return false;
      default:
        return false;
    }
  };

  const unlockedBadges = badges.filter(badge => 
    badge.unlocked || checkBadgeEligibility(badge)
  );

  const handleComplete = () => {
    const tip = getRandomTip();
    alert(`세션 완료! 🎉\n\n💡 ${tip}`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">세션 완료!</h1>
          <p className="text-gray-600">집중 세션이 종료되었습니다</p>
        </div>

        {/* 새로 획득한 뱃지 표시 */}
        {unlockedBadges.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">🏅 획득한 뱃지</h3>
            <div className="space-y-3">
              {unlockedBadges.map((badge) => (
                <div key={badge.id} className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">{badge.character}</div>
                  <h4 className="font-bold text-gray-800">{badge.name}</h4>
                  <p className="text-sm text-gray-600">{badge.theme}</p>
                  {badge.hidden && (
                    <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full mt-2 inline-block">
                      히든 뱃지!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* 집중도 평가 */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              집중도는 어땠나요?
            </Label>
            <div className="flex justify-between space-x-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setFocusLevel(level)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    focusLevel >= level
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Star className={`w-6 h-6 mx-auto ${
                    focusLevel >= level ? 'text-green-500 fill-current' : 'text-gray-300'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* 목표 달성도 평가 */}
          {sessionData.goal && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                목표 달성도는 어땠나요?
              </Label>
              <div className="flex justify-between space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setGoalAchievement(level)}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      goalAchievement >= level
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Target className={`w-6 h-6 mx-auto ${
                      goalAchievement >= level ? 'text-blue-500 fill-current' : 'text-gray-300'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 소회 작성 */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              오늘의 소회 (선택사항)
            </Label>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="오늘 집중 세션은 어땠나요? 느낀 점을 자유롭게 적어주세요."
              className="min-h-[80px] resize-none"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">{reflection.length}/200자</p>
          </div>

          <Button onClick={handleComplete} className="w-full py-3 text-base">
            <CheckCircle className="w-5 h-5 mr-2" />
            완료하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthExit;
