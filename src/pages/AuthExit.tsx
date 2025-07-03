
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Star, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { ROLE_BADGES, SPECIAL_BADGES, Badge as BadgeType } from '@/types/badge';

const AuthExit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state || {};
  
  const [focusRating, setFocusRating] = useState(0);
  const [goalAchievement, setGoalAchievement] = useState(0);
  const [reflection, setReflection] = useState('');
  const [showReflectionInput, setShowReflectionInput] = useState(false);
  const [newBadge, setNewBadge] = useState<BadgeType | null>(null);
  const [learningHint, setLearningHint] = useState('');

  const learningHints = [
    "다양한 시간대에 집중해보세요. 아침 일찍 시도해보면 특별한 뱃지를 얻을 수 있어요! 🌅",
    "한 파트너와 루틴을 만들어보세요. 연속으로 함께하면 좋은 일이 생길지도... 🤝",
    "주말에도 집중해보세요. 쉬는 날의 집중은 특별한 의미가 있답니다 🎯",
    "장시간 집중에 도전해보세요. 90분 이상 집중하면 전설적인 무언가를... 🦄",
    "매일 조금씩이라도 집중해보세요. 연속 달성에는 비밀이 숨어있어요 🔥",
    "다른 사람들과 함께 집중해보세요. 협력의 힘은 생각보다 강력해요 💪"
  ];

  React.useEffect(() => {
    // 뱃지 획득 시뮬레이션
    const checkBadgeEligibility = () => {
      const sessionTimeMinutes = Math.floor(sessionData.sessionTime / 60);
      const now = new Date();
      const hour = now.getHours();
      
      // 신생아 뱃지 (첫 세션)
      const isFirstSession = !localStorage.getItem('focusMatch_hasCompletedSession');
      if (isFirstSession) {
        const firstBadge = SPECIAL_BADGES.find(b => b.id === 'newborn');
        if (firstBadge) {
          setNewBadge(firstBadge);
          localStorage.setItem('focusMatch_hasCompletedSession', 'true');
          return;
        }
      }

      // 히든 뱃지 조건들
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;
      if (isWeekend) {
        const weekendBadge = SPECIAL_BADGES.find(b => b.id === 'weekend-guardian');
        if (weekendBadge) {
          setNewBadge(weekendBadge);
          return;
        }
      }

      // 아침 올빼미 뱃지 (5-7시)
      if (hour >= 5 && hour <= 7) {
        const morningBadge = SPECIAL_BADGES.find(b => b.id === 'morning-owl');
        if (morningBadge) {
          setNewBadge(morningBadge);
          return;
        }
      }

      // 전설급 몰입 뱃지 (90분 이상)
      if (sessionTimeMinutes >= 90) {
        const unicornBadge = SPECIAL_BADGES.find(b => b.id === 'focus-unicorn');
        if (unicornBadge) {
          setNewBadge(unicornBadge);
          return;
        }
      }

      // 어린이 뱃지
      if (sessionTimeMinutes >= 20) {
        const childBadge = ROLE_BADGES.find(b => b.id === 'child');
        if (childBadge) {
          setNewBadge(childBadge);
          return;
        }
      }

      // 역할별 뱃지들 - 시간 조건만 체크
      const roleBadge = ROLE_BADGES.find(badge => {
        return badge.condition.type === 'time' && 
               typeof badge.condition.value === 'number' && 
               sessionTimeMinutes >= badge.condition.value;
      });
      
      if (roleBadge) {
        setNewBadge(roleBadge);
      }
    };

    // 학습 힌트 랜덤 선택
    const randomHint = learningHints[Math.floor(Math.random() * learningHints.length)];
    setLearningHint(randomHint);

    checkBadgeEligibility();
  }, [sessionData]);

  const handleComplete = () => {
    if (focusRating === 0) {
      alert('집중도를 평가해주세요.');
      return;
    }
    if (goalAchievement === 0) {
      alert('목표 달성도를 평가해주세요.');
      return;
    }

    // 세션 완료 처리
    console.log('세션 완료:', {
      focusRating,
      goalAchievement,
      reflection,
      newBadge: newBadge?.name
    });

    if (newBadge) {
      // 뱃지 획득 화면 표시
      navigate('/', { 
        state: { 
          newBadge,
          sessionComplete: true,
          focusRating,
          goalAchievement
        } 
      });
    } else {
      navigate('/');
    }
  };

  const renderStars = (rating: number, setRating: (rating: number) => void) => {
    return (
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <Star className="w-8 h-8 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">집중 완료!</h1>
          <p className="text-gray-600 mb-2">수고하셨습니다</p>
          
          {sessionData.goal && (
            <div className="bg-green-50 p-3 rounded-lg mt-4">
              <p className="text-sm text-green-700">
                목표: {sessionData.goal}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* 집중도 평가 */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">집중도는 어떠셨나요?</h3>
            {renderStars(focusRating, setFocusRating)}
            <p className="text-sm text-gray-500 mt-2">
              {focusRating > 0 && `${focusRating}점 선택됨`}
            </p>
          </div>

          {/* 목표 달성도 평가 */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">목표 달성도는 어떠셨나요?</h3>
            {renderStars(goalAchievement, setGoalAchievement)}
            <p className="text-sm text-gray-500 mt-2">
              {goalAchievement > 0 && `${goalAchievement}점 선택됨`}
            </p>
          </div>

          {/* 새 뱃지 미리보기 */}
          {newBadge && (
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg text-center">
              <p className="text-sm font-medium text-orange-700 mb-2">🎉 새 뱃지 획득!</p>
              <div className="text-4xl mb-2">{newBadge.character}</div>
              <p className="font-semibold text-gray-800">{newBadge.name}</p>
              <p className="text-sm text-gray-600">{newBadge.description}</p>
            </div>
          )}

          {/* 학습 힌트 */}
          {learningHint && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Lightbulb className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">💡 집중 팁</p>
                  <p className="text-sm text-blue-600">{learningHint}</p>
                </div>
              </div>
            </div>
          )}

          {/* 소감 입력 - 선택사항 */}
          <div>
            <button
              onClick={() => setShowReflectionInput(!showReflectionInput)}
              className="flex items-center justify-between w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all"
            >
              <span className="text-sm font-medium text-gray-700">
                소감 작성하기 (선택사항)
              </span>
              {showReflectionInput ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {showReflectionInput && (
              <div className="mt-3">
                <Textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="이번 집중 세션은 어떠셨나요? 느낀 점을 자유롭게 작성해보세요."
                  className="min-h-[100px] resize-none"
                  maxLength={300}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {reflection.length}/300자
                </p>
              </div>
            )}
          </div>

          <Button 
            onClick={handleComplete}
            disabled={focusRating === 0 || goalAchievement === 0}
            className="w-full py-3 text-base"
          >
            완료하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthExit;
