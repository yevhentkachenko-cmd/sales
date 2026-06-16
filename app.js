/* ============================================================
   Sierra Logistics Group — Sales Tool
   Pure HTML/CSS/JS. No build, no dependencies.
   Scope: pre-Won sales work. After Won, deal opens in the
   CRM module (Customers/Loads) of the same product.
   ============================================================ */

/* ---------- Inline SVG icons (no external dependency) ---------- */
const ICONS = {
  workspace: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
  pipeline: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="5" height="14"/><rect x="10" y="3" width="5" height="18"/><rect x="17" y="3" width="4" height="10"/></svg>',
  dashboard: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  analytics: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>',
  phone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>',
  task: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  trend: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  target: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  pkg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4l-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>',
  users: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  search: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  truck: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  chat: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  file: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  send: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
};

/* ---------- Data ---------- */
const USERS = [
  { id:"b1", name:"Maria Castillo", initials:"MC", quota:60000 },
  { id:"b2", name:"Diego Romero",   initials:"DR", quota:60000 },
  { id:"b3", name:"Hanna Wójcik",   initials:"HW", quota:50000 },
  { id:"b4", name:"Tyler Brooks",   initials:"TB", quota:45000 },
];

const STAGES = [
  { key:"lead",      label:"New lead",  color:"#9CA3AF" },
  { key:"contacted", label:"Contacted", color:"#5A96CC" },
  { key:"qualified", label:"Qualified", color:"#7C5CFF" },
  { key:"quoted",    label:"Quoted",    color:"#E0A130" },
  { key:"won",       label:"Won",       color:"#3FA876" },
];

const LANE = (o,os,d,ds) => ({o,os,d,ds});
let _did = 100;
const D = (broker, customer, stage, lane, value, marginPct) => ({
  id: "d" + (++_did), broker, customer, stage, lane, value, marginPct,
  createdDays: Math.floor(Math.random()*30)+1
});

const SEED_DEALS = [
  D("b1","DB Schenker","quoted",         LANE("LRD","TX","LAS","NV"), 8400, 21),
  D("b1","UFC Foods","won",              LANE("LRD","TX","FAI","NJ"), 7000, 20),
  D("b1","American Agri Supply","quoted",LANE("SFO","CA","LAX","CA"), 5300, 17),
  D("b1","Bel Fresh Produce","contacted",LANE("MCA","TX","ATL","GA"), 2400, 19),
  D("b1","Ryder Supply Co","lead",       LANE("CHI","IL","DAL","TX"), 3200, 18),
  D("b2","Hellmann MX","won",            LANE("QRO","MX","LRD","TX"), 9100, 24),
  D("b2","LISI Automotive","qualified",  LANE("LRD","TX","EWR","NJ"), 4700, 19),
  D("b2","Nordic Metals","contacted",    LANE("HOU","TX","PHX","AZ"), 3900, 22),
  D("b2","Pacific Trade Co","quoted",    LANE("OAK","CA","SLC","UT"), 6100, 18),
  D("b3","Maersk Mexico","qualified",    LANE("VER","MX","LRD","TX"), 5800, 23),
  D("b3","Continental Foods","contacted",LANE("MIA","FL","ATL","GA"), 3300, 16),
  D("b3","Sunbelt Building","lead",      LANE("PHX","AZ","ABQ","NM"), 2900, 17),
  D("b3","Greenfield Co-op","won",       LANE("DSM","IA","CHI","IL"), 4400, 19),
  D("b4","Atlas Beverage","quoted",      LANE("DEN","CO","SLC","UT"), 4200, 16),
  D("b4","Cascade Lumber","contacted",   LANE("SEA","WA","BOI","ID"), 3700, 20),
  D("b4","Northstar Steel","lead",       LANE("PIT","PA","CLE","OH"), 2700, 15),
];

const SEED_ACTIVITIES = [
  { id:"a1", broker:"b1", customer:"DB Schenker",  type:"call",  when:"2026-06-10 14:20", note:"Discussed LRD→LAS lane, sent quote", next:"Follow up on quote · in 2 days" },
  { id:"a2", broker:"b1", customer:"UFC Foods",    type:"email", when:"2026-06-10 11:05", note:"Sent rate confirmation for Fairfield lane", next:"Confirm pickup window · tomorrow" },
  { id:"a3", broker:"b2", customer:"Hellmann MX",  type:"call",  when:"2026-06-10 09:40", note:"Aligned on weekly QRO→LRD volume", next:"Send contract draft · in 3 days" },
  { id:"a4", broker:"b3", customer:"Maersk Mexico",type:"call",  when:"2026-06-09 16:10", note:"Capacity check for next week", next:"Quote 5 lanes · tomorrow" },
];

const SEED_TASKS = [
  { id:"t1", broker:"b1", customer:"DB Schenker",          title:"Follow up on LRD→LAS quote",   due:"today",    urgent:true,  type:"call" },
  { id:"t2", broker:"b1", customer:"American Agri Supply", title:"Check capacity for weekly RFP",due:"today",    urgent:false, type:"task" },
  { id:"t3", broker:"b1", customer:"UFC Foods",            title:"Send rate confirmation",       due:"tomorrow", urgent:false, type:"mail" },
  { id:"t4", broker:"b2", customer:"Hellmann MX",          title:"Send contract draft",          due:"in 3 days",urgent:false, type:"mail" },
  { id:"t5", broker:"b2", customer:"Nordic Metals",        title:"Cold call new contact",        due:"today",    urgent:true,  type:"call" },
  { id:"t6", broker:"b3", customer:"Maersk Mexico",        title:"Quote 5 lanes",                due:"tomorrow", urgent:false, type:"task" },
  { id:"t7", broker:"b4", customer:"Atlas Beverage",       title:"Confirm rate ceiling",         due:"today",    urgent:true,  type:"call" },
];

/* ---------- Carrier Board seed data ---------- */

// Carriers (third-party trucking companies that bid on loads)
const CARRIERS = [
  { id:"car1", name:"Swift Road LLC",     mc:"MC-485219", otr:true,  creditOk:true,  rating:4.8 },
  { id:"car2", name:"GGT Freight Inc",    mc:"MC-712044", otr:true,  creditOk:true,  rating:4.5 },
  { id:"car3", name:"Cherrycargo LLC",    mc:"MC-883051", otr:true,  creditOk:false, rating:4.2 },
  { id:"car4", name:"MT Express",         mc:"MC-901832", otr:false, creditOk:true,  rating:3.9 },
  { id:"car5", name:"Pacific Haul Co",    mc:"MC-556417", otr:true,  creditOk:true,  rating:4.7 },
  { id:"car6", name:"Sierra Logistics",   mc:"MC-220098", otr:true,  creditOk:true,  rating:4.6 },
];

