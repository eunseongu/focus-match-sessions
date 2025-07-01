
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Timer } from 'lucide-react';

const Matching = () => {
  const [isMatching, setIsMatching] = useState(true);
  const [matchedUser, setMatchedUser] = useState<string | null>(null);
  const navigate = useNavigate();

  // 매칭 시뮬레이션 (실제로는 서버에서 처리)
  useEffect(() => {
    const matchingTimer = setTimeout(() => {
      setIsMatching(false);
      setMatchedUser('사용자123');
    }, 3000);

    return () => clearTimeout(matchingTimer);
  }, []);

  const handleStartAuth = () => {
    navigate('/auth-entry');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isMatching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="animate-spin w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full mx-auto mb-6"></div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">매칭 중...</h1>
          <p className="text-gray-600 mb-6">집중 파트너를 찾고 있습니다</p>
          
          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-orange-700">
              평균 매칭 시간: 30초 내외
            </p>
          </div>

          <Button variant="outline" onClick={handleCancel} className="w-full">
            매칭 취소
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Timer className="w-8 h-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">매칭 완료!</h1>
        <p className="text-gray-600 mb-6">
          <span className="font-semibold text-green-600">{matchedUser}</span>님과 매칭되었습니다
        </p>
        
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-green-700">
            서로 QR 코드를 스캔하여 입장 인증을 완료해주세요
          </p>
        </div>

        <Button onClick={handleStartAuth} className="w-full">
          입장 인증 시작
        </Button>
      </div>
    </div>
  );
};

export default Matching;
