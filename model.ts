export type Role = 'coach' | 'participant';
export type InviteStatus = 'pending' | 'accepted' | 'declined';
export type ChallengeStatus = 'draft' | 'upcoming' | 'active' | 'completed';
export type Evidence = 'photo' | 'self';
export type Verification = 'not_started' | 'pending' | 'verified' | 'review';

export type Account = {
  id: string; first: string; last: string; email?: string; phone?: string;
  dob: string; gender: string; role: Role; initials: string;
};
export type Participant = {
  id: string; accountId: string; interests: string[]; preferences: string;
  goal: string; reminder: string; notificationMethod: string; healthFile?: string;
};
export type Task = {
  id: string; name: string; instructions: string; target: number; unit: string;
  frequency: 'Daily' | 'Weekly' | 'Custom'; period: string; points: number;
  evidence: Evidence; reminder?: string;
};
export type Challenge = {
  id: string; coachId: string; name: string; description: string;
  category: 'Fitness' | 'Hydration' | 'Nutrition' | 'Sleep' | 'General Wellness';
  goal: string; start: string; end: string; tasks: Task[]; participantId?: string;
  status: ChallengeStatus;
};
export type Invitation = {
  id: string; challengeId: string; participantId: string; status: InviteStatus;
  sentAt: string; declineReason?: string; revision: number;
};
export type Completion = {
  id: string; taskId: string; challengeId: string; participantId: string;
  date: string; verification: Verification; pointsAwarded: number; note?: string;
  evidenceName?: string;
};
export type Notice = {
  id: string; role: Role; title: string; body: string; read: boolean;
  kind: string; createdAt: string; challengeId?: string;
};
export type DemoState = {
  accounts: Account[]; participants: Participant[]; challenges: Challenge[];
  invitations: Invitation[]; completions: Completion[]; notices: Notice[];
  points: Record<string, number>; streaks: Record<string, { current: number; longest: number; lastDay?: string }>;
};