// Loads on the board. Each load belongs to a customer (from deals).
const LOADS = [
  {
    id:"L17501", customer:"DB Schenker", broker:"b1",
    lane:LANE("LRD","TX","LAS","NV"),
    pickupDate:"Jun 14, 08:00", deliveryDate:"Jun 16, 10:00",
    equipment:"53' Reefer", weight:"42,000 lb", pieces:"22 plt",
    commodity:"Food", distance:1380,
    requirements:"Tarp not required · FIFO loading · 24h notice",
    customerRate:2950, targetRate:2400, showTarget:true,
    status:"bidding", // posted | bidding | booked
    bids:[
      { id:"bid1", carrier:"car1", rate:2350, pickupTime:"Jun 14, 07:30", note:"Truck already in Laredo", time:"2h ago", status:"pending" },
      { id:"bid2", carrier:"car2", rate:2450, pickupTime:"Jun 14, 09:00", note:"", time:"1h ago", status:"pending" },
      { id:"bid3", carrier:"car3", rate:2300, pickupTime:"Jun 14, 08:00", note:"Best rate, willing to flex", time:"45m ago", status:"pending" },
    ],
    chats:{
      "car1":[
        { from:"car", text:"Hi, our truck is in Laredo today, we can pick up early.", when:"2h ago" },
        { from:"me",  text:"Thanks. Are you OK with the 24h notice requirement?",   when:"2h ago" },
        { from:"car", text:"Yes, no issue. Driver has the docs ready.",             when:"1h ago" },
      ],
      "car3":[
        { from:"car", text:"Can you confirm pallet count? We need to plan the trailer.", when:"40m ago" },
      ],
    },
    acceptedBidId:null,
    rateConSent:false,
  },
  {
    id:"L17502", customer:"Hellmann MX", broker:"b2",
    lane:LANE("QRO","MX","LRD","TX"),
    pickupDate:"Jun 15, 10:00", deliveryDate:"Jun 17, 14:00",
    equipment:"53' Dry Van", weight:"38,500 lb", pieces:"18 plt",
    commodity:"Automotive parts", distance:610,
    requirements:"Cross-border MX-US · Customs broker required",
    customerRate:3850, targetRate:3100, showTarget:false,
    status:"posted",
    bids:[],
    chats:{},
    acceptedBidId:null,
    rateConSent:false,
  },
  {
    id:"L17503", customer:"UFC Foods", broker:"b1",
    lane:LANE("LRD","TX","FAI","NJ"),
    pickupDate:"Jun 13, 09:00", deliveryDate:"Jun 16, 12:00",
    equipment:"Reefer -10°F", weight:"40,000 lb", pieces:"20 plt",
    commodity:"Frozen food", distance:1920,
    requirements:"Temp -10°F · Continuous tracking required",
    customerRate:4600, targetRate:3800, showTarget:true,
    status:"booked",
    bids:[
      { id:"bid4", carrier:"car5", rate:3750, pickupTime:"Jun 13, 08:30", note:"Reefer pre-cooled", time:"yesterday", status:"accepted" },
      { id:"bid5", carrier:"car6", rate:3900, pickupTime:"Jun 13, 11:00", note:"", time:"yesterday", status:"lost" },
    ],
    chats:{
      "car5":[
        { from:"car", text:"Confirming pickup at 8:30. Trailer is at -10°F.", when:"yesterday" },
        { from:"me",  text:"Perfect. Rate Con coming shortly.",               when:"yesterday" },
      ],
    },
    acceptedBidId:"bid4",
    rateConSent:true,
  },
  {
    id:"L17504", customer:"American Agri Supply", broker:"b1",
    lane:LANE("SFO","CA","LAX","CA"),
    pickupDate:"Jun 14, 12:00", deliveryDate:"Jun 14, 22:00",
    equipment:"53' Dry Van", weight:"28,000 lb", pieces:"14 plt",
    commodity:"Agricultural goods", distance:380,
    requirements:"Same-day delivery",
    customerRate:1700, targetRate:1400, showTarget:false,
    status:"bidding",
    bids:[
      { id:"bid6", carrier:"car4", rate:1350, pickupTime:"Jun 14, 12:00", note:"Available now", time:"30m ago", status:"pending" },
    ],
    chats:{},
    acceptedBidId:null,
    rateConSent:false,
  },
  // More loads for table density
  { id:"L17505", customer:"Nordic Metals", broker:"b3", lane:LANE("HOU","TX","PHX","AZ"), pickupDate:"Jun 14, 14:00", deliveryDate:"Jun 16, 09:00", equipment:"Flatbed", weight:"45,000 lb", pieces:"6 coils", commodity:"Steel coils", distance:1180, requirements:"Tarp required · Coil racks", customerRate:2400, targetRate:1950, showTarget:true, status:"bidding", bids:[{id:"bid7",carrier:"car2",rate:1900,pickupTime:"Jun 14, 14:00",note:"Have tarps and racks",time:"3h ago",status:"pending"},{id:"bid8",carrier:"car6",rate:2050,pickupTime:"Jun 14, 15:00",note:"",time:"2h ago",status:"pending"}], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17506", customer:"LISI Automotive", broker:"b2", lane:LANE("LRD","TX","EWR","NJ"), pickupDate:"Jun 15, 06:00", deliveryDate:"Jun 18, 12:00", equipment:"53' Dry Van", weight:"36,000 lb", pieces:"24 plt", commodity:"Auto parts", distance:1880, requirements:"Sealed trailer · Driver assist no", customerRate:3200, targetRate:2700, showTarget:false, status:"posted", bids:[], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17507", customer:"Pacific Trade Co", broker:"b1", lane:LANE("OAK","CA","SLC","UT"), pickupDate:"Jun 14, 11:00", deliveryDate:"Jun 15, 18:00", equipment:"53' Dry Van", weight:"32,000 lb", pieces:"16 plt", commodity:"Consumer goods", distance:730, requirements:"Lift gate required", customerRate:2100, targetRate:1700, showTarget:true, status:"bidding", bids:[{id:"bid9",carrier:"car5",rate:1650,pickupTime:"Jun 14, 11:00",note:"Lift gate equipped",time:"1h ago",status:"pending"}], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17508", customer:"Atlas Beverage", broker:"b4", lane:LANE("DEN","CO","SLC","UT"), pickupDate:"Jun 14, 09:00", deliveryDate:"Jun 15, 16:00", equipment:"Reefer -2°C", weight:"38,000 lb", pieces:"20 plt", commodity:"Beverages", distance:520, requirements:"Temp controlled", customerRate:1850, targetRate:1500, showTarget:false, status:"posted", bids:[], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17509", customer:"Bel Fresh Produce", broker:"b1", lane:LANE("MCA","TX","ATL","GA"), pickupDate:"Jun 13, 22:00", deliveryDate:"Jun 15, 06:00", equipment:"53' Reefer", weight:"40,000 lb", pieces:"22 plt", commodity:"Fresh produce", distance:1090, requirements:"Continuous reefer · Temp 35°F", customerRate:2700, targetRate:2200, showTarget:true, status:"booked", bids:[{id:"bid10",carrier:"car1",rate:2150,pickupTime:"Jun 13, 22:00",note:"",time:"5h ago",status:"accepted"}], chats:{}, acceptedBidId:"bid10", rateConSent:true },
  { id:"L17510", customer:"Continental Foods", broker:"b3", lane:LANE("MIA","FL","ATL","GA"), pickupDate:"Jun 14, 16:00", deliveryDate:"Jun 15, 10:00", equipment:"53' Dry Van", weight:"30,000 lb", pieces:"18 plt", commodity:"Packaged food", distance:660, requirements:"FDA inspection ready", customerRate:1450, targetRate:1150, showTarget:false, status:"bidding", bids:[{id:"bid11",carrier:"car3",rate:1200,pickupTime:"Jun 14, 16:00",note:"",time:"45m ago",status:"pending"},{id:"bid12",carrier:"car4",rate:1100,pickupTime:"Jun 14, 17:00",note:"",time:"20m ago",status:"pending"}], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17511", customer:"Sunbelt Building", broker:"b3", lane:LANE("PHX","AZ","ABQ","NM"), pickupDate:"Jun 15, 08:00", deliveryDate:"Jun 15, 20:00", equipment:"Flatbed", weight:"48,000 lb", pieces:"4 bundles", commodity:"Lumber", distance:460, requirements:"Tarp required · Straps", customerRate:1300, targetRate:1050, showTarget:true, status:"posted", bids:[], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17512", customer:"Greenfield Co-op", broker:"b3", lane:LANE("DSM","IA","CHI","IL"), pickupDate:"Jun 14, 07:00", deliveryDate:"Jun 14, 18:00", equipment:"53' Dry Van", weight:"42,000 lb", pieces:"22 plt", commodity:"Grain products", distance:340, requirements:"Sealed trailer", customerRate:980, targetRate:780, showTarget:false, status:"bidding", bids:[{id:"bid13",carrier:"car5",rate:780,pickupTime:"Jun 14, 07:00",note:"Available",time:"4h ago",status:"pending"}], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17513", customer:"Cascade Lumber", broker:"b4", lane:LANE("SEA","WA","BOI","ID"), pickupDate:"Jun 15, 06:00", deliveryDate:"Jun 16, 14:00", equipment:"Flatbed", weight:"46,000 lb", pieces:"3 bundles", commodity:"Lumber", distance:510, requirements:"Tarp · Straps", customerRate:1500, targetRate:1200, showTarget:true, status:"posted", bids:[], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17514", customer:"Northstar Steel", broker:"b4", lane:LANE("PIT","PA","CLE","OH"), pickupDate:"Jun 14, 10:00", deliveryDate:"Jun 14, 18:00", equipment:"Flatbed", weight:"44,000 lb", pieces:"8 coils", commodity:"Steel", distance:140, requirements:"Coil racks", customerRate:850, targetRate:680, showTarget:false, status:"bidding", bids:[{id:"bid14",carrier:"car2",rate:650,pickupTime:"Jun 14, 10:00",note:"Have coil racks",time:"2h ago",status:"pending"}], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17515", customer:"Maersk Mexico", broker:"b3", lane:LANE("VER","MX","LRD","TX"), pickupDate:"Jun 16, 12:00", deliveryDate:"Jun 18, 16:00", equipment:"53' Dry Van", weight:"40,000 lb", pieces:"20 plt", commodity:"Mixed cargo", distance:680, requirements:"Cross-border · Bilingual driver preferred", customerRate:3400, targetRate:2750, showTarget:false, status:"posted", bids:[], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17516", customer:"Ryder Supply Co", broker:"b2", lane:LANE("CHI","IL","DAL","TX"), pickupDate:"Jun 14, 13:00", deliveryDate:"Jun 16, 09:00", equipment:"53' Dry Van", weight:"34,000 lb", pieces:"20 plt", commodity:"Retail goods", distance:960, requirements:"Sealed", customerRate:1900, targetRate:1550, showTarget:true, status:"bidding", bids:[{id:"bid15",carrier:"car6",rate:1500,pickupTime:"Jun 14, 13:00",note:"",time:"2h ago",status:"pending"},{id:"bid16",carrier:"car1",rate:1580,pickupTime:"Jun 14, 14:00",note:"",time:"1h ago",status:"pending"}], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17517", customer:"Bel Fresh Produce", broker:"b1", lane:LANE("MCA","TX","NSH","TN"), pickupDate:"Jun 15, 21:00", deliveryDate:"Jun 17, 08:00", equipment:"53' Reefer", weight:"38,000 lb", pieces:"20 plt", commodity:"Fresh produce", distance:1180, requirements:"Continuous reefer", customerRate:2850, targetRate:2300, showTarget:false, status:"posted", bids:[], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17518", customer:"DB Schenker", broker:"b1", lane:LANE("LAS","NV","SLC","UT"), pickupDate:"Jun 14, 06:00", deliveryDate:"Jun 14, 18:00", equipment:"53' Dry Van", weight:"30,000 lb", pieces:"16 plt", commodity:"Industrial parts", distance:420, requirements:"24h notice", customerRate:1250, targetRate:1000, showTarget:true, status:"booked", bids:[{id:"bid17",carrier:"car5",rate:990,pickupTime:"Jun 14, 06:00",note:"",time:"6h ago",status:"accepted"},{id:"bid18",carrier:"car2",rate:1050,pickupTime:"Jun 14, 06:00",note:"",time:"5h ago",status:"lost"}], chats:{}, acceptedBidId:"bid17", rateConSent:false },
  { id:"L17519", customer:"UFC Foods", broker:"b1", lane:LANE("LAX","CA","DEN","CO"), pickupDate:"Jun 16, 08:00", deliveryDate:"Jun 18, 12:00", equipment:"Reefer -10°F", weight:"38,000 lb", pieces:"20 plt", commodity:"Frozen food", distance:1020, requirements:"Temp -10°F", customerRate:2750, targetRate:2250, showTarget:false, status:"posted", bids:[], chats:{}, acceptedBidId:null, rateConSent:false },
  { id:"L17520", customer:"Hellmann MX", broker:"b2", lane:LANE("QRO","MX","SAT","TX"), pickupDate:"Jun 15, 14:00", deliveryDate:"Jun 17, 10:00", equipment:"53' Dry Van", weight:"36,000 lb", pieces:"18 plt", commodity:"Automotive", distance:540, requirements:"Cross-border", customerRate:3100, targetRate:2500, showTarget:true, status:"bidding", bids:[{id:"bid19",carrier:"car6",rate:2400,pickupTime:"Jun 15, 14:00",note:"Cross-border experienced",time:"1h ago",status:"pending"}], chats:{}, acceptedBidId:null, rateConSent:false },
];

/* ---------- App state ---------- */
const state = {
  view: "workspace",
  me: "b1",
  deals: SEED_DEALS.slice(),
  activities: SEED_ACTIVITIES.slice(),
  tasks: SEED_TASKS.slice(),
  loads: LOADS.slice(),
  carriers: CARRIERS.slice(),
  filterBroker: "all",
  filterCustomer: "all",
  cbFilter: "all",
  cbSearch: "",
  cbEquipFilter: "all",
  cbViewAs: "broker",
  cbAsCarrier: "car1",
  cbDisplayMode: "table",
  cbSortKey: "pickupDate",
  cbSortDir: "asc",
  teamPlan: {
    amount: 200000,
    month: "June 2026",
    monthStart: new Date(2026, 5, 1),
    monthEnd:   new Date(2026, 5, 30),
  },
  today: new Date(2026, 5, 18),
};

/* ---------- Helpers ---------- */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const userById = id => USERS.find(u => u.id === id);
const stageByKey = k => STAGES.find(s => s.key === k);
const fmt  = n => "$" + Math.round(n).toLocaleString("en-US");
const fmtK = n => "$" + (Math.round(n/100)/10).toFixed(1) + "k";
const dealMargin = d => Math.round(d.value * d.marginPct/100);
const uniqueCustomers = (deals) => Array.from(new Set(deals.map(d => d.customer))).sort();

function filteredDeals(){
  return state.deals.filter(d =>
    (state.filterBroker === "all" || d.broker === state.filterBroker) &&
    (state.filterCustomer === "all" || d.customer === state.filterCustomer)
  );
}

/* ---------- Plan helpers (team plan, not per-broker quotas) ---------- */
function teamActualMargin(){
  return state.deals.filter(d => d.stage === "won").reduce((s,d) => s + dealMargin(d), 0);
}
function brokerActualMargin(brokerId){
  return state.deals.filter(d => d.broker === brokerId && d.stage === "won").reduce((s,d) => s + dealMargin(d), 0);
}
function planProgress(){
  const actual = teamActualMargin();
  const plan = state.teamPlan.amount;
  const pct = plan > 0 ? Math.round(actual/plan*100) : 0;
  const remaining = Math.max(0, plan - actual);
  const totalDays = (state.teamPlan.monthEnd - state.teamPlan.monthStart) / 86400000 + 1;
  const elapsedDays = Math.min(totalDays, Math.max(0, (state.today - state.teamPlan.monthStart) / 86400000 + 1));
  const daysLeft = Math.max(0, Math.ceil((state.teamPlan.monthEnd - state.today) / 86400000));
  const expectedPct = Math.round(elapsedDays / totalDays * 100);
  const diff = pct - expectedPct;
  let status, statusLabel;
  if (pct >= 100) { status = "good"; statusLabel = "Plan reached"; }
  else if (diff >= -3) { status = "good"; statusLabel = "On pace"; }
  else if (diff >= -10) { status = "warn"; statusLabel = "Slightly behind"; }
  else { status = "danger"; statusLabel = "Behind pace"; }
  return { actual, plan, pct, remaining, expectedPct, daysLeft, status, statusLabel };
}

function teamPlanCardHTML(){
  const p = planProgress();
  return `
    <div class="plan-card">
      <div class="plan-card-row">
        <div class="plan-card-meta">
          <div class="plan-card-title">Team monthly plan</div>
          <div class="plan-card-month">${state.teamPlan.month}</div>
          <span class="plan-status-pill ${p.status}" style="margin-top:6px;align-self:flex-start"><span class="dot"></span>${p.statusLabel}</span>
        </div>
        <div class="plan-card-actuals">
          <div class="plan-stat">
            <div class="plan-stat-label">Plan</div>
            <div class="plan-stat-value">${fmt(p.plan)}</div>
          </div>
          <div class="plan-stat">
            <div class="plan-stat-label">Actual</div>
            <div class="plan-stat-value ${p.status}">${fmt(p.actual)}</div>
          </div>
          <div class="plan-stat">
            <div class="plan-stat-label">Remaining</div>
            <div class="plan-stat-value">${fmt(p.remaining)}</div>
          </div>
          <div class="plan-stat">
            <div class="plan-stat-label">Days left</div>
            <div class="plan-stat-value">${p.daysLeft}</div>
          </div>
        </div>
        <div class="plan-progress-wrap">
          <div class="plan-progress-row">
            <span><b>${p.pct}%</b> of plan</span>
            <span>Expected by today: <b>${p.expectedPct}%</b></span>
          </div>
          <div class="plan-progress-track">
            <div class="plan-progress-fill ${p.status}" style="width:${Math.min(100,p.pct)}%"></div>
            <div class="plan-pace-marker" style="left:${Math.min(100,p.expectedPct)}%" title="Expected pace"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function myContributionHTML(){
  const p = planProgress();
  const mine = brokerActualMargin(state.me);
  const share = p.actual > 0 ? Math.round(mine / p.actual * 100) : 0;
  const shareOfPlan = p.plan > 0 ? Math.round(mine / p.plan * 100) : 0;
  const r = 50, c = 2 * Math.PI * r;
  const dash = c * Math.min(1, shareOfPlan / 100);
  return `
    <div class="my-plan-card">
      <div class="my-plan-meta">
        <h3>My contribution to team plan</h3>
        <div class="sub">${state.teamPlan.month} · team plan ${fmt(p.plan)}</div>
        <div class="mine-vs-team">
          <div>My margin<br/><b>${fmt(mine)}</b></div>
          <div>Team actual<br/><b>${fmt(p.actual)}</b></div>
          <div>Share of plan<br/><b>${shareOfPlan}%</b></div>
          <div>Share of team<br/><b>${share}%</b></div>
        </div>
      </div>
      <div class="my-plan-ring" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--blue-05)" stroke-width="10"/>
          <circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--blue-50)" stroke-width="10"
                  stroke-dasharray="${dash} ${c-dash}" stroke-linecap="round"/>
        </svg>
        <div class="my-plan-ring-center">
          <div class="my-plan-ring-num">${shareOfPlan}%</div>
          <div class="my-plan-ring-lbl">of plan</div>
        </div>
      </div>
    </div>
  `;
}

let _toastTimer;
function showToast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

function laneHTML(l, size=12){
  return `<span class="lane" style="font-size:${size}px">
    <b>${l.o}</b><span class="st">${l.os}</span>
    <span class="ar">${ICONS.arrow}</span>
    <b>${l.d}</b><span class="st">${l.ds}</span>
  </span>`;
}

function stagePill(stageKey){
  const s = stageByKey(stageKey);
  return `<span class="stage-pill" style="background:${s.color}1A;color:${s.color}">
    <span class="dot" style="background:${s.color}"></span>${s.label}
  </span>`;
}

/* ---------- Sidebar nav ---------- */
const NAV = [
  { key:"workspace", label:"Workspace", icon:ICONS.workspace, sub:"Your day: follow-ups, open opportunities, live numbers" },
  { key:"pipeline",  label:"Pipeline",  icon:ICONS.pipeline,  sub:"Deals from new lead to won — drag cards between stages" },
  { key:"dashboard", label:"Dashboard", icon:ICONS.dashboard, sub:"Margin and performance — filter by broker and customer" },
  { key:"analytics", label:"Analytics", icon:ICONS.analytics, sub:"Conversion, leaderboard and lane intelligence" },
  { key:"carrier_board", label:"Carrier Board", icon:ICONS.truck, sub:"Post loads, review bids, chat with carriers" },
];

function renderSidebar(){
  $("#nav").innerHTML = NAV.map(n => `
    <button class="nav-btn ${state.view===n.key?'active':''}" data-key="${n.key}">
      ${n.icon}<span>${n.label}</span>
    </button>
  `).join("");
  $$("#nav .nav-btn").forEach(b => b.addEventListener("click", () => {
    state.view = b.dataset.key;
    renderAll();
  }));
}

/* ---------- Header ---------- */
function renderHeader(){
  const n = NAV.find(x => x.key === state.view);
  $("#view-title").textContent = n.label;
  $("#view-sub").textContent = n.sub;
  const sel = $("#me-select");
  if(!sel.dataset.built){
    sel.innerHTML = USERS.map(u => `<option value="${u.id}">${u.name}</option>`).join("");
    sel.dataset.built = "1";
    sel.addEventListener("change", e => { state.me = e.target.value; renderAll(); });
  }
  sel.value = state.me;
  $("#me-avatar").textContent = userById(state.me).initials;

  const planBtn = $("#open-plans");
  if(planBtn && !planBtn.dataset.wired){
    planBtn.addEventListener("click", openPlanModal);
    planBtn.dataset.wired = "1";
  }
}

/* ---------- KPI / Card helpers ---------- */
function kpiCard(label, value, sub, tone, iconSvg){
  return `<div class="card kpi">
    <div class="kpi-row">
      <span class="kpi-label">${label}</span>
      <span class="kpi-icon ${tone||'accent'}">${iconSvg}</span>
    </div>
    <div class="kpi-value">${value}</div>
    <div class="kpi-sub ${tone==='good'?'good':''}">${sub}</div>
  </div>`;
}

function cardBox(title, sub, body){
  return `<div class="card card-pad">
    <div class="row" style="margin-bottom:14px">
      <div>
        <div class="section-h">${title}</div>
        ${sub?`<div class="section-sub">${sub}</div>`:''}
      </div>
    </div>
    ${body}
  </div>`;
}

/* ============================================================
   View: Workspace
   ============================================================ */
function viewWorkspace(){
  const me = state.me;
  const myDeals  = state.deals.filter(d => d.broker === me);
  const myWon    = myDeals.filter(d => d.stage === "won");
  const myMargin = brokerActualMargin(me);

  const contacted = myDeals.filter(d => ["contacted","qualified","quoted","won"].includes(d.stage)).length;
  const conv = contacted ? Math.round(myWon.length/contacted*100) : 0;

  const p = planProgress();
  const shareOfPlan = p.plan > 0 ? Math.round(myMargin / p.plan * 100) : 0;

  const myTasks    = state.tasks.filter(t => t.broker === me);
  const myOpenOpps = myDeals.filter(d => d.stage !== "won").slice(0,5);

  return `
    ${myContributionHTML()}

    <div class="grid grid-4" style="margin-bottom:18px">
      ${kpiCard("My margin (won)",  fmt(myMargin),       "this month",                  "good",   ICONS.trend)}
      ${kpiCard("My won deals",     String(myWon.length),"this month",                  "accent", ICONS.pkg)}
      ${kpiCard("Contact → won",    conv + "%",          "conversion",                  "accent", ICONS.target)}
      ${kpiCard("Share of plan",    shareOfPlan + "%",   `of team's ${fmt(p.plan)}`,    shareOfPlan>=25?"good":shareOfPlan>=15?"warn":"danger", ICONS.target)}
    </div>

    <div class="grid grid-21">
      ${cardBox("My follow-ups", "Today", `
        <div class="tasklist">
          ${myTasks.length===0 ? `<div style="font-size:12.5px;color:var(--faint);padding:8px 4px">Nothing on the list for today.</div>` :
            myTasks.map(t => `
              <div class="task">
                <span class="ic">${t.type==='call'?ICONS.phone:t.type==='mail'?ICONS.mail:ICONS.task}</span>
                <span class="meta">
                  <div class="ttl">${t.customer}</div>
                  <div class="nt">${t.title}</div>
                </span>
                <span class="due ${t.urgent?'now':''}">${t.urgent?'Now':t.due}</span>
                <button class="btn btn-outline" data-task="${t.id}" style="padding:5px 12px;font-size:12px">Done</button>
              </div>`).join("")}
        </div>
      `)}
      ${cardBox("My open opportunities", `${myOpenOpps.length} open`, `
        <div class="opps">
          ${myOpenOpps.length===0 ? `<div style="font-size:12.5px;color:var(--faint);padding:8px 4px">No open deals.</div>` :
            myOpenOpps.map(d => `
              <div class="opp" data-deal="${d.id}">
                <div class="opp-head">
                  <span class="opp-co">${d.customer}</span>
                  <span class="opp-margin">${d.marginPct}% margin</span>
                </div>
                ${laneHTML(d.lane,11)}
                <div class="opp-meta">
                  <span>${stageByKey(d.stage).label}</span>
                  <span style="font-family:var(--font-mono)">${fmtK(d.value)}/mo</span>
                </div>
              </div>`).join("")}
        </div>
      `)}
    </div>
  `;
}
function wireWorkspace(){
  $$(".task .btn[data-task]").forEach(b => b.addEventListener("click", e => {
    e.stopPropagation();
    const id = b.dataset.task;
    state.tasks = state.tasks.filter(t => t.id !== id);
    showToast("Task completed");
    renderAll();
  }));
  $$(".opp").forEach(el => el.addEventListener("click", () => openDealModal(el.dataset.deal)));
}

/* ============================================================
   Plans modal — monthly plan per broker
   ============================================================ */
function openPlanModal(){
  const p = planProgress();
  $("#modal-root").innerHTML = `
    <div id="modal-bg" class="modal-bg">
      <div class="modal">
        <div class="modal-head">
          <div>
            <h2 class="modal-title">Team monthly plan</h2>
            <div class="modal-sub">One target for the whole team. Each broker's contribution is measured against it.</div>
          </div>
          <button class="modal-close" id="modal-x" aria-label="Close">${ICONS.close}</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label for="plan-month">Month</label>
            <input id="plan-month" class="input-base" value="${state.teamPlan.month}" placeholder="e.g. July 2026" />
          </div>
          <div class="field">
            <label for="plan-amount">Plan amount (margin, $) <span class="required-mark">*</span></label>
            <input id="plan-amount" class="input-base" value="${state.teamPlan.amount}" placeholder="200000" />
          </div>

          <div class="plan-preview">
            <div class="pp-row"><span>Current actual</span><b>${fmt(p.actual)}</b></div>
            <div class="pp-row"><span>Current pct of plan</span><b>${p.pct}% → recalculated on save</b></div>
            <div class="pp-row"><span>Brokers</span><b>${USERS.length}</b></div>
            <div class="pp-row"><span>Average share if equal</span><b>${Math.round(100/USERS.length)}%</b></div>
          </div>

          <div class="modal-actions">
            <button class="btn btn-outline" id="modal-cancel">Cancel</button>
            <button class="btn btn-primary" id="plan-save">Save plan</button>
          </div>
        </div>
      </div>
    </div>
  `;
  $("#modal-x").addEventListener("click", closeModal);
  $("#modal-cancel").addEventListener("click", closeModal);
  $("#plan-save").addEventListener("click", () => {
    const month = $("#plan-month").value.trim() || state.teamPlan.month;
    const amt = Number(($("#plan-amount").value||"").replace(/[^\d]/g,""));
    if(!amt || amt < 1){ showToast("Enter a valid plan amount"); return; }
    state.teamPlan.month = month;
    state.teamPlan.amount = amt;
    showToast(`Team plan updated: ${fmt(amt)} for ${month}`);
    closeModal();
    renderAll();
  });
}

/* ============================================================
   View: Pipeline (kanban with drag & drop)
   ============================================================ */
function viewPipeline(){
  const myDeals = state.deals.filter(d => d.broker === state.me);
  const columns = STAGES.map(s => `
    <div class="pcol">
      <div class="pcol-head" style="border-top-color:${s.color}">
        <span class="nm">${s.label}</span>
        <span class="ct">${myDeals.filter(d=>d.stage===s.key).length}</span>
      </div>
      <div class="pcol-body" data-stage="${s.key}">
        ${myDeals.filter(d=>d.stage===s.key).map(d => `
          <div class="pdeal" data-deal="${d.id}" draggable="true">
            <div class="pdeal-co">${d.customer}</div>
            ${laneHTML(d.lane,11)}
            <div class="pdeal-foot">
              <span class="pdeal-val">${fmtK(d.value)}/mo · ${d.marginPct}%</span>
              <span class="avatar ${d.broker===state.me?'me':''}">${userById(d.broker).initials}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  return `
    <div class="pipe-toolbar">
      <div class="hint">Drag a deal between columns to move it through the stages. Click a deal to open it.</div>
      <button class="btn btn-primary" id="add-deal">${ICONS.plus} New deal</button>
    </div>
    <div class="pipeline">${columns}</div>
  `;
}

function wirePipeline(){
  $("#add-deal")?.addEventListener("click", openNewDealModal);
  let draggingId = null;

  $$(".pdeal").forEach(el => {
    el.addEventListener("click", () => {
      if(draggingId) return;
      openDealModal(el.dataset.deal);
    });
    el.addEventListener("dragstart", e => {
      draggingId = el.dataset.deal;
      el.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", el.dataset.deal);
    });
    el.addEventListener("dragend", () => {
      el.classList.remove("dragging");
      draggingId = null;
    });
  });

  $$(".pcol-body").forEach(col => {
    col.addEventListener("dragover", e => {
      e.preventDefault();
      col.classList.add("drop-target");
    });
    col.addEventListener("dragleave", () => col.classList.remove("drop-target"));
    col.addEventListener("drop", e => {
      e.preventDefault();
      col.classList.remove("drop-target");
      const id = e.dataTransfer.getData("text/plain") || draggingId;
      if(!id) return;
      const deal = state.deals.find(d => d.id === id);
      const newStage = col.dataset.stage;
      if(deal && deal.stage !== newStage){
        const prev = deal.stage;
        deal.stage = newStage;
        if(newStage === "won"){
          showToast(`${deal.customer} marked Won — opens in CRM module`);
        } else {
          showToast(`${deal.customer}: ${stageByKey(prev).label} → ${stageByKey(newStage).label}`);
        }
        renderAll();
      }
    });
  });
}

/* ============================================================
   View: Dashboard (filterable)
   ============================================================ */
function renderFilterBar(){
  const availableDeals = state.deals.filter(d =>
    state.filterBroker === "all" || d.broker === state.filterBroker);
  const customers = uniqueCustomers(availableDeals);
  if(state.filterCustomer !== "all" && !customers.includes(state.filterCustomer)){
    state.filterCustomer = "all";
  }
  const totalDeals = filteredDeals().length;
  const showClear = state.filterBroker !== "all" || state.filterCustomer !== "all";

  return `
    <div class="filterbar">
      <span class="filter-label">Filters</span>
      <div class="filter-group">
        <label for="filt-broker">Broker</label>
        <select id="filt-broker" class="select-base">
          <option value="all">All brokers</option>
          ${USERS.map(u => `<option value="${u.id}" ${state.filterBroker===u.id?'selected':''}>${u.name}</option>`).join("")}
        </select>
      </div>
      <div class="filter-group">
        <label for="filt-customer">Customer</label>
        <select id="filt-customer" class="select-base">
          <option value="all">All customers</option>
          ${customers.map(c => `<option value="${c}" ${state.filterCustomer===c?'selected':''}>${c}</option>`).join("")}
        </select>
      </div>
      <span class="pill-count">${totalDeals} deals in view</span>
      ${showClear ? `<button class="btn btn-link" id="filt-clear">Reset filters</button>` : ''}
    </div>`;
}
function wireFilters(){
  const b = $("#filt-broker"), c = $("#filt-customer"), cl = $("#filt-clear");
  if(b) b.addEventListener("change", e => { state.filterBroker = e.target.value; renderAll(); });
  if(c) c.addEventListener("change", e => { state.filterCustomer = e.target.value; renderAll(); });
  if(cl) cl.addEventListener("click", () => { state.filterBroker="all"; state.filterCustomer="all"; renderAll(); });
}

function viewDashboard(){
  const deals = filteredDeals();
  const won = deals.filter(d => d.stage === "won");
  const totalMargin = won.reduce((s,d) => s + dealMargin(d), 0);
  const totalValue  = deals.reduce((s,d) => s + d.value, 0);
  const avgMargin   = deals.length ? Math.round(deals.reduce((s,d)=>s+d.marginPct,0)/deals.length) : 0;

  // by customer (won only)
  const byCustomer = {};
  won.forEach(d => byCustomer[d.customer] = (byCustomer[d.customer]||0) + dealMargin(d));
  const customerList = Object.entries(byCustomer).map(([k,v])=>({name:k,v})).sort((a,b)=>b.v-a.v);
  const maxCust = Math.max(...customerList.map(x=>x.v), 1);

  // by broker
  const brokerEntries = USERS.map(u => {
    const myWon = state.deals.filter(d => d.broker===u.id && d.stage==="won"
      && (state.filterCustomer==='all' || d.customer===state.filterCustomer));
    const m = myWon.reduce((s,d)=>s+dealMargin(d), 0);
    const p = planProgress();
    const contrib = p.plan > 0 ? Math.round(m / p.plan * 100) : 0;
    return { id:u.id, name:u.name.split(" ")[0], v:m, contrib };
  });
  const maxBroker = Math.max(...brokerEntries.map(x=>x.v), 1);
  const p = planProgress();

  // summary line
  const summaryParts = [];
  summaryParts.push(state.filterBroker === "all" ? "All brokers" : userById(state.filterBroker).name);
  summaryParts.push(state.filterCustomer === "all" ? "all customers" : state.filterCustomer);

  return `
    ${teamPlanCardHTML()}
    ${renderFilterBar()}
    <div class="filter-summary">Showing: <b>${summaryParts.join(" · ")}</b></div>

    <div class="grid grid-4" style="margin-bottom:18px">
      ${kpiCard("Margin (won)",     fmt(totalMargin),         `${won.length} won deals`,         "good",   ICONS.trend)}
      ${kpiCard("Pipeline value",   fmtK(totalValue)+"/mo",   `${deals.length} total deals`,     "accent", ICONS.pkg)}
      ${kpiCard("Average margin",   avgMargin+"%",            "across filtered deals",           "accent", ICONS.target)}
      ${kpiCard("Customers",        String(uniqueCustomers(deals).length), "in current view",   "warn",   ICONS.users)}
    </div>

    <div class="grid grid-21">
      ${cardBox("Margin by customer", "won deals · click a row to filter", `
        <div class="barlist">
          ${customerList.length===0 ? `<div style="font-size:12.5px;color:var(--faint)">No won deals in current view.</div>` :
            customerList.map(c => `
              <div class="item">
                <span class="name" data-customer="${c.name}">${c.name}</span>
                <span class="track"><span class="fill" style="width:${(c.v/maxCust)*100}%"></span></span>
                <span class="val">${fmtK(c.v)}</span>
              </div>`).join("")}
        </div>
      `)}
      ${cardBox("Margin by broker", "click a bar to filter", `
        <div class="vbars">
          ${brokerEntries.map(b => `
            <div class="vbar ${state.filterBroker===b.id?'active':''}" data-broker="${b.id}">
              <div class="num">${b.v?fmtK(b.v):"—"}</div>
              <div class="col" style="height:${(b.v/maxBroker)*150}px"></div>
              <div class="lbl">${b.name}</div>
            </div>
          `).join("")}
        </div>
      `)}
    </div>

    <div style="margin-top:18px">
      ${cardBox("Contribution to team plan", `${state.teamPlan.month} · plan ${fmt(p.plan)}`, `
        <div class="lb-head">
          <span>Broker</span><span>Margin</span><span>Deals won</span><span>Share of plan</span><span>Progress</span>
        </div>
        ${brokerEntries.slice().sort((a,b)=>b.v-a.v).map(b => {
          const wonCount = state.deals.filter(d => d.broker===b.id && d.stage==="won").length;
          return `<div class="lb-row ${b.id===state.me?'me':''}">
            <span class="rep"><span class="avatar ${b.id===state.me?'me':''}">${userById(b.id).initials}</span><span class="nm">${userById(b.id).name}</span></span>
            <span class="mono">${fmtK(b.v)}</span>
            <span class="muted">${wonCount}</span>
            <span class="mono">${b.contrib}%</span>
            <span class="contrib">
              <span class="ctrack"><span class="cfill" style="width:${Math.min(100,(b.v/p.plan)*100)}%"></span></span>
              <span class="cval">${fmtK(b.v)}</span>
            </span>
          </div>`;
        }).join("")}
      `)}
    </div>

    <div style="margin-top:18px">
      ${cardBox("Deals in current view", `${deals.length} deals`, `
        <div class="tbl-head" style="grid-template-columns:1.5fr 1fr 1.1fr 0.9fr 0.7fr 0.8fr">
          <span>Customer</span><span>Broker</span><span>Lane</span><span>Stage</span><span>Value/mo</span><span>Margin</span>
        </div>
        ${deals.length===0 ? `<div style="font-size:12.5px;color:var(--faint);padding:14px 4px">No deals match the current filters.</div>` :
          deals.map(d => `
            <div class="tbl-row" data-deal="${d.id}" style="grid-template-columns:1.5fr 1fr 1.1fr 0.9fr 0.7fr 0.8fr">
              <span style="font-size:13px;font-weight:600">${d.customer}</span>
              <span style="display:flex;align-items:center;gap:8px"><span class="avatar ${d.broker===state.me?'me':''}">${userById(d.broker).initials}</span><span style="font-size:13px">${userById(d.broker).name.split(" ")[0]}</span></span>
              <span>${laneHTML(d.lane,11)}</span>
              <span>${stagePill(d.stage)}</span>
              <span style="font-family:var(--font-mono);font-size:12.5px;color:var(--muted)">${fmtK(d.value)}</span>
              <span style="font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--green-dk)">${d.marginPct}%</span>
            </div>`).join("")}
      `)}
    </div>
  `;
}

function wireDashboard(){
  wireFilters();
  $$(".barlist .item .name").forEach(el => el.addEventListener("click", () => {
    state.filterCustomer = el.dataset.customer; renderAll();
  }));
  $$(".vbar").forEach(el => el.addEventListener("click", () => {
    const id = el.dataset.broker;
    state.filterBroker = (state.filterBroker === id) ? "all" : id;
    renderAll();
  }));
  $$(".tbl-row[data-deal]").forEach(el => el.addEventListener("click", () => openDealModal(el.dataset.deal)));
}

/* ============================================================
   View: Analytics
   ============================================================ */
function viewAnalytics(){
  const deals = state.deals;
  function stageGTE(a, b){
    const idx = k => STAGES.findIndex(s=>s.key===k);
    return idx(a) >= idx(b);
  }
  const funnel = STAGES.map(s => ({
    key:s.key, name:s.label, color:s.color,
    count: deals.filter(d => stageGTE(d.stage, s.key)).length,
  }));
  const maxF = Math.max(...funnel.map(x=>x.count),1);

  const p = planProgress();
  const board = USERS.map(u => {
    const my = deals.filter(d => d.broker===u.id);
    const won = my.filter(d => d.stage==="won");
    const m = won.reduce((s,d)=>s+dealMargin(d), 0);
    const contacted = my.filter(d => ["contacted","qualified","quoted","won"].includes(d.stage)).length;
    const conv = contacted ? Math.round(won.length/contacted*100) : 0;
    const contrib = p.plan > 0 ? Math.round(m / p.plan * 100) : 0;
    return { id:u.id, name:u.name, initials:u.initials, margin:m, loads:won.length*6, conv, contrib };
  }).sort((a,b)=>b.margin-a.margin);

  const laneAgg = {};
  deals.forEach(d => {
    const k = d.lane.o+"→"+d.lane.d;
    laneAgg[k] = laneAgg[k] || { name:k, value:0, count:0 };
    laneAgg[k].value += d.value;
    laneAgg[k].count++;
  });
  const topLanes = Object.values(laneAgg).sort((a,b)=>b.value-a.value).slice(0,5);
  const maxL = Math.max(...topLanes.map(x=>x.value),1);

  return `
    ${teamPlanCardHTML()}

    <div class="grid grid-12">
      ${cardBox("Conversion funnel", "all deals", `
        <div class="funnel">
          ${funnel.map((f,i) => {
            const w = (f.count/maxF)*100;
            const prev = i>0 ? funnel[i-1].count : f.count;
            const conv = i>0 && prev>0 ? Math.round(f.count/prev*100) : null;
            return `<div class="row-f">
              <div class="label-row">
                <span class="nm">${f.name}</span>
                <span class="vl">${f.count}${conv!=null?` · <b>${conv}%</b>`:''}</span>
              </div>
              <div class="track"><div class="fill" style="width:${w}%;background:${f.color}"></div></div>
            </div>`;
          }).join("")}
          <div class="hint-info">${ICONS.target}<span>Contact → won is the metric that predicts revenue</span></div>
        </div>
      `)}
      ${cardBox("Rep leaderboard", `${state.teamPlan.month} · contribution to ${fmt(p.plan)} plan`, `
        <div class="lb-head">
          <span>Rep</span><span>Margin</span><span>Loads</span><span>Conv</span><span>Contribution</span>
        </div>
        ${board.map(r => `
          <div class="lb-row ${r.id===state.me?'me':''}">
            <span class="rep"><span class="avatar ${r.id===state.me?'me':''}">${r.initials}</span><span class="nm">${r.name}</span></span>
            <span class="mono">${fmtK(r.margin)}</span>
            <span class="muted">${r.loads}</span>
            <span class="muted">${r.conv}%</span>
            <span class="contrib">
              <span class="ctrack"><span class="cfill" style="width:${Math.min(100,(r.margin/p.plan)*100)}%"></span></span>
              <span class="cval">${r.contrib}%</span>
            </span>
          </div>
        `).join("")}
      `)}
    </div>

    <div style="margin-top:18px">
      ${cardBox("Top lanes by pipeline value", "where the demand is", `
        <div class="barlist">
          ${topLanes.map(l => `
            <div class="item">
              <span class="name">${l.name}</span>
              <span class="track"><span class="fill" style="width:${(l.value/maxL)*100}%"></span></span>
              <span class="val">${fmtK(l.value)} · ${l.count}</span>
            </div>
          `).join("")}
        </div>
      `)}
    </div>
  `;
}

/* ============================================================
   Modals
   ============================================================ */
function closeModal(){ $("#modal-root").innerHTML = ""; }

document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeModal();
});

document.getElementById("modal-root").addEventListener("click", e => {
  if(e.target.id === "modal-bg") closeModal();
});

function openDealModal(dealId){
  const deal = state.deals.find(d => d.id === dealId);
  if(!deal) return;
  const broker = userById(deal.broker);
  const stIdx = STAGES.findIndex(s => s.key === deal.stage);
  const acts = state.activities.filter(a => a.customer === deal.customer).sort((a,b)=>b.when.localeCompare(a.when));

  $("#modal-root").innerHTML = `
    <div id="modal-bg" class="modal-bg">
      <div class="modal" style="max-width:640px">
        <div class="modal-head">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <h2 class="modal-title">${deal.customer}</h2>
              ${stagePill(deal.stage)}
            </div>
            <div class="modal-sub">Broker: <b style="color:var(--text)">${broker.name}</b> · ${laneHTML(deal.lane,11)} · est. <b style="color:var(--text);font-family:var(--font-mono)">${fmtK(deal.value)}/mo</b> · target margin <b style="color:var(--green-dk)">${deal.marginPct}%</b></div>
          </div>
          <button class="modal-close" id="modal-x" aria-label="Close">${ICONS.close}</button>
        </div>
        <div class="modal-body">
          <div>
            <div class="section-sub" style="margin-bottom:9px">Move through stages</div>
            <div class="stage-stepper">
              ${STAGES.map((s,i) => {
                const cls = i < stIdx ? 'done' : i === stIdx ? 'current' : 'todo';
                return `<span class="stage-pill ${cls}" data-stage="${s.key}" style="${cls==='current'?`background:${s.color}1A;color:${s.color}`:''}">
                  <span class="dot"></span>${s.label}
                </span>`;
              }).join("")}
            </div>
            <div style="font-size:12px;color:var(--muted);margin-top:8px">Click a stage to move the deal. Moving to <b style="color:var(--green-dk)">Won</b> hands it off to the CRM module of the same product (Customers / Loads).</div>
          </div>

          <div>
            <div class="section-sub" style="margin-bottom:9px">Activity history</div>
            ${acts.length===0 ? `<div style="font-size:12.5px;color:var(--faint)">No activity logged yet.</div>` :
              acts.map(a => `
                <div class="activity">
                  <span class="ic">${a.type==='call'?ICONS.phone:a.type==='email'?ICONS.mail:ICONS.task}</span>
                  <span class="body">
                    <span class="a-head"><span class="a-type">${a.type}</span><span class="a-when">${a.when}</span></span>
                    <div class="a-note">${a.note}</div>
                    ${a.next?`<div class="a-next">${ICONS.arrow}<span>${a.next}</span></div>`:''}
                  </span>
                </div>`).join("")}
          </div>

          <div style="border-top:1px solid var(--line);padding-top:16px">
            <div class="section-h" style="margin-bottom:4px">Log new activity</div>
            <div class="section-sub" style="margin-bottom:12px">Next action is required — the tool will create a follow-up task automatically</div>

            <div class="field-row" style="margin-bottom:12px">
              <div class="field">
                <label for="act-type">Activity type</label>
                <select id="act-type" class="select-base">
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="task">Task</option>
                </select>
              </div>
              <div class="field">
                <label for="act-due">Next-action due</label>
                <select id="act-due" class="select-base">
                  <option value="today">Today</option>
                  <option value="tomorrow" selected>Tomorrow</option>
                  <option value="in 2 days">In 2 days</option>
                  <option value="in 3 days">In 3 days</option>
                  <option value="next week">Next week</option>
                </select>
              </div>
            </div>

            <div class="field" style="margin-bottom:12px">
              <label for="act-note">What happened?</label>
              <textarea id="act-note" class="textarea-base" placeholder="e.g. Spoke to logistics manager, agreed weekly volume…"></textarea>
            </div>

            <div class="field" style="margin-bottom:14px">
              <label for="act-next">Next action <span class="required-mark">*</span></label>
              <input id="act-next" class="input-base" placeholder="e.g. Send rate confirmation for QRO→LRD" />
              <div class="field-error" id="act-next-err" style="display:none">This field is required</div>
            </div>

            <div class="modal-actions">
              <button class="btn btn-outline" id="modal-cancel">Close</button>
              <button class="btn btn-primary" id="act-save">Log activity & schedule task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  $("#modal-x").addEventListener("click", closeModal);
  $("#modal-cancel").addEventListener("click", closeModal);

  $$(".stage-stepper .stage-pill").forEach(p => p.addEventListener("click", () => {
    const newStage = p.dataset.stage;
    if(deal.stage === newStage) return;
    const prev = deal.stage;
    deal.stage = newStage;
    if(newStage === "won"){
      showToast(`${deal.customer} marked Won — opens in CRM module`);
    } else {
      showToast(`${deal.customer}: ${stageByKey(prev).label} → ${stageByKey(newStage).label}`);
    }
    closeModal();
    renderAll();
  }));

  $("#act-save").addEventListener("click", () => {
    const type = $("#act-type").value;
    const due  = $("#act-due").value;
    const note = $("#act-note").value.trim();
    const next = $("#act-next").value.trim();
    const nextInput = $("#act-next");
    const nextErr = $("#act-next-err");

    if(!next){
      nextInput.classList.add("input-error");
      nextErr.style.display = "block";
      nextInput.focus();
      return;
    }
    nextInput.classList.remove("input-error");
    nextErr.style.display = "none";

    const now = new Date();
    const pad = n => String(n).padStart(2,"0");
    const stamp = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    state.activities.unshift({
      id:"a"+Date.now(), broker:deal.broker, customer:deal.customer, type, when:stamp,
      note: note || "(no note)", next: `${next} · ${due}`
    });
    state.tasks.unshift({
      id:"t"+Date.now(), broker:deal.broker, customer:deal.customer,
      title:next, due, urgent: due==="today", type
    });
    showToast("Activity logged · follow-up task created");
    closeModal();
    renderAll();
  });
}

function openNewDealModal(){
  $("#modal-root").innerHTML = `
    <div id="modal-bg" class="modal-bg">
      <div class="modal">
        <div class="modal-head">
          <div>
            <h2 class="modal-title">New deal</h2>
            <div class="modal-sub">Start a new lead. You can move it through the stages later.</div>
          </div>
          <button class="modal-close" id="modal-x" aria-label="Close">${ICONS.close}</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label for="nd-customer">Customer (shipper) <span class="required-mark">*</span></label>
            <input id="nd-customer" class="input-base" placeholder="e.g. Pacific Trade Co" />
          </div>
          <div class="field-row">
            <div class="field">
              <label for="nd-orig">Origin (city, state) <span class="required-mark">*</span></label>
              <input id="nd-orig" class="input-base" placeholder="LRD, TX" />
            </div>
            <div class="field">
              <label for="nd-dest">Destination (city, state) <span class="required-mark">*</span></label>
              <input id="nd-dest" class="input-base" placeholder="LAS, NV" />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="nd-value">Estimated value / month ($) <span class="required-mark">*</span></label>
              <input id="nd-value" class="input-base" placeholder="5000" />
            </div>
            <div class="field">
              <label for="nd-margin">Target margin (%) <span class="required-mark">*</span></label>
              <input id="nd-margin" class="input-base" placeholder="20" />
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" id="modal-cancel">Cancel</button>
            <button class="btn btn-primary" id="nd-save">Create deal</button>
          </div>
        </div>
      </div>
    </div>
  `;

  $("#modal-x").addEventListener("click", closeModal);
  $("#modal-cancel").addEventListener("click", closeModal);

  $("#nd-save").addEventListener("click", () => {
    const cust = $("#nd-customer").value.trim();
    const orig = $("#nd-orig").value.trim();
    const dest = $("#nd-dest").value.trim();
    const val  = Number(($("#nd-value").value||"").replace(/[^\d]/g,""));
    const mar  = Number(($("#nd-margin").value||"").replace(/[^\d]/g,""));

    if(!cust){ showToast("Customer is required"); $("#nd-customer").focus(); return; }
    if(!orig.includes(",") || !dest.includes(",")){
      showToast("Use the 'city, state' format for origin and destination");
      return;
    }
    if(!val || !mar){ showToast("Enter value and target margin"); return; }

    const [oc,os] = orig.split(",").map(s=>s.trim().toUpperCase());
    const [dc,ds] = dest.split(",").map(s=>s.trim().toUpperCase());

    state.deals.unshift({
      id:"d"+(++_did), broker:state.me, customer:cust, stage:"lead",
      lane:LANE(oc,os,dc,ds), value:val, marginPct:mar, createdDays:0
    });
    showToast(`Lead "${cust}" created`);
    closeModal();
    renderAll();
  });
}

/* ============================================================
   Carrier Board — view
   ============================================================ */
function viewCarrierBoard(){
  const isCarrier = state.cbViewAs === "carrier";
  const counts = {
    all: state.loads.length,
    posted: state.loads.filter(l => l.status==="posted").length,
    bidding: state.loads.filter(l => l.status==="bidding").length,
    booked: state.loads.filter(l => l.status==="booked").length,
  };
  const loadsForView = isCarrier
    ? state.loads.filter(l => l.status !== "booked")
    : state.loads;
  const equips = ["all", ...new Set(loadsForView.map(l => l.equipment))];
  let filtered = loadsForView.filter(l => {
    if(!isCarrier && state.cbFilter !== "all" && l.status !== state.cbFilter) return false;
    if(state.cbEquipFilter !== "all" && l.equipment !== state.cbEquipFilter) return false;
    const q = state.cbSearch.toLowerCase();
    if(q && !(l.id.toLowerCase().includes(q) ||
              (!isCarrier && l.customer.toLowerCase().includes(q)) ||
              l.lane.o.toLowerCase().includes(q) || l.lane.d.toLowerCase().includes(q))) return false;
    return true;
  });

  // Sorting
  const sortKey = state.cbSortKey;
  const dir = state.cbSortDir === "asc" ? 1 : -1;
  filtered = [...filtered].sort((a,b) => {
    let av, bv;
    switch(sortKey){
      case "pro": av=a.id; bv=b.id; break;
      case "customer": av=a.customer; bv=b.customer; break;
      case "lane": av=a.lane.o+a.lane.d; bv=b.lane.o+b.lane.d; break;
      case "equipment": av=a.equipment; bv=b.equipment; break;
      case "distance": av=a.distance; bv=b.distance; break;
      case "pickupDate": av=a.pickupDate; bv=b.pickupDate; break;
      case "bids": av=a.bids.length; bv=b.bids.length; break;
      case "customerRate": av=a.customerRate||0; bv=b.customerRate||0; break;
      case "targetRate": av=a.targetRate||0; bv=b.targetRate||0; break;
      case "status": av=a.status; bv=b.status; break;
      default: av=a.id; bv=b.id;
    }
    if(typeof av === "string"){ return av.localeCompare(bv) * dir; }
    return (av - bv) * dir;
  });

  return `
    <div class="cb-view-banner ${isCarrier?'carrier':''}">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="role-toggle" style="background:rgba(255,255,255,0.6)">
          <button class="${!isCarrier?'active':''}" id="cb-mode-broker">Broker view</button>
          <button class="${isCarrier?'active':''}" id="cb-mode-carrier">Carrier view</button>
        </div>
        <span style="font-size:12.5px;color:var(--muted)">
          ${isCarrier ? 'You see the board as a carrier looking to bid. Customer names and rates are hidden.' : 'You see the board as the broker. Full information visible.'}
        </span>
      </div>
      ${isCarrier ? `
        <div class="field-inline">
          <label>Bidding as</label>
          <select id="cb-as-carrier" class="select-base" style="min-width:180px">
            ${state.carriers.map(c => `<option value="${c.id}" ${state.cbAsCarrier===c.id?'selected':''}>${c.name} · ${c.mc}</option>`).join("")}
          </select>
        </div>
      ` : ''}
    </div>

    <div class="cb-toolbar">
      ${!isCarrier ? `
        <div class="cb-tabs">
          ${["all","posted","bidding","booked"].map(k => `
            <button class="cb-tab ${state.cbFilter===k?'active':''}" data-cb-filter="${k}">
              ${k[0].toUpperCase()+k.slice(1)}<span class="count">${counts[k]}</span>
            </button>`).join("")}
        </div>
      ` : `
        <div style="font-size:13px;font-weight:600;color:var(--text)">${filtered.length} available loads</div>
      `}
      <div class="cb-filters">
        <div class="field-inline">
          <label>Equipment</label>
          <select id="cb-equip">
            ${equips.map(e => `<option value="${e}" ${state.cbEquipFilter===e?'selected':''}>${e==="all"?"All equipment":e}</option>`).join("")}
          </select>
        </div>
        <div class="field-inline">
          <label>Search</label>
          <input type="text" id="cb-search" placeholder="${isCarrier?'PRO, lane…':'PRO, customer, lane…'}" value="${state.cbSearch}" />
        </div>
        <div class="cb-view-mode" title="Display mode">
          <button class="${state.cbDisplayMode==='table'?'active':''}" id="cb-disp-table">Table</button>
          <button class="${state.cbDisplayMode==='cards'?'active':''}" id="cb-disp-cards">Cards</button>
        </div>
        ${!isCarrier ? `<button class="btn btn-primary" id="cb-post-new">${ICONS.plus} Post a load</button>` : ''}
      </div>
    </div>

    ${filtered.length === 0 ?
      `<div class="card card-pad" style="text-align:center;padding:40px;color:var(--muted);font-size:13px">
        No loads match the current filters.
      </div>` :
      state.cbDisplayMode === "table"
        ? renderLoadsTable(filtered, isCarrier)
        : `<div class="cb-grid">${filtered.map(l => loadCard(l, isCarrier)).join("")}</div>`
    }
  `;
}

function renderLoadsTable(loads, isCarrier){
  const sortIcon = key => state.cbSortKey === key ? `<span class="sort-ind">${state.cbSortDir==='asc'?'↑':'↓'}</span>` : '';
  return `
    <div class="cb-table-wrap">
      <table class="cb-table">
        <thead>
          <tr>
            <th data-sort="pro">PRO ${sortIcon("pro")}</th>
            ${!isCarrier ? `<th data-sort="customer">Customer ${sortIcon("customer")}</th>` : ''}
            <th data-sort="lane">Lane ${sortIcon("lane")}</th>
            <th data-sort="pickupDate">Pickup ${sortIcon("pickupDate")}</th>
            <th>Delivery</th>
            <th data-sort="equipment">Equipment ${sortIcon("equipment")}</th>
            <th data-sort="distance">Miles ${sortIcon("distance")}</th>
            ${!isCarrier ? `
              <th data-sort="customerRate">Cust rate ${sortIcon("customerRate")}</th>
              <th data-sort="targetRate">Target ${sortIcon("targetRate")}</th>
              <th data-sort="bids">Bids ${sortIcon("bids")}</th>
              <th data-sort="status">Status ${sortIcon("status")}</th>
            ` : `
              <th>Weight</th>
              <th>Commodity</th>
              <th>Your bid</th>
            `}
          </tr>
        </thead>
        <tbody>
          ${loads.map(l => renderTableRow(l, isCarrier)).join("")}
        </tbody>
      </table>
      <div class="cb-summary">
        <span>${loads.length} load${loads.length===1?'':'s'} shown · sorted by <b style="color:var(--text)">${state.cbSortKey}</b> ${state.cbSortDir}</span>
        <span>Click any row to open details</span>
      </div>
    </div>
  `;
}

function renderTableRow(l, isCarrier){
  const lane = `<span class="from">${l.lane.o}</span><span class="st">${l.lane.os}</span><span class="ar">→</span><span class="to">${l.lane.d}</span><span class="st">${l.lane.ds}</span>`;
  const rowClass = l.status === "booked" ? "row-booked" : "";

  if(isCarrier){
    const myBid = l.bids.find(b => b.carrier === state.cbAsCarrier);
    let bidCell;
    if(!myBid) bidCell = `<span class="mybid-chip none">No bid</span>`;
    else if(myBid.status === "pending") bidCell = `<span class="mybid-chip pending">$${myBid.rate.toLocaleString("en-US")} · pending</span>`;
    else if(myBid.status === "accepted") bidCell = `<span class="mybid-chip accepted">$${myBid.rate.toLocaleString("en-US")} · won ✓</span>`;
    else bidCell = `<span class="mybid-chip lost">$${myBid.rate.toLocaleString("en-US")} · lost</span>`;

    return `
      <tr class="${rowClass}" data-load="${l.id}">
        <td class="pro">${l.id}</td>
        <td class="lane">${lane}</td>
        <td>${l.pickupDate}</td>
        <td class="muted">${l.deliveryDate}</td>
        <td>${l.equipment}</td>
        <td class="num">${l.distance}</td>
        <td class="muted">${l.weight}</td>
        <td class="muted">${l.commodity}</td>
        <td>${bidCell}</td>
      </tr>
    `;
  }

  // Broker row
  const bidsClass = l.bids.length === 0 ? "zero" : (l.status === "bidding" ? "has" : "");
  const acceptedBid = l.bids.find(b => b.status === "accepted");
  const carrierRate = acceptedBid ? acceptedBid.rate : null;
  const margin = carrierRate ? l.customerRate - carrierRate : null;

  return `
    <tr class="${rowClass}" data-load="${l.id}">
      <td class="pro">${l.id}</td>
      <td><b>${l.customer}</b></td>
      <td class="lane">${lane}</td>
      <td>${l.pickupDate}</td>
      <td class="muted">${l.deliveryDate}</td>
      <td>${l.equipment}</td>
      <td class="num">${l.distance}</td>
      <td class="num"><span style="color:var(--green-dk);font-weight:600">$${l.customerRate.toLocaleString("en-US")}</span></td>
      <td class="num">${l.showTarget ? '$'+l.targetRate.toLocaleString("en-US") : '<span class="muted">$'+l.targetRate.toLocaleString("en-US")+'</span>'}</td>
      <td><span class="bids-chip ${bidsClass}">${l.bids.length}</span></td>
      <td><span class="cb-load-status ${l.status}" style="font-size:10px;padding:2px 7px">${l.status}</span></td>
    </tr>
  `;
}

function loadCard(l, isCarrier){
  let footRight = '';
  if(isCarrier){
    const myBid = l.bids.find(b => b.carrier === state.cbAsCarrier);
    if(myBid){
      footRight = `<span style="font-family:var(--font-mono);font-size:12px;color:${myBid.status==='accepted'?'var(--green-dk)':myBid.status==='lost'?'var(--coral)':'var(--blue-50)'};font-weight:600">
        Your bid $${myBid.rate.toLocaleString("en-US")} · ${myBid.status === 'pending' ? 'pending' : myBid.status === 'accepted' ? 'won' : 'lost'}
      </span>`;
    } else {
      footRight = `<span style="font-size:12px;color:var(--muted)">No bid yet</span>`;
    }
  } else {
    const margin = l.customerRate && l.acceptedBidId
      ? `<span style="font-family:var(--font-mono);font-size:11px;color:var(--green-dk);font-weight:600;margin-left:6px">+$${(l.customerRate - l.bids.find(b=>b.id===l.acceptedBidId).rate).toLocaleString("en-US")}</span>`
      : '';
    footRight = `<span class="cb-target-rate ${l.showTarget ? '' : 'hidden'}">
      ${l.showTarget ? `Target $${l.targetRate.toLocaleString("en-US")}` : 'Rate hidden'}${margin}
    </span>`;
  }

  return `
    <div class="cb-load ${l.status}" data-load="${l.id}">
      <div class="cb-load-head">
        <span class="cb-load-pro">${l.id}</span>
        ${isCarrier ?
          `<span class="cb-load-status posted">Open</span>` :
          `<span class="cb-load-status ${l.status}">${l.status === "bidding" ? `${l.bids.length} bids` : l.status}</span>`
        }
      </div>
      <div class="cb-load-lane">
        <b>${l.lane.o}</b> <span style="color:var(--faint)">${l.lane.os}</span>
        <span class="arrow-l">→</span>
        <b>${l.lane.d}</b> <span style="color:var(--faint)">${l.lane.ds}</span>
      </div>
      <div class="cb-load-meta">
        <div>Equipment <b>${l.equipment}</b></div>
        <div>Distance <b>${l.distance} mi</b></div>
        <div>Pickup <b>${l.pickupDate}</b></div>
        <div>Delivery <b>${l.deliveryDate}</b></div>
      </div>
      <div class="cb-load-foot">
        ${!isCarrier ? `<span class="cb-bid-count">${ICONS.users} ${l.bids.length} bid${l.bids.length===1?'':'s'}</span>` : '<span></span>'}
        ${footRight}
      </div>
    </div>
  `;
}

function wireCarrierBoard(){
  $("#cb-mode-broker")?.addEventListener("click", () => { state.cbViewAs = "broker"; state.cbFilter="all"; renderAll(); });
  $("#cb-mode-carrier")?.addEventListener("click", () => { state.cbViewAs = "carrier"; renderAll(); });
  $("#cb-as-carrier")?.addEventListener("change", e => { state.cbAsCarrier = e.target.value; renderAll(); });
  $("#cb-disp-table")?.addEventListener("click", () => { state.cbDisplayMode = "table"; renderAll(); });
  $("#cb-disp-cards")?.addEventListener("click", () => { state.cbDisplayMode = "cards"; renderAll(); });
  $$(".cb-tab").forEach(b => b.addEventListener("click", () => {
    state.cbFilter = b.dataset.cbFilter; renderAll();
  }));
  $("#cb-equip")?.addEventListener("change", e => { state.cbEquipFilter = e.target.value; renderAll(); });
  $("#cb-search")?.addEventListener("input", e => { state.cbSearch = e.target.value; renderCarrierBoardContent(); });
  $("#cb-post-new")?.addEventListener("click", () => openPostLoadModal());

  // Sortable headers (table mode)
  $$(".cb-table thead th[data-sort]").forEach(th => th.addEventListener("click", () => {
    const key = th.dataset.sort;
    if(state.cbSortKey === key){
      state.cbSortDir = state.cbSortDir === "asc" ? "desc" : "asc";
    } else {
      state.cbSortKey = key;
      state.cbSortDir = "asc";
    }
    renderAll();
  }));

  // Row & card click → open detail
  $$(".cb-load, .cb-table tbody tr[data-load]").forEach(el => el.addEventListener("click", () => openLoadDetailModal(el.dataset.load)));
}
function renderCarrierBoardContent(){
  // partial re-render for search (avoids stealing focus)
  const root = $("#content");
  const html = viewCarrierBoard();
  root.innerHTML = html;
  // re-wire and restore focus to search
  wireCarrierBoard();
  const s = $("#cb-search"); if(s){ s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
}

/* ============================================================
   Load detail modal (broker side + carrier side toggle)
   ============================================================ */
let _selectedBidId = null;
let _activeChatCarrier = null;

function openLoadDetailModal(loadId){
  const l = state.loads.find(x => x.id === loadId);
  if(!l) return;
  _selectedBidId = l.acceptedBidId || (l.bids[0]?.id ?? null);
  _activeChatCarrier = state.cbViewAs === "carrier"
    ? state.cbAsCarrier
    : (_selectedBidId ? l.bids.find(b => b.id===_selectedBidId)?.carrier : null);
  renderLoadDetailModal(l);
}

function renderLoadDetailModal(l){
  const isCarrier = state.cbViewAs === "carrier";
  const myCarrierId = state.cbAsCarrier;
  const myBid = isCarrier ? l.bids.find(b => b.carrier === myCarrierId) : null;
  const accepted = l.bids.find(b => b.status === "accepted");
  const sortedBids = [...l.bids].sort((a,b) => {
    if(a.status === "accepted") return -1;
    if(b.status === "accepted") return 1;
    if(a.status === "lost" && b.status !== "lost") return 1;
    if(b.status === "lost" && a.status !== "lost") return -1;
    return a.rate - b.rate;
  });

  // For broker: chat with the carrier of the selected bid
  // For carrier: chat with broker (his own bid context)
  const chatCarrierId = isCarrier ? myCarrierId : _activeChatCarrier;

  $("#modal-root").innerHTML = `
    <div id="modal-bg" class="modal-bg">
      <div class="modal modal-lg">
        <div class="modal-head">
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <h2 class="modal-title">${l.id}</h2>
              <span class="cb-load-status ${l.status}">${isCarrier ? (myBid ? `your bid ${myBid.status}` : 'open for bids') : l.status}</span>
            </div>
            <div class="modal-sub">
              ${isCarrier
                ? `Viewing as <b>${carrierById(myCarrierId).name}</b>`
                : `<b>${l.customer}</b> · broker ${userById(l.broker).name}`} ·
              ${l.lane.o} ${l.lane.os} → ${l.lane.d} ${l.lane.ds} · ${l.distance} mi
            </div>
          </div>
          <button class="modal-close" id="modal-x" aria-label="Close">${ICONS.close}</button>
        </div>

        <div class="cb-detail">
          <div class="cb-detail-info">
            <div class="cb-info-row">
              <span class="k">Pickup</span>
              <span class="v">${l.pickupDate} · ${l.lane.o}, ${l.lane.os}</span>
            </div>
            <div class="cb-info-row">
              <span class="k">Delivery</span>
              <span class="v">${l.deliveryDate} · ${l.lane.d}, ${l.lane.ds}</span>
            </div>
            <div class="cb-info-row">
              <span class="k">Equipment</span>
              <span class="v">${l.equipment}</span>
            </div>
            <div class="cb-info-row">
              <span class="k">Weight / pcs</span>
              <span class="v mono">${l.weight} · ${l.pieces}</span>
            </div>
            <div class="cb-info-row">
              <span class="k">Commodity</span>
              <span class="v">${l.commodity}</span>
            </div>
            <div class="cb-info-row">
              <span class="k">Requirements</span>
              <span class="v" style="font-size:12px">${l.requirements}</span>
            </div>
            ${!isCarrier ? `
              <div class="cb-info-row">
                <span class="k">Customer</span>
                <span class="v">${l.customer}</span>
              </div>
              <div class="cb-info-row">
                <span class="k">Customer rate</span>
                <span class="v mono" style="color:var(--green-dk);font-weight:600">$${l.customerRate.toLocaleString("en-US")}</span>
              </div>
              <div class="cb-info-row">
                <span class="k">Target rate</span>
                <span class="v mono">$${l.targetRate.toLocaleString("en-US")} <span style="font-weight:400;color:var(--muted);font-size:11px">${l.showTarget?'(visible to carriers)':'(hidden)'}</span></span>
              </div>
              ${l.acceptedBidId ? `
                <div class="cb-info-row">
                  <span class="k">Carrier rate</span>
                  <span class="v mono">$${l.bids.find(b=>b.id===l.acceptedBidId).rate.toLocaleString("en-US")}</span>
                </div>
                <div class="cb-info-row">
                  <span class="k">Margin</span>
                  <span class="v mono" style="color:var(--green-dk);font-weight:600">+$${(l.customerRate - l.bids.find(b=>b.id===l.acceptedBidId).rate).toLocaleString("en-US")}</span>
                </div>
              ` : ''}
            ` : `
              <div class="cb-info-row">
                <span class="k">Customer</span>
                <span class="v" style="color:var(--faint);font-style:italic">Hidden until bid accepted</span>
              </div>
              ${l.showTarget ? `<div class="cb-info-row">
                <span class="k">Target rate</span>
                <span class="v mono">$${l.targetRate.toLocaleString("en-US")}</span>
              </div>` : ''}
            `}
          </div>

          <div class="cb-detail-bids">
            ${isCarrier ? renderCarrierBidPanel(l, myBid) : renderBrokerBidsList(sortedBids, l)}
          </div>
        </div>

        ${chatCarrierId ? renderChatPanel(l, chatCarrierId, isCarrier) : ''}
      </div>
    </div>
  `;

  $("#modal-x").addEventListener("click", closeModal);

  // Bids interactions (broker view)
  if(!isCarrier){
    $$(".cb-bid").forEach(el => el.addEventListener("click", () => {
      _selectedBidId = el.dataset.bid;
      _activeChatCarrier = l.bids.find(b => b.id === _selectedBidId)?.carrier;
      renderLoadDetailModal(l);
    }));

    $("#accept-bid")?.addEventListener("click", () => {
      if(!_selectedBidId) return;
      const bid = l.bids.find(b => b.id === _selectedBidId);
      bid.status = "accepted";
      l.bids.forEach(b => { if(b.id !== _selectedBidId && b.status !== "accepted") b.status = "lost"; });
      l.status = "booked";
      l.acceptedBidId = _selectedBidId;
      showToast(`Bid accepted from ${carrierById(bid.carrier).name}. Generate Rate Con manually below.`);
      renderLoadDetailModal(l);
    });
    $("#open-ratecon")?.addEventListener("click", () => openRateConModal(l));
  } else {
    // Carrier view: place / update bid
    $("#place-bid-btn")?.addEventListener("click", () => placeBidFromCarrier(l));
    $("#withdraw-bid-btn")?.addEventListener("click", () => {
      l.bids = l.bids.filter(b => b.carrier !== myCarrierId);
      if(l.bids.length === 0 && l.status === "bidding") l.status = "posted";
      showToast("Bid withdrawn");
      renderLoadDetailModal(l);
    });
  }

  // Chat send (both views)
  $("#chat-send")?.addEventListener("click", () => sendChatMessage(l, chatCarrierId, isCarrier));
  $("#chat-input")?.addEventListener("keydown", e => { if(e.key === "Enter") sendChatMessage(l, chatCarrierId, isCarrier); });
}

function renderBrokerBidsList(bids, l){
  const accepted = l.acceptedBidId;
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
      <span style="font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Bids (${bids.length})</span>
      ${l.status === "bidding" && _selectedBidId && !accepted ? `
        <button class="btn btn-additional" id="accept-bid" style="padding:6px 14px;font-size:12px">Accept selected</button>
      ` : ''}
      ${accepted && !l.rateConSent ? `
        <button class="btn btn-primary" id="open-ratecon" style="padding:6px 14px;font-size:12px">${ICONS.file} Generate Rate Con</button>
      ` : ''}
      ${l.rateConSent ? `<span style="font-size:11.5px;color:var(--green-dk);font-weight:600">${ICONS.file} Rate Con sent</span>` : ''}
    </div>

    ${bids.length === 0 ? `
      <div style="text-align:center;padding:30px 12px;color:var(--muted);font-size:12.5px">
        No bids yet. Carriers will see this load on the board.
      </div>
    ` : bids.map(b => {
      const c = carrierById(b.carrier);
      const isSel = b.id === _selectedBidId;
      return `
        <div class="cb-bid ${isSel?'selected':''} ${b.status === 'accepted'?'accepted':''} ${b.status === 'lost'?'lost':''}" data-bid="${b.id}">
          <div class="cb-bid-head">
            <div class="cb-bid-carrier">
              <span class="avatar">${c.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</span>
              <div>
                <div class="cb-bid-name">${c.name}</div>
                <div class="cb-bid-mc">${c.mc}</div>
              </div>
            </div>
            <span class="cb-bid-rate">$${b.rate.toLocaleString("en-US")}</span>
          </div>
          <div class="cb-bid-tags">
            ${c.otr ? '<span class="cb-tag otr">OTR ✓</span>' : '<span class="cb-tag" style="background:var(--coral-soft);color:var(--coral)">OTR ✗</span>'}
            ${c.creditOk ? '<span class="cb-tag credit-ok">Credit OK</span>' : '<span class="cb-tag credit-warn">Credit watch</span>'}
            <span class="cb-tag" style="background:var(--amber-soft);color:var(--amber)">★ ${c.rating}</span>
            ${b.note ? '<span class="cb-tag note">+ note</span>' : ''}
            ${b.status === "accepted" ? '<span class="cb-tag" style="background:var(--green);color:#fff">ACCEPTED</span>' : ''}
            ${b.status === "lost" ? '<span class="cb-tag" style="background:var(--bg);color:var(--muted)">Lost</span>' : ''}
          </div>
          ${b.note ? `<div style="font-size:11.5px;color:var(--text-2);margin-top:6px;line-height:1.45">"${b.note}"</div>` : ''}
          <div class="cb-bid-meta">
            <span>Pickup ${b.pickupTime}</span>
            <span class="cb-bid-time">${b.time}</span>
          </div>
        </div>
      `;
    }).join("")}
  `;
}

function renderCarrierBidPanel(l, myBid){
  const isBooked = l.status === "booked";
  const myCarrier = carrierById(state.cbAsCarrier);

  // If accepted, show full details (now unlocked)
  if(myBid && myBid.status === "accepted"){
    return `
      <div style="font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">
        Your bid · accepted
      </div>
      <div style="background:var(--green-soft);border:1px solid var(--green);border-radius:8px;padding:14px;display:grid;gap:8px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:13px;font-weight:600;color:var(--green-dk)">✓ You won this load</span>
          <span style="font-family:var(--font-mono);font-size:16px;font-weight:600">$${myBid.rate.toLocaleString("en-US")}</span>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.5">
          Customer details and full pickup address are now visible above.
          ${l.rateConSent ? 'Rate Con received — check your email.' : 'Waiting for Rate Con from the broker.'}
        </div>
      </div>
      <div style="margin-top:10px;padding:11px 13px;background:var(--blue-05);border-radius:8px;font-size:11.5px;color:var(--muted);line-height:1.5">
        ${ICONS.chat} Use the chat below to coordinate pickup details with the broker.
      </div>
    `;
  }

  if(myBid && myBid.status === "lost"){
    return `
      <div style="font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">
        Your bid · lost
      </div>
      <div style="background:var(--coral-soft);border:1px solid var(--coral);border-radius:8px;padding:14px;display:grid;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:13px;font-weight:600;color:var(--coral-dk)">Awarded to another carrier</span>
          <span style="font-family:var(--font-mono);font-size:14px;color:var(--muted);text-decoration:line-through">$${myBid.rate.toLocaleString("en-US")}</span>
        </div>
        <div style="font-size:12px;color:var(--muted)">Browse other open loads on the board.</div>
      </div>
    `;
  }

  if(isBooked){
    return `
      <div style="padding:30px 12px;text-align:center;color:var(--muted);font-size:13px">
        This load has been booked.<br>
        <span style="font-size:11.5px">Bidding closed.</span>
      </div>
    `;
  }

  // Pending bid or no bid yet
  if(myBid && myBid.status === "pending"){
    return `
      <div style="font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">
        Your bid · pending
      </div>
      <div class="cb-bid selected" style="cursor:default">
        <div class="cb-bid-head">
          <div class="cb-bid-carrier">
            <span class="avatar me">${myCarrier.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</span>
            <div>
              <div class="cb-bid-name">${myCarrier.name}</div>
              <div class="cb-bid-mc">${myCarrier.mc}</div>
            </div>
          </div>
          <span class="cb-bid-rate">$${myBid.rate.toLocaleString("en-US")}</span>
        </div>
        ${myBid.note ? `<div style="font-size:11.5px;color:var(--text-2);margin-top:6px;line-height:1.45">"${myBid.note}"</div>` : ''}
        <div class="cb-bid-meta">
          <span>Submitted ${myBid.time}</span>
          <span class="cb-tag" style="background:var(--blue-10);color:var(--blue-70)">Waiting for broker</span>
        </div>
      </div>
      <div style="margin-top:10px;display:flex;gap:8px">
        <button class="btn btn-outline" id="withdraw-bid-btn" style="flex:1">Withdraw bid</button>
      </div>
      <div style="margin-top:10px;padding:11px 13px;background:var(--blue-05);border-radius:8px;font-size:11.5px;color:var(--muted);line-height:1.5">
        ${ICONS.chat} You can chat with the broker below while your bid is being reviewed.
      </div>
    `;
  }

  // No bid yet — show the form (without pickup time)
  return `
    <div style="font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">
      Place your bid
    </div>
    <div class="cb-place-bid">
      <h4>Submit a bid for this load</h4>
      <div class="field">
        <label>Your rate ($) <span class="required-mark">*</span></label>
        <input id="bid-rate" class="input-base" type="number" placeholder="${l.showTarget ? l.targetRate : ''}" value="${l.showTarget ? l.targetRate : ''}" />
      </div>
      <div class="field">
        <label>Note for the broker (optional)</label>
        <textarea id="bid-note" class="textarea-base" placeholder="e.g. truck already nearby, can flex on timing…" rows="2"></textarea>
      </div>
      <button class="btn btn-primary" id="place-bid-btn">${ICONS.send} Submit bid</button>
    </div>

    <div style="margin-top:14px;padding:11px 13px;background:var(--blue-05);border-radius:8px;font-size:11.5px;color:var(--muted);line-height:1.5">
      ${ICONS.chat} Pickup time is fixed by the broker — see the schedule above. Once your bid is accepted, customer details and the Rate Con will become available.
    </div>
  `;
}

function renderChatPanel(l, carrierId, isCarrier){
  const c = carrierById(carrierId);
  const broker = userById(l.broker);
  const msgs = l.chats[carrierId] || [];

  // Header depends on who's viewing
  const header = isCarrier
    ? `<span>${ICONS.chat} Chat with broker ${broker.name}</span>`
    : `<span>${ICONS.chat} Chat with ${c.name}</span>`;
  const meta = isCarrier
    ? `<span style="color:var(--faint);font-weight:400;font-size:11px">Sierra Logistics Group</span>`
    : `<span style="color:var(--faint);font-weight:400;font-size:11px">${c.mc}</span>`;
  const placeholder = isCarrier
    ? `Message broker ${broker.name.split(" ")[0]}…`
    : `Type a message to ${c.name.split(" ")[0]}…`;

  // From carrier's perspective, "me" = car messages, "them" = broker messages
  // From broker's perspective, "me" = broker messages, "them" = car messages
  return `
    <div class="cb-chat">
      <div class="cb-chat-head" style="display:flex;justify-content:space-between;align-items:center">
        ${header}
        ${meta}
      </div>
      <div class="cb-chat-msgs" id="chat-msgs">
        ${msgs.length === 0 ? `
          <div style="text-align:center;color:var(--faint);font-size:11.5px;padding:20px">
            No messages yet. Start the conversation about this load.
          </div>
        ` : msgs.map(m => {
          const isMine = isCarrier ? (m.from === "car") : (m.from === "me");
          return `
            <div class="cb-msg ${isMine ? 'me' : ''}">
              ${m.text}
              <div class="when">${m.when}</div>
            </div>
          `;
        }).join("")}
      </div>
      <div class="cb-chat-input">
        <input type="text" id="chat-input" placeholder="${placeholder}" />
        <button class="btn btn-primary" id="chat-send">${ICONS.send}</button>
      </div>
    </div>
  `;
}

function carrierById(id){ return state.carriers.find(c => c.id === id) || { name:"Unknown", mc:"", otr:false, creditOk:false, rating:0 }; }

function sendChatMessage(l, carrierId, isCarrier){
  const input = $("#chat-input");
  if(!input || !carrierId) return;
  const txt = input.value.trim();
  if(!txt) return;
  if(!l.chats[carrierId]) l.chats[carrierId] = [];
  // Message origin depends on who's typing
  const from = isCarrier ? "car" : "me";
  l.chats[carrierId].push({ from, text:txt, when:"just now" });
  input.value = "";
  renderLoadDetailModal(l);
  const m = $("#chat-msgs");
  if(m) m.scrollTop = m.scrollHeight;
}

function placeBidFromCarrier(l){
  const rate = Number($("#bid-rate")?.value);
  const note = $("#bid-note")?.value.trim();
  const carrierId = state.cbAsCarrier;
  if(!rate || rate <= 0){ showToast("Enter a valid rate"); return; }
  // Use load's own pickupDate as the pickupTime (carrier doesn't set it)
  const newBid = {
    id:"bid"+Date.now(), carrier:carrierId, rate, pickupTime:l.pickupDate, note, time:"just now", status:"pending"
  };
  l.bids.push(newBid);
  if(l.status === "posted") l.status = "bidding";
  showToast(`Bid submitted: $${rate.toLocaleString("en-US")}`);
  renderLoadDetailModal(l);
}

/* ============================================================
   Post new load modal
   ============================================================ */
function openPostLoadModal(){
  $("#modal-root").innerHTML = `
    <div id="modal-bg" class="modal-bg">
      <div class="modal">
        <div class="modal-head">
          <div>
            <h2 class="modal-title">Post a load</h2>
            <div class="modal-sub">Publish to the Carrier Board. Carriers will see lane, dates, equipment but not the customer name.</div>
          </div>
          <button class="modal-close" id="modal-x" aria-label="Close">${ICONS.close}</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label>Customer <span class="required-mark">*</span></label>
            <input id="pl-customer" class="input-base" placeholder="e.g. DB Schenker" />
          </div>
          <div class="field-row">
            <div class="field">
              <label>Origin (city, ST) <span class="required-mark">*</span></label>
              <input id="pl-orig" class="input-base" placeholder="LRD, TX" />
            </div>
            <div class="field">
              <label>Destination (city, ST) <span class="required-mark">*</span></label>
              <input id="pl-dest" class="input-base" placeholder="LAS, NV" />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Pickup date</label>
              <input id="pl-pickup" class="input-base" placeholder="Jun 14, 08:00" />
            </div>
            <div class="field">
              <label>Delivery date</label>
              <input id="pl-delivery" class="input-base" placeholder="Jun 16, 10:00" />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Equipment</label>
              <select id="pl-equip" class="select-base">
                <option>53' Dry Van</option>
                <option>53' Reefer</option>
                <option>Reefer -10°F</option>
                <option>Flatbed</option>
              </select>
            </div>
            <div class="field">
              <label>Target rate ($)</label>
              <input id="pl-rate" class="input-base" type="number" placeholder="2400" />
            </div>
          </div>
          <div class="field">
            <label>Special requirements</label>
            <textarea id="pl-req" class="textarea-base" rows="2" placeholder="Notice, FIFO, temp, etc."></textarea>
          </div>
          <div class="field">
            <label style="display:flex;align-items:center;gap:8px;font-weight:400;color:var(--text)">
              <input type="checkbox" id="pl-show-target" /> Show target rate to carriers
            </label>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" id="modal-cancel">Cancel</button>
            <button class="btn btn-primary" id="pl-post">${ICONS.send} Post load</button>
          </div>
        </div>
      </div>
    </div>
  `;
  $("#modal-x").addEventListener("click", closeModal);
  $("#modal-cancel").addEventListener("click", closeModal);
  $("#pl-post").addEventListener("click", () => {
    const cust = $("#pl-customer").value.trim();
    const orig = $("#pl-orig").value.trim();
    const dest = $("#pl-dest").value.trim();
    const rate = Number($("#pl-rate").value) || 0;
    if(!cust || !orig.includes(",") || !dest.includes(",")){
      showToast("Customer, origin and destination are required (city, ST format)");
      return;
    }
    const [oc,os] = orig.split(",").map(s => s.trim().toUpperCase());
    const [dc,ds] = dest.split(",").map(s => s.trim().toUpperCase());
    const newLoad = {
      id:"L"+(17600 + state.loads.length),
      customer:cust, broker:state.me,
      lane:LANE(oc,os,dc,ds),
      pickupDate: $("#pl-pickup").value.trim() || "TBD",
      deliveryDate: $("#pl-delivery").value.trim() || "TBD",
      equipment: $("#pl-equip").value,
      weight:"—", pieces:"—", commodity:"—", distance:0,
      requirements: $("#pl-req").value.trim() || "—",
      targetRate: rate, showTarget: $("#pl-show-target").checked,
      status:"posted", bids:[], chats:{}, acceptedBidId:null, rateConSent:false,
    };
    state.loads.unshift(newLoad);
    showToast(`Load ${newLoad.id} posted to the Carrier Board`);
    closeModal();
    renderAll();
  });
}

/* ============================================================
   Rate Con modal (manual review & send)
   ============================================================ */
function openRateConModal(l){
  const bid = l.bids.find(b => b.id === l.acceptedBidId);
  const carrier = carrierById(bid.carrier);
  $("#modal-root").innerHTML = `
    <div id="modal-bg" class="modal-bg">
      <div class="modal" style="max-width:640px">
        <div class="modal-head">
          <div>
            <h2 class="modal-title">${ICONS.file} Rate Confirmation</h2>
            <div class="modal-sub">Review, add notes if needed, then send to ${carrier.name}. Sending is manual — important notes may need adjustment.</div>
          </div>
          <button class="modal-close" id="modal-x" aria-label="Close">${ICONS.close}</button>
        </div>
        <div class="modal-body">
          <div class="ratecon-preview">
            <h4>RATE CONFIRMATION · ${l.id}</h4>
            <div class="rc-row"><span class="k">Broker</span><span class="v">Sierra Logistics Group (${userById(l.broker).name})</span></div>
            <div class="rc-row"><span class="k">Carrier</span><span class="v">${carrier.name} · ${carrier.mc}</span></div>
            <div class="rc-row"><span class="k">Customer</span><span class="v">${l.customer}</span></div>
            <div class="rc-row"><span class="k">Pickup</span><span class="v">${l.pickupDate} · ${l.lane.o}, ${l.lane.os}</span></div>
            <div class="rc-row"><span class="k">Delivery</span><span class="v">${l.deliveryDate} · ${l.lane.d}, ${l.lane.ds}</span></div>
            <div class="rc-row"><span class="k">Equipment</span><span class="v">${l.equipment}</span></div>
            <div class="rc-row"><span class="k">Weight / pcs</span><span class="v">${l.weight} · ${l.pieces}</span></div>
            <div class="rc-row"><span class="k">Commodity</span><span class="v">${l.commodity}</span></div>
            <div class="rc-row"><span class="k">Distance</span><span class="v">${l.distance} mi</span></div>
            <div class="rc-row"><span class="k">Accepted rate</span><span class="v">$${bid.rate.toLocaleString("en-US")}</span></div>
            <div class="rc-row"><span class="k">Requirements</span><span class="v" style="text-align:right;max-width:60%">${l.requirements}</span></div>
          </div>
          <div class="field" style="margin-top:14px">
            <label>Additional notes for the carrier</label>
            <textarea id="rc-notes" class="textarea-base" rows="3" placeholder="Driver instructions, gate codes, important reminders…">${bid.note || ''}</textarea>
          </div>
          <div class="hint-info" style="margin-top:0">
            ${ICONS.send} Once you click <b>Send</b>, the Rate Con PDF (with MC# watermark) is delivered to ${carrier.name}. You can re-send a revised version anytime before pickup.
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" id="modal-cancel">Save draft (don't send)</button>
            <button class="btn btn-additional" id="rc-send">${ICONS.send} Send to carrier</button>
          </div>
        </div>
      </div>
    </div>
  `;
  $("#modal-x").addEventListener("click", closeModal);
  $("#modal-cancel").addEventListener("click", closeModal);
  $("#rc-send").addEventListener("click", () => {
    l.rateConSent = true;
    showToast(`Rate Con sent to ${carrier.name}`);
    closeModal();
    renderLoadDetailModal(l);
  });
}

/* ============================================================
   Render dispatcher
   ============================================================ */
function renderAll(){
  renderSidebar();
  renderHeader();
  const root = $("#content");
  if(state.view === "workspace"){ root.innerHTML = viewWorkspace(); wireWorkspace(); }
  else if(state.view === "pipeline"){ root.innerHTML = viewPipeline(); wirePipeline(); }
  else if(state.view === "dashboard"){ root.innerHTML = viewDashboard(); wireDashboard(); }
  else if(state.view === "analytics"){ root.innerHTML = viewAnalytics(); }
  else if(state.view === "carrier_board"){ root.innerHTML = viewCarrierBoard(); wireCarrierBoard(); }
}

renderAll();
