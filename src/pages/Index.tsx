
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Timer, FileText, QrCode } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Timer,
      title: '실시간 매칭',
      description: '같은 목표를 가진 파트너와 즉시 매칭'
    },
    {
      icon: QrCode,
      title: 'QR 인증',
      description: '안전하고 정확한 세션 시작/종료 인증'
    },
    {
      icon: FileText,
      title: '집중 통계',
      description: '나의 집중 패턴과 성취도 분석'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 헤더 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">FocusMatch</h1>
          </div>
          <Button 
            onClick={() => navigate('/stats')}
            variant="outline"
            size="sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            내 통계
          </Button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 히어로 섹션 */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Timer className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              함께하는 집중,<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                더 깊은 몰입
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              혼자서는 어려운 집중을 파트너와 함께. 실시간 매칭으로 서로의 집중을 응원하고 
              QR 인증으로 정확한 집중 기록을 남겨보세요.
            </p>
            <Button 
              onClick={() => navigate('/session-request')}
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Timer className="w-5 h-5 mr-2" />
              집중 세션 시작하기
            </Button>
          </div>

          {/* 특징 카드 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* 통계 미리보기 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">오늘의 집중 현황</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">142</div>
                <div className="text-sm text-gray-600">현재 세션 수</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">평균 성공률</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">2.3분</div>
                <div className="text-sm text-gray-600">평균 매칭 시간</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">1,247</div>
                <div className="text-sm text-gray-600">오늘 총 시간(분)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
