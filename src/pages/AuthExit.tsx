
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { QrCode } from 'lucide-react';

const AuthExit = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleRating = (score: number) => {
    setRating(score);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      navigate('/stats');
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <QrCode className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">완료!</h1>
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
            <QrCode className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">퇴장 인증</h1>
          <p className="text-gray-600">세션을 마무리해주세요</p>
        </div>

        <div className="space-y-6">
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

          {/* QR 코드 재인증 영역 */}
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-700 mb-2">
              QR 재스캔 또는 버튼으로 완료
            </p>
            <div className="w-24 h-24 bg-white border-2 border-dashed border-blue-300 rounded-lg mx-auto flex items-center justify-center">
              <QrCode className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <Button 
            onClick={handleComplete}
            disabled={!rating}
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
