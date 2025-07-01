
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { QrCode } from 'lucide-react';

const AuthEntry = () => {
  const [authCode] = useState('ABC123'); // 실제로는 서버에서 생성
  const [inputCode, setInputCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerifyCode = () => {
    if (inputCode === 'XYZ789') { // 상대방 코드 시뮬레이션
      setIsVerified(true);
      setTimeout(() => {
        navigate('/session');
      }, 1500);
    } else {
      alert('인증 코드가 올바르지 않습니다.');
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-green-600" />
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
            <QrCode className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">입장 인증</h1>
          <p className="text-gray-600">상대방과 인증 코드를 교환해주세요</p>
        </div>

        <div className="space-y-6">
          {/* 내 인증 코드 */}
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Label className="text-sm font-medium text-blue-700 mb-2 block">
              내 인증 코드
            </Label>
            <div className="text-3xl font-mono font-bold text-blue-600 tracking-widest">
              {authCode}
            </div>
            <p className="text-xs text-blue-600 mt-2">
              상대방에게 이 코드를 알려주세요
            </p>
          </div>

          {/* 상대방 코드 입력 */}
          <div>
            <Label htmlFor="partner-code" className="text-sm font-medium text-gray-700 mb-2 block">
              상대방 인증 코드 입력
            </Label>
            <Input
              id="partner-code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="예: XYZ789"
              className="text-center text-lg font-mono tracking-widest"
            />
            <p className="text-xs text-gray-500 mt-1">
              테스트용: XYZ789 입력
            </p>
          </div>

          <Button 
            onClick={handleVerifyCode}
            disabled={inputCode.length !== 6}
            className="w-full py-3 text-base"
          >
            인증 완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthEntry;
