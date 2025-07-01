
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Timer, QrCode, Users } from 'lucide-react';

const SessionMode = () => {
  const navigate = useNavigate();

  const handleAutoMatching = () => {
    navigate('/session-request', { state: { mode: 'auto' } });
  };

  const handleQRMatching = () => {
    navigate('/qr-matching');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">집중 세션 방식</h1>
          <p className="text-gray-600">어떤 방식으로 집중 세션을 시작하시겠나요?</p>
        </div>

        <div className="space-y-4">
          {/* 자동 매칭 */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <div className="flex items-center mb-3">
              <Users className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">자동 매칭</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              비슷한 시간대와 목표를 가진 사용자와 자동으로 매칭됩니다. 
              상대가 없으면 집중 도우미 봇과 함께 진행됩니다.
            </p>
            <Button onClick={handleAutoMatching} className="w-full">
              자동 매칭 시작
            </Button>
          </div>

          {/* QR 매칭 */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
            <div className="flex items-center mb-3">
              <QrCode className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">QR 매칭</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              주변 친구나 동료와 QR 코드를 스캔하여 함께 집중 세션을 시작합니다.
            </p>
            <Button onClick={handleQRMatching} variant="outline" className="w-full">
              QR 매칭 시작
            </Button>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/')}
          variant="ghost"
          className="w-full mt-6"
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default SessionMode;
