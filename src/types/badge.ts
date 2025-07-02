
export interface Badge {
  id: string;
  name: string;
  description: string;
  character: string;
  theme: string;
  type: 'role' | 'special';
  condition: {
    type: 'time' | 'timeOfDay' | 'frequency' | 'special' | 'firstSession';
    value: number | string;
    role?: string;
  };
  isUnlocked: boolean;
  unlockedAt?: Date;
}

export const ROLE_BADGES: Badge[] = [
  {
    id: 'child',
    name: '어린이',
    description: '집중의 첫걸음을 내딛은 당신!',
    character: '🐣',
    theme: '알에서 나온 병아리',
    type: 'role',
    condition: { type: 'time', value: 20, role: '어린이' },
    isUnlocked: false
  },
  {
    id: 'elementary',
    name: '초등학생',
    description: '한 교시 수업 성공! 집중의 시작',
    character: '🐤',
    theme: '책 읽는 병아리',
    type: 'role',
    condition: { type: 'time', value: 30, role: '초등학생' },
    isUnlocked: false
  },
  {
    id: 'middle',
    name: '중학생',
    description: '성장기 집중력을 멋지게 달성',
    character: '🐰',
    theme: '필기하는 토끼',
    type: 'role',
    condition: { type: 'time', value: 40, role: '중학생' },
    isUnlocked: false
  },
  {
    id: 'high',
    name: '고등학생',
    description: '깊이 있는 몰입, 곰처럼 끈기 있게',
    character: '🐻',
    theme: '문제집 보는 곰',
    type: 'role',
    condition: { type: 'time', value: 50, role: '고등학생' },
    isUnlocked: false
  },
  {
    id: 'university',
    name: '대학생',
    description: '전공 몰입도 척척, 집중 마스터',
    character: '🦊',
    theme: '노트북 여우',
    type: 'role',
    condition: { type: 'time', value: 60, role: '대학생' },
    isUnlocked: false
  },
  {
    id: 'worker',
    name: '직장인',
    description: '업무 몰입 완수, 프로답게 집중',
    character: '🐯',
    theme: '회의실 호랑이',
    type: 'role',
    condition: { type: 'time', value: 45, role: '직장인' },
    isUnlocked: false
  }
];

export const SPECIAL_BADGES: Badge[] = [
  {
    id: 'newborn',
    name: '신생아',
    description: '첫 세션을 성공한 당신을 환영합니다!',
    character: '👶',
    theme: '첫 걸음마 아기',
    type: 'special',
    condition: { type: 'firstSession', value: 1 },
    isUnlocked: false
  },
  {
    id: 'morning-owl',
    name: '아침 올빼미',
    description: '누구보다 빠른 하루 시작!',
    character: '🦉',
    theme: '졸린 부엉이',
    type: 'special',
    condition: { type: 'timeOfDay', value: '5-7' },
    isUnlocked: false
  },
  {
    id: 'focus-hamster',
    name: '몰입 햄스터',
    description: '작지만 강한 집중 반복러',
    character: '🐹',
    theme: '책상 위 햄스터',
    type: 'special',
    condition: { type: 'frequency', value: 2 },
    isUnlocked: false
  },
  {
    id: 'weekend-guardian',
    name: '휴일 지킴이',
    description: '쉬는 날에도 집중을 지킨 당신!',
    character: '🐶',
    theme: '파자마 강아지',
    type: 'special',
    condition: { type: 'special', value: 'weekend' },
    isUnlocked: false
  },
  {
    id: 'focus-unicorn',
    name: '몰입 유니콘',
    description: '전설급 몰입, 집중 끝판왕!',
    character: '🦄',
    theme: '무지개 유니콘',
    type: 'special',
    condition: { type: 'time', value: 90 },
    isUnlocked: false
  },
  {
    id: 'hidden-mystery',
    name: '???',
    description: '숨겨진 조건을 만족하면 획득할 수 있는 신비한 뱃지입니다.',
    character: '❓',
    theme: '신비한 존재',
    type: 'special',
    condition: { type: 'special', value: 'hidden' },
    isUnlocked: false
  }
];
