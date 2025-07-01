
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { QrCode, Scan } from 'lucide-react';

const QRMatching = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCode] = useState('FOCUS_12345_ABCDE'); // 시뮬레이션용
  const navigate = useNavigate();

  const handleGenerateQR = () => {
    setIsGenerating(true);
    // 실제로는 서버에서 QR 코드 생성
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  const handleScanQR = () => {
    // 실제로는 카메라 스캔 기능
    alert('QR 스캔 기능은 실제 구현에서 카메라를 사용합니다');
    navigate('/session-request', { state: { mode: 'qr', partnerId: 'QR_USER_123' } });
  };

  const handleMatchComplete = () => {
    navigate('/session-request', { state: { mode: 'qr', partnerId: 'QR_USER_123' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">QR 매칭</h1>
          <p className="text-gray-600">주변 사람과 QR 코드로 연결하세요</p>
        </div>

        <div className="space-y-6">
          {/* QR 코드 생성 */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">내 QR 코드 생성</h3>
            {!isGenerating && !qrCode && (
              <Button onClick={handleGenerateQR} className="w-full mb-4">
                <QrCode className="w-4 h-4 mr-2" />
                QR 코드 생성하기
              </Button>
            )}
            
            {isGenerating && (
              <div className="bg-gray-100 p-8 rounded-lg mb-4">
                <div className="animate-spin w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">QR 코드 생성 중...</p>
              </div>
            )}

            {qrCode && !isGenerating && (
              <div className="bg-gray-100 p-8 rounded-lg mb-4">
                <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2">상대방이 스캔하도록 보여주세요</p>
                <Button onClick={handleMatchComplete} className="mt-4 w-full">
                  매칭 완료 (시뮬레이션)
                </Button>
              </div>
            )}
          </div>

          {/* 구분선 */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">또는</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* QR 코드 스캔 */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">상대방 QR 코드 스캔</h3>
            <Button onClick={handleScanQR} variant="outline" className="w-full">
              <Scan className="w-4 h-4 mr-2" />
              QR 코드 스캔하기
            </Button>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/session-mode')}
          variant="ghost"
          className="w-full mt-6"
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default QRMatching;
