
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Timer, Users, User, Link } from 'lucide-react';

const SessionMode = () => {
  const navigate = useNavigate();

  const handleAutoMatching = () => {
    navigate('/session-request', { state: { mode: 'auto' } });
  };

  const handleRemoteMatching = () => {
    navigate('/remote-matching');
  };

  const handleSoloSession = () => {
    navigate('/session-request', { state: { mode: 'solo' } });
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
          {/* 혼자 집중하기 */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
            <div className="flex items-center mb-3">
              <User className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">혼자 집중하기</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              혼자서 조용히 집중하고 싶을 때. 뱃지 획득도 가능합니다.
            </p>
            <Button onClick={handleSoloSession} className="w-full bg-green-600 hover:bg-green-700">
              혼자 시작하기
            </Button>
          </div>

          {/* 자동 매칭 */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <div className="flex items-center mb-3">
              <Users className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">자동 매칭</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              비슷한 시간대와 목표를 가진 사용자와 자동으로 매칭됩니다.
            </p>
            <Button onClick={handleAutoMatching} className="w-full">
              자동 매칭 시작
            </Button>
          </div>

          {/* 원격 매칭 (QR + 참여코드 통합) */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
            <div className="flex items-center mb-3">
              <Link className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">원격 매칭</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              QR 코드나 참여 코드를 공유하여 친구와 함께 집중합니다.
            </p>
            <Button onClick={handleRemoteMatching} variant="outline" className="w-full border-orange-300 hover:bg-orange-50">
              원격 매칭 시작
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
