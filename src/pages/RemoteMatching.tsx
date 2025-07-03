
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { QrCode, Share2, Copy, Check } from 'lucide-react';

const RemoteMatching = () => {
  const [roomCode] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());
  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const shareUrl = `${window.location.origin}/join/${roomCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('클립보드 복사 실패');
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('클립보드 복사 실패');
    }
  };

  const handleCreateRoom = () => {
    navigate('/session-request', { state: { mode: 'remote', roomCode } });
  };

  const handleJoinRoom = () => {
    if (!joinCode.trim()) {
      alert('참여 코드를 입력해주세요.');
      return;
    }
    navigate('/session-request', { state: { mode: 'remote', joinCode: joinCode.toUpperCase() } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">원격 매칭</h1>
          <p className="text-gray-600">친구와 함께 집중 세션을 시작하세요</p>
        </div>

        <div className="space-y-6">
          {/* 방 만들기 */}
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">방 만들기</h3>
            
            {/* QR 코드 영역 */}
            <div className="bg-gray-100 p-6 rounded-lg mb-4 text-center">
              <div className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center mb-3">
                <QrCode className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">QR 코드로 참여</p>
            </div>

            {/* 참여 코드 */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">참여 코드</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-100 p-3 rounded-lg">
                  <p className="font-mono font-bold text-lg text-center text-orange-600">
                    {roomCode}
                  </p>
                </div>
                <Button
                  onClick={handleCopyCode}
                  size="sm"
                  variant="outline"
                  className="px-3"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* 공유 링크 */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">공유 링크</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-100 p-2 rounded-lg">
                  <p className="text-xs text-gray-600 truncate">
                    {shareUrl}
                  </p>
                </div>
                <Button
                  onClick={handleCopyLink}
                  size="sm"
                  variant="outline"
                  className="px-3"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button onClick={handleCreateRoom} className="w-full bg-orange-600 hover:bg-orange-700">
              방 만들고 시작하기
            </Button>
          </div>

          {/* 구분선 */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">또는</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* 방 참여하기 */}
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">방 참여하기</h3>
            <div className="space-y-3">
              <Input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="참여 코드 입력 (예: ABC123)"
                className="text-center font-mono"
                maxLength={6}
              />
              <Button onClick={handleJoinRoom} variant="outline" className="w-full">
                참여하기
              </Button>
            </div>
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

export default RemoteMatching;