export const localDay = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
export const addDays = (count: number) => {
  const d = new Date(); d.setDate(d.getDate()+count);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
export const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
export const normalizeEmail = (value: string) => value.trim().toLowerCase();
export const normalizePhone = (value: string) => value.replace(/\D/g,'').replace(/^1(?=\d{10}$)/,'');
export const formatPhone = (value: string) => {
  const n = normalizePhone(value).slice(0,10);
  if (n.length < 4) return n;
  if (n.length < 7) return `(${n.slice(0,3)}) ${n.slice(3)}`;
  return `(${n.slice(0,3)}) ${n.slice(3,6)}-${n.slice(6)}`;
};
export const ageFromDob = (dob: string) => {
  const birth = new Date(`${dob}T00:00:00`); const now = new Date();
  let age = now.getFullYear()-birth.getFullYear();
  const month = now.getMonth()-birth.getMonth();
  if (month<0 || (month===0 && now.getDate()<birth.getDate())) age--;
  return age;
};

export function initialState(): DemoState {
  const coach: Account={id:'coach-1',first:'Jamie',last:'Lee',email:'jamie@wellquest.demo',dob:'1987-05-14',gender:'Non-binary',role:'coach',initials:'JL'};
  const maya: Account={id:'user-maya',first:'Maya',last:'Kapoor',email:'maya@wellquest.demo',phone:'(415) 555-0186',dob:'1994-08-22',gender:'Woman',role:'participant',initials:'MK'};
  const alex: Account={id:'user-alex',first:'Alex',last:'Rivera',email:'alex@wellquest.demo',dob:'1990-02-09',gender:'Man',role:'participant',initials:'AR'};
  const sam: Account={id:'user-sam',first:'Sam',last:'Patel',email:'sam@wellquest.demo',dob:'1988-11-04',gender:'Prefer not to say',role:'participant',initials:'SP'};
  const pMaya:Participant={id:'p-maya',accountId:maya.id,interests:['Walking','Nutrition','Mindfulness'],preferences:'Morning activities · Low-impact movement',goal:'Build steady energy and a sustainable morning routine',reminder:'08:00',notificationMethod:'In-app'};
  const pAlex:Participant={id:'p-alex',accountId:alex.id,interests:['Sleep','Stress relief'],preferences:'Evening activities',goal:'Create a calmer bedtime routine',reminder:'20:30',notificationMethod:'In-app'};
  const pSam:Participant={id:'p-sam',accountId:sam.id,interests:['Hydration','Fitness'],preferences:'Flexible schedule',goal:'Stay hydrated and move consistently',reminder:'12:00',notificationMethod:'In-app'};
  const steps:Task={id:'task-steps',name:'10,000 mindful steps',instructions:'Build movement across the day at a comfortable pace.',target:10000,unit:'steps',frequency:'Daily',period:'By 9:00 PM',points:50,evidence:'self',reminder:'18:00'};
  const breakfast:Task={id:'task-breakfast',name:'Vitamin-rich breakfast',instructions:'Choose a breakfast that supports your nutrition goals. This is not medical advice.',target:1,unit:'meal',frequency:'Daily',period:'By 10:30 AM',points:35,evidence:'photo',reminder:'09:00'};
  const water:Task={id:'task-water',name:'Hydration check-in',instructions:'Track water across the day using your personally appropriate target.',target:8,unit:'glasses',frequency:'Daily',period:'By 8:00 PM',points:20,evidence:'self',reminder:'12:00'};
  const walk:Task={id:'task-walk',name:'15-minute evening walk',instructions:'Take a comfortable, low-intensity walk.',target:15,unit:'minutes',frequency:'Daily',period:'By 8:30 PM',points:25,evidence:'self',reminder:'18:30'};
  const energyWater:Task={id:'task-energy-water',name:'Morning hydration',instructions:'Start the day with a personally appropriate hydration check-in.',target:2,unit:'glasses',frequency:'Daily',period:'By 10:00 AM',points:20,evidence:'self',reminder:'08:30'};
  const energyPhoto:Task={id:'task-energy-photo',name:'Colorful breakfast check-in',instructions:'Prepare a balanced breakfast that fits your preferences. This is not medical advice.',target:1,unit:'meal',frequency:'Daily',period:'By 11:00 AM',points:30,evidence:'photo',reminder:'09:30'};
  const challenges:Challenge[]=[
    {id:'ch-energy',coachId:coach.id,name:'Everyday Energy',description:'A flexible daily routine for hydration, nourishment, and steady energy.',category:'General Wellness',goal:'Support a consistent morning routine',start:addDays(-5),end:addDays(16),tasks:[energyWater,energyPhoto],participantId:pMaya.id,status:'active'},
    {id:'ch-morning',coachId:coach.id,name:'Morning Vitality',description:'A gentle reset built around movement, nourishing mornings, and steady energy.',category:'General Wellness',goal:'Build sustainable morning energy',start:addDays(2),end:addDays(15),tasks:[steps,breakfast],participantId:pMaya.id,status:'upcoming'},
    {id:'ch-hydrate',coachId:coach.id,name:'Hydration Habit',description:'A simple hydration rhythm with supportive reminders.',category:'Hydration',goal:'Improve daily hydration consistency',start:addDays(-8),end:addDays(20),tasks:[water],participantId:pSam.id,status:'active'},
    {id:'ch-evening',coachId:coach.id,name:'Evening Reset',description:'Unwind with a gentle walk and a calmer evening routine.',category:'Sleep',goal:'Prepare for more restful sleep',start:addDays(-3),end:addDays(11),tasks:[walk],participantId:pAlex.id,status:'active'},
    {id:'ch-fresh',coachId:coach.id,name:'Fresh Start Movement',description:'A flexible movement plan.',category:'Fitness',goal:'Move more consistently',start:addDays(5),end:addDays(18),tasks:[steps],participantId:pMaya.id,status:'upcoming'},
    {id:'ch-draft',coachId:coach.id,name:'Mindful Week',description:'A draft general wellness plan.',category:'General Wellness',goal:'Make space for daily reflection',start:addDays(7),end:addDays(14),tasks:[walk],status:'draft'},
  ];
  const invitations:Invitation[]=[
    {id:'inv-energy',challengeId:'ch-energy',participantId:pMaya.id,status:'accepted',sentAt:addDays(-7),revision:1},
    {id:'inv-morning',challengeId:'ch-morning',participantId:pMaya.id,status:'pending',sentAt:new Date().toISOString(),revision:1},
    {id:'inv-hydrate',challengeId:'ch-hydrate',participantId:pSam.id,status:'accepted',sentAt:addDays(-10),revision:1},
    {id:'inv-evening',challengeId:'ch-evening',participantId:pAlex.id,status:'accepted',sentAt:addDays(-5),revision:1},
    {id:'inv-fresh',challengeId:'ch-fresh',participantId:pMaya.id,status:'declined',sentAt:addDays(-1),declineReason:'Morning timing is hard for me. Could the activities start after lunch?',revision:1},
  ];
  const completions:Completion[]=[
    {id:'cmp-water',taskId:'task-water',challengeId:'ch-hydrate',participantId:pSam.id,date:localDay(),verification:'verified',pointsAwarded:20,note:'Finished my target.'},
    {id:'cmp-walk',taskId:'task-walk',challengeId:'ch-evening',participantId:pAlex.id,date:addDays(-1),verification:'verified',pointsAwarded:25},
  ];
  const notices:Notice[]=[
    {id:'n1',role:'participant',title:'New challenge invitation',body:'Coach Jamie invited you to Morning Vitality.',read:false,kind:'invitation',createdAt:'10 minutes ago',challengeId:'ch-morning'},
    {id:'n2',role:'participant',title:'12-day streak',body:'Small actions have added up to a new milestone.',read:false,kind:'streak',createdAt:'Today'},
    {id:'n3',role:'participant',title:'Task reminder',body:'Your mindful steps check-in is due this evening.',read:true,kind:'reminder',createdAt:'Today'},
    {id:'n4',role:'coach',title:'Challenge declined',body:'Maya shared feedback on Fresh Start Movement.',read:false,kind:'declined',createdAt:'1 hour ago',challengeId:'ch-fresh'},
    {id:'n5',role:'coach',title:'Task verified',body:'Sam completed today’s Hydration Habit task.',read:true,kind:'completion',createdAt:'Today',challengeId:'ch-hydrate'},
  ];
  return {accounts:[coach,maya,alex,sam],participants:[pMaya,pAlex,pSam],challenges,invitations,completions,notices,points:{'p-maya':1240,'p-alex':730,'p-sam':1680},streaks:{'p-maya':{current:12,longest:18,lastDay:addDays(-1)},'p-alex':{current:3,longest:7,lastDay:addDays(-1)},'p-sam':{current:18,longest:18,lastDay:localDay()}}};
}
