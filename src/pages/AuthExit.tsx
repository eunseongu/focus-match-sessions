
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Trophy, Star, Gift, Zap } from 'lucide-react';

const AuthExit = () => {
  const [goal, setGoal] = useState('');
  const [reflection, setReflection] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state || {};

  // 뱃지 시스템 데이터
  const availableBadges = [
    {
      id: 1,
      character: '🐰',
      name: '첫 걸음마',
      description: '첫 집중 세션 완료',
      condition: { type: 'session_count', value: 1 },
      rarity: 'common'
    },
    {
      id: 2,
      character: '🐤',
      name: '새싹',
      description: '5회 집중 세션 완료',
      condition: { type: 'session_count', value: 5 },
      rarity: 'common'
    },
    {
      id: 3,
      character: '🐻',
      name: '집중왕',
      description: '60분 이상 집중',
      condition: { type: 'focus_time', value: 60 },
      rarity: 'rare'
    },
    {
      id: 4,
      character: '🦊',
      name: '새벽 집중러',
      description: '오전 6-7시 집중',
      condition: { type: 'time_range', value: '06:00-07:00' },
      rarity: 'epic',
      isHidden: true
    },
    {
      id: 5,
      character: '🐯',
      name: '루틴 마스터',
      description: '동일 파트너와 5회 세션',
      condition: { type: 'partner_sessions', value: 5 },
      rarity: 'legendary',
      isHidden: true
    },
    {
      id: 6,
      character: '🐨',
      name: '연속 집중러',
      description: '3일 연속 성공',
      condition: { type: 'consecutive_days', value: 3 },
      rarity: 'epic',
      isHidden: true
    }
  ];

  // 획득한 뱃지 체크 (시뮬레이션)
  const earnedBadges = availableBadges.filter(badge => {
    if (badge.condition.type === 'session_count') {
      return typeof badge.condition.value === 'number' && 1 >= badge.condition.value;
    }
    return Math.random() > 0.7; // 30% 확률로 획득
  });

  // 랜덤 팁 제공
  const learningTips = [
    "다양한 시간대에 집중해보세요. 새로운 뱃지를 발견할 수 있어요!",
    "한 파트너와 루틴을 만들어보세요. 특별한 보상이 기다리고 있어요.",
    "연속으로 성공하면 더 큰 성취감을 느낄 수 있어요.",
    "새벽 시간대 집중은 특별한 경험을 선사해요.",
    "긴 시간 집중할수록 더 많은 뱃지를 획득할 수 있어요.",
    "파트너와 함께하면 더 많은 동기부여를 받을 수 있어요."
  ];

  const randomTip = learningTips[Math.floor(Math.random() * learningTips.length)];

  const handleSubmit = () => {
    if (!goal.trim()) {
      alert('목표를 입력해주세요.');
      return;
    }

    if (rating === 0) {
      alert('집중도를 평가해주세요.');
      return;
    }

    // 성공적으로 완료
    navigate('/', { 
      state: { 
        sessionCompleted: true, 
        earnedBadges,
        rating,
        reflection 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">세션 완료!</h1>
          <p className="text-gray-600">목표 달성을 인증해주세요</p>
        </div>

        <div className="space-y-6">
          {/* 목표 입력 */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              오늘 달성한 목표를 적어주세요 *
            </Label>
            <Input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="예: 수학 문제 30개 풀기, 영어 단어 50개 외우기"
              className="w-full"
            />
          </div>

          {/* 집중도 평가 */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              집중도를 평가해주세요 *
            </Label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                >
                  ⭐
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              {rating === 0 ? '평가를 선택해주세요' : `${rating}/5 - ${rating >= 4 ? '훌륭해요!' : rating >= 3 ? '좋아요!' : '다음엔 더 잘할 수 있어요!'}`}
            </p>
          </div>

          {/* 소감 입력 (선택사항) */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              소감이나 느낀 점 (선택사항)
            </Label>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="집중하면서 느낀 점이나 다음에 개선하고 싶은 점을 적어보세요"
              className="w-full h-20 resize-none"
            />
          </div>

          {/* 획득한 뱃지 표시 */}
          {earnedBadges.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center mb-3">
                <Trophy className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-yellow-800">새로운 뱃지 획득!</h3>
              </div>
              <div className="space-y-2">
                {earnedBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center p-2 bg-white rounded-lg">
                    <span className="text-2xl mr-3">{badge.character}</span>
                    <div>
                      <p className="font-medium text-gray-800">{badge.name}</p>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 학습 팁 */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">💡 집중 팁</h3>
            </div>
            <p className="text-sm text-blue-700">{randomTip}</p>
          </div>

          <Button onClick={handleSubmit} className="w-full py-3 text-base">
            <Gift className="w-4 h-4 mr-2" />
            완료하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthExit;
