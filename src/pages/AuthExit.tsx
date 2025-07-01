
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';
import { Target, CheckCircle2 } from 'lucide-react';

const AuthExit = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [goalProof, setGoalProof] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state || {};

  const handleRating = (score: number) => {
    setRating(score);
  };

  const handleComplete = () => {
    if (!goalProof.trim()) {
      alert('목표 달성 내용을 입력해주세요.');
      return;
    }
    
    setIsCompleted(true);
    console.log('세션 완료:', { 
      goal: sessionData.goal, 
      goalProof, 
      rating 
    });
    
    setTimeout(() => {
      navigate('/stats');
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">목표 달성!</h1>
          <p className="text-gray-600 mb-4">세션이 성공적으로 기록되었습니다.</p>
          <div className="text-sm text-gray-500">통계 페이지로 이동 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">목표 인증</h1>
          <p className="text-gray-600">목표 달성 내용을 인증해주세요</p>
        </div>

        <div className="space-y-6">
          {/* 설정했던 목표 표시 */}
          {sessionData.goal && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-blue-700 mb-2 block">
                설정한 목표
              </Label>
              <p className="text-blue-800 font-medium">{sessionData.goal}</p>
            </div>
          )}

          {/* 목표 달성 증명 */}
          <div>
            <Label htmlFor="goal-proof" className="text-sm font-medium text-gray-700 mb-2 block">
              목표 달성 내용을 구체적으로 작성해주세요 *
            </Label>
            <Textarea
              id="goal-proof"
              value={goalProof}
              onChange={(e) => setGoalProof(e.target.value)}
              placeholder="예: 수학 문제 8개 완료 (10개 중), 보고서 2페이지 모두 작성 완료"
              className="min-h-[100px] resize-none"
              maxLength={300}
            />
            <p className="text-xs text-gray-500 mt-1">
              {goalProof.length}/300자 • 달성한 내용을 구체적으로 적어주세요
            </p>
          </div>

          {/* 집중도 평가 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              이번 세션 집중도는 어떠셨나요?
            </h3>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleRating(score)}
                  className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                    rating === score
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>아쉬워요</span>
              <span>완벽해요</span>
            </div>
          </div>

          <Button 
            onClick={handleComplete}
            disabled={!rating || !goalProof.trim()}
            className="w-full py-3 text-base"
          >
            세션 완료하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthExit;
