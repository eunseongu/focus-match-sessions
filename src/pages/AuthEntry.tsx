
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';
import { Target } from 'lucide-react';

const AuthEntry = () => {
  const [inputPhrase, setInputPhrase] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state || {};

  const requiredPhrase = '집중 시작';

  const handleVerifyPhrase = () => {
    if (inputPhrase.trim() === requiredPhrase) {
      setIsVerified(true);
      setTimeout(() => {
        navigate('/session', { state: sessionData });
      }, 1500);
    } else {
      alert('올바른 문구를 입력해주세요.');
      setInputPhrase('');
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">인증 완료!</h1>
          <p className="text-gray-600">세션이 곧 시작됩니다...</p>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">입장 인증</h1>
          <p className="text-gray-600">집중 시작 문구를 입력해주세요</p>
        </div>

        <div className="space-y-6">
          {/* 목표 표시 */}
          {sessionData.goal && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-blue-700 mb-2 block">
                설정한 목표
              </Label>
              <p className="text-blue-800 font-medium">{sessionData.goal}</p>
            </div>
          )}

          {/* 문구 입력 */}
          <div>
            <Label htmlFor="phrase-input" className="text-sm font-medium text-gray-700 mb-2 block">
              입장 인증 문구를 입력하세요
            </Label>
            <Input
              id="phrase-input"
              value={inputPhrase}
              onChange={(e) => setInputPhrase(e.target.value)}
              placeholder="집중 시작"
              className="text-center text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleVerifyPhrase()}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              힌트: "집중 시작"이라고 입력하세요
            </p>
          </div>

          <Button 
            onClick={handleVerifyPhrase}
            disabled={!inputPhrase.trim()}
            className="w-full py-3 text-base"
          >
            집중 세션 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthEntry;
