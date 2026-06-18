/* ============================================================
   Sierra Logistics Group — Operations Platform
   Pure HTML/CSS/JS. No build, no dependencies.

   Architecture per new TZ:
   - Leads do NOT live in this system; they come from external
     Spreadsheet → OTR API verification → Customers
   - Customers cannot be used in operations while in status
     "Not Verified by OTR"
   - Customer Open Board: incoming load requests from customers,
     Customer Rep quotes, on confirmation goes to Load Board
   - Load Board: full lifecycle (Posted → Booked → En Route →
     Delivered → Invoiced → Paid)
   - Carrier Open Board: load posted to carriers, Recommended
     Rate visible, auto-book threshold, Carrier Rep manages
   - Sales: financial analytics with RBAC (Rep / Manager / GM)
   - Compensation: Commission Engine v1.2 (Sierra spec)
   ============================================================ */

/* ---------- Inline SVG icons ---------- */
const ICONS = {
  workspace: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
  inbox: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  board: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  truck: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  briefcase: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  analytics: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>',
  dollar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  task: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/></svg>',
  close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  warn: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  bolt: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  send: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  link: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71"/></svg>',
  eye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  dots: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg>',
};

/* ============================================================
   DATA LAYER
   ============================================================ */

const BRANCHES = [
  { id:"br_il", name:"Illinois", state:"IL" },
  { id:"br_wa", name:"Washington", state:"WA" },
];

const PODS = [
  { id:"pd_il_a", branchId:"br_il", name:"IL Pod Alpha" },
  { id:"pd_il_b", branchId:"br_il", name:"IL Pod Beta" },
  { id:"pd_wa_a", branchId:"br_wa", name:"WA Pod Alpha" },
  { id:"pd_wa_b", branchId:"br_wa", name:"WA Pod Beta" },
];

const USERS = [
  { id:"u_aaron", podId:"pd_il_a", first:"Aaron",  last:"Villarreal", role:"Director",        branchId:"br_il", rbac:"manager", annualBase:120000, customTagged:0      },
  { id:"u_maria", podId:"pd_il_a", first:"Maria",  last:"Castillo",   role:"Sales_Rep",       branchId:"br_il", rbac:"rep",     annualBase:48000,  customTagged:0      },
  { id:"u_diego", podId:"pd_il_a", first:"Diego",  last:"Romero",     role:"Sales_Rep",       branchId:"br_il", rbac:"rep",     annualBase:48000,  customTagged:0      },
  { id:"u_linda", podId:"pd_il_a", first:"Linda",  last:"Park",       role:"Carrier_Rep",     branchId:"br_il", rbac:"rep",     annualBase:42000,  customTagged:0      },
  { id:"u_james", podId:"pd_il_b", first:"James",  last:"Carter",     role:"Sales_Rep",       branchId:"br_il", rbac:"rep",     annualBase:48000,  customTagged:0      },
  { id:"u_eli",   podId:"pd_il_b", first:"Eli",    last:"Greene",     role:"Ops_Specialist",  branchId:"br_il", rbac:"rep",     annualBase:55000,  customTagged:0      },
  { id:"u_jesse", podId:"pd_wa_a", first:"Jesse",  last:"McGinnes",   role:"Branch_Lead",     branchId:"br_wa", rbac:"manager", annualBase:130000, customTagged:0.1500 },
  { id:"u_hanna", podId:"pd_wa_a", first:"Hanna",  last:"Wojcik",     role:"Sales_Rep",       branchId:"br_wa", rbac:"rep",     annualBase:48000,  customTagged:0      },
  { id:"u_alex",  podId:"pd_wa_a", first:"Alex",   last:"Nguyen",     role:"Carrier_Rep",     branchId:"br_wa", rbac:"rep",     annualBase:42000,  customTagged:0      },
  { id:"u_tyler", podId:"pd_wa_b", first:"Tyler",  last:"Brooks",     role:"Sales_Rep",       branchId:"br_wa", rbac:"rep",     annualBase:48000,  customTagged:0      },
  { id:"u_sara",  podId:"pd_wa_b", first:"Sara",   last:"Lee",        role:"Carrier_Rep",     branchId:"br_wa", rbac:"rep",     annualBase:42000,  customTagged:0      },
  { id:"u_olivia",podId:"pd_wa_b", first:"Olivia", last:"Reed",       role:"Ops_Specialist",  branchId:"br_wa", rbac:"rep",     annualBase:55000,  customTagged:0      },
  { id:"u_nick",  podId:null,      first:"Nick",   last:"Saponaro",   role:"GM",              branchId:null,    rbac:"gm",      annualBase:200000, customTagged:0      },
];

const CUSTOMERS = [
  { id:"cu1",  name:"DB Schenker",           status:"active",             creditLimit:75000, openInvoices:18400, otrVerifiedAt:"2026-05-12", source:"spreadsheet" },
  { id:"cu2",  name:"UFC Foods",             status:"active",             creditLimit:50000, openInvoices:7200,  otrVerifiedAt:"2026-04-20", source:"spreadsheet" },
  { id:"cu3",  name:"Hellmann MX",           status:"active",             creditLimit:100000,openInvoices:28000, otrVerifiedAt:"2026-03-15", source:"spreadsheet" },
  { id:"cu4",  name:"American Agri Supply",  status:"active",             creditLimit:40000, openInvoices:5300,  otrVerifiedAt:"2026-05-30", source:"spreadsheet" },
  { id:"cu5",  name:"Maersk Mexico",         status:"active",             creditLimit:120000,openInvoices:34000, otrVerifiedAt:"2026-02-10", source:"spreadsheet" },
  { id:"cu6",  name:"Bel Fresh Produce",     status:"active",             creditLimit:30000, openInvoices:2400,  otrVerifiedAt:"2026-05-22", source:"spreadsheet" },
  { id:"cu7",  name:"Atlas Beverage",        status:"active",             creditLimit:35000, openInvoices:4200,  otrVerifiedAt:"2026-04-05", source:"spreadsheet" },
  { id:"cu8",  name:"Continental Foods",     status:"active",             creditLimit:25000, openInvoices:3300,  otrVerifiedAt:"2026-05-18", source:"spreadsheet" },
  { id:"cu9",  name:"Nordic Metals",         status:"credit_pending",     creditLimit:0,     openInvoices:0,     otrVerifiedAt:null,          source:"spreadsheet" },
  { id:"cu10", name:"Sunbelt Building",      status:"not_verified_by_otr",creditLimit:0,     openInvoices:0,     otrVerifiedAt:null,          source:"spreadsheet" },
  { id:"cu11", name:"Cascade Lumber",        status:"not_verified_by_otr",creditLimit:0,     openInvoices:0,     otrVerifiedAt:null,          source:"spreadsheet" },
  { id:"cu12", name:"Pacific Trade Co",      status:"active",             creditLimit:60000, openInvoices:12000, otrVerifiedAt:"2026-03-28", source:"spreadsheet" },
  { id:"cu13", name:"LISI Automotive",       status:"active",             creditLimit:90000, openInvoices:18800, otrVerifiedAt:"2026-04-12", source:"spreadsheet" },
  { id:"cu14", name:"Ryder Supply Co",       status:"dnu",                creditLimit:0,     openInvoices:1900,  otrVerifiedAt:"2025-11-10", source:"spreadsheet" },
  { id:"cu15", name:"Greenfield Co-op",      status:"active",             creditLimit:20000, openInvoices:4400,  otrVerifiedAt:"2026-05-08", source:"spreadsheet" },
  { id:"cu16", name:"Northstar Steel",       status:"blacklisted",        creditLimit:0,     openInvoices:0,     otrVerifiedAt:"2025-09-22", source:"spreadsheet" },
];

const CUSTOMER_STATUS = {
  not_verified_by_otr: { label:"Not Verified by OTR", color:"#E0A130", soft:"#FBF3DF", opsAllowed:false },
  credit_pending:      { label:"Credit Pending",      color:"#7C5CFF", soft:"#EFEAFF", opsAllowed:false },
  credit_approved:     { label:"Credit Approved",     color:"#5A96CC", soft:"#E5EFF8", opsAllowed:true  },
  active:              { label:"Active",              color:"#3FA876", soft:"#E8F5EE", opsAllowed:true  },
  dnu:                 { label:"DNU",                 color:"#E26E5D", soft:"#FCEFED", opsAllowed:false },
  blacklisted:         { label:"Blacklisted",         color:"#1F2A37", soft:"#E5E7EB", opsAllowed:false },
};

const CARRIERS = [
  { id:"car1", name:"Swift Road LLC",        mc:"MC-485219", fmcsaOk:true,  insurance:"OK", rating:4.8, otr:true,  creditOk:true,  source:"fmcsa" },
  { id:"car2", name:"GGT Freight Inc",       mc:"MC-712044", fmcsaOk:true,  insurance:"OK", rating:4.5, otr:true,  creditOk:true,  source:"fmcsa" },
  { id:"car3", name:"Cherrycargo LLC",       mc:"MC-883051", fmcsaOk:true,  insurance:"OK", rating:4.2, otr:true,  creditOk:false, source:"fmcsa" },
  { id:"car4", name:"MT Express",            mc:"MC-901832", fmcsaOk:true,  insurance:"Expires soon", rating:3.9, otr:false, creditOk:true,  source:"fmcsa" },
  { id:"car5", name:"Pacific Haul Co",       mc:"MC-556417", fmcsaOk:true,  insurance:"OK", rating:4.7, otr:true,  creditOk:true,  source:"fmcsa" },
  { id:"car6", name:"Sierra Affiliated LLC", mc:"MC-220098", fmcsaOk:true,  insurance:"OK", rating:4.6, otr:true,  creditOk:true,  source:"fmcsa" },
  { id:"car7", name:"BlueLine Carriers",     mc:"MC-994412", fmcsaOk:true,  insurance:"OK", rating:4.4, otr:true,  creditOk:true,  source:"fmcsa" },
  { id:"car8", name:"Northern Star Freight", mc:"MC-661177", fmcsaOk:false, insurance:"Missing", rating:3.6, otr:false, creditOk:false, source:"spreadsheet" },
];


/* ---------- Customer Open Board (incoming requests) ---------- */
const CUSTOMER_REQUESTS = [
  { id:"req1", customerId:"cu1",  pickupCity:"Laredo",    pickupState:"TX", deliveryCity:"Las Vegas",   deliveryState:"NV", pickupDate:"Jun 20, 08:00", equipment:"53' Reefer", weight:"42,000 lb", commodity:"Frozen food", customerExpectedRate:3000, customerNote:"Standard lane, need fast quote", postedAt:"Jun 18, 09:14", status:"awaiting_quote", assignedSalesRepId:"u_maria", quotedRate:null, quotedAt:null },
  { id:"req2", customerId:"cu3",  pickupCity:"Queretaro", pickupState:"MX", deliveryCity:"Laredo",      deliveryState:"TX", pickupDate:"Jun 21, 10:00", equipment:"53' Dry Van", weight:"38,500 lb", commodity:"Auto parts", customerExpectedRate:3900, customerNote:"Cross-border, customs broker ready", postedAt:"Jun 18, 07:50", status:"awaiting_quote", assignedSalesRepId:"u_diego", quotedRate:null, quotedAt:null },
  { id:"req3", customerId:"cu2",  pickupCity:"Laredo",    pickupState:"TX", deliveryCity:"Fairfield",   deliveryState:"NJ", pickupDate:"Jun 22, 09:00", equipment:"Reefer -10F", weight:"40,000 lb", commodity:"Frozen produce", customerExpectedRate:4700, customerNote:"Continuous tracking required", postedAt:"Jun 17, 16:20", status:"quoted", assignedSalesRepId:"u_maria", quotedRate:4650, quotedAt:"Jun 18, 08:00" },
  { id:"req4", customerId:"cu4",  pickupCity:"San Fran",  pickupState:"CA", deliveryCity:"Los Angeles", deliveryState:"CA", pickupDate:"Jun 19, 12:00", equipment:"53' Dry Van", weight:"28,000 lb", commodity:"Agriculture", customerExpectedRate:1750, customerNote:"Same-day delivery", postedAt:"Jun 18, 11:00", status:"awaiting_quote", assignedSalesRepId:"u_james", quotedRate:null, quotedAt:null },
  { id:"req5", customerId:"cu5",  pickupCity:"Veracruz",  pickupState:"MX", deliveryCity:"Laredo",      deliveryState:"TX", pickupDate:"Jun 23, 14:00", equipment:"53' Dry Van", weight:"40,000 lb", commodity:"Mixed cargo", customerExpectedRate:3500, customerNote:"Bilingual driver preferred", postedAt:"Jun 18, 10:30", status:"awaiting_quote", assignedSalesRepId:"u_hanna", quotedRate:null, quotedAt:null },
  { id:"req6", customerId:"cu7",  pickupCity:"Denver",    pickupState:"CO", deliveryCity:"Salt Lake",   deliveryState:"UT", pickupDate:"Jun 20, 09:00", equipment:"Reefer -2C",  weight:"38,000 lb", commodity:"Beverages", customerExpectedRate:1900, customerNote:"Temp controlled", postedAt:"Jun 18, 08:45", status:"quoted", assignedSalesRepId:"u_tyler", quotedRate:1880, quotedAt:"Jun 18, 09:30" }
];

const LOAD_STATUS = {
  posted:    { label:"Posted",    color:"#9CA3AF", soft:"#F1F3F5" },
  booked:    { label:"Booked",    color:"#5A96CC", soft:"#E5EFF8" },
  en_route:  { label:"En Route",  color:"#7C5CFF", soft:"#EFEAFF" },
  delivered: { label:"Delivered", color:"#3FA876", soft:"#E8F5EE" },
  invoiced:  { label:"Invoiced",  color:"#E0A130", soft:"#FBF3DF" },
  paid:      { label:"Paid",      color:"#2E8F62", soft:"#D7EEDE" },
};

const LOAD_LIFECYCLE = ["posted","booked","en_route","delivered","invoiced","paid"];

const LOADS = [
  { id:"L17501", customerId:"cu1",  salesRepId:"u_maria", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"Laredo", pickupState:"TX", deliveryCity:"Las Vegas", deliveryState:"NV",
    pickupDate:"Jun 14, 08:00", deliveryDate:"Jun 16, 10:00",
    equipment:"53' Reefer", weight:"42,000 lb", pieces:"22 plt", commodity:"Food", distance:1380,
    requirements:"Tarp not required, FIFO loading", customerRate:2950, recommendedRate:2400, autoBookThreshold:2350,
    actualBuyRate:2300, grossProfit:650, status:"paid",
    bids:[
      { id:"bid1", carrierId:"car1", rate:2350, note:"Truck in Laredo", at:"Jun 13, 14:00", status:"lost" },
      { id:"bid2", carrierId:"car3", rate:2300, note:"Best rate, flexible", at:"Jun 13, 14:45", status:"accepted" }
    ],
    acceptedBidId:"bid2", rateConSent:true, autoBooked:true, collectedAt:"Jun 17, 14:00", chats:{} },
  { id:"L17502", customerId:"cu2",  salesRepId:"u_maria", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"Laredo", pickupState:"TX", deliveryCity:"Fairfield", deliveryState:"NJ",
    pickupDate:"Jun 16, 09:00", deliveryDate:"Jun 18, 12:00",
    equipment:"Reefer -10F", weight:"40,000 lb", pieces:"20 plt", commodity:"Frozen food", distance:1920,
    requirements:"Continuous tracking", customerRate:4600, recommendedRate:3800, autoBookThreshold:3750,
    actualBuyRate:3750, grossProfit:850, status:"invoiced",
    bids:[ { id:"bid3", carrierId:"car5", rate:3750, note:"Reefer pre-cooled", at:"Jun 14", status:"accepted" } ],
    acceptedBidId:"bid3", rateConSent:true, autoBooked:true, collectedAt:null, chats:{} },
  { id:"L17503", customerId:"cu4",  salesRepId:"u_diego", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"San Francisco", pickupState:"CA", deliveryCity:"Los Angeles", deliveryState:"CA",
    pickupDate:"Jun 17, 12:00", deliveryDate:"Jun 17, 22:00",
    equipment:"53' Dry Van", weight:"28,000 lb", pieces:"14 plt", commodity:"Agriculture", distance:380,
    requirements:"Same-day", customerRate:1700, recommendedRate:1400, autoBookThreshold:1350,
    actualBuyRate:1350, grossProfit:350, status:"delivered",
    bids:[ { id:"bid4", carrierId:"car4", rate:1350, note:"Available now", at:"Jun 16", status:"accepted" } ],
    acceptedBidId:"bid4", rateConSent:true, autoBooked:true, collectedAt:null, chats:{} },
  { id:"L17504", customerId:"cu1",  salesRepId:"u_maria", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"Las Vegas", pickupState:"NV", deliveryCity:"Salt Lake City", deliveryState:"UT",
    pickupDate:"Jun 19, 06:00", deliveryDate:"Jun 19, 18:00",
    equipment:"53' Dry Van", weight:"30,000 lb", pieces:"16 plt", commodity:"Industrial parts", distance:420,
    requirements:"24h notice", customerRate:1250, recommendedRate:1000, autoBookThreshold:980,
    actualBuyRate:990, grossProfit:260, status:"booked",
    bids:[ { id:"bid5", carrierId:"car5", rate:990, note:"Empty truck nearby", at:"Jun 18", status:"accepted" } ],
    acceptedBidId:"bid5", rateConSent:false, autoBooked:false, collectedAt:null, chats:{} },
  { id:"L17505", customerId:"cu6",  salesRepId:"u_diego", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"McAllen", pickupState:"TX", deliveryCity:"Atlanta", deliveryState:"GA",
    pickupDate:"Jun 19, 22:00", deliveryDate:"Jun 21, 06:00",
    equipment:"53' Reefer", weight:"40,000 lb", pieces:"22 plt", commodity:"Fresh produce", distance:1090,
    requirements:"Temp 35F", customerRate:2700, recommendedRate:2200, autoBookThreshold:2150,
    actualBuyRate:null, grossProfit:null, status:"posted",
    bids:[
      { id:"bid6", carrierId:"car1", rate:2150, note:"", at:"Jun 18, 10:00", status:"pending" },
      { id:"bid7", carrierId:"car5", rate:2230, note:"Reefer ready", at:"Jun 18, 11:30", status:"pending" }
    ],
    acceptedBidId:null, rateConSent:false, autoBooked:false, collectedAt:null, chats:{} },
  { id:"L17506", customerId:"cu13", salesRepId:"u_james", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"Laredo", pickupState:"TX", deliveryCity:"Newark", deliveryState:"NJ",
    pickupDate:"Jun 18, 06:00", deliveryDate:"Jun 21, 12:00",
    equipment:"53' Dry Van", weight:"36,000 lb", pieces:"24 plt", commodity:"Auto parts", distance:1880,
    requirements:"Sealed trailer", customerRate:3200, recommendedRate:2700, autoBookThreshold:2650,
    actualBuyRate:2680, grossProfit:520, status:"en_route",
    bids:[ { id:"bid8", carrierId:"car2", rate:2680, note:"Sealed trailer ready", at:"Jun 17", status:"accepted" } ],
    acceptedBidId:"bid8", rateConSent:true, autoBooked:false, collectedAt:null, chats:{} },
  { id:"L17507", customerId:"cu12", salesRepId:"u_james", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"Oakland", pickupState:"CA", deliveryCity:"Salt Lake City", deliveryState:"UT",
    pickupDate:"Jun 19, 11:00", deliveryDate:"Jun 20, 18:00",
    equipment:"53' Dry Van", weight:"32,000 lb", pieces:"16 plt", commodity:"Consumer goods", distance:730,
    requirements:"Lift gate", customerRate:2100, recommendedRate:1700, autoBookThreshold:1670,
    actualBuyRate:1650, grossProfit:450, status:"booked",
    bids:[ { id:"bid9", carrierId:"car5", rate:1650, note:"Lift gate equipped", at:"Jun 18", status:"accepted" } ],
    acceptedBidId:"bid9", rateConSent:true, autoBooked:true, collectedAt:null, chats:{} },
  { id:"L17508", customerId:"cu15", salesRepId:"u_james", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"Des Moines", pickupState:"IA", deliveryCity:"Chicago", deliveryState:"IL",
    pickupDate:"Jun 12, 07:00", deliveryDate:"Jun 12, 18:00",
    equipment:"53' Dry Van", weight:"42,000 lb", pieces:"22 plt", commodity:"Grain products", distance:340,
    requirements:"Sealed", customerRate:980, recommendedRate:780, autoBookThreshold:760,
    actualBuyRate:760, grossProfit:220, status:"paid",
    bids:[ { id:"bid10", carrierId:"car5", rate:760, note:"", at:"Jun 11", status:"accepted" } ],
    acceptedBidId:"bid10", rateConSent:true, autoBooked:true, collectedAt:"Jun 16, 10:00", chats:{} },
  { id:"L17509", customerId:"cu8",  salesRepId:"u_james", carrierRepId:"u_linda", opsId:"u_eli",
    pickupCity:"Miami", pickupState:"FL", deliveryCity:"Atlanta", deliveryState:"GA",
    pickupDate:"Jun 19, 16:00", deliveryDate:"Jun 20, 10:00",
    equipment:"53' Dry Van", weight:"30,000 lb", pieces:"18 plt", commodity:"Packaged food", distance:660,
    requirements:"FDA ready", customerRate:1450, recommendedRate:1150, autoBookThreshold:1130,
    actualBuyRate:null, grossProfit:null, status:"posted",
    bids:[
      { id:"bid11", carrierId:"car3", rate:1200, note:"", at:"Jun 18, 10:00", status:"pending" },
      { id:"bid12", carrierId:"car4", rate:1100, note:"", at:"Jun 18, 11:30", status:"pending" }
    ],
    acceptedBidId:null, rateConSent:false, autoBooked:false, collectedAt:null, chats:{} }
];

LOADS.push(
  { id:"L17510", customerId:"cu5",  salesRepId:"u_hanna", carrierRepId:"u_alex", opsId:"u_olivia",
    pickupCity:"Queretaro", pickupState:"MX", deliveryCity:"Laredo", deliveryState:"TX",
    pickupDate:"Jun 17, 10:00", deliveryDate:"Jun 19, 14:00",
    equipment:"53' Dry Van", weight:"38,500 lb", pieces:"18 plt", commodity:"Auto parts", distance:610,
    requirements:"Cross-border", customerRate:3850, recommendedRate:3100, autoBookThreshold:3050,
    actualBuyRate:3000, grossProfit:850, status:"delivered",
    bids:[ { id:"bid13", carrierId:"car6", rate:3000, note:"Cross-border specialist", at:"Jun 16", status:"accepted" } ],
    acceptedBidId:"bid13", rateConSent:true, autoBooked:true, collectedAt:null, chats:{} },
  { id:"L17511", customerId:"cu5",  salesRepId:"u_jesse", carrierRepId:"u_alex", opsId:"u_olivia",
    pickupCity:"Veracruz", pickupState:"MX", deliveryCity:"Laredo", deliveryState:"TX",
    pickupDate:"Jun 16, 12:00", deliveryDate:"Jun 18, 16:00",
    equipment:"53' Dry Van", weight:"40,000 lb", pieces:"20 plt", commodity:"Mixed cargo", distance:680,
    requirements:"Bilingual driver", customerRate:3400, recommendedRate:2750, autoBookThreshold:2700,
    actualBuyRate:2700, grossProfit:700, status:"paid",
    bids:[ { id:"bid14", carrierId:"car6", rate:2700, note:"", at:"Jun 15", status:"accepted" } ],
    acceptedBidId:"bid14", rateConSent:true, autoBooked:true, collectedAt:"Jun 17, 09:00", chats:{},
    isLeadershipTagged:true, originatingBrokerId:"u_jesse" },
  { id:"L17512", customerId:"cu3",  salesRepId:"u_hanna", carrierRepId:"u_alex", opsId:"u_olivia",
    pickupCity:"Houston", pickupState:"TX", deliveryCity:"Phoenix", deliveryState:"AZ",
    pickupDate:"Jun 19, 14:00", deliveryDate:"Jun 21, 09:00",
    equipment:"Flatbed", weight:"45,000 lb", pieces:"6 coils", commodity:"Steel coils", distance:1180,
    requirements:"Tarp + coil racks", customerRate:2400, recommendedRate:1950, autoBookThreshold:1900,
    actualBuyRate:1900, grossProfit:500, status:"booked",
    bids:[ { id:"bid15", carrierId:"car2", rate:1900, note:"Have tarps and racks", at:"Jun 18", status:"accepted" } ],
    acceptedBidId:"bid15", rateConSent:true, autoBooked:true, collectedAt:null, chats:{} },
  { id:"L17513", customerId:"cu7",  salesRepId:"u_tyler", carrierRepId:"u_sara", opsId:"u_olivia",
    pickupCity:"Denver", pickupState:"CO", deliveryCity:"Salt Lake City", deliveryState:"UT",
    pickupDate:"Jun 19, 09:00", deliveryDate:"Jun 20, 16:00",
    equipment:"Reefer -2C", weight:"38,000 lb", pieces:"20 plt", commodity:"Beverages", distance:520,
    requirements:"Temp controlled", customerRate:1850, recommendedRate:1500, autoBookThreshold:1470,
    actualBuyRate:null, grossProfit:null, status:"posted",
    bids:[], acceptedBidId:null, rateConSent:false, autoBooked:false, collectedAt:null, chats:{} },
  { id:"L17514", customerId:"cu7",  salesRepId:"u_tyler", carrierRepId:"u_sara", opsId:"u_olivia",
    pickupCity:"Seattle", pickupState:"WA", deliveryCity:"Boise", deliveryState:"ID",
    pickupDate:"Jun 15, 06:00", deliveryDate:"Jun 16, 14:00",
    equipment:"Flatbed", weight:"46,000 lb", pieces:"3 bundles", commodity:"Lumber", distance:510,
    requirements:"Tarp + straps", customerRate:1500, recommendedRate:1200, autoBookThreshold:1180,
    actualBuyRate:1180, grossProfit:280, status:"paid",
    bids:[ { id:"bid16", carrierId:"car2", rate:1180, note:"", at:"Jun 14", status:"accepted" } ],
    acceptedBidId:"bid16", rateConSent:true, autoBooked:true, collectedAt:"Jun 17, 14:00", chats:{} },
  { id:"L17515", customerId:"cu12", salesRepId:"u_tyler", carrierRepId:"u_sara", opsId:"u_olivia",
    pickupCity:"Pittsburgh", pickupState:"PA", deliveryCity:"Cleveland", deliveryState:"OH",
    pickupDate:"Jun 14, 10:00", deliveryDate:"Jun 14, 18:00",
    equipment:"Flatbed", weight:"44,000 lb", pieces:"8 coils", commodity:"Steel", distance:140,
    requirements:"Coil racks", customerRate:850, recommendedRate:680, autoBookThreshold:660,
    actualBuyRate:650, grossProfit:170, status:"invoiced",
    bids:[ { id:"bid17", carrierId:"car2", rate:650, note:"Coil racks ready", at:"Jun 13", status:"accepted" } ],
    acceptedBidId:"bid17", rateConSent:true, autoBooked:true, collectedAt:null, chats:{} },
  { id:"L17516", customerId:"cu1",  salesRepId:"u_jesse", carrierRepId:"u_sara", opsId:"u_olivia",
    pickupCity:"Tacoma", pickupState:"WA", deliveryCity:"Portland", deliveryState:"OR",
    pickupDate:"Jun 18, 14:00", deliveryDate:"Jun 18, 22:00",
    equipment:"53' Dry Van", weight:"30,000 lb", pieces:"16 plt", commodity:"Retail goods", distance:170,
    requirements:"Standard", customerRate:1200, recommendedRate:950, autoBookThreshold:920,
    actualBuyRate:900, grossProfit:280, status:"paid",
    bids:[ { id:"bid18", carrierId:"car7", rate:900, note:"", at:"Jun 17", status:"accepted" } ],
    acceptedBidId:"bid18", rateConSent:true, autoBooked:true, collectedAt:"Jun 18, 09:00", chats:{},
    isLeadershipTagged:true, originatingBrokerId:"u_jesse" }
);

/* ---------- Leadership Overrides ---------- */
const OVERRIDES = [
  { id:"ov1", branchId:"br_il", employeeId:"u_aaron", percentage:0.0200, base:"Gross", startDate:"2026-01-01", endDate:"2027-05-05" },
  { id:"ov2", branchId:"br_il", employeeId:"u_aaron", percentage:0.0200, base:"Net",   startDate:"2027-05-06", endDate:null },
  { id:"ov3", branchId:"br_wa", employeeId:"u_jesse", percentage:0.0200, base:"Net",   startDate:"2026-01-01", endDate:null },
];

const TRANSITIONED_ACCOUNTS = [
  { id:"ta1", branchId:"br_il", leadEmployeeId:"u_aaron", accountName:"IL Schedule A Book", branchCode:"IL",
    transitionStart:"2026-05-05", phase1End:"2027-05-05", phase2End:"2027-05-05", isActiveHouseAccount:false },
  { id:"ta2", branchId:"br_wa", leadEmployeeId:"u_jesse", accountName:"WA Schedule A Book", branchCode:"WA",
    transitionStart:"2026-06-15", phase1End:"2027-06-15", phase2End:"2029-06-15", isActiveHouseAccount:false },
];

const GLOBAL_VARS = {
  corporate_management_fee: 0.0500,
};

const BRANCH_LEDGER = {
  br_il: { monthlyRent: 8500, monthlyTechSeats: 2400, monthlyPayroll: 39000 },
  br_wa: { monthlyRent: 9200, monthlyTechSeats: 2400, monthlyPayroll: 40500 },
};

const TEAM_PLAN = {
  amount: 200000,
  month: "June 2026",
};

/* ============================================================
   APP STATE
   ============================================================ */
const state = {
  view: "workspace",
  me: "u_maria",
  today: new Date(2026, 5, 18),
  teamPlan: TEAM_PLAN,
  lbStatusFilter: "all",
  lbSortKey: "pickupDate",
  lbSortDir: "asc",
  cbStatusFilter: "open",
  custFilter: "all",
  reqFilter: "all",
  compFocus: null,
  cuViewAs: "customer",
};

/* ============================================================
   HELPERS
   ============================================================ */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const userById     = id => USERS.find(u => u.id === id);
const customerById = id => CUSTOMERS.find(c => c.id === id);
const carrierById  = id => CARRIERS.find(c => c.id === id);
const podById      = id => PODS.find(p => p.id === id);
const branchById   = id => BRANCHES.find(b => b.id === id);
const requestById  = id => CUSTOMER_REQUESTS.find(r => r.id === id);
const loadById     = id => LOADS.find(l => l.id === id);

const userName = u => u ? (u.first + " " + u.last) : "—";
const userInitials = u => u ? (u.first[0] + u.last[0]) : "??";
const userBranch = u => u && u.branchId ? branchById(u.branchId) : null;

const fmt   = n => "$" + Math.round(n).toLocaleString("en-US");

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function rbacFilter(items, itemBranchFn, itemEmployeeFn){
  const me = userById(state.me);
  if(!me) return items;
  if(me.rbac === "gm") return items;
  if(me.rbac === "manager"){
    return items.filter(it => itemBranchFn(it) === me.branchId);
  }
  return items.filter(it => itemEmployeeFn(it).includes(me.id));
}

function loadEmployeeIds(l){
  return [l.salesRepId, l.carrierRepId, l.opsId].filter(Boolean);
}
function loadBranchId(l){
  const u = userById(l.salesRepId);
  return u ? u.branchId : null;
}

function visibleLoads(){
  return rbacFilter(LOADS, loadBranchId, loadEmployeeIds);
}
function visibleRequests(){
  const me = userById(state.me);
  if(me.rbac === "gm") return CUSTOMER_REQUESTS;
  if(me.rbac === "manager"){
    return CUSTOMER_REQUESTS.filter(r => {
      const rep = userById(r.assignedSalesRepId);
      return rep && rep.branchId === me.branchId;
    });
  }
  return CUSTOMER_REQUESTS.filter(r => r.assignedSalesRepId === me.id);
}

/* ============================================================
   COMMISSION ENGINE (Sierra spec v1.2)
   ============================================================ */

function calcSalesCommission(totalMonthlyGP, monthlyBaseDraw){
  let supportFee = 0;
  let commissionableGP = totalMonthlyGP;
  if(totalMonthlyGP > 35000){
    supportFee = totalMonthlyGP * 0.03;
    commissionableGP = totalMonthlyGP - supportFee;
  }
  let gross = 0;
  let r = commissionableGP;
  const t1 = Math.min(r, 15000);  gross += t1 * 0.10; r -= t1;
  if(r > 0){ const t2 = Math.min(r, 25000); gross += t2 * 0.25; r -= t2; }
  if(r > 0){ const t3 = Math.min(r, 35000); gross += t3 * 0.35; r -= t3; }
  if(r > 0){ gross += r * 0.40; }
  let net = gross - monthlyBaseDraw;
  if(net < 0) net = 0;
  return {
    totalMonthlyGP, supportFee, commissionableGP,
    grossCommission: gross, monthlyBaseDraw, netPayout: net,
    tierBreakdown: tierBreakdown(commissionableGP)
  };
}
function tierBreakdown(gp){
  const tiers = [];
  let r = gp;
  const t1 = Math.min(r, 15000); tiers.push({ name:"Tier 1", range:"$0-$15k", rate:0.10, gp:t1, payout:t1*0.10 }); r -= t1;
  const t2 = Math.min(Math.max(r,0), 25000); tiers.push({ name:"Tier 2", range:"$15k-$40k", rate:0.25, gp:t2, payout:t2*0.25 }); r -= t2;
  const t3 = Math.min(Math.max(r,0), 35000); tiers.push({ name:"Tier 3", range:"$40k-$75k", rate:0.35, gp:t3, payout:t3*0.35 }); r -= t3;
  const t4 = Math.max(r, 0);                   tiers.push({ name:"Tier 4", range:"$75k+",     rate:0.40, gp:t4, payout:t4*0.40 });
  return tiers;
}

function calcCarrierCommission(loadsCollected, totalBuyDownSavings){
  const velocityBonus = loadsCollected * 9;
  const buyDownIncentive = totalBuyDownSavings * 0.10;
  return { velocityBonus, buyDownIncentive, total: velocityBonus + buyDownIncentive };
}

function calcOpsCommission(podNetCashRetained){
  return podNetCashRetained * 0.01;
}

function calcBranchNetProfit(branchId){
  const branchGP = branchCollectedGP(branchId);
  const led = BRANCH_LEDGER[branchId];
  const corpFee = branchGP * GLOBAL_VARS.corporate_management_fee;
  const net = branchGP - (led.monthlyRent + led.monthlyTechSeats + led.monthlyPayroll + corpFee);
  return Math.max(0, net);
}
function branchCollectedGP(branchId){
  return LOADS
    .filter(l => loadBranchId(l) === branchId && l.status === "paid" && l.grossProfit)
    .reduce((s,l) => s + l.grossProfit, 0);
}
function podNetCashRetained(podId){
  const podLoads = LOADS.filter(l => {
    const sr = userById(l.salesRepId);
    return sr && sr.podId === podId && l.status === "paid";
  });
  const podGP = podLoads.reduce((s,l) => s + (l.grossProfit||0), 0);
  const pod = podById(podId);
  if(!pod) return podGP;
  const branchGP = branchCollectedGP(pod.branchId);
  if(branchGP <= 0) return 0;
  const share = podGP / branchGP;
  const led = BRANCH_LEDGER[pod.branchId];
  const corpFee = branchGP * GLOBAL_VARS.corporate_management_fee;
  const branchOverhead = led.monthlyRent + led.monthlyTechSeats + led.monthlyPayroll + corpFee;
  return Math.max(0, podGP - branchOverhead * share);
}

function activeOverride(employeeId, date){
  const d = date.toISOString().slice(0,10);
  return OVERRIDES.find(o =>
    o.employeeId === employeeId &&
    o.startDate <= d &&
    (!o.endDate || d <= o.endDate)
  );
}
function calcLeadershipOverride(employeeId){
  const rule = activeOverride(employeeId, state.today);
  if(!rule) return { amount:0, rule:null };
  if(rule.base === "Gross"){
    const branchGP = branchCollectedGP(rule.branchId);
    return { amount: branchGP * rule.percentage, rule, basis: branchGP };
  }
  const branchNet = calcBranchNetProfit(rule.branchId);
  return { amount: branchNet * rule.percentage, rule, basis: branchNet };
}

function calcTransitionedBookCommission(accountId){
  const acc = TRANSITIONED_ACCOUNTS.find(a => a.id === accountId);
  if(!acc) return { amount:0, phase:"n/a" };
  const today = state.today.toISOString().slice(0,10);
  const branchNet = calcBranchNetProfit(acc.branchId);
  if(acc.branchCode === "WA"){
    if(acc.transitionStart <= today && today <= acc.phase1End) return { amount: branchNet*0.20, phase:"Phase 1 (20% Net)" };
    if(acc.phase1End < today && today <= acc.phase2End)        return { amount: branchNet*0.02, phase:"Phase 2 (2% Net Legacy)" };
    return { amount:0, phase:"Phase 3 (Expired)" };
  }
  if(acc.transitionStart <= today && today <= acc.phase1End)   return { amount: branchNet*0.20, phase:"Phase 1 (20% Net)" };
  return { amount:0, phase:"Hard Sunset" };
}

function employeeMonthlyCommission(empId){
  const u = userById(empId);
  if(!u) return null;
  const monthlyBaseDraw = u.annualBase / 12;

  if(u.role === "Sales_Rep"){
    const myLoads = LOADS.filter(l => l.salesRepId === empId && l.status === "paid" && !l.isLeadershipTagged);
    const totalGP = myLoads.reduce((s,l) => s + (l.grossProfit||0), 0);
    return { kind:"sales", monthlyBaseDraw, ...calcSalesCommission(totalGP, monthlyBaseDraw), paidLoads: myLoads };
  }
  if(u.role === "Carrier_Rep"){
    const myLoads = LOADS.filter(l => l.carrierRepId === empId && l.status === "paid");
    const loadsCollected = myLoads.length;
    const buyDown = myLoads.reduce((s,l) => s + Math.max(0, (l.recommendedRate||0) - (l.actualBuyRate||0)), 0);
    const comm = calcCarrierCommission(loadsCollected, buyDown);
    return { kind:"carrier", monthlyBaseDraw, loadsCollected, buyDown, ...comm, paidLoads: myLoads };
  }
  if(u.role === "Ops_Specialist"){
    const podRetained = u.podId ? podNetCashRetained(u.podId) : 0;
    const commission = calcOpsCommission(podRetained);
    return { kind:"ops", monthlyBaseDraw, podRetained, commission };
  }
  if(u.role === "Director" || u.role === "Branch_Lead"){
    const over = calcLeadershipOverride(empId);
    const taggedLoads = LOADS.filter(l => l.isLeadershipTagged && l.originatingBrokerId === empId && l.status === "paid");
    const taggedGP = taggedLoads.reduce((s,l) => s + (l.grossProfit||0), 0);
    const taggedPayout = taggedGP * u.customTagged;
    const sched = TRANSITIONED_ACCOUNTS.find(a => a.leadEmployeeId === empId);
    const schedRes = sched ? calcTransitionedBookCommission(sched.id) : { amount:0, phase:"n/a" };
    return { kind:"leadership", monthlyBaseDraw, override:over, taggedLoads, taggedGP, taggedPayout, schedRes };
  }
  if(u.role === "GM"){
    return { kind:"gm", monthlyBaseDraw };
  }
  return null;
}

/* ============================================================
   NAV + HEADER + SIDEBAR
   ============================================================ */
const NAV = [
  { key:"workspace",     label:"Workspace",          icon:ICONS.workspace, sub:"Your day, depending on your role" },
  { key:"customer_board",label:"Customer Open Board",icon:ICONS.inbox,     sub:"Incoming load requests, Customer Rep quotes, confirmed loads go to Load Board" },
  { key:"load_board",    label:"Load Board",         icon:ICONS.board,     sub:"Full load lifecycle: Posted, Booked, En Route, Delivered, Invoiced, Paid" },
  { key:"carrier_board", label:"Carrier Open Board", icon:ICONS.truck,     sub:"Posted loads with Recommended Rate, carrier bids, auto-book threshold" },
  { key:"customers",     label:"Customers",          icon:ICONS.briefcase, sub:"All clients with OTR status; only verified clients can be used in operations" },
  { key:"carriers",      label:"Carriers",           icon:ICONS.users,     sub:"All carriers with FMCSA verification" },
  { key:"sales",         label:"Sales",              icon:ICONS.analytics, sub:"Aggregated financials with role-based access (Rep / Manager / GM)" },
  { key:"compensation",  label:"Compensation",       icon:ICONS.dollar,    sub:"Commission Engine: tiers, overrides, transitioned books, branch P&L" },
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

function renderHeader(){
  const n = NAV.find(x => x.key === state.view);
  $("#view-title").textContent = n.label;
  $("#view-sub").textContent = n.sub;
  const sel = $("#me-select");
  if(!sel.dataset.built){
    sel.innerHTML = USERS.map(u => {
      const rbac = u.rbac === "gm" ? "GM" : u.rbac === "manager" ? "Manager" : "Rep";
      const branch = u.branchId ? " | " + branchById(u.branchId).state : "";
      return `<option value="${u.id}">${userName(u)} - ${u.role}${branch} (${rbac})</option>`;
    }).join("");
    sel.dataset.built = "1";
    sel.addEventListener("change", e => { state.me = e.target.value; renderAll(); });
  }
  sel.value = state.me;
  $("#me-avatar").textContent = userInitials(userById(state.me));
}

/* ============================================================
   SHARED RENDER PIECES
   ============================================================ */
function kpiCard(label, value, sub, tone, iconSvg){
  return `<div class="card kpi">
    <div class="kpi-row">
      <span class="kpi-label">${label}</span>
      <span class="kpi-icon ${tone||'accent'}">${iconSvg||""}</span>
    </div>
    <div class="kpi-value">${value}</div>
    <div class="kpi-sub ${tone==='good'?'good':tone==='warn'?'warn':''}">${sub||""}</div>
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
function pillRender(text, color, soft){
  return `<span class="pill" style="background:${soft};color:${color};border:1px solid ${color}33">${text}</span>`;
}
function statusPill(statusKey, map){
  const s = map[statusKey];
  if(!s) return pillRender(statusKey, "#6B7280", "#F1F3F5");
  return pillRender(s.label, s.color, s.soft);
}
function loadStatusPill(s){ return statusPill(s, LOAD_STATUS); }
function customerStatusPill(s){ return statusPill(s, CUSTOMER_STATUS); }

function rbacBadge(){
  const me = userById(state.me);
  const lvl = me.rbac === "gm" ? "Sees everything" :
              me.rbac === "manager" ? "Sees branch: " + branchById(me.branchId).name :
              "Sees own data only";
  const color = me.rbac === "gm" ? "var(--coral)" :
                me.rbac === "manager" ? "var(--blue-50)" :
                "var(--green)";
  return `<span class="rbac-badge" style="border-left:3px solid ${color}">${lvl}</span>`;
}

/* ============================================================
   VIEW: WORKSPACE (role-adaptive)
   ============================================================ */
function viewWorkspace(){
  const me = userById(state.me);
  const today = state.today;
  const myLoads = visibleLoads();
  const myRequests = visibleRequests();

  let roleBlock = "";
  if(me.role === "Sales_Rep"){
    const myQuotePending = CUSTOMER_REQUESTS.filter(r => r.assignedSalesRepId === me.id && r.status === "awaiting_quote");
    const myActive = LOADS.filter(l => l.salesRepId === me.id && l.status !== "paid");
    const myPaidThisMonth = LOADS.filter(l => l.salesRepId === me.id && l.status === "paid" && !l.isLeadershipTagged);
    const myGP = myPaidThisMonth.reduce((s,l) => s + (l.grossProfit||0), 0);
    const comm = calcSalesCommission(myGP, me.annualBase/12);
    roleBlock = `
      <div class="kpi-grid">
        ${kpiCard("Awaiting my quote", myQuotePending.length, "Customer Open Board", "warn", ICONS.inbox)}
        ${kpiCard("Active loads", myActive.length, "Booked through Invoiced", "accent", ICONS.truck)}
        ${kpiCard("Paid GP this month", fmt(myGP), "Collected = commissionable", "good", ICONS.dollar)}
        ${kpiCard("Est. net commission", fmt(comm.netPayout), "After base draw " + fmt(me.annualBase/12), "good", ICONS.bolt)}
      </div>
    `;
  } else if(me.role === "Carrier_Rep"){
    const postedLoads = LOADS.filter(l => l.carrierRepId === me.id && l.status === "posted");
    const pendingBids = postedLoads.reduce((s,l) => s + l.bids.filter(b => b.status === "pending").length, 0);
    const collected = LOADS.filter(l => l.carrierRepId === me.id && l.status === "paid").length;
    const buyDown = LOADS.filter(l => l.carrierRepId === me.id && l.status === "paid")
                          .reduce((s,l) => s + Math.max(0, (l.recommendedRate||0) - (l.actualBuyRate||0)), 0);
    const comm = calcCarrierCommission(collected, buyDown);
    roleBlock = `
      <div class="kpi-grid">
        ${kpiCard("Posted loads", postedLoads.length, "On Carrier Open Board", "accent", ICONS.truck)}
        ${kpiCard("Pending bids", pendingBids, "Need my review", "warn", ICONS.task)}
        ${kpiCard("Loads collected", collected, "Velocity bonus", "good", ICONS.check)}
        ${kpiCard("Est. commission", fmt(comm.total), "Velocity " + fmt(comm.velocityBonus) + " + buy-down " + fmt(comm.buyDownIncentive), "good", ICONS.dollar)}
      </div>
    `;
  } else if(me.role === "Ops_Specialist"){
    const inFlight = LOADS.filter(l => l.opsId === me.id && (l.status === "booked" || l.status === "en_route"));
    const delivered = LOADS.filter(l => l.opsId === me.id && l.status === "delivered").length;
    const podRetained = me.podId ? podNetCashRetained(me.podId) : 0;
    const comm = calcOpsCommission(podRetained);
    roleBlock = `
      <div class="kpi-grid">
        ${kpiCard("In-flight loads", inFlight.length, "Booked + En Route", "accent", ICONS.truck)}
        ${kpiCard("Delivered, awaiting invoice", delivered, "Today", "warn", ICONS.check)}
        ${kpiCard("Pod net retained", fmt(podRetained), "After branch overhead share", "good", ICONS.dollar)}
        ${kpiCard("My 1% share", fmt(comm), "Ops profit share", "good", ICONS.bolt)}
      </div>
    `;
  } else if(me.role === "Director" || me.role === "Branch_Lead"){
    const branchLoads = LOADS.filter(l => loadBranchId(l) === me.branchId);
    const branchGP = branchCollectedGP(me.branchId);
    const branchNet = calcBranchNetProfit(me.branchId);
    const over = calcLeadershipOverride(me.id);
    roleBlock = `
      <div class="kpi-grid">
        ${kpiCard("Branch loads", branchLoads.length, branchById(me.branchId).name, "accent", ICONS.truck)}
        ${kpiCard("Branch collected GP", fmt(branchGP), "Paid status only", "good", ICONS.dollar)}
        ${kpiCard("Branch Net Profit", fmt(branchNet), "After overhead + 5% corp fee", "good", ICONS.analytics)}
        ${kpiCard("My override", fmt(over.amount), over.rule ? ((over.rule.percentage*100).toFixed(1) + "% of " + over.rule.base) : "No active rule", "good", ICONS.bolt)}
      </div>
    `;
  } else if(me.role === "GM"){
    const total = LOADS.length;
    const totalGP = LOADS.filter(l => l.status === "paid").reduce((s,l) => s + (l.grossProfit||0), 0);
    const ilNet = calcBranchNetProfit("br_il");
    const waNet = calcBranchNetProfit("br_wa");
    roleBlock = `
      <div class="kpi-grid">
        ${kpiCard("Total loads (all branches)", total, "Enterprise scope", "accent", ICONS.truck)}
        ${kpiCard("Enterprise collected GP", fmt(totalGP), "All branches paid", "good", ICONS.dollar)}
        ${kpiCard("IL Net Profit", fmt(ilNet), "Illinois branch", "good", ICONS.analytics)}
        ${kpiCard("WA Net Profit", fmt(waNet), "Washington branch", "good", ICONS.analytics)}
      </div>
    `;
  }

  $("#content").innerHTML = `
    <div class="row" style="margin-bottom:14px;gap:10px">
      <div>
        <div class="section-h">Hello, ${escapeHtml(me.first)}</div>
        <div class="section-sub">${escapeHtml(today.toDateString())} | ${escapeHtml(me.role)}${me.branchId?(" | "+escapeHtml(branchById(me.branchId).name)+" branch"):""}</div>
      </div>
      ${rbacBadge()}
    </div>

    ${roleBlock}

    <div class="grid-2col" style="margin-top:18px">
      ${cardBox("Visible to you right now",
        "RBAC: " + userById(state.me).rbac.toUpperCase(),
        `<div class="small-list">
          <div class="small-row"><span>Loads (lifecycle Posted to Paid)</span><strong>${myLoads.length}</strong></div>
          <div class="small-row"><span>Customer requests (awaiting quote / quoted)</span><strong>${myRequests.length}</strong></div>
          <div class="small-row"><span>Customers usable in ops (verified)</span><strong>${CUSTOMERS.filter(c => CUSTOMER_STATUS[c.status].opsAllowed).length} of ${CUSTOMERS.length}</strong></div>
        </div>`
      )}
      ${cardBox("Quick links",
        "Common actions",
        `<div class="quick-grid">
          <button class="quick-btn" data-go="customer_board">${ICONS.inbox}<span>Quote a request</span></button>
          <button class="quick-btn" data-go="carrier_board">${ICONS.truck}<span>Open Carrier Board</span></button>
          <button class="quick-btn" data-go="load_board">${ICONS.board}<span>Open Load Board</span></button>
          <button class="quick-btn" data-go="customers">${ICONS.briefcase}<span>Customers (with OTR status)</span></button>
        </div>`
      )}
    </div>
  `;

  $$(".quick-btn").forEach(b => b.addEventListener("click", () => {
    state.view = b.dataset.go; renderAll();
  }));
}

/* ============================================================
   VIEW: CUSTOMER OPEN BOARD
   ============================================================ */
function viewCustomerBoard(){
  const reqs = visibleRequests();
  const counts = {
    awaiting: reqs.filter(r => r.status === "awaiting_quote").length,
    quoted:   reqs.filter(r => r.status === "quoted").length,
    blocked:  reqs.filter(r => r.status === "blocked_otr").length,
  };

  $("#content").innerHTML = `
    <div class="row" style="margin-bottom:14px;gap:8px">
      ${rbacBadge()}
      <div class="filter-pills">
        ${["all","awaiting_quote","quoted","blocked_otr"].map(s => `
          <button class="filter-pill ${state.reqFilter===s?'active':''}" data-s="${s}">
            ${s === "all" ? "All" : s === "awaiting_quote" ? "Awaiting quote" : s === "quoted" ? "Quoted" : "Blocked (OTR)"}
          </button>
        `).join("")}
      </div>
    </div>

    <div class="kpi-grid" style="margin-bottom:18px">
      ${kpiCard("Awaiting quote", counts.awaiting, "Customer Reps need to act", "warn", ICONS.inbox)}
      ${kpiCard("Quoted", counts.quoted, "Awaiting customer confirmation", "accent", ICONS.task)}
      ${kpiCard("Blocked by OTR", counts.blocked, "Customer not verified, cannot quote", "alarm", ICONS.warn)}
    </div>

    <div class="card card-pad">
      <table class="data-table">
        <thead>
          <tr>
            <th>Posted</th>
            <th>Customer</th>
            <th>Lane</th>
            <th>Pickup</th>
            <th>Equipment</th>
            <th class="num">Customer expected</th>
            <th class="num">Our quote</th>
            <th>Assigned Sales Rep</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${reqs.filter(r => state.reqFilter === "all" || r.status === state.reqFilter).map(r => {
            const c = customerById(r.customerId);
            const rep = userById(r.assignedSalesRepId);
            const statusEl =
              r.status === "awaiting_quote" ? pillRender("Awaiting quote", "#E0A130", "#FBF3DF") :
              r.status === "quoted"         ? pillRender("Quoted", "#5A96CC", "#E5EFF8") :
              r.status === "blocked_otr"    ? pillRender("Blocked by OTR", "#E26E5D", "#FCEFED") :
                                              pillRender(r.status, "#6B7280", "#F1F3F5");
            const otrBlocked = c && !CUSTOMER_STATUS[c.status].opsAllowed;
            return `
              <tr ${otrBlocked?'class="row-warn"':''}>
                <td>${escapeHtml(r.postedAt)}</td>
                <td>
                  <strong>${escapeHtml(c.name)}</strong>
                  ${otrBlocked ? '<div class="tiny-warn">' + CUSTOMER_STATUS[c.status].label + '</div>' : ''}
                </td>
                <td><span class="lane-pair">${escapeHtml(r.pickupCity)}, ${escapeHtml(r.pickupState)} -> ${escapeHtml(r.deliveryCity)}, ${escapeHtml(r.deliveryState)}</span></td>
                <td>${escapeHtml(r.pickupDate)}</td>
                <td><span class="chip-eq">${escapeHtml(r.equipment)}</span></td>
                <td class="num">${fmt(r.customerExpectedRate)}</td>
                <td class="num">${r.quotedRate ? fmt(r.quotedRate) : "—"}</td>
                <td>${rep ? escapeHtml(userName(rep)) : "—"}</td>
                <td>${statusEl}</td>
                <td><button class="btn-link" data-req="${r.id}">Open</button></td>
              </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;

  $$(".filter-pill").forEach(b => b.addEventListener("click", () => {
    state.reqFilter = b.dataset.s; renderAll();
  }));
  $$("[data-req]").forEach(b => b.addEventListener("click", () => openRequestModal(b.dataset.req)));
}

function openRequestModal(reqId, viewAs){
  viewAs = viewAs || "sales";
  const r = requestById(reqId);
  const c = customerById(r.customerId);
  const rep = userById(r.assignedSalesRepId);
  const otrBlocked = !CUSTOMER_STATUS[c.status].opsAllowed;
  const me = userById(state.me);
  const canQuote = !otrBlocked && (me.role === "Sales_Rep" || me.role === "Director" || me.role === "Branch_Lead" || me.role === "GM");
  
  // Determine who is sending messages
  let messageSenderId = me.id;
  if(viewAs === "customer"){
    messageSenderId = state.cuActAsId || r.customerId;
  }
  
  // Initialize chat if needed
  if(!r.chats) r.chats = {};
  if(!r.chats.messages) r.chats.messages = [];

  const chatHtml = `
    <div class="card card-soft" style="margin-top:14px">
      <div class="section-h">Communication</div>
      <div class="chat-box" id="chat-box" style="border:1px solid var(--line);border-radius:6px;padding:12px;height:240px;overflow-y:auto;background:var(--surface);margin-bottom:10px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
        ${r.chats.messages && r.chats.messages.length ? r.chats.messages.map(msg => {
          const isSalesRep = msg.sender === r.assignedSalesRepId;
          let senderName = "Unknown";
          if(isSalesRep){
            const sender = userById(msg.sender);
            senderName = sender ? sender.first : "Sales Rep";
          } else {
            const cust = customerById(r.customerId);
            senderName = cust ? cust.name : "Customer";
          }
          return `<div style="display:flex;justify-content:${isSalesRep?'flex-start':'flex-end'};">
            <div style="max-width:60%;padding:8px 12px;background:${isSalesRep?'var(--blue-05)':'var(--green-soft)'};border-radius:8px;">
              <div style="font-weight:600;font-size:11px;color:var(--muted);margin-bottom:2px;">${escapeHtml(senderName)}</div>
              <div>${escapeHtml(msg.text)}</div>
              <div style="font-size:9px;color:var(--muted);margin-top:4px;text-align:right;">${msg.time}</div>
            </div>
          </div>`;
        }).join("") : `<div style="color:var(--muted);text-align:center;padding:80px 0;">No messages yet. Start a conversation!</div>`}
      </div>
      <div style="display:flex;gap:8px;">
        <input type="text" id="chat-msg-input" placeholder="Type a message..." style="flex:1;padding:8px;border:1px solid var(--line);border-radius:4px;" />
        <button class="btn btn-primary" id="chat-send" style="padding:8px 16px;">Send</button>
      </div>
    </div>
  `;

  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">Customer request ${escapeHtml(r.id)}</div>
        <div class="section-sub">${escapeHtml(c.name)} | ${escapeHtml(r.pickupCity)}, ${escapeHtml(r.pickupState)} -> ${escapeHtml(r.deliveryCity)}, ${escapeHtml(r.deliveryState)}</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>

    ${otrBlocked ? `
      <div class="otr-block">
        ${ICONS.warn}
        <div>
          <strong>Customer ${CUSTOMER_STATUS[c.status].label}.</strong>
          This request cannot be quoted or moved to operations until the customer is verified by OTR (and credit limit is set).
        </div>
      </div>
    ` : ""}

    <div class="grid-2col" style="margin-top:14px">
      <div class="kv">
        <div><span>Customer</span><strong>${escapeHtml(c.name)}</strong></div>
        <div><span>Customer status</span>${customerStatusPill(c.status)}</div>
        <div><span>Credit limit</span><strong>${c.creditLimit ? fmt(c.creditLimit) : "—"}</strong></div>
        <div><span>Open invoices</span><strong>${c.openInvoices ? fmt(c.openInvoices) : "—"}</strong></div>
        <div><span>Source</span><span class="chip-src">${escapeHtml(c.source)}</span></div>
      </div>
      <div class="kv">
        <div><span>Pickup</span><strong>${escapeHtml(r.pickupDate)}</strong></div>
        <div><span>Equipment</span><strong>${escapeHtml(r.equipment)}</strong></div>
        <div><span>Weight</span><strong>${escapeHtml(r.weight)}</strong></div>
        <div><span>Commodity</span><strong>${escapeHtml(r.commodity)}</strong></div>
        <div><span>Customer expected rate</span><strong>${fmt(r.customerExpectedRate)}</strong></div>
        <div><span>Assigned Sales Rep</span><strong>${rep ? escapeHtml(userName(rep)) : "—"}</strong></div>
      </div>
    </div>

    <div class="card card-soft" style="margin-top:14px">
      <div class="section-h">Customer note</div>
      <div class="section-sub">${escapeHtml(r.customerNote)}</div>
    </div>

    ${chatHtml}

    ${canQuote && viewAs === "sales" && r.status === "awaiting_quote" ? `
      <div class="card card-soft" style="margin-top:14px">
        <div class="section-h">Send quote</div>
        <div class="form-row">
          <label>Our quote ($)</label>
          <input type="number" id="quote-input" value="${r.quotedRate || Math.round(r.customerExpectedRate*0.98)}" />
        </div>
        <div class="form-row">
          <label>Internal target buy rate ($)</label>
          <input type="number" id="target-buy-input" value="${Math.round(r.customerExpectedRate*0.80)}" />
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" id="confirm-quote">Confirm and post to Load Board</button>
          <button class="btn btn-outline" id="send-quote">Send quote to customer</button>
        </div>
      </div>
    ` : r.status === "quoted" ? `
      <div class="card card-soft" style="margin-top:14px;background:var(--blue-05);border-left:3px solid var(--blue-50);">
        <div style="font-weight:600;color:var(--blue-50);margin-bottom:6px;">Quote sent</div>
        <div style="font-size:13px;margin-bottom:10px;">Awaiting customer confirmation. Current quote: <strong>${fmt(r.quotedRate)}</strong></div>
        ${canQuote && viewAs === "sales" ? `
          <button class="btn btn-outline" id="edit-quote" style="padding:6px 12px;font-size:12px;">Edit & resend</button>
        ` : ""}
      </div>
    ` : ""}
  `);

  // Chat event handlers
  const chatInput = $("#chat-msg-input");
  const chatSendBtn = $("#chat-send");
  const chatBox = $("#chat-box");
  
  if(chatSendBtn && chatInput){
    const sendMessage = () => {
      const text = chatInput.value.trim();
      if(text){
        if(!r.chats.messages) r.chats.messages = [];
        const now = new Date();
        const time = (now.getHours() < 10 ? "0" : "") + now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
        r.chats.messages.push({ sender: messageSenderId, text, time });
        chatInput.value = "";
        // Refresh chat display
        openRequestModal(reqId, viewAs);
      }
    };
    chatSendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", e => { if(e.key === "Enter"){ sendMessage(); } });
  }

  if(canQuote && viewAs === "sales" && r.status === "awaiting_quote"){
    const confirmBtn = $("#confirm-quote");
    
    if(confirmBtn){
      confirmBtn.addEventListener("click", () => {
        r.status = "confirmed";
        r.quotedRate = parseInt($("#quote-input").value, 10) || r.customerExpectedRate;
        r.quotedAt = "Jun 18, just now";
        const newLoadId = "L" + (17517 + LOADS.length);
        const sr = userById(r.assignedSalesRepId);
        LOADS.push({
          id: newLoadId, customerId: r.customerId,
          salesRepId: r.assignedSalesRepId,
          carrierRepId: sr.branchId === "br_il" ? "u_linda" : "u_alex",
          opsId: sr.branchId === "br_il" ? "u_eli" : "u_olivia",
          pickupCity: r.pickupCity, pickupState: r.pickupState,
          deliveryCity: r.deliveryCity, deliveryState: r.deliveryState,
          pickupDate: r.pickupDate, deliveryDate: "—",
          equipment: r.equipment, weight: r.weight, pieces: "—", commodity: r.commodity, distance: 0,
          requirements: r.customerNote,
          customerRate: r.quotedRate, recommendedRate: parseInt($("#target-buy-input").value, 10), autoBookThreshold: parseInt($("#target-buy-input").value, 10) - 50,
          actualBuyRate: null, grossProfit: null, status: "posted",
          bids: [], acceptedBidId: null, rateConSent: false, autoBooked: false, collectedAt: null, chats: {}
        });
        closeModal();
        showToast("Quote confirmed. Load " + newLoadId + " posted to Load Board.");
        renderAll();
      });
    }
  }
  
  if(canQuote && viewAs === "sales" && r.status === "quoted"){
    const editBtn = $("#edit-quote");
    if(editBtn){
      editBtn.addEventListener("click", () => {
        r.status = "awaiting_quote";
        openRequestModal(reqId, viewAs);
      });
    }
  }
  
  if(canQuote && viewAs === "sales" && r.status === "awaiting_quote"){
    const confirmBtn = $("#confirm-quote");
    const sendBtn = $("#send-quote");
    
    if(sendBtn){
      sendBtn.addEventListener("click", () => {
        r.status = "quoted";
        r.quotedRate = parseInt($("#quote-input").value, 10) || r.customerExpectedRate;
        r.quotedAt = "Jun 18, just now";
        closeModal();
        showToast("Quote sent to customer: " + fmt(r.quotedRate));
        renderAll();
      });
    }
  }
}

/* ============================================================
   VIEW: LOAD BOARD (full lifecycle)
   ============================================================ */
function viewLoadBoard(){
  const loads = visibleLoads();
  const filtered = loads.filter(l => state.lbStatusFilter === "all" || l.status === state.lbStatusFilter);

  const sorted = filtered.slice().sort((a,b) => {
    let av, bv;
    switch(state.lbSortKey){
      case "load":      av=a.id; bv=b.id; break;
      case "customer":  av=customerById(a.customerId).name; bv=customerById(b.customerId).name; break;
      case "lane":      av=a.pickupCity+a.deliveryCity; bv=b.pickupCity+b.deliveryCity; break;
      case "pickupDate":av=a.pickupDate; bv=b.pickupDate; break;
      case "customerRate":av=a.customerRate||0; bv=b.customerRate||0; break;
      case "buyRate":   av=a.actualBuyRate||0; bv=b.actualBuyRate||0; break;
      case "gp":        av=a.grossProfit||0; bv=b.grossProfit||0; break;
      case "status":    av=LOAD_LIFECYCLE.indexOf(a.status); bv=LOAD_LIFECYCLE.indexOf(b.status); break;
      default: av=a.pickupDate; bv=b.pickupDate;
    }
    if(av < bv) return state.lbSortDir==="asc" ? -1 : 1;
    if(av > bv) return state.lbSortDir==="asc" ? 1 : -1;
    return 0;
  });

  const byStatus = {};
  LOAD_LIFECYCLE.forEach(s => byStatus[s] = loads.filter(l => l.status === s).length);

  $("#content").innerHTML = `
    <div class="row" style="margin-bottom:14px;gap:8px">
      ${rbacBadge()}
      <div class="filter-pills">
        <button class="filter-pill ${state.lbStatusFilter==='all'?'active':''}" data-s="all">All <span class="pill-count">${loads.length}</span></button>
        ${LOAD_LIFECYCLE.map(s => `
          <button class="filter-pill ${state.lbStatusFilter===s?'active':''}" data-s="${s}">
            ${LOAD_STATUS[s].label} <span class="pill-count" style="background:${LOAD_STATUS[s].soft};color:${LOAD_STATUS[s].color}">${byStatus[s]}</span>
          </button>
        `).join("")}
      </div>
    </div>

    <div class="card card-pad">
      <table class="data-table sortable">
        <thead>
          <tr>
            ${sortableHeader("load","Load #")}
            ${sortableHeader("customer","Customer")}
            ${sortableHeader("lane","Lane")}
            ${sortableHeader("pickupDate","Pickup")}
            <th>Equipment</th>
            ${sortableHeader("customerRate","Customer Rate", "num")}
            ${sortableHeader("buyRate","Buy Rate", "num")}
            ${sortableHeader("gp","GP", "num")}
            ${sortableHeader("status","Status")}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map(l => {
            const c = customerById(l.customerId);
            return `<tr>
              <td><span class="mono">${escapeHtml(l.id)}</span></td>
              <td>${escapeHtml(c.name)}</td>
              <td><span class="lane-pair">${escapeHtml(l.pickupCity)}, ${escapeHtml(l.pickupState)} -> ${escapeHtml(l.deliveryCity)}, ${escapeHtml(l.deliveryState)}</span></td>
              <td>${escapeHtml(l.pickupDate)}</td>
              <td><span class="chip-eq">${escapeHtml(l.equipment)}</span></td>
              <td class="num">${l.customerRate ? fmt(l.customerRate) : "—"}</td>
              <td class="num">${l.actualBuyRate ? fmt(l.actualBuyRate) : "—"}</td>
              <td class="num good-strong">${l.grossProfit ? fmt(l.grossProfit) : "—"}</td>
              <td>${loadStatusPill(l.status)}</td>
              <td><button class="btn-link" data-load="${l.id}">Open</button></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;

  $$(".filter-pill").forEach(b => b.addEventListener("click", () => {
    state.lbStatusFilter = b.dataset.s; renderAll();
  }));
  $$(".sortable th[data-sort]").forEach(th => th.addEventListener("click", () => {
    const k = th.dataset.sort;
    if(state.lbSortKey === k) state.lbSortDir = state.lbSortDir === "asc" ? "desc" : "asc";
    else { state.lbSortKey = k; state.lbSortDir = "asc"; }
    renderAll();
  }));
  $$("[data-load]").forEach(b => b.addEventListener("click", () => openLoadModal(b.dataset.load)));
}

function sortableHeader(key, label, cls){
  const active = state.lbSortKey === key;
  const arrow = active ? (state.lbSortDir === "asc" ? "▲" : "▼") : "";
  return `<th class="${cls||""} sortable-h" data-sort="${key}">${label} <span class="sort-arrow">${arrow}</span></th>`;
}

function openLoadModal(loadId, viewAs){
  viewAs = viewAs || "broker";
  const l = loadById(loadId);
  const c = customerById(l.customerId);
  const sr = userById(l.salesRepId);
  const cr = userById(l.carrierRepId);
  const op = userById(l.opsId);
  const me = userById(state.me);
  const accepted = l.bids.find(b => b.id === l.acceptedBidId);
  const acceptedCarrier = accepted ? carrierById(accepted.carrierId) : null;
  
  // Initialize chat if needed
  if(!l.chats) l.chats = {};
  if(!l.chats.messages) l.chats.messages = [];
  
  // Determine who is sending messages
  let messageSenderId = me.id;
  if(viewAs === "carrier"){
    // In carrier view, messages come from "carrier" identifier
    messageSenderId = "carrier_" + state.cbAsCarrierId;
  } else if(viewAs === "broker"){
    messageSenderId = l.salesRepId;
  }
  
  const canSendQuote = sr && sr.id === me.id && l.status === "posted";

  const idx = LOAD_LIFECYCLE.indexOf(l.status);
  const tracker = LOAD_LIFECYCLE.map((s,i) => {
    const past = i < idx, curr = i === idx;
    return `<div class="lc-step ${past?'past':''} ${curr?'curr':''}">
      <div class="lc-dot"></div>
      <div class="lc-label">${LOAD_STATUS[s].label}</div>
    </div>`;
  }).join("");
  
  const chatHtml = `
    <div class="card card-soft" style="margin-top:14px">
      <div class="section-h">${viewAs === "carrier" ? "Communication with broker" : "Communication with customer"}</div>
      <div class="chat-box" id="chat-box" style="border:1px solid var(--line);border-radius:6px;padding:12px;height:240px;overflow-y:auto;background:var(--surface);margin-bottom:10px;font-size:12px;display:flex;flex-direction:column;gap:8px;">
        ${l.chats.messages && l.chats.messages.length ? l.chats.messages.map(msg => {
          let isBroker, senderName;
          if(viewAs === "carrier"){
            isBroker = msg.sender === l.salesRepId;
            if(isBroker){
              const sender = userById(msg.sender);
              senderName = sender ? sender.first : "Broker";
            } else {
              senderName = "You (Carrier)";
            }
          } else if(viewAs === "broker"){
            isBroker = msg.sender === l.salesRepId;
            if(isBroker){
              const sender = userById(msg.sender);
              senderName = sender ? sender.first : "You";
            } else if(msg.sender && msg.sender.startsWith("carrier_")){
              senderName = "Carrier";
            } else {
              const cust = customerById(l.customerId);
              senderName = cust ? cust.name : "Customer";
            }
          }
          return `<div style="display:flex;justify-content:${isBroker?'flex-start':'flex-end'};">
            <div style="max-width:60%;padding:8px 12px;background:${isBroker?'var(--blue-05)':'var(--green-soft)'};border-radius:8px;">
              <div style="font-weight:600;font-size:11px;color:var(--muted);margin-bottom:2px;">${escapeHtml(senderName)}</div>
              <div>${escapeHtml(msg.text)}</div>
              <div style="font-size:9px;color:var(--muted);margin-top:4px;text-align:right;">${msg.time}</div>
            </div>
          </div>`;
        }).join("") : `<div style="color:var(--muted);text-align:center;padding:80px 0;">No messages yet. Start a conversation!</div>`}
      </div>
      <div style="display:flex;gap:8px;">
        <input type="text" id="load-chat-msg-input" placeholder="Type a message..." style="flex:1;padding:8px;border:1px solid var(--line);border-radius:4px;" />
        <button class="btn btn-primary" id="load-chat-send" style="padding:8px 16px;">Send</button>
      </div>
    </div>
  `;

  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">Load ${escapeHtml(l.id)} ${l.isLeadershipTagged ? '<span class="tag-leadership">Self-sourced (Jesse)</span>' : ''}</div>
        <div class="section-sub">
          ${viewAs === "carrier" ? "Carrier load" : escapeHtml(c.name)}
          | ${escapeHtml(l.pickupCity)}, ${escapeHtml(l.pickupState)} -> ${escapeHtml(l.deliveryCity)}, ${escapeHtml(l.deliveryState)}
        </div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>

    <div class="lifecycle-tracker">${tracker}</div>

    <div class="grid-2col" style="margin-top:14px">
      <div class="kv">
        ${viewAs !== "carrier" ? `
          <div><span>Customer</span><strong>${escapeHtml(c.name)}</strong></div>
          <div><span>Sales Rep</span><strong>${sr?escapeHtml(userName(sr)):"—"}</strong></div>
        ` : ""}
        <div><span>Carrier Rep</span><strong>${cr?escapeHtml(userName(cr)):"—"}</strong></div>
        <div><span>Ops Specialist</span><strong>${op?escapeHtml(userName(op)):"—"}</strong></div>
      </div>
      <div class="kv">
        <div><span>Equipment</span><strong>${escapeHtml(l.equipment)}</strong></div>
        <div><span>Pickup</span><strong>${escapeHtml(l.pickupDate)}</strong></div>
        <div><span>Delivery</span><strong>${escapeHtml(l.deliveryDate)}</strong></div>
        <div><span>Distance</span><strong>${l.distance} mi</strong></div>
      </div>
    </div>

    ${viewAs !== "carrier" ? `
      <div class="card card-soft" style="margin-top:14px">
        <div class="section-h">Financials</div>
        <div class="fin-grid">
          <div><span>Customer rate</span><strong>${fmt(l.customerRate)}</strong></div>
          <div><span>Recommended buy rate</span><strong>${l.recommendedRate?fmt(l.recommendedRate):"—"}</strong></div>
          <div><span>Auto-book threshold</span><strong>${l.autoBookThreshold?fmt(l.autoBookThreshold):"—"}</strong></div>
          <div><span>Actual buy rate</span><strong>${l.actualBuyRate?fmt(l.actualBuyRate):"—"}</strong></div>
          <div><span>Gross Profit</span><strong class="good-strong">${l.grossProfit?fmt(l.grossProfit):"—"}</strong></div>
          <div><span>Buy-down savings</span><strong>${l.actualBuyRate && l.recommendedRate?fmt(Math.max(0,l.recommendedRate-l.actualBuyRate)):"—"}</strong></div>
        </div>
      </div>
    ` : ""}

    ${chatHtml}
    
    ${canSendQuote && viewAs !== "carrier" ? `
      <div class="card card-soft" style="margin-top:14px">
        <div class="section-h">Quick quote via chat</div>
        <div class="form-row">
          <label>Quote to send to customer ($)</label>
          <input type="number" id="load-quote-input" value="${l.customerRate || 0}" />
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" id="load-send-quote">Send quote to customer</button>
        </div>
      </div>
    ` : ""}

    ${accepted ? `
      <div class="card card-soft" style="margin-top:14px">
        <div class="section-h">Assigned carrier</div>
        <div class="kv">
          <div><span>Carrier</span><strong>${escapeHtml(acceptedCarrier.name)}</strong></div>
          <div><span>MC</span><strong>${escapeHtml(acceptedCarrier.mc)}</strong></div>
          <div><span>Accepted bid</span><strong>${fmt(accepted.rate)}</strong></div>
          <div><span>Auto-booked</span><strong>${l.autoBooked ? "Yes" : "No (manual)"}</strong></div>
          <div><span>Rate Con sent</span><strong>${l.rateConSent ? "Yes" : "Not yet"}</strong></div>
        </div>
      </div>
    ` : ""}

    ${viewAs !== "carrier" && l.bids.length ? `
      <div class="card card-soft" style="margin-top:14px">
        <div class="section-h">All bids (${l.bids.length})</div>
        <table class="data-table compact">
          <thead><tr><th>Carrier</th><th class="num">Rate</th><th>Submitted</th><th>Note</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${l.bids.map((b, idx) => {
              const car = carrierById(b.carrierId);
              const statusEl =
                b.status === "accepted" ? pillRender("Accepted", "#3FA876", "#E8F5EE") :
                b.status === "lost"     ? pillRender("Lost", "#9CA3AF", "#F1F3F5") :
                                          pillRender("Pending", "#E0A130", "#FBF3DF");
              return `<tr>
                <td>${escapeHtml(car.name)}</td>
                <td class="num">${fmt(b.rate)}</td>
                <td>${escapeHtml(b.at)}</td>
                <td>${escapeHtml(b.note||"—")}</td>
                <td>${statusEl}</td>
                <td>
                  ${b.status === "pending" ? `
                    <button class="btn-link bid-accept" data-bid-idx="${idx}" data-load="${l.id}">Accept</button>
                    <button class="btn-link bid-reject" data-bid-idx="${idx}" data-load="${l.id}" style="color:var(--muted);">Reject</button>
                  ` : "—"}
                </td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : ""}
  `, "wide");
  
  // Chat event handlers
  const chatInput = $("#load-chat-msg-input");
  const chatSendBtn = $("#load-chat-send");
  
  if(chatSendBtn && chatInput){
    const sendMessage = () => {
      const text = chatInput.value.trim();
      if(text){
        if(!l.chats.messages) l.chats.messages = [];
        const now = new Date();
        const time = (now.getHours() < 10 ? "0" : "") + now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
        l.chats.messages.push({ sender: messageSenderId, text, time });
        chatInput.value = "";
        openLoadModal(loadId, viewAs);
      }
    };
    chatSendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", e => { if(e.key === "Enter"){ sendMessage(); } });
  }
  
  if(canSendQuote){
    const sendQuoteBtn = $("#load-send-quote");
    if(sendQuoteBtn){
      sendQuoteBtn.addEventListener("click", () => {
        const quoteAmount = parseInt($("#load-quote-input").value, 10);
        if(quoteAmount && quoteAmount > 0){
          // Send quote as message
          if(!l.chats.messages) l.chats.messages = [];
          const now = new Date();
          const time = (now.getHours() < 10 ? "0" : "") + now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
          l.chats.messages.push({ sender: messageSenderId, text: `📌 Quote: $${quoteAmount}`, time });
          showToast("Quote sent to customer: " + fmt(quoteAmount));
          openLoadModal(loadId, viewAs);
        }
      });
    }
  }
  
  // Bid accept/reject handlers
  if(viewAs !== "carrier"){
    $$('[data-bid-idx]').forEach(btn => {
      if(btn.classList.contains('bid-accept')){
        btn.addEventListener("click", (e) => {
          const bidIdx = parseInt(btn.dataset.bidIdx);
          const bid = l.bids[bidIdx];
          if(bid){
            // Mark all other bids as lost
            l.bids.forEach(b => {
              if(b !== bid) b.status = "lost";
            });
            bid.status = "accepted";
            l.acceptedBidId = bid.id;
            l.status = "booked";
            
            // Fill in carrier and actual buy rate data
            const car = carrierById(bid.carrierId);
            l.actualBuyRate = bid.rate;
            l.grossProfit = l.customerRate - bid.rate;
            
            showToast("Bid accepted: " + escapeHtml(car.name) + " @ " + fmt(bid.rate));
            closeModal();
            renderAll();
          }
        });
      } else if(btn.classList.contains('bid-reject')){
        btn.addEventListener("click", (e) => {
          const bidIdx = parseInt(btn.dataset.bidIdx);
          const bid = l.bids[bidIdx];
          if(bid){
            bid.status = "lost";
            const car = carrierById(bid.carrierId);
            showToast("Bid rejected: " + escapeHtml(car.name));
            openLoadModal(loadId, viewAs);
          }
        });
      }
    });
  }
}

/* ============================================================
   VIEW: CARRIER OPEN BOARD
   ============================================================ */
function viewCarrierBoard(){
  const loads = visibleLoads();
  const filter = state.cbStatusFilter;
  let visible;
  if(filter === "open") visible = loads.filter(l => l.status === "posted");
  else if(filter === "booked") visible = loads.filter(l => l.status === "booked");
  else visible = loads;

  const postedCount = loads.filter(l => l.status === "posted").length;
  const wouldAutoBook = loads.filter(l => l.status === "posted").reduce((s,l) => {
    return s + (l.bids.some(b => b.status === "pending" && b.rate <= l.autoBookThreshold) ? 1 : 0);
  }, 0);

  $("#content").innerHTML = `
    <div class="row" style="margin-bottom:14px;gap:8px">
      ${rbacBadge()}
      <div class="filter-pills">
        <button class="filter-pill ${filter==='open'?'active':''}" data-s="open">Open (Posted) <span class="pill-count">${postedCount}</span></button>
        <button class="filter-pill ${filter==='booked'?'active':''}" data-s="booked">Booked</button>
        <button class="filter-pill ${filter==='all'?'active':''}" data-s="all">All</button>
      </div>
    </div>

    <div class="kpi-grid" style="margin-bottom:18px">
      ${kpiCard("Open for bidding", postedCount, "Posted on board", "accent", ICONS.truck)}
      ${kpiCard("Auto-book ready", wouldAutoBook, "Pending bids <= threshold", "good", ICONS.bolt)}
      ${kpiCard("Notifications today", 14, "Sent to participants", "accent", ICONS.send)}
    </div>

    <div class="card card-pad">
      <table class="data-table">
        <thead>
          <tr>
            <th>Load #</th>
            <th>Lane</th>
            <th>Pickup</th>
            <th>Equipment</th>
            <th class="num">Recommended Rate</th>
            <th class="num">Auto-book ≤</th>
            <th>Bids</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${visible.map(l => {
            const pendingBids = l.bids.filter(b => b.status === "pending");
            const lowBid = pendingBids.length ? Math.min(...pendingBids.map(b => b.rate)) : null;
            const wouldAuto = lowBid !== null && lowBid <= l.autoBookThreshold;
            return `<tr>
              <td><span class="mono">${escapeHtml(l.id)}</span></td>
              <td><span class="lane-pair">${escapeHtml(l.pickupCity)}, ${escapeHtml(l.pickupState)} -> ${escapeHtml(l.deliveryCity)}, ${escapeHtml(l.deliveryState)}</span></td>
              <td>${escapeHtml(l.pickupDate)}</td>
              <td><span class="chip-eq">${escapeHtml(l.equipment)}</span></td>
              <td class="num">${l.recommendedRate?fmt(l.recommendedRate):"—"}</td>
              <td class="num">${l.autoBookThreshold?fmt(l.autoBookThreshold):"—"}</td>
              <td>
                ${l.bids.length}
                ${wouldAuto ? '<span class="bolt-tag">auto-book ready</span>' : ''}
              </td>
              <td>${loadStatusPill(l.status)}</td>
              <td>
                <button class="btn-link" data-load="${l.id}">View</button>
                ${l.status === "posted" ? `<button class="btn-link" data-bid="${l.id}">+ Bid</button>` : ''}
              </td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;

  $$(".filter-pill").forEach(b => b.addEventListener("click", () => {
    state.cbStatusFilter = b.dataset.s; renderAll();
  }));
  $$("[data-load]").forEach(b => b.addEventListener("click", () => openLoadModal(b.dataset.load, "carrier")));
  $$("[data-bid]").forEach(b => b.addEventListener("click", () => openBidModal(b.dataset.bid)));
}

function openBidModal(loadId){
  const l = loadById(loadId);
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">Submit carrier bid - ${escapeHtml(l.id)}</div>
        <div class="section-sub">Recommended ${fmt(l.recommendedRate)} | Auto-book threshold ${fmt(l.autoBookThreshold)}</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="card card-soft" style="margin-top:14px">
      <div class="form-row">
        <label>Carrier</label>
        <select id="bid-carrier">
          ${CARRIERS.filter(c => c.fmcsaOk).map(c => `<option value="${c.id}">${escapeHtml(c.name)} (${c.mc})</option>`).join("")}
        </select>
      </div>
      <div class="form-row">
        <label>Bid rate ($)</label>
        <input type="number" id="bid-rate" value="${l.autoBookThreshold}"/>
      </div>
      <div class="form-row">
        <label>Note (optional)</label>
        <input type="text" id="bid-note" placeholder="Truck location, equipment notes..."/>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" id="submit-bid">Submit bid</button>
      </div>
      <div class="autobook-hint">
        If your bid is <= ${fmt(l.autoBookThreshold)}, the load will be assigned automatically and all participants (broker, carrier, customer rep, ops) will be notified.
      </div>
    </div>
  `);

  $("#submit-bid").addEventListener("click", () => {
    const rate = parseInt($("#bid-rate").value, 10);
    const carrierId = $("#bid-carrier").value;
    const note = $("#bid-note").value;
    const bidId = "bid" + Date.now();
    const wouldAuto = rate <= l.autoBookThreshold;
    l.bids.push({ id:bidId, carrierId, rate, note, at:"just now", status: wouldAuto ? "accepted" : "pending" });
    if(wouldAuto){
      l.acceptedBidId = bidId;
      l.actualBuyRate = rate;
      l.grossProfit = l.customerRate - rate;
      l.status = "booked";
      l.autoBooked = true;
      l.bids.filter(b => b.id !== bidId).forEach(b => b.status = "lost");
      closeModal();
      showToast("Auto-booked " + l.id + " at " + fmt(rate) + ". Notifications sent.");
    } else {
      closeModal();
      showToast("Bid submitted. Carrier Rep will review.");
    }
    renderAll();
  });
}

/* ============================================================
   VIEW: CUSTOMERS
   ============================================================ */
function viewCustomers(){
  const list = CUSTOMERS.filter(c => state.custFilter === "all" || c.status === state.custFilter);
  const counts = {};
  Object.keys(CUSTOMER_STATUS).forEach(s => counts[s] = CUSTOMERS.filter(c => c.status === s).length);

  $("#content").innerHTML = `
    <div class="row" style="margin-bottom:14px;gap:8px">
      <div class="filter-pills">
        <button class="filter-pill ${state.custFilter==='all'?'active':''}" data-s="all">All <span class="pill-count">${CUSTOMERS.length}</span></button>
        ${Object.keys(CUSTOMER_STATUS).map(s => `
          <button class="filter-pill ${state.custFilter===s?'active':''}" data-s="${s}">
            ${CUSTOMER_STATUS[s].label} <span class="pill-count" style="background:${CUSTOMER_STATUS[s].soft};color:${CUSTOMER_STATUS[s].color}">${counts[s]}</span>
          </button>
        `).join("")}
      </div>
    </div>

    <div class="card card-pad" style="margin-bottom:14px">
      <div class="external-source-note">
        ${ICONS.link} Customers are not created manually here. They originate from <strong>Spreadsheet</strong> -> <strong>OTR API</strong> (credit check + limit) -> enter the system as either "Not Verified by OTR", "Credit Pending", or "Active".
      </div>
    </div>

    <div class="card card-pad">
      <table class="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th class="num">Credit limit</th>
            <th class="num">Open invoices</th>
            <th class="num">Available credit</th>
            <th>OTR verified</th>
            <th>Source</th>
            <th>Ops allowed</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(c => {
            const avail = Math.max(0, c.creditLimit - c.openInvoices);
            const ok = CUSTOMER_STATUS[c.status].opsAllowed;
            return `<tr ${!ok?'class="row-warn"':''}>
              <td><strong>${escapeHtml(c.name)}</strong></td>
              <td>${customerStatusPill(c.status)}</td>
              <td class="num">${c.creditLimit ? fmt(c.creditLimit) : "—"}</td>
              <td class="num">${c.openInvoices ? fmt(c.openInvoices) : "—"}</td>
              <td class="num">${c.creditLimit ? fmt(avail) : "—"}</td>
              <td>${c.otrVerifiedAt ? escapeHtml(c.otrVerifiedAt) : "—"}</td>
              <td><span class="chip-src">${escapeHtml(c.source)}</span></td>
              <td>${ok ? '<span class="ok-strong">Yes</span>' : '<span class="no-strong">Blocked</span>'}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;

  $$(".filter-pill").forEach(b => b.addEventListener("click", () => {
    state.custFilter = b.dataset.s; renderAll();
  }));
}

/* ============================================================
   VIEW: CARRIERS
   ============================================================ */
function viewCarriers(){
  $("#content").innerHTML = `
    <div class="card card-pad" style="margin-bottom:14px">
      <div class="external-source-note">
        ${ICONS.link} Carriers are onboarded via <strong>spreadsheet</strong> -> <strong>FMCSA</strong> verification -> activated in system. Insurance and OTR/credit checks are run periodically.
      </div>
    </div>

    <div class="card card-pad">
      <table class="data-table">
        <thead>
          <tr>
            <th>Carrier</th>
            <th>MC #</th>
            <th>FMCSA</th>
            <th>Insurance</th>
            <th>OTR</th>
            <th>Credit OK</th>
            <th class="num">Rating</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          ${CARRIERS.map(c => `
            <tr>
              <td><strong>${escapeHtml(c.name)}</strong></td>
              <td><span class="mono">${escapeHtml(c.mc)}</span></td>
              <td>${c.fmcsaOk ? '<span class="ok-strong">Verified</span>' : '<span class="no-strong">Failed</span>'}</td>
              <td>${escapeHtml(c.insurance)}</td>
              <td>${c.otr ? "Yes" : "No"}</td>
              <td>${c.creditOk ? "Yes" : "No"}</td>
              <td class="num">${c.rating}</td>
              <td><span class="chip-src">${escapeHtml(c.source)}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/* ============================================================
   VIEW: SALES (RBAC financial analytics)
   ============================================================ */
function viewSales(){
  const me = userById(state.me);
  const loads = visibleLoads();

  const scope = me.rbac === "gm" ? "Enterprise (all branches)" :
                me.rbac === "manager" ? ("Branch: " + branchById(me.branchId).name) :
                "Personal: my data only";

  const paid = loads.filter(l => l.status === "paid");
  const totalGP = paid.reduce((s,l) => s + (l.grossProfit||0), 0);
  const customerRevenue = paid.reduce((s,l) => s + (l.customerRate||0), 0);
  const buyCost = paid.reduce((s,l) => s + (l.actualBuyRate||0), 0);
  const buyDown = paid.reduce((s,l) => s + Math.max(0,(l.recommendedRate||0)-(l.actualBuyRate||0)), 0);

  const empIds = new Set();
  loads.forEach(l => { empIds.add(l.salesRepId); empIds.add(l.carrierRepId); empIds.add(l.opsId); });
  const perEmpRows = USERS.filter(u => empIds.has(u.id) && (u.role === "Sales_Rep" || u.role === "Carrier_Rep" || u.role === "Ops_Specialist")).map(u => {
    if(u.role === "Sales_Rep"){
      const myLoads = loads.filter(l => l.salesRepId === u.id);
      const myPaid = myLoads.filter(l => l.status === "paid" && !l.isLeadershipTagged);
      const gp = myPaid.reduce((s,l) => s + (l.grossProfit||0), 0);
      const comm = calcSalesCommission(gp, u.annualBase/12);
      return { user:u, loadsAll: myLoads.length, loadsPaid: myPaid.length, gp, commission: comm.netPayout };
    }
    if(u.role === "Carrier_Rep"){
      const myLoads = loads.filter(l => l.carrierRepId === u.id);
      const myPaid = myLoads.filter(l => l.status === "paid");
      const buyDownMine = myPaid.reduce((s,l) => s + Math.max(0,(l.recommendedRate||0)-(l.actualBuyRate||0)), 0);
      const comm = calcCarrierCommission(myPaid.length, buyDownMine).total;
      return { user:u, loadsAll: myLoads.length, loadsPaid: myPaid.length, gp:buyDownMine, commission: comm };
    }
    const myLoads = loads.filter(l => l.opsId === u.id);
    const myPaid = myLoads.filter(l => l.status === "paid");
    const podRet = u.podId ? podNetCashRetained(u.podId) : 0;
    return { user:u, loadsAll: myLoads.length, loadsPaid: myPaid.length, gp: podRet, commission: calcOpsCommission(podRet) };
  }).sort((a,b) => b.commission - a.commission);

  let branchSummary = "";
  if(me.rbac === "gm" || me.rbac === "manager"){
    const branches = me.rbac === "gm" ? BRANCHES : BRANCHES.filter(b => b.id === me.branchId);
    branchSummary = `
      <div class="card card-pad" style="margin-top:18px">
        <div class="section-h">Branch summary</div>
        <table class="data-table">
          <thead><tr><th>Branch</th><th class="num">Collected GP</th><th class="num">Net Profit</th><th class="num">Loads paid</th><th class="num">Pods</th></tr></thead>
          <tbody>
            ${branches.map(b => {
              const gp = branchCollectedGP(b.id);
              const net = calcBranchNetProfit(b.id);
              const branchLoads = loads.filter(l => loadBranchId(l) === b.id && l.status === "paid").length;
              const pods = PODS.filter(p => p.branchId === b.id).length;
              return `<tr><td><strong>${escapeHtml(b.name)}</strong> (${escapeHtml(b.state)})</td><td class="num">${fmt(gp)}</td><td class="num">${fmt(net)}</td><td class="num">${branchLoads}</td><td class="num">${pods}</td></tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  $("#content").innerHTML = `
    <div class="row" style="margin-bottom:14px;gap:8px">
      ${rbacBadge()}
      <div class="scope-chip">Scope: <strong>${escapeHtml(scope)}</strong> | Period: <strong>${escapeHtml(state.teamPlan.month)}</strong></div>
    </div>

    <div class="kpi-grid" style="margin-bottom:18px">
      ${kpiCard("Collected GP", fmt(totalGP), paid.length + " paid loads", "good", ICONS.dollar)}
      ${kpiCard("Customer revenue", fmt(customerRevenue), "All paid loads", "accent", ICONS.briefcase)}
      ${kpiCard("Carrier buy cost", fmt(buyCost), "Paid to carriers", "accent", ICONS.truck)}
      ${kpiCard("Buy-down savings", fmt(buyDown), "Recommended minus actual", "good", ICONS.bolt)}
    </div>

    <div class="card card-pad">
      <div class="section-h">Per-employee performance (within your scope)</div>
      <div class="section-sub">Includes Sales / Carrier / Ops roles. Leadership commissions shown separately in Compensation.</div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Branch</th>
            <th class="num">Loads (all)</th>
            <th class="num">Loads paid</th>
            <th class="num">GP / Buy-down / Pod retained</th>
            <th class="num">Est. monthly commission</th>
          </tr>
        </thead>
        <tbody>
          ${perEmpRows.map(r => {
            const br = userBranch(r.user);
            return `<tr>
              <td><strong>${escapeHtml(userName(r.user))}</strong></td>
              <td><span class="chip-role">${escapeHtml(r.user.role)}</span></td>
              <td>${br?escapeHtml(br.name):"—"}</td>
              <td class="num">${r.loadsAll}</td>
              <td class="num">${r.loadsPaid}</td>
              <td class="num">${fmt(r.gp)}</td>
              <td class="num good-strong">${fmt(r.commission)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>

    ${branchSummary}
  `;
}

/* ============================================================
   VIEW: COMPENSATION (Commission Engine v1.2)
   ============================================================ */
function viewCompensation(){
  const me = userById(state.me);
  const focusable =
    me.rbac === "gm"      ? USERS :
    me.rbac === "manager" ? USERS.filter(u => u.branchId === me.branchId) :
                            USERS.filter(u => u.id === me.id);

  const focusId = state.compFocus && focusable.find(u => u.id === state.compFocus) ? state.compFocus : (focusable[0]?.id || me.id);
  state.compFocus = focusId;
  const focusUser = userById(focusId);
  const focusData = employeeMonthlyCommission(focusId);

  $("#content").innerHTML = `
    <div class="row" style="margin-bottom:14px;gap:8px">
      ${rbacBadge()}
      <div class="filter-pills">
        <span class="filter-label">Focus on:</span>
        <select id="comp-focus" class="select-base">
          ${focusable.map(u => `<option value="${u.id}" ${u.id===focusId?'selected':''}>${escapeHtml(userName(u))} (${escapeHtml(u.role)})</option>`).join("")}
        </select>
      </div>
    </div>

    ${renderCompensationFor(focusUser, focusData)}

    <div class="grid-2col" style="margin-top:18px">
      ${cardBox("Engine constants",
        "From Sierra Commission Engine spec v1.2 (Nick Saponaro)",
        `<div class="kv">
          <div><span>Tier 1</span><strong>$0-$15k @ 10%</strong></div>
          <div><span>Tier 2</span><strong>$15k-$40k @ 25%</strong></div>
          <div><span>Tier 3</span><strong>$40k-$75k @ 35%</strong></div>
          <div><span>Tier 4</span><strong>$75k+ @ 40% uncapped</strong></div>
          <div><span>Pod Support Fee</span><strong>3% of total GP when total &gt; $35,000</strong></div>
          <div><span>Carrier Velocity</span><strong>$9 per load Collected</strong></div>
          <div><span>Carrier Buy-Down</span><strong>10% of (target minus actual)</strong></div>
          <div><span>Ops Profit Share</span><strong>1% of Pod Net Cash Retained</strong></div>
          <div><span>Corporate Mgmt Fee</span><strong>${(GLOBAL_VARS.corporate_management_fee*100).toFixed(2)}% <span class="lock-note">GM-only</span></strong></div>
        </div>`
      )}
      ${cardBox("Branch P&amp;L (this month)",
        "Net Profit = GP minus (Rent + Tech + Payroll + Corp fee), floor at 0",
        `<table class="data-table compact">
          <thead><tr><th>Branch</th><th class="num">GP</th><th class="num">Rent</th><th class="num">Tech</th><th class="num">Payroll</th><th class="num">Corp 5%</th><th class="num">Net</th></tr></thead>
          <tbody>
            ${BRANCHES.map(b => {
              const gp = branchCollectedGP(b.id);
              const led = BRANCH_LEDGER[b.id];
              const corp = gp * GLOBAL_VARS.corporate_management_fee;
              const net = calcBranchNetProfit(b.id);
              return `<tr><td><strong>${escapeHtml(b.state)}</strong> | ${escapeHtml(b.name)}</td><td class="num">${fmt(gp)}</td><td class="num">${fmt(led.monthlyRent)}</td><td class="num">${fmt(led.monthlyTechSeats)}</td><td class="num">${fmt(led.monthlyPayroll)}</td><td class="num">${fmt(corp)}</td><td class="num good-strong">${fmt(net)}</td></tr>`;
            }).join("")}
          </tbody>
        </table>`
      )}
    </div>

    <div class="card card-pad" style="margin-top:18px">
      <div class="section-h">Leadership overrides</div>
      <table class="data-table">
        <thead><tr><th>Employee</th><th>Branch</th><th>Base</th><th>%</th><th>Window</th><th class="num">Current payout</th></tr></thead>
        <tbody>
          ${OVERRIDES.map(o => {
            const emp = userById(o.employeeId);
            const today = state.today.toISOString().slice(0,10);
            const active = o.startDate <= today && (!o.endDate || today <= o.endDate);
            const payout = active ? calcLeadershipOverride(o.employeeId).amount : 0;
            return `<tr ${!active?'class="row-dim"':''}>
              <td><strong>${escapeHtml(userName(emp))}</strong></td>
              <td>${escapeHtml(branchById(o.branchId).state)}</td>
              <td>${o.base}</td>
              <td>${(o.percentage*100).toFixed(2)}%</td>
              <td>${escapeHtml(o.startDate)} -> ${o.endDate ? escapeHtml(o.endDate) : "open"}</td>
              <td class="num">${active ? fmt(payout) : "—"}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>

    <div class="card card-pad" style="margin-top:18px">
      <div class="section-h">Transitioned books (Schedule A)</div>
      <table class="data-table">
        <thead><tr><th>Book</th><th>Lead</th><th>Branch</th><th>Phase</th><th>Window</th><th class="num">Current payout</th></tr></thead>
        <tbody>
          ${TRANSITIONED_ACCOUNTS.map(a => {
            const lead = userById(a.leadEmployeeId);
            const res = calcTransitionedBookCommission(a.id);
            return `<tr>
              <td><strong>${escapeHtml(a.accountName)}</strong></td>
              <td>${escapeHtml(userName(lead))}</td>
              <td>${escapeHtml(a.branchCode)}</td>
              <td>${escapeHtml(res.phase)}</td>
              <td>${escapeHtml(a.transitionStart)} -> ${escapeHtml(a.phase2End)}</td>
              <td class="num good-strong">${fmt(res.amount)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
      <div class="spec-note">
        <strong>Note on spec ambiguity:</strong> v1.0 prose says transitioned commission is from Net Profit "generated by these specifically flagged accounts". v1.2 Python uses whole-branch Net Profit. Current implementation follows v1.2 (whole branch). Needs confirmation with Nick before production.
      </div>
    </div>
  `;

  $("#comp-focus").addEventListener("change", e => {
    state.compFocus = e.target.value;
    renderAll();
  });
}

function renderCompensationFor(u, data){
  if(!data) return cardBox("Compensation", "", "<div class='section-sub'>No data for this user.</div>");

  if(data.kind === "sales"){
    return cardBox(
      escapeHtml(userName(u)) + " - Sales Rep",
      escapeHtml(branchById(u.branchId).name) + " branch | " + escapeHtml(podById(u.podId).name),
      `<div class="grid-2col">
        <div class="kv">
          <div><span>Monthly GP (collected)</span><strong>${fmt(data.totalMonthlyGP)}</strong></div>
          <div><span>Pod Support Fee 3%</span><strong>${data.supportFee>0?fmt(data.supportFee):"Not triggered"}</strong></div>
          <div><span>Commissionable GP</span><strong>${fmt(data.commissionableGP)}</strong></div>
          <div><span>Gross commission</span><strong>${fmt(data.grossCommission)}</strong></div>
          <div><span>Monthly base draw</span><strong>${fmt(data.monthlyBaseDraw)}</strong></div>
          <div><span>Net payout</span><strong class="good-strong">${fmt(data.netPayout)}</strong></div>
        </div>
        <div>
          <div class="section-sub" style="margin-bottom:6px">Tier breakdown</div>
          <table class="data-table compact">
            <thead><tr><th>Tier</th><th>Range</th><th class="num">Rate</th><th class="num">GP in tier</th><th class="num">Payout</th></tr></thead>
            <tbody>
              ${data.tierBreakdown.map(t => `<tr><td>${t.name}</td><td>${t.range}</td><td class="num">${(t.rate*100)|0}%</td><td class="num">${fmt(t.gp)}</td><td class="num">${fmt(t.payout)}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>`
    );
  }
  if(data.kind === "carrier"){
    return cardBox(
      escapeHtml(userName(u)) + " - Carrier Rep",
      escapeHtml(branchById(u.branchId).name) + " branch | " + escapeHtml(podById(u.podId).name),
      `<div class="kv">
        <div><span>Loads collected</span><strong>${data.loadsCollected}</strong></div>
        <div><span>Velocity bonus</span><strong>${data.loadsCollected} x $9 = ${fmt(data.velocityBonus)}</strong></div>
        <div><span>Total buy-down savings</span><strong>${fmt(data.buyDown)}</strong></div>
        <div><span>Buy-down incentive (10%)</span><strong>${fmt(data.buyDownIncentive)}</strong></div>
        <div><span>Monthly base draw</span><strong>${fmt(data.monthlyBaseDraw)}</strong></div>
        <div><span>Total commission (on top of base)</span><strong class="good-strong">${fmt(data.total)}</strong></div>
      </div>`
    );
  }
  if(data.kind === "ops"){
    return cardBox(
      escapeHtml(userName(u)) + " - Ops Specialist",
      escapeHtml(branchById(u.branchId).name) + " branch | " + escapeHtml(podById(u.podId).name),
      `<div class="kv">
        <div><span>Pod net cash retained</span><strong>${fmt(data.podRetained)}</strong></div>
        <div><span>1% profit share</span><strong class="good-strong">${fmt(data.commission)}</strong></div>
        <div><span>Monthly base draw</span><strong>${fmt(data.monthlyBaseDraw)}</strong></div>
      </div>`
    );
  }
  if(data.kind === "leadership"){
    return cardBox(
      escapeHtml(userName(u)) + " - " + escapeHtml(u.role),
      escapeHtml(branchById(u.branchId).name) + " branch leadership",
      `<div class="grid-2col">
        <div class="kv">
          <div><span>Active override</span><strong>${data.override.rule ? ((data.override.rule.percentage*100).toFixed(1) + "% of " + data.override.rule.base) : "None"}</strong></div>
          <div><span>Override payout</span><strong class="good-strong">${fmt(data.override.amount)}</strong></div>
          <div><span>Self-sourced (tagged) loads</span><strong>${data.taggedLoads.length}</strong></div>
          <div><span>Tagged GP</span><strong>${fmt(data.taggedGP)}</strong></div>
          <div><span>Custom tagged rate</span><strong>${(u.customTagged*100).toFixed(1)}%</strong></div>
          <div><span>Tagged payout</span><strong class="good-strong">${fmt(data.taggedPayout)}</strong></div>
        </div>
        <div class="kv">
          <div><span>Schedule A phase</span><strong>${escapeHtml(data.schedRes.phase)}</strong></div>
          <div><span>Schedule A payout</span><strong class="good-strong">${fmt(data.schedRes.amount)}</strong></div>
          <div><span>Monthly base draw</span><strong>${fmt(data.monthlyBaseDraw)}</strong></div>
          <div><span>Total leadership comp this month</span><strong class="good-strong">${fmt(data.override.amount + data.taggedPayout + data.schedRes.amount)}</strong></div>
        </div>
      </div>`
    );
  }
  if(data.kind === "gm"){
    return cardBox(
      escapeHtml(userName(u)) + " - General Manager",
      "Enterprise-wide",
      `<div class="section-sub">GM compensation handled outside the Commission Engine. The GM's role here is policy &amp; oversight: ability to edit corporate_management_fee (currently ${(GLOBAL_VARS.corporate_management_fee*100).toFixed(2)}%), see all branches, audit overrides.</div>`
    );
  }
  return "";
}

/* ============================================================
   MODAL / TOAST INFRASTRUCTURE
   ============================================================ */
function modal(html, size){
  const root = $("#modal-root");
  root.innerHTML = `
    <div class="modal-backdrop" onclick="closeModal()"></div>
    <div class="modal ${size==='wide'?'modal-wide':''}" onclick="event.stopPropagation()">${html}</div>
  `;
  root.classList.add("open");
}
function closeModal(){
  const root = $("#modal-root");
  root.classList.remove("open");
  root.innerHTML = "";
}
window.closeModal = closeModal;

let toastT;
function showToast(text){
  const t = $("#toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 3000);
}

/* ============================================================
   RENDER ORCHESTRATION
   ============================================================ */
function renderAll(){
  renderSidebar();
  renderHeader();
  switch(state.view){
    case "workspace":      viewWorkspace(); break;
    case "customer_board": viewCustomerBoard(); break;
    case "load_board":     viewLoadBoard(); break;
    case "carrier_board":  viewCarrierBoard(); break;
    case "customers":      viewCustomers(); break;
    case "carriers":       viewCarriers(); break;
    case "sales":          viewSales(); break;
    case "compensation":   viewCompensation(); break;
    default:               viewWorkspace();
  }
}

document.addEventListener("DOMContentLoaded", renderAll);

/* ============================================================
   v8.1 DATA ENRICHMENT
   Adds legacy CRM fields per Carrier/Customer/Load Board specs.
   Runs once at startup before first render.
   ============================================================ */

const CUSTOMER_TYPES = ["Direct", "Logistics", "Forwarder", "Customs Broker", "Broker", "Warehouse"];
const US_STATES = ["TX","CA","NV","UT","AZ","NM","CO","WA","OR","ID","IL","IN","OH","PA","NJ","NY","FL","GA","IA","WI","MO","MN","NC","TN"];
const MX_STATES = ["NL","TAM","DF","JAL","BC","CHIH","SON","CDMX","QRO","VER","PUE","COA"];

function enrichData(){
  // ---------- Customers ----------
  const customerTypeMap = {
    cu1:"Logistics", cu2:"Direct", cu3:"Forwarder", cu4:"Direct", cu5:"Logistics", cu6:"Direct",
    cu7:"Direct", cu8:"Direct", cu9:"Broker", cu10:"Direct", cu11:"Direct", cu12:"Logistics",
    cu13:"Direct", cu14:"Direct", cu15:"Warehouse", cu16:"Customs Broker"
  };
  const customerLegal = {
    cu1:"DB Schenker Inc.", cu2:"UFC Foods LLC", cu3:"Hellmann Worldwide Logistics SA de CV",
    cu4:"American Agri Supply Co.", cu5:"Maersk Logistics Mexico SA", cu6:"Bel Fresh Produce LLC",
    cu7:"Atlas Beverage Corp.", cu8:"Continental Foods Inc.", cu9:"Nordic Metals AB",
    cu10:"Sunbelt Building Materials LLC", cu11:"Cascade Lumber Co.", cu12:"Pacific Trade Company Inc.",
    cu13:"LISI Automotive SA de CV", cu14:"Ryder Supply Co LLC", cu15:"Greenfield Agricultural Co-op",
    cu16:"Northstar Steel Holdings Inc."
  };
  const customerAddresses = {
    cu1: { street:"4555 Pennoyer Ave",  neighborhood:"Industrial", city:"Niles",        state:"IL", zip:"60714", country:"US" },
    cu2: { street:"800 W Plant St",     neighborhood:"Downtown",   city:"Winter Garden",state:"FL", zip:"34787", country:"US" },
    cu3: { street:"Av Reforma 250",     neighborhood:"Centro",     city:"Queretaro",    state:"QRO",zip:"76000", country:"MX" },
    cu4: { street:"2200 Folsom St",     neighborhood:"Mission",    city:"San Francisco",state:"CA", zip:"94110", country:"US" },
    cu5: { street:"Blvd Manuel Avila Camacho 32", neighborhood:"Lomas", city:"Mexico City", state:"CDMX", zip:"11000", country:"MX" },
    cu6: { street:"1400 South Hwy 281", neighborhood:"South",      city:"McAllen",      state:"TX", zip:"78501", country:"US" },
    cu7: { street:"720 Broadway",       neighborhood:"LoDo",       city:"Denver",       state:"CO", zip:"80203", country:"US" },
    cu8: { street:"3550 NW 17th St",    neighborhood:"Doral",      city:"Miami",        state:"FL", zip:"33122", country:"US" },
    cu9: { street:"Storgatan 12",       neighborhood:"Centrum",    city:"Stockholm",    state:"NA", zip:"10001", country:"SE" },
    cu10:{ street:"6230 W Indian School",neighborhood:"Westside",  city:"Phoenix",      state:"AZ", zip:"85033", country:"US" },
    cu11:{ street:"550 Marine Dr",      neighborhood:"Waterfront", city:"Seattle",      state:"WA", zip:"98121", country:"US" },
    cu12:{ street:"2000 Embarcadero",   neighborhood:"Jack London",city:"Oakland",      state:"CA", zip:"94606", country:"US" },
    cu13:{ street:"Carr Mexico-Queretaro KM 198", neighborhood:"Parque Industrial", city:"Queretaro", state:"QRO", zip:"76246", country:"MX" },
    cu14:{ street:"11690 NW 105th St",  neighborhood:"Medley",     city:"Miami",        state:"FL", zip:"33178", country:"US" },
    cu15:{ street:"412 Main St",        neighborhood:"Downtown",   city:"Des Moines",   state:"IA", zip:"50309", country:"US" },
    cu16:{ street:"1100 Lake Cook Rd",  neighborhood:"Northwood",  city:"Buffalo Grove",state:"IL", zip:"60089", country:"US" }
  };
  const customerContacts = {
    cu1:{ contactName:"John Mueller",    title:"Logistics Mgr",     phone:"+1 847-555-2104", email:"j.mueller@dbschenker.com",  apName:"Sarah Chen",     apPhone:"+1 847-555-2150", apEmail:"ap@dbschenker.com" },
    cu2:{ contactName:"Maria Lopez",     title:"Shipping Dir",      phone:"+1 407-555-3320", email:"m.lopez@ufcfoods.com",      apName:"Tom Hayes",      apPhone:"+1 407-555-3399", apEmail:"ap@ufcfoods.com" },
    cu3:{ contactName:"Carlos Hernandez",title:"Transport Coord",   phone:"+52 442-555-1100",email:"c.hernandez@hellmann.com",  apName:"Lucia Reyes",    apPhone:"+52 442-555-1190",apEmail:"ap.mx@hellmann.com" },
    cu4:{ contactName:"Steve Park",      title:"Operations Mgr",    phone:"+1 415-555-4400", email:"s.park@americanagri.com",   apName:"Rita Vance",     apPhone:"+1 415-555-4488", apEmail:"ap@americanagri.com" },
    cu5:{ contactName:"Ana Sanchez",     title:"Cross-Border Lead", phone:"+52 55-5555-7700",email:"a.sanchez@maersk.com",      apName:"Pedro Ruiz",     apPhone:"+52 55-5555-7799",apEmail:"ap.mx@maersk.com" },
    cu6:{ contactName:"Roberto Garza",   title:"Supply Chain Mgr",  phone:"+1 956-555-2200", email:"r.garza@belfresh.com",      apName:"Eva Torres",     apPhone:"+1 956-555-2290", apEmail:"ap@belfresh.com" },
    cu7:{ contactName:"Linda Wright",    title:"Logistics Mgr",     phone:"+1 303-555-1800", email:"l.wright@atlasbev.com",     apName:"Mike Doyle",     apPhone:"+1 303-555-1899", apEmail:"ap@atlasbev.com" },
    cu8:{ contactName:"Diana Reyes",     title:"Dispatch Lead",     phone:"+1 305-555-7700", email:"d.reyes@continental.com",   apName:"Frank Chen",     apPhone:"+1 305-555-7799", apEmail:"ap@continental.com" },
    cu9:{ contactName:"Erik Lindberg",   title:"Procurement Dir",   phone:"+46 8-555-1100",  email:"e.lindberg@nordicmetals.se",apName:"Astrid Holm",    apPhone:"+46 8-555-1190",  apEmail:"ap@nordicmetals.se" },
    cu10:{ contactName:"Bob Stevens",    title:"Project Mgr",       phone:"+1 602-555-8800", email:"b.stevens@sunbelt.com",     apName:"Karen Joy",      apPhone:"+1 602-555-8890", apEmail:"ap@sunbelt.com" },
    cu11:{ contactName:"Olivia Murray",  title:"Yard Mgr",          phone:"+1 206-555-3300", email:"o.murray@cascadelumber.com",apName:"Jeff Adams",     apPhone:"+1 206-555-3390", apEmail:"ap@cascadelumber.com" },
    cu12:{ contactName:"Greg Tan",       title:"Logistics Coord",   phone:"+1 510-555-4400", email:"g.tan@pacifictrade.com",    apName:"Nina West",      apPhone:"+1 510-555-4490", apEmail:"ap@pacifictrade.com" },
    cu13:{ contactName:"Miguel Fuentes", title:"Plant Logistics Mgr",phone:"+52 442-555-3300",email:"m.fuentes@lisiautomotive.com",apName:"Sofia Mendez", apPhone:"+52 442-555-3390",apEmail:"ap.mx@lisiautomotive.com" },
    cu14:{ contactName:"Brian Cook",     title:"VP Logistics",      phone:"+1 305-555-9911", email:"b.cook@rydersupply.com",    apName:"Pam Wills",      apPhone:"+1 305-555-9990", apEmail:"ap@rydersupply.com" },
    cu15:{ contactName:"Susan Webb",     title:"Grain Coord",       phone:"+1 515-555-2200", email:"s.webb@greenfield.coop",    apName:"Henry Frye",     apPhone:"+1 515-555-2290", apEmail:"ap@greenfield.coop" },
    cu16:{ contactName:"Walter Reese",   title:"Sourcing Dir",      phone:"+1 847-555-7700", email:"w.reese@northstarsteel.com",apName:"Joy Klein",      apPhone:"+1 847-555-7790", apEmail:"ap@northstarsteel.com" }
  };

  CUSTOMERS.forEach(c => {
    const addr = customerAddresses[c.id] || {};
    const ct = customerContacts[c.id] || {};
    c.commercialName = c.name;
    c.legalName = customerLegal[c.id] || (c.name + " LLC");
    c.mainPhone = ct.phone || "+1 000-000-0000";
    c.customerType = customerTypeMap[c.id] || "Direct";
    c.rfcTaxId = addr.country === "MX" ? ("RFC-" + c.id.toUpperCase() + "01") : ("EIN-" + (Math.floor(Math.random()*9000000)+1000000));
    c.street = addr.street || "";
    c.neighborhood = addr.neighborhood || "";
    c.city = addr.city || "";
    c.state = addr.state || "";
    c.zip = addr.zip || "";
    c.country = addr.country || "US";
    c.contactName = ct.contactName || "";
    c.title = ct.title || "";
    c.contactEmail = ct.email || "";
    c.contactPhone = ct.phone || "";
    c.apName = ct.apName || "";
    c.apPhone = ct.apPhone || "";
    c.apEmail = ct.apEmail || "";
    c.creditDays = c.creditLimit > 0 ? 30 : 0;
    c.typePayment = "Net 30";
    c.salesRepId = ({cu1:"u_maria",cu2:"u_maria",cu3:"u_diego",cu4:"u_diego",cu5:"u_hanna",cu6:"u_diego",cu7:"u_tyler",cu8:"u_james",cu9:"u_james",cu10:"u_james",cu11:"u_hanna",cu12:"u_tyler",cu13:"u_james",cu14:"u_diego",cu15:"u_james",cu16:"u_maria"})[c.id];
  });

  // ---------- Carriers ----------
  const carrierData = {
    car1:{ dot:"DOT-2885109", country:"US", city:"Laredo",      state:"TX",  zip:"78045", address:"5400 Killam Industrial Blvd",        neighborhood:"Industrial Park", personOfContact:"Gerardo Saldivar", puStates:["TX","NM","CA"],     delStates:["TX","NV","UT","AZ"] },
    car2:{ dot:"DOT-3912844", country:"US", city:"Guadalupe",   state:"NL",  zip:"67205", address:"Av Industrial 1450",                 neighborhood:"Centro",          personOfContact:"Roberto Manuel Morton", puStates:["NL","TAM","NM","TX"], delStates:["TX","NJ","PA"] },
    car3:{ dot:"DOT-5510778", country:"MX", city:"Mexico City", state:"CDMX",zip:"03900", address:"Calz de Tlalpan 4620",               neighborhood:"Coyoacan",        personOfContact:"Arturka Vega", puStates:["CDMX","JAL","QRO"], delStates:["TX","CA","NM"] },
    car4:{ dot:"DOT-7700198", country:"MX", city:"Queretaro",   state:"QRO", zip:"76246", address:"Carr Mex-Qro km 198",                neighborhood:"Industrial",      personOfContact:"Arnoldo Juarez Silva", puStates:["QRO","JAL","VER"], delStates:["TX","NM","AZ"] },
    car5:{ dot:"DOT-4422156", country:"US", city:"Phoenix",     state:"AZ",  zip:"85043", address:"7300 W Buckeye Rd",                  neighborhood:"South Phoenix",   personOfContact:"Mike Daniels", puStates:["AZ","CA","NV","NM"], delStates:["AZ","CA","NV","UT","CO"] },
    car6:{ dot:"DOT-1804402", country:"MX", city:"Monterrey",   state:"NL",  zip:"64000", address:"Av Constitucion 4500",               neighborhood:"Centro",          personOfContact:"Junior Murillo", puStates:["NL","TAM","COA"], delStates:["TX","NM","CA"] },
    car7:{ dot:"DOT-8865221", country:"US", city:"Tacoma",      state:"WA",  zip:"98421", address:"3045 Port of Tacoma Rd",             neighborhood:"Port Industrial", personOfContact:"Robert Williams", puStates:["WA","OR","ID"], delStates:["WA","OR","ID","CA","UT"] },
    car8:{ dot:"DOT-9912006", country:"US", city:"Chicago",     state:"IL",  zip:"60632", address:"5400 S Cicero Ave",                  neighborhood:"Archer Heights",  personOfContact:"PENDIENTE", puStates:["IL","IN","WI"], delStates:["IL","IN","MO","OH"] }
  };
  CARRIERS.forEach(c => {
    Object.assign(c, carrierData[c.id] || {});
  });

  // Sample drivers per carrier
  const driverNames = {
    car1:"Robert Reyes",  car2:"Arnoldo Juarez Silva",  car3:"Arturka Vega",  car4:"Pedro Mendoza",
    car5:"Juan Martinez", car6:"Esteban Rivera",        car7:"Robert Williams",car8:"PENDIENTE"
  };
  const truckNumbers = { car1:"977", car2:"841", car3:"08", car4:"PENDIENTE", car5:"5880", car6:"5145", car7:"19", car8:"700" };

  // ---------- Loads (add legacy CRM fields) ----------
  LOADS.forEach((l, idx) => {
    const carrier = l.acceptedBidId ? CARRIERS.find(c => c.id === l.bids.find(b => b.id === l.acceptedBidId).carrierId) : null;
    l.proNumber = "PRO-" + l.id.replace("L","") + Math.floor(idx*7%9 + 1);
    l.truckNumber = carrier ? truckNumbers[carrier.id] : "—";
    l.driverName = carrier ? driverNames[carrier.id] : "—";
    l.carrierName = carrier ? carrier.name : "—";
    const cust = customerById(l.customerId);
    l.customerRef = "REF-" + cust.id.toUpperCase() + "-" + String(17000+idx);
    l.originDay = l.pickupDate.split(",")[0];
    l.destDay   = (l.deliveryDate||"").split(",")[0];
    l.weight = l.weight || "";
    l.pallets = l.pieces || "";
    l.pieces  = l.pieces || "";
    l.checkCallLast = l.checkCallLast || sampleCheckCall(l.status);
    // Sub-tab mapping
    if(l.status === "posted" || l.status === "booked" || l.status === "en_route") l.boardTab = "en_route";
    else if(l.status === "delivered" || l.status === "invoiced" || l.status === "paid") l.boardTab = "delivered";
    if(l.hasIssue) l.boardTab = "issue";
  });
  // Mark some loads as Issues for the third sub-tab
  ["L17502","L17509"].forEach(id => {
    const ld = loadById(id);
    if(ld){ ld.hasIssue = true; ld.boardTab = "issue"; ld.issueReason = id === "L17502" ? "Possible claim: product damage on PU2" : "Delay - carrier 4h behind schedule"; }
  });
}

function sampleCheckCall(status){
  const samples = {
    posted:    ["Posted to board. Awaiting bids.","Recommended rate set."],
    booked:    ["Driver confirmed. Pickup tomorrow 08:00.","Rate Con signed.","BOL ready."],
    en_route:  ["Driver checked in at PU. ETA on time.","Departed PU on time.","30mi out, all good.","Crossing border, ETA 4h."],
    delivered: ["POD received. Awaiting docs.","Delivered on time. POD signed.","Unloaded successfully."],
    invoiced:  ["Invoice sent to customer.","Invoice 30-day terms."],
    paid:      ["Paid in full.","Closed."]
  };
  const arr = samples[status] || ["—"];
  return arr[Math.floor(Math.random()*arr.length)];
}

enrichData();

/* ============================================================
   v8.1 NEW VIEWS — Load Board / Customers / Carriers
   Following legacy CRM specs (per-column filters, sub-tabs,
   action menu, modal-tabs forms).
   ============================================================ */

// Filter state per view
state.filters = {
  loadBoard: { proRate:"", truck:"", carrierDriver:"", customer:"", origin:"", destination:"", checkCall:"" },
  customers: { commercialName:"", legalName:"", mainPhone:"", customerType:"", rfcTaxId:"", street:"", neighborhood:"", cityStateZip:"", country:"", contactName:"", title:"" },
  carriers:  { name:"", mc:"", dot:"", cityStateZip:"", addressNeighborhood:"", personOfContact:"", puStates:"", delStates:"" }
};
state.lbSubtab = "posted"; // posted | booked | en_route | delivered | invoiced | paid | issue
state.carriersCountry = "US"; // US | MX
state.pageSize = 20;

// Generic case-insensitive substring match
function fmatch(value, q){
  if(!q) return true;
  return String(value || "").toLowerCase().includes(String(q).toLowerCase());
}
// Exact dropdown match
function fexact(value, q){
  if(!q) return true;
  return String(value || "") === String(q);
}

function colFilterInput(viewKey, fieldKey, placeholder){
  const v = (state.filters[viewKey][fieldKey] || "");
  return `<input class="col-filter" data-fview="${viewKey}" data-ffield="${fieldKey}" placeholder="${placeholder||""}" value="${escapeHtml(v)}" />`;
}
function colFilterSelect(viewKey, fieldKey, options){
  const v = state.filters[viewKey][fieldKey] || "";
  return `<select class="col-filter" data-fview="${viewKey}" data-ffield="${fieldKey}">
    <option value="">All</option>
    ${options.map(o => `<option value="${escapeHtml(o)}" ${o===v?'selected':''}>${escapeHtml(o)}</option>`).join("")}
  </select>`;
}
function bindColFilters(){
  $$('.col-filter').forEach(el => {
    const ev = el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(ev, () => {
      const view = el.dataset.fview, field = el.dataset.ffield;
      state.filters[view][field] = el.value;
      // Re-run view without recreating header (to preserve focus). Simplest: rerender, then refocus.
      const focusedKey = view + "." + field;
      renderAll();
      const restore = document.querySelector(`.col-filter[data-fview="${view}"][data-ffield="${field}"]`);
      if(restore){ restore.focus(); restore.setSelectionRange(restore.value.length, restore.value.length); }
    });
  });
}

// Action menu (3-dot dropdown). Click outside closes.
function buildActionMenu(items){
  return `<div class="action-menu">
    ${items.map(it => it === "sep"
      ? '<div class="action-sep"></div>'
      : `<button class="action-item ${it.danger?'danger':''}" data-act="${it.act}">${it.label}</button>`
    ).join("")}
  </div>`;
}
function bindActionMenus(){
  // Toggle by 3-dot button
  $$('[data-action-toggle]').forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const menu = btn.parentElement.querySelector(".action-menu");
      // close all others
      $$('.action-menu.open').forEach(m => { if(m !== menu) m.classList.remove("open"); });
      menu.classList.toggle("open");
    });
  });
  // Close on outside click
  document.addEventListener("click", () => {
    $$('.action-menu.open').forEach(m => m.classList.remove("open"));
  }, { once:true });
}

/* ============================================================
   VIEW: LOAD BOARD (rewrite per legacy CRM spec)
   ============================================================ */
function viewLoadBoard(){
  const loads = visibleLoads();
  const counts = {
    posted:    loads.filter(l => l.status === "posted"    && !l.hasIssue).length,
    booked:    loads.filter(l => l.status === "booked"    && !l.hasIssue).length,
    en_route:  loads.filter(l => l.status === "en_route"  && !l.hasIssue).length,
    delivered: loads.filter(l => l.status === "delivered" && !l.hasIssue).length,
    invoiced:  loads.filter(l => l.status === "invoiced"  && !l.hasIssue).length,
    paid:      loads.filter(l => l.status === "paid"      && !l.hasIssue).length,
    issue:     loads.filter(l => l.hasIssue).length
  };
  const tabLoads = state.lbSubtab === "issue"
    ? loads.filter(l => l.hasIssue)
    : loads.filter(l => l.status === state.lbSubtab && !l.hasIssue);
  const f = state.filters.loadBoard;
  const filtered = tabLoads.filter(l => {
    const c = customerById(l.customerId);
    return fmatch(l.proNumber + " " + (l.customerRate||""), f.proRate) &&
           fmatch(l.truckNumber, f.truck) &&
           fmatch((l.carrierName||"") + " " + (l.driverName||""), f.carrierDriver) &&
           fmatch((c.commercialName||c.name) + " " + (l.customerRef||""), f.customer) &&
           fmatch(l.pickupCity + " " + l.pickupState + " " + l.pickupDate, f.origin) &&
           fmatch(l.deliveryCity + " " + l.deliveryState + " " + l.deliveryDate, f.destination) &&
           fmatch(l.checkCallLast || "", f.checkCall);
  });

  const me = userById(state.me);
  const canCreate = me.role !== "Ops_Specialist"; // sample permission gate

  $("#content").innerHTML = `
    <div class="row" style="margin-bottom:10px;gap:10px;align-items:center;">
      ${rbacBadge()}
    </div>

    <div class="list-toolbar">
      <div class="list-toolbar-l">
        ${canCreate ? `<button class="btn btn-primary" id="btn-new-load">+ Add / Post New Load</button>` : ""}
      </div>
      <div class="list-toolbar-r">
        <span class="showing-info">Showing 1-${Math.min(state.pageSize, filtered.length)} of ${filtered.length} items</span>
        <span class="page-size">Show
          <select id="page-size-select">
            <option ${state.pageSize===10?'selected':''}>10</option>
            <option ${state.pageSize===20?'selected':''}>20</option>
            <option ${state.pageSize===50?'selected':''}>50</option>
            <option ${state.pageSize===100?'selected':''}>100</option>
          </select>
          items
        </span>
      </div>
    </div>

    <div class="subtabs">
      ${LOAD_LIFECYCLE.map(s => {
        const st = LOAD_STATUS[s];
        return `<button class="subtab ${state.lbSubtab===s?'active':''}" data-sub="${s}" style="${state.lbSubtab===s?'border-bottom-color:'+st.color+';color:'+st.color:''}">
          ${st.label} <span class="subtab-badge" style="background:${st.soft};color:${st.color}">${counts[s]}</span>
        </button>`;
      }).join("")}
      <button class="subtab danger ${state.lbSubtab==='issue'?'active':''}" data-sub="issue">
        Loads Issue <span class="subtab-badge">${counts.issue}</span>
      </button>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Pro / Rate</th>
            <th>Truck</th>
            <th>Carrier / Driver</th>
            <th>Customer</th>
            <th>Origin <span style="font-weight:400;text-transform:none;color:var(--faint);font-size:9px;">City / State / Day</span></th>
            <th>Destination <span style="font-weight:400;text-transform:none;color:var(--faint);font-size:9px;">City / State / Day</span></th>
            <th>Check Call</th>
            <th style="width:90px;">Actions</th>
          </tr>
          <tr class="filter-row">
            <th>${colFilterInput("loadBoard","proRate","Pro/Rate")}</th>
            <th>${colFilterInput("loadBoard","truck","Trk")}</th>
            <th>${colFilterInput("loadBoard","carrierDriver","Carrier / Driver")}</th>
            <th>${colFilterInput("loadBoard","customer","Customer")}</th>
            <th>${colFilterInput("loadBoard","origin","City / State / Day")}</th>
            <th>${colFilterInput("loadBoard","destination","City / State / Day")}</th>
            <th>${colFilterInput("loadBoard","checkCall","Check Call")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${filtered.slice(0, state.pageSize).map(l => {
            const c = customerById(l.customerId);
            const carrierAcc = l.acceptedBidId ? carrierById(l.bids.find(b => b.id === l.acceptedBidId).carrierId) : null;
            const rep = carrierAcc ? (carrierAcc.personOfContact || "—") : "—";
            const proCell = l.actualBuyRate
              ? `<div class="mono">${escapeHtml(l.proNumber)}</div><div style="color:var(--green-dk);font-weight:600;font-size:12px;">$${(l.customerRate||0).toLocaleString()}</div>`
              : `<div style="color:var(--green-dk);font-weight:600;font-size:12px;">$${(l.customerRate||0).toLocaleString()}</div>`;
            const customerCell = `
              <div class="cell-multiline">
                <span class="line-1">${escapeHtml(c.commercialName||c.name)}</span>
                <span class="line-2">Ref: ${escapeHtml(l.customerRef||"—")}</span>
              </div>`;
            const carrierCell = carrierAcc ? `
              <div class="cell-multiline">
                <span class="line-1">${escapeHtml(carrierAcc.name)}</span>
                <span class="line-3">Rep: ${escapeHtml(rep)}</span>
                <span class="line-3">Driver: ${escapeHtml(l.driverName||"—")}</span>
              </div>` : `<span style="color:var(--faint);">CARRIER USA PENDIENTE</span>`;
            const originCell = `
              <div class="cell-loc-line"><strong>${escapeHtml(l.pickupCity)}, ${escapeHtml(l.pickupState)}</strong></div>
              <div class="cell-loc-meta">Wt <strong>${escapeHtml(l.weight||"—")}</strong> Plt <strong>${escapeHtml(l.pallets||"—")}</strong> Pcs <strong>${escapeHtml(l.pieces||"—")}</strong></div>
              <div class="cell-loc-meta">${escapeHtml(l.pickupDate)}</div>`;
            const destCell = `
              <div class="cell-loc-line"><strong>${escapeHtml(l.deliveryCity)}, ${escapeHtml(l.deliveryState)}</strong></div>
              <div class="cell-loc-meta">Wt <strong>${escapeHtml(l.weight||"—")}</strong> Plt <strong>${escapeHtml(l.pallets||"—")}</strong> Pcs <strong>${escapeHtml(l.pieces||"—")}</strong></div>
              <div class="cell-loc-meta">${escapeHtml(l.deliveryDate||"—")}</div>`;
            const checkCell = `<div style="font-size:11px;color:var(--text-2);">${escapeHtml(l.checkCallLast||"—")}</div>`;
            const actionItems = [
              { act:"edit_load",      label:"Edit Load" },
              { act:"edit_dispatch",  label:"Edit Dispatch" },
              { act:"check_call",     label:"Check Call" },
              { act:"add_note",       label:"Add Note" },
              { act:"possible_claim", label:"Possible Claims" },
              { act:"tonu",           label:"TONU" },
              "sep",
              { act:"documents",      label:"Documents" },
              { act:"gen_bol",        label:"Generate BOL" },
              { act:"gen_ratecon",    label:"Generate Rate Confirmation" },
              { act:"gen_instr",      label:"Generate Instruction Letter" },
              "sep",
              l.status === "delivered" || l.status === "invoiced" || l.status === "paid"
                ? { act:"bounce",     label:"Bounce to En Route" }
                : { act:"mark_delivered", label:"Mark as Delivered" },
              { act:"cancel",         label:"Cancel Load", danger:true }
            ];
            return `<tr>
              <td>${proCell}</td>
              <td><strong style="font-size:12.5px;">${escapeHtml(l.truckNumber||"—")}</strong></td>
              <td>${carrierCell}</td>
              <td>${customerCell}</td>
              <td>${originCell}</td>
              <td>${destCell}</td>
              <td>${checkCell}</td>
              <td>
                <div class="action-cell">
                  <button class="action-btn" data-load-view="${l.id}" title="View details">${ICONS.eye}</button>
                  <button class="action-btn" data-action-toggle="1" title="Actions">${ICONS.dots}</button>
                  ${buildActionMenu(actionItems).replace('<div class="action-menu">','<div class="action-menu" data-load-actions="'+l.id+'">')}
                </div>
              </td>
            </tr>`;
          }).join("")}
          ${filtered.length === 0 ? `<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:32px;">No loads match the current filters.</td></tr>`:""}
        </tbody>
      </table>
    </div>
  `;

  // Event bindings
  $$(".subtab").forEach(b => b.addEventListener("click", () => {
    state.lbSubtab = b.dataset.sub; renderAll();
  }));
  const ps = $("#page-size-select");
  if(ps) ps.addEventListener("change", e => { state.pageSize = parseInt(e.target.value, 10); renderAll(); });
  const newBtn = $("#btn-new-load");
  if(newBtn) newBtn.addEventListener("click", openNewLoadModal);
  bindColFilters();
  bindActionMenus();
  $$('[data-load-view]').forEach(b => b.addEventListener("click", () => openLoadModal(b.dataset.loadView)));
  // Action menu items
  $$('[data-load-actions] [data-act]').forEach(b => b.addEventListener("click", () => {
    const loadId = b.closest("[data-load-actions]").dataset.loadActions;
    handleLoadAction(loadId, b.dataset.act);
  }));
}

function handleLoadAction(loadId, act){
  const l = loadById(loadId);
  if(!l) return;
  if(act === "edit_load")      { openLoadModal(loadId); return; }
  if(act === "mark_delivered") { l.status = "delivered"; l.boardTab = "delivered"; showToast("Load " + loadId + " marked as Delivered."); renderAll(); return; }
  if(act === "bounce")         { l.status = "en_route"; l.boardTab = "en_route"; showToast("Load " + loadId + " bounced to En Route."); renderAll(); return; }
  if(act === "cancel")         {
    if(confirm("Cancel load " + loadId + "?")){
      const idx = LOADS.indexOf(l);
      if(idx > -1) LOADS.splice(idx, 1);
      showToast("Load " + loadId + " cancelled.");
      renderAll();
    }
    return;
  }
  if(act === "check_call")     { showToast("Check Call panel — not yet implemented in prototype."); return; }
  if(act === "add_note")       { showToast("Add Note panel — not yet implemented in prototype."); return; }
  if(act === "possible_claim") { showToast("Possible Claim flow — not yet implemented in prototype."); return; }
  if(act === "tonu")           { showToast("Marked as TONU."); return; }
  if(act === "documents")      { showToast("Documents panel — not yet implemented in prototype."); return; }
  if(act === "gen_bol")        { showToast("Generated BOL for " + loadId + " (.pdf)."); return; }
  if(act === "gen_ratecon")    { showToast("Generated Rate Confirmation for " + loadId + " (.pdf)."); return; }
  if(act === "gen_instr")      { showToast("Generated Instruction Letter for " + loadId + " (.pdf)."); return; }
  if(act === "edit_dispatch")  { showToast("Edit Dispatch — would open Dispatch module (out of v8 scope)."); return; }
}

function openNewLoadModal(){
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">Post New Load</div>
        <div class="section-sub">Three sections: Info / Origin / Destination</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="modal-tabs">
      <button class="modal-tab active" data-tab="info">Info</button>
      <button class="modal-tab" data-tab="origin">Origin</button>
      <button class="modal-tab" data-tab="destination">Destination</button>
    </div>
    <div id="tab-info" class="modal-tab-pane">
      <div class="form-grid">
        <div class="form-field"><label>Customer <span class="req">*</span></label><select>${CUSTOMERS.map(c => `<option>${escapeHtml(c.commercialName||c.name)}</option>`).join("")}</select></div>
        <div class="form-field"><label>Reference Number</label><input type="text" placeholder="REF-..."></div>
        <div class="form-field"><label>State</label><select><option>Booked</option><option>Posted</option></select></div>
        <div class="form-field"><label>Customer Rate <span class="req">*</span></label><input type="number" placeholder="0"></div>
        <div class="form-field"><label>Carrier</label><select><option value="">— select —</option>${CARRIERS.map(c => `<option>${escapeHtml(c.name)}</option>`).join("")}</select></div>
        <div class="form-field"><label>Carrier / Driver Rate</label><input type="number" placeholder="0"></div>
        <div class="form-field"><label>Truck Type</label><select><option>53' Dry Van</option><option>53' Reefer</option><option>Reefer -10F</option><option>Reefer -2C</option><option>Flatbed</option></select></div>
        <div class="form-field"><label>Load Type</label><select><option>Full Load</option><option>LTL</option></select></div>
        <div class="form-field"><label>Commodity</label><input type="text" placeholder="e.g. Food, Auto parts"></div>
        <div class="form-field"><label>Pallets / Pieces</label><input type="text" placeholder="22 plt / 220 pcs"></div>
        <div class="form-field"><label>Weight</label><input type="text" placeholder="42,000 lb"></div>
        <div class="form-field full"><label>Loads note for carrier</label><textarea rows="2"></textarea></div>
        <div class="form-field full"><label>Note for team only</label><textarea rows="2"></textarea></div>
      </div>
    </div>
    <div id="tab-origin" class="modal-tab-pane" style="display:none;">
      <div class="form-section"><h4>Pickup 1 (PU1)</h4>
        <div class="form-grid">
          <div class="form-field"><label>Country</label><select><option>US</option><option>MX</option></select></div>
          <div class="form-field"><label>Name <span class="req">*</span></label><input type="text"></div>
          <div class="form-field"><label>Street 1</label><input type="text"></div>
          <div class="form-field"><label>Street 2</label><input type="text"></div>
          <div class="form-field"><label>City / State / ZIP</label><input type="text" placeholder="Laredo, TX 78045"></div>
          <div class="form-field"><label>Email</label><input type="email"></div>
          <div class="form-field"><label>Contact Person Name</label><input type="text"></div>
          <div class="form-field"><label>Contact Person Phone</label><input type="text"></div>
          <div class="form-field"><label>PU #</label><input type="text"></div>
          <div class="form-field"><label>Date From / To</label><input type="text" placeholder="Jun 20, 08:00 → 14:00"></div>
          <div class="form-field"><label>Plts / Wt / Pcs</label><input type="text"></div>
          <div class="form-field full"><label>Note</label><textarea rows="2"></textarea></div>
        </div>
      </div>
      <div style="margin-top:14px;"><button class="btn btn-outline" disabled>+ Add another PU</button></div>
    </div>
    <div id="tab-destination" class="modal-tab-pane" style="display:none;">
      <div class="form-section"><h4>Delivery (DEL)</h4>
        <div class="form-grid">
          <div class="form-field"><label>Name <span class="req">*</span></label><input type="text"></div>
          <div class="form-field"><label>Street 1</label><input type="text"></div>
          <div class="form-field"><label>Street 2</label><input type="text"></div>
          <div class="form-field"><label>City / State / ZIP</label><input type="text" placeholder="Las Vegas, NV 89113"></div>
          <div class="form-field"><label>Email</label><input type="email"></div>
          <div class="form-field"><label>Contact Person Name</label><input type="text"></div>
          <div class="form-field"><label>Contact Person Phone</label><input type="text"></div>
          <div class="form-field"><label>Date From / To</label><input type="text" placeholder="Jun 22, 10:00 → 16:00"></div>
          <div class="form-field"><label>Plts / Wt / Pcs</label><input type="text"></div>
          <div class="form-field full"><label>Note</label><textarea rows="2"></textarea></div>
        </div>
      </div>
    </div>

    <div class="btn-row" style="margin-top:18px;justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="submit-new-load">Submit</button>
    </div>
  `, "wide");

  $$('.modal-tab').forEach(t => t.addEventListener("click", () => {
    $$('.modal-tab').forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    $$('.modal-tab-pane').forEach(p => p.style.display = "none");
    $("#tab-" + t.dataset.tab).style.display = "block";
  }));
  $("#submit-new-load").addEventListener("click", () => {
    closeModal();
    showToast("New load submitted. (Prototype: no persistence.)");
  });
}


/* ============================================================
   VIEW: CUSTOMERS (rewrite per legacy CRM spec)
   ============================================================ */
function viewCustomers(){
  const f = state.filters.customers;
  const filtered = CUSTOMERS.filter(c => {
    return fmatch(c.commercialName||c.name, f.commercialName) &&
           fmatch(c.legalName, f.legalName) &&
           fmatch(c.mainPhone, f.mainPhone) &&
           fexact(c.customerType, f.customerType) &&
           fmatch(c.rfcTaxId, f.rfcTaxId) &&
           fmatch(c.street, f.street) &&
           fmatch(c.neighborhood, f.neighborhood) &&
           fmatch((c.city||"") + ", " + (c.state||"") + " " + (c.zip||""), f.cityStateZip) &&
           fmatch(c.country, f.country) &&
           fmatch(c.contactName, f.contactName) &&
           fmatch(c.title, f.title);
  });

  const me = userById(state.me);

  $("#content").innerHTML = `
    <div class="card card-pad" style="margin-bottom:14px">
      <div class="external-source-note">
        ${ICONS.link} Customers originate from <strong>Spreadsheet</strong> → <strong>OTR API</strong> (credit check + limit). Status "Not Verified by OTR" blocks operations.
      </div>
    </div>

    <div class="list-toolbar">
      <div class="list-toolbar-l">
        <button class="btn btn-primary" id="btn-new-customer">+ New Customer</button>
      </div>
      <div class="list-toolbar-r">
        <span class="showing-info">Showing 1-${Math.min(state.pageSize, filtered.length)} of ${filtered.length} items</span>
        <span class="page-size">Show
          <select id="page-size-select">
            <option ${state.pageSize===10?'selected':''}>10</option>
            <option ${state.pageSize===20?'selected':''}>20</option>
            <option ${state.pageSize===50?'selected':''}>50</option>
            <option ${state.pageSize===100?'selected':''}>100</option>
          </select>
          items
        </span>
      </div>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Commercial Name</th>
            <th>Legal Name</th>
            <th>Main Phone</th>
            <th>Customer Type</th>
            <th>RFC / TAX ID</th>
            <th>Street</th>
            <th>Neighborhood</th>
            <th>City / State / Zip</th>
            <th>Country</th>
            <th>Contact Name</th>
            <th>Title</th>
            <th>OTR Status</th>
            <th style="width:90px;">Actions</th>
          </tr>
          <tr class="filter-row">
            <th>${colFilterInput("customers","commercialName","Commercial Name")}</th>
            <th>${colFilterInput("customers","legalName","Legal Name")}</th>
            <th>${colFilterInput("customers","mainPhone","Phone")}</th>
            <th>${colFilterSelect("customers","customerType",CUSTOMER_TYPES)}</th>
            <th>${colFilterInput("customers","rfcTaxId","RFC / TAX ID")}</th>
            <th>${colFilterInput("customers","street","Street")}</th>
            <th>${colFilterInput("customers","neighborhood","")}</th>
            <th>${colFilterInput("customers","cityStateZip","City / State / Zip")}</th>
            <th>${colFilterInput("customers","country","Country")}</th>
            <th>${colFilterInput("customers","contactName","Contact name")}</th>
            <th>${colFilterInput("customers","title","Title")}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${filtered.slice(0, state.pageSize).map(c => {
            const ok = CUSTOMER_STATUS[c.status].opsAllowed;
            const actionItems = [
              { act:"profile", label:"Profile" },
              { act:"edit",    label:"Edit" },
              "sep",
              { act:"delete",  label:"Delete", danger:true }
            ];
            return `<tr ${!ok?'class="row-warn"':''}>
              <td><strong style="color:var(--blue-50);">${escapeHtml(c.commercialName||c.name)}</strong></td>
              <td style="font-size:11.5px;color:var(--text-2);">${escapeHtml(c.legalName||"—")}</td>
              <td style="font-size:11.5px;">${escapeHtml(c.mainPhone||"—")}</td>
              <td><span class="chip-role">${escapeHtml(c.customerType||"—")}</span></td>
              <td style="font-size:11px;color:var(--muted);">${escapeHtml(c.rfcTaxId||"—")}</td>
              <td style="font-size:11.5px;">${escapeHtml(c.street||"—")}</td>
              <td style="font-size:11.5px;color:var(--text-2);">${escapeHtml(c.neighborhood||"—")}</td>
              <td style="font-size:11.5px;">${escapeHtml((c.city||"") + (c.state?", " + c.state:"") + (c.zip?" " + c.zip:""))}</td>
              <td>${escapeHtml(c.country||"—")}</td>
              <td style="font-size:11.5px;">${escapeHtml(c.contactName||"—")}</td>
              <td style="font-size:11px;color:var(--muted);">${escapeHtml(c.title||"—")}</td>
              <td>${customerStatusPill(c.status)}</td>
              <td>
                <div class="action-cell">
                  <button class="action-btn" data-customer-view="${c.id}" title="Profile">${ICONS.eye}</button>
                  <button class="action-btn" data-action-toggle="1" title="Actions">${ICONS.dots}</button>
                  ${buildActionMenu(actionItems).replace('<div class="action-menu">','<div class="action-menu" data-customer-actions="'+c.id+'">')}
                </div>
              </td>
            </tr>`;
          }).join("")}
          ${filtered.length === 0 ? `<tr><td colspan="13" style="text-align:center;color:var(--muted);padding:32px;">No customers match the current filters.</td></tr>`:""}
        </tbody>
      </table>
    </div>
  `;

  $("#btn-new-customer").addEventListener("click", () => openCustomerModal(null));
  const ps = $("#page-size-select");
  if(ps) ps.addEventListener("change", e => { state.pageSize = parseInt(e.target.value, 10); renderAll(); });
  bindColFilters();
  bindActionMenus();
  $$('[data-customer-view]').forEach(b => b.addEventListener("click", () => openCustomerProfile(b.dataset.customerView)));
  $$('[data-customer-actions] [data-act]').forEach(b => b.addEventListener("click", () => {
    const id = b.closest("[data-customer-actions]").dataset.customerActions;
    const act = b.dataset.act;
    if(act === "profile") openCustomerProfile(id);
    else if(act === "edit") openCustomerModal(id);
    else if(act === "delete"){
      if(confirm("Delete customer " + customerById(id).name + "?")){
        const i = CUSTOMERS.findIndex(x => x.id === id);
        if(i > -1) CUSTOMERS.splice(i, 1);
        showToast("Customer archived.");
        renderAll();
      }
    }
  }));
}

function openCustomerProfile(id){
  const c = customerById(id);
  if(!c) return;
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">${escapeHtml(c.commercialName||c.name)} ${customerStatusPill(c.status)}</div>
        <div class="section-sub">${escapeHtml(c.legalName||"")}</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="form-grid" style="margin-top:6px;">
      <div class="form-field"><label>Main phone</label><div>${escapeHtml(c.mainPhone||"—")}</div></div>
      <div class="form-field"><label>Customer type</label><div><span class="chip-role">${escapeHtml(c.customerType||"—")}</span></div></div>
      <div class="form-field"><label>RFC / TAX ID</label><div>${escapeHtml(c.rfcTaxId||"—")}</div></div>
      <div class="form-field"><label>Country</label><div>${escapeHtml(c.country||"—")}</div></div>
      <div class="form-field full"><label>Address</label><div>${escapeHtml(c.street||"")}, ${escapeHtml(c.neighborhood||"")}, ${escapeHtml(c.city||"")} ${escapeHtml(c.state||"")} ${escapeHtml(c.zip||"")}</div></div>
      <div class="form-field"><label>Contact</label><div>${escapeHtml(c.contactName||"—")} <span style="color:var(--muted);">— ${escapeHtml(c.title||"")}</span></div></div>
      <div class="form-field"><label>Contact email / phone</label><div>${escapeHtml(c.contactEmail||"—")} / ${escapeHtml(c.contactPhone||"—")}</div></div>
      <div class="form-field"><label>AP contact</label><div>${escapeHtml(c.apName||"—")} — ${escapeHtml(c.apEmail||"")}</div></div>
      <div class="form-field"><label>Credit limit</label><div>${c.creditLimit ? fmt(c.creditLimit) : "—"}</div></div>
      <div class="form-field"><label>Open invoices</label><div>${c.openInvoices ? fmt(c.openInvoices) : "—"}</div></div>
      <div class="form-field"><label>Credit days</label><div>${c.creditDays || "—"}</div></div>
      <div class="form-field"><label>Type payment</label><div>${escapeHtml(c.typePayment||"—")}</div></div>
      <div class="form-field"><label>OTR verified at</label><div>${escapeHtml(c.otrVerifiedAt||"—")}</div></div>
      <div class="form-field"><label>Source</label><div><span class="chip-src">${escapeHtml(c.source||"—")}</span></div></div>
    </div>
    <div class="btn-row" style="margin-top:18px;justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" id="prof-edit">Edit</button>
    </div>
  `, "wide");
  $("#prof-edit").addEventListener("click", () => { closeModal(); openCustomerModal(id); });
}

function openCustomerModal(id){
  const c = id ? customerById(id) : { commercialName:"", legalName:"", mainPhone:"", customerType:"Direct", rfcTaxId:"", street:"", neighborhood:"", city:"", state:"", zip:"", country:"US", contactName:"", title:"", contactEmail:"", contactPhone:"", apName:"", apPhone:"", apEmail:"", creditDays:30, creditLimit:0, typePayment:"Net 30", status:"not_verified_by_otr" };
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">${id ? "Edit Customer" : "New Customer"}</div>
        <div class="section-sub">Three sections: General / Documents / Sales Info</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="modal-tabs">
      <button class="modal-tab active" data-tab="gen">General</button>
      <button class="modal-tab" data-tab="docs">Documents</button>
      <button class="modal-tab" data-tab="sales">Sales Info</button>
    </div>
    <div id="tab-gen" class="modal-tab-pane">
      <div class="form-section"><h4>Identification</h4>
        <div class="form-grid">
          <div class="form-field"><label>Commercial Name <span class="req">*</span></label><input type="text" value="${escapeHtml(c.commercialName||"")}"></div>
          <div class="form-field"><label>Legal Name <span class="req">*</span></label><input type="text" value="${escapeHtml(c.legalName||"")}"></div>
          <div class="form-field"><label>Main Phone <span class="req">*</span></label><input type="text" value="${escapeHtml(c.mainPhone||"")}"></div>
          <div class="form-field"><label>Customer Type <span class="req">*</span></label>
            <select>${CUSTOMER_TYPES.map(t => `<option ${t===c.customerType?'selected':''}>${t}</option>`).join("")}</select>
          </div>
          <div class="form-field"><label>RFC / TAX ID <span class="req">*</span></label><input type="text" value="${escapeHtml(c.rfcTaxId||"")}"></div>
          <div class="form-field"><label></label><div style="font-size:11px;color:var(--muted);padding-top:8px;">Note: RFC and TAX ID are mutually exclusive.</div></div>
        </div>
      </div>
      <div class="form-section"><h4>Address</h4>
        <div class="form-grid">
          <div class="form-field"><label>Street <span class="req">*</span></label><input type="text" value="${escapeHtml(c.street||"")}"></div>
          <div class="form-field"><label>Neighborhood <span class="req">*</span></label><input type="text" value="${escapeHtml(c.neighborhood||"")}"></div>
          <div class="form-field"><label>City <span class="req">*</span></label><input type="text" value="${escapeHtml(c.city||"")}"></div>
          <div class="form-field"><label>State <span class="req">*</span></label><input type="text" maxlength="3" value="${escapeHtml(c.state||"")}"></div>
          <div class="form-field"><label>Zip <span class="req">*</span></label><input type="text" value="${escapeHtml(c.zip||"")}"></div>
          <div class="form-field"><label>Country <span class="req">*</span></label><input type="text" value="${escapeHtml(c.country||"")}"></div>
        </div>
      </div>
      <div class="form-section"><h4>Contact</h4>
        <div class="form-grid">
          <div class="form-field"><label>Contact Name <span class="req">*</span></label><input type="text" value="${escapeHtml(c.contactName||"")}"></div>
          <div class="form-field"><label>Title</label><input type="text" value="${escapeHtml(c.title||"")}"></div>
          <div class="form-field"><label>Contact Email <span class="req">*</span></label><input type="email" value="${escapeHtml(c.contactEmail||"")}"></div>
          <div class="form-field"><label>Contact Phone <span class="req">*</span></label><input type="text" value="${escapeHtml(c.contactPhone||"")}"></div>
        </div>
      </div>
      <div class="form-section"><h4>Accounts Payable</h4>
        <div class="form-grid">
          <div class="form-field"><label>Name AP <span class="req">*</span></label><input type="text" value="${escapeHtml(c.apName||"")}"></div>
          <div class="form-field"><label>Email AP <span class="req">*</span></label><input type="email" value="${escapeHtml(c.apEmail||"")}"></div>
          <div class="form-field"><label>Phone AP <span class="req">*</span></label><input type="text" value="${escapeHtml(c.apPhone||"")}"></div>
          <div class="form-field"><label>Credit Days <span class="req">*</span></label><input type="number" value="${c.creditDays||30}"></div>
          <div class="form-field"><label>Credit Limit <span class="req">*</span></label><input type="number" value="${c.creditLimit||0}"></div>
          <div class="form-field"><label>Type Payment <span class="req">*</span></label>
            <select><option>Net 30</option><option>Net 60</option><option>Prepaid</option><option>COD</option></select>
          </div>
        </div>
      </div>
    </div>
    <div id="tab-docs" class="modal-tab-pane" style="display:none;">
      <div class="form-section"><h4>Documents</h4>
        <div style="padding:18px;border:2px dashed var(--line);border-radius:var(--radius-card);text-align:center;color:var(--muted);">
          <div style="margin-bottom:6px;">Browse files or drop here</div>
          <button class="btn btn-outline" disabled>Browse</button>
        </div>
        <div class="form-field" style="margin-top:14px;"><label>Description</label><input type="text" placeholder="e.g. W-9, Credit App, Contract"></div>
      </div>
    </div>
    <div id="tab-sales" class="modal-tab-pane" style="display:none;">
      <div class="form-section"><h4>Sales Info</h4>
        <div class="form-grid">
          <div class="form-field"><label>Customer Name (Sales) <span class="req">*</span></label><input type="text" value="${escapeHtml(c.commercialName||"")}"></div>
          <div class="form-field"><label>Rep (CRM User) <span class="req">*</span></label>
            <select>${USERS.filter(u => u.role === "Sales_Rep" || u.role === "Director" || u.role === "Branch_Lead").map(u => `<option>${escapeHtml(userName(u))}</option>`).join("")}</select>
          </div>
          <div class="form-field"><label>Customer Type</label>
            <select>${CUSTOMER_TYPES.map(t => `<option ${t===c.customerType?'selected':''}>${t}</option>`).join("")}</select>
          </div>
          <div class="form-field"><label><input type="checkbox"/> Contract</label></div>
          <div class="form-field"><label><input type="checkbox"/> Id Rep Legal</label></div>
          <div class="form-field"><label><input type="checkbox"/> Credit App Contract Type</label></div>
          <div class="form-field"><label><input type="checkbox"/> SAT / Authority</label></div>
          <div class="form-field"><label><input type="checkbox"/> Proof Of Address</label></div>
          <div class="form-field full"><label>Note</label><textarea rows="3"></textarea></div>
        </div>
      </div>
    </div>

    <div class="btn-row" style="margin-top:18px;justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="submit-customer">${id ? "Save changes" : "Create customer"}</button>
    </div>
  `, "wide");

  $$('.modal-tab').forEach(t => t.addEventListener("click", () => {
    $$('.modal-tab').forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    $$('.modal-tab-pane').forEach(p => p.style.display = "none");
    $("#tab-" + t.dataset.tab).style.display = "block";
  }));
  $("#submit-customer").addEventListener("click", () => {
    closeModal();
    showToast(id ? "Customer updated." : "Customer created. (Prototype: no persistence.)");
  });
}


/* ============================================================
   VIEW: CARRIERS (rewrite per legacy CRM spec)
   ============================================================ */
function viewCarriers(){
  const f = state.filters.carriers;
  const country = state.carriersCountry;
  const list = CARRIERS.filter(c => {
    if(country === "MX") return c.country === "MX";
    return c.country !== "MX"; // US/Canada
  });
  const filtered = list.filter(c => {
    return fmatch(c.name, f.name) &&
           fmatch(c.mc, f.mc) &&
           fmatch(c.dot, f.dot) &&
           fmatch((c.city||"") + ", " + (c.state||"") + " " + (c.zip||""), f.cityStateZip) &&
           fmatch((c.address||"") + " " + (c.neighborhood||""), f.addressNeighborhood) &&
           fmatch(c.personOfContact, f.personOfContact) &&
           fmatch((c.puStates||[]).join(" "), f.puStates) &&
           fmatch((c.delStates||[]).join(" "), f.delStates);
  });

  const counts = {
    US: CARRIERS.filter(c => c.country !== "MX").length,
    MX: CARRIERS.filter(c => c.country === "MX").length
  };

  const allStates = [...new Set(CARRIERS.flatMap(c => [...(c.puStates||[]),...(c.delStates||[])]).filter(Boolean))].sort();

  $("#content").innerHTML = `
    <div class="card card-pad" style="margin-bottom:14px">
      <div class="external-source-note">
        ${ICONS.link} Carriers onboarded via <strong>spreadsheet</strong> → <strong>FMCSA</strong> verification → activated. Insurance and OTR/credit re-checks run periodically.
      </div>
    </div>

    <div class="list-toolbar">
      <div class="list-toolbar-l">
        <button class="btn btn-primary" id="btn-new-carrier">+ New Carrier</button>
      </div>
      <div class="list-toolbar-r">
        <span class="showing-info">Showing 1-${Math.min(state.pageSize, filtered.length)} of ${filtered.length} items</span>
        <span class="page-size">Show
          <select id="page-size-select">
            <option ${state.pageSize===10?'selected':''}>10</option>
            <option ${state.pageSize===20?'selected':''}>20</option>
            <option ${state.pageSize===50?'selected':''}>50</option>
            <option ${state.pageSize===100?'selected':''}>100</option>
          </select>
          items
        </span>
      </div>
    </div>

    <div class="subtabs">
      <button class="subtab ${country==='MX'?'active':''}" data-country="MX">
        MX <span class="subtab-badge">${counts.MX}</span>
      </button>
      <button class="subtab ${country==='US'?'active':''}" data-country="US">
        US / Canada <span class="subtab-badge">${counts.US}</span>
      </button>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>MC</th>
            <th>DOT #</th>
            <th>City / State / Zip</th>
            <th>Address / Neighborhood</th>
            <th>Person of contact</th>
            <th>PU States</th>
            <th>DEL States</th>
            <th style="width:90px;">Actions</th>
          </tr>
          <tr class="filter-row">
            <th>${colFilterInput("carriers","name","Name")}</th>
            <th>${colFilterInput("carriers","mc","MC")}</th>
            <th>${colFilterInput("carriers","dot","DOT #")}</th>
            <th>${colFilterInput("carriers","cityStateZip","City / State / Zip")}</th>
            <th>${colFilterInput("carriers","addressNeighborhood","Address / Neighborhood")}</th>
            <th>${colFilterInput("carriers","personOfContact","Person of contact")}</th>
            <th>${colFilterSelect("carriers","puStates",allStates)}</th>
            <th>${colFilterSelect("carriers","delStates",allStates)}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${filtered.slice(0, state.pageSize).map(c => {
            const actionItems = [
              { act:"profile", label:"Profile" },
              { act:"edit",    label:"Edit" },
              "sep",
              { act:"delete",  label:"Delete", danger:true }
            ];
            return `<tr>
              <td>
                <strong style="color:var(--blue-50);">${escapeHtml(c.name)}</strong>
                <div style="font-size:10px;color:var(--muted);margin-top:2px;">
                  ${c.fmcsaOk ? '<span class="ok-strong">FMCSA ✓</span>' : '<span class="no-strong">FMCSA ✗</span>'}
                  · ${c.otr ? '<span style="color:var(--green-dk);">OTR ✓</span>' : '<span style="color:var(--coral-dk);">No OTR</span>'}
                </div>
              </td>
              <td><span class="mono">${escapeHtml(c.mc||"—")}</span></td>
              <td><span class="mono">${escapeHtml(c.dot||"—")}</span></td>
              <td style="font-size:11.5px;">${escapeHtml((c.city||"") + (c.state?", " + c.state:"") + (c.zip?" " + c.zip:""))}</td>
              <td style="font-size:11.5px;">
                ${escapeHtml(c.address||"—")}
                <div style="font-size:10.5px;color:var(--muted);margin-top:2px;">${escapeHtml(c.neighborhood||"")}</div>
              </td>
              <td style="font-size:11.5px;">${escapeHtml(c.personOfContact||"—")}</td>
              <td style="font-size:11px;">${(c.puStates||[]).map(s => `<span class="chip-role" style="margin-right:2px;">${s}</span>`).join("")}</td>
              <td style="font-size:11px;">${(c.delStates||[]).map(s => `<span class="chip-role" style="margin-right:2px;">${s}</span>`).join("")}</td>
              <td>
                <div class="action-cell">
                  <button class="action-btn" data-carrier-view="${c.id}" title="Profile">${ICONS.eye}</button>
                  <button class="action-btn" data-action-toggle="1" title="Actions">${ICONS.dots}</button>
                  ${buildActionMenu(actionItems).replace('<div class="action-menu">','<div class="action-menu" data-carrier-actions="'+c.id+'">')}
                </div>
              </td>
            </tr>`;
          }).join("")}
          ${filtered.length === 0 ? `<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:32px;">No carriers match the current filters.</td></tr>`:""}
        </tbody>
      </table>
    </div>
  `;

  $$(".subtab").forEach(b => b.addEventListener("click", () => {
    state.carriersCountry = b.dataset.country; renderAll();
  }));
  $("#btn-new-carrier").addEventListener("click", () => openCarrierModal(null));
  const ps = $("#page-size-select");
  if(ps) ps.addEventListener("change", e => { state.pageSize = parseInt(e.target.value, 10); renderAll(); });
  bindColFilters();
  bindActionMenus();
  $$('[data-carrier-view]').forEach(b => b.addEventListener("click", () => openCarrierProfile(b.dataset.carrierView)));
  $$('[data-carrier-actions] [data-act]').forEach(b => b.addEventListener("click", () => {
    const id = b.closest("[data-carrier-actions]").dataset.carrierActions;
    const act = b.dataset.act;
    if(act === "profile") openCarrierProfile(id);
    else if(act === "edit") openCarrierModal(id);
    else if(act === "delete"){
      if(confirm("Delete carrier " + carrierById(id).name + "?")){
        const i = CARRIERS.findIndex(x => x.id === id);
        if(i > -1) CARRIERS.splice(i, 1);
        showToast("Carrier archived.");
        renderAll();
      }
    }
  }));
}

function openCarrierProfile(id){
  const c = carrierById(id);
  if(!c) return;
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">${escapeHtml(c.name)}</div>
        <div class="section-sub">${c.fmcsaOk ? "FMCSA verified" : "FMCSA not verified"} · OTR ${c.otr?"approved":"not approved"} · Rating ${c.rating}</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="form-grid" style="margin-top:6px;">
      <div class="form-field"><label>MC #</label><div><span class="mono">${escapeHtml(c.mc||"—")}</span></div></div>
      <div class="form-field"><label>DOT #</label><div><span class="mono">${escapeHtml(c.dot||"—")}</span></div></div>
      <div class="form-field"><label>Country</label><div>${escapeHtml(c.country||"—")}</div></div>
      <div class="form-field"><label>Insurance</label><div>${escapeHtml(c.insurance||"—")}</div></div>
      <div class="form-field full"><label>Address</label><div>${escapeHtml(c.address||"")}, ${escapeHtml(c.neighborhood||"")}, ${escapeHtml(c.city||"")} ${escapeHtml(c.state||"")} ${escapeHtml(c.zip||"")}</div></div>
      <div class="form-field"><label>Person of contact</label><div>${escapeHtml(c.personOfContact||"—")}</div></div>
      <div class="form-field"><label>Source</label><div><span class="chip-src">${escapeHtml(c.source||"—")}</span></div></div>
      <div class="form-field full"><label>PU States</label><div>${(c.puStates||[]).map(s => `<span class="chip-role" style="margin-right:4px;">${s}</span>`).join("") || "—"}</div></div>
      <div class="form-field full"><label>DEL States</label><div>${(c.delStates||[]).map(s => `<span class="chip-role" style="margin-right:4px;">${s}</span>`).join("") || "—"}</div></div>
    </div>
    <div class="btn-row" style="margin-top:18px;justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" id="prof-edit">Edit</button>
    </div>
  `, "wide");
  $("#prof-edit").addEventListener("click", () => { closeModal(); openCarrierModal(id); });
}

function openCarrierModal(id){
  const c = id ? carrierById(id) : { name:"", country:"US", mc:"", dot:"", city:"", state:"", zip:"", address:"", neighborhood:"", personOfContact:"", puStates:[], delStates:[], insurance:"", fmcsaOk:false, otr:false };
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">${id ? "Edit Carrier" : "New Carrier"}</div>
        <div class="section-sub">Two sections: General / Documents</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="modal-tabs">
      <button class="modal-tab active" data-tab="gen">General</button>
      <button class="modal-tab" data-tab="docs">Documents</button>
    </div>
    <div id="tab-gen" class="modal-tab-pane">
      <div class="form-section"><h4>Identification</h4>
        <div class="form-grid">
          <div class="form-field"><label>Carrier Name <span class="req">*</span></label><input type="text" value="${escapeHtml(c.name||"")}"></div>
          <div class="form-field"><label>Country <span class="req">*</span></label>
            <select><option ${c.country==='US'?'selected':''}>US</option><option ${c.country==='MX'?'selected':''}>MX</option><option ${c.country==='CA'?'selected':''}>Canada</option></select>
          </div>
          <div class="form-field"><label>MC <span class="req">*</span></label><input type="text" maxlength="10" value="${escapeHtml(c.mc||"")}"></div>
          <div class="form-field"><label>DOT <span class="req">*</span></label><input type="text" value="${escapeHtml(c.dot||"")}"></div>
        </div>
      </div>
      <div class="form-section"><h4>Address</h4>
        <div class="form-grid">
          <div class="form-field"><label>Location (City / State) <span class="req">*</span></label><input type="text" value="${escapeHtml((c.city||"") + (c.state?", "+c.state:""))}"></div>
          <div class="form-field"><label>Zip</label><input type="text" value="${escapeHtml(c.zip||"")}"></div>
          <div class="form-field full"><label>Address <span class="req">*</span></label><input type="text" value="${escapeHtml(c.address||"")}"></div>
          <div class="form-field full"><label>Neighborhood</label><input type="text" value="${escapeHtml(c.neighborhood||"")}"></div>
        </div>
      </div>
      <div class="form-section"><h4>Person of Contact</h4>
        <div class="form-grid">
          <div class="form-field"><label>Name <span class="req">*</span></label><input type="text" value="${escapeHtml(c.personOfContact||"")}"></div>
          <div class="form-field"><label>Title</label><input type="text"></div>
          <div class="form-field"><label>Phone <span class="req">*</span></label><input type="text"></div>
          <div class="form-field"><label>Email <span class="req">*</span></label><input type="email"></div>
          <div class="form-field full"><label>Address <span class="req">*</span></label><input type="text"></div>
          <div class="form-field"><label>PU States <span class="req">*</span></label><input type="text" placeholder="TX, NM, CA" value="${(c.puStates||[]).join(', ')}"></div>
          <div class="form-field"><label>DEL States <span class="req">*</span></label><input type="text" placeholder="TX, NV, UT" value="${(c.delStates||[]).join(', ')}"></div>
        </div>
      </div>
    </div>
    <div id="tab-docs" class="modal-tab-pane" style="display:none;">
      <div class="form-section"><h4>Documents</h4>
        <div style="padding:18px;border:2px dashed var(--line);border-radius:var(--radius-card);text-align:center;color:var(--muted);">
          <div style="margin-bottom:6px;">Browse files or drop here (W-9, COI, MC Authority, etc.)</div>
          <button class="btn btn-outline" disabled>Browse</button>
        </div>
        <div class="form-field" style="margin-top:14px;"><label>Description</label><input type="text" placeholder="e.g. COI, MC Authority"></div>
      </div>
    </div>

    <div class="btn-row" style="margin-top:18px;justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="submit-carrier">${id ? "Save changes" : "Create carrier"}</button>
    </div>
  `, "wide");

  $$('.modal-tab').forEach(t => t.addEventListener("click", () => {
    $$('.modal-tab').forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    $$('.modal-tab-pane').forEach(p => p.style.display = "none");
    $("#tab-" + t.dataset.tab).style.display = "block";
  }));
  $("#submit-carrier").addEventListener("click", () => {
    closeModal();
    showToast(id ? "Carrier updated." : "Carrier created. (Prototype: no persistence.)");
  });
}


/* ============================================================
   v8.2 CARRIER OPEN BOARD (rewrite — v6 style + auto-book)
   Two view modes: Broker view (full info, manage bids) and
   Carrier view (anonymized — see lane/equip but no customer
   name and no other bids; submit bids; auto-book if ≤ threshold).
   ============================================================ */

// State additions for Carrier Open Board
state.cbViewAs = "broker";          // broker | carrier
state.cbAsCarrierId = "car1";       // when in carrier view, which carrier we're bidding as
state.cbTab = "all";                // all | posted | bidding | booked
state.cbEquip = "all";
state.cbSearch = "";
state.cbDisplay = "table";          // table | cards
state.cbSort = { key:"pickupDate", dir:"asc" };

// Derived: a load is "bidding" if status=posted AND has pending bids
function loadIsBidding(l){
  return l.status === "posted" && l.bids.some(b => b.status === "pending");
}

function viewCarrierBoard(){
  const isCarrier = state.cbViewAs === "carrier";
  const all = visibleLoads();

  const counts = {
    all:     all.length,
    posted:  all.filter(l => l.status === "posted" && !loadIsBidding(l)).length,
    bidding: all.filter(l => loadIsBidding(l)).length,
    booked:  all.filter(l => l.status === "booked").length
  };

  // Carrier view sees only loads available for bid (posted, including bidding)
  const baseList = isCarrier
    ? all.filter(l => l.status === "posted")
    : all;

  const equips = ["all", ...new Set(baseList.map(l => l.equipment))];

  let filtered = baseList.filter(l => {
    if(!isCarrier){
      if(state.cbTab === "posted"  && !(l.status === "posted" && !loadIsBidding(l))) return false;
      if(state.cbTab === "bidding" && !loadIsBidding(l))                            return false;
      if(state.cbTab === "booked"  && l.status !== "booked")                        return false;
      // "all" passes all
    }
    if(state.cbEquip !== "all" && l.equipment !== state.cbEquip) return false;
    const q = state.cbSearch.toLowerCase();
    if(q){
      const c = customerById(l.customerId);
      const hay = l.id + " " + l.proNumber + " " + l.pickupCity + " " + l.deliveryCity + " " +
                  (isCarrier ? "" : (c.commercialName || c.name));
      if(!hay.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Sort
  const dir = state.cbSort.dir === "asc" ? 1 : -1;
  filtered = [...filtered].sort((a,b) => {
    let av,bv;
    switch(state.cbSort.key){
      case "pro":         av=a.proNumber; bv=b.proNumber; break;
      case "customer":    av=customerById(a.customerId).name; bv=customerById(b.customerId).name; break;
      case "lane":        av=a.pickupCity+a.deliveryCity; bv=b.pickupCity+b.deliveryCity; break;
      case "pickupDate":  av=a.pickupDate; bv=b.pickupDate; break;
      case "equipment":   av=a.equipment; bv=b.equipment; break;
      case "distance":    av=a.distance; bv=b.distance; break;
      case "bids":        av=a.bids.length; bv=b.bids.length; break;
      case "customerRate":av=a.customerRate||0; bv=b.customerRate||0; break;
      case "threshold":   av=a.autoBookThreshold||0; bv=b.autoBookThreshold||0; break;
      case "status":      av=a.status; bv=b.status; break;
      default:            av=a.id; bv=b.id;
    }
    return typeof av === "string" ? av.localeCompare(bv) * dir : (av-bv) * dir;
  });

  const me = userById(state.me);
  const canPost = me.role !== "Ops_Specialist";

  $("#content").innerHTML = `
    <div class="cb-view-banner ${isCarrier?'carrier':''}">
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
        <div class="role-toggle">
          <button class="${!isCarrier?'active':''}" id="cb-mode-broker">Broker view</button>
          <button class="${isCarrier?'active':''}" id="cb-mode-carrier">Carrier view</button>
        </div>
        <span style="font-size:12px;color:var(--muted);">
          ${isCarrier
            ? "You see the board as a carrier looking to bid. Customer names and other bids are hidden. Bid ≤ auto-book threshold and the load is yours instantly."
            : "You see the board as the broker — full info, all bids, can post new loads."}
        </span>
      </div>
      ${isCarrier ? `
        <div class="field-inline">
          <label>Bidding as</label>
          <select id="cb-as-carrier" class="select-base" style="min-width:220px">
            ${CARRIERS.filter(c => c.fmcsaOk).map(c => `<option value="${c.id}" ${state.cbAsCarrierId===c.id?'selected':''}>${escapeHtml(c.name)} · ${escapeHtml(c.mc)}</option>`).join("")}
          </select>
        </div>
      ` : ""}
    </div>

    <div class="cb-toolbar">
      ${!isCarrier ? `
        <div class="cb-tabs">
          ${[["all","All"],["posted","Posted"],["bidding","Bidding"],["booked","Booked"]].map(([k,lab]) => `
            <button class="cb-tab ${state.cbTab===k?'active':''}" data-cb-tab="${k}">
              ${lab} <span class="count">${counts[k]}</span>
            </button>`).join("")}
        </div>
      ` : `
        <div style="font-size:13px;font-weight:600;color:var(--text)">${filtered.length} available load${filtered.length===1?'':'s'}</div>
      `}
      <div class="cb-filters">
        <div class="field-inline">
          <label>Equipment</label>
          <select id="cb-equip" class="select-base">
            ${equips.map(e => `<option value="${escapeHtml(e)}" ${state.cbEquip===e?'selected':''}>${e==='all'?'All equipment':escapeHtml(e)}</option>`).join("")}
          </select>
        </div>
        <div class="field-inline">
          <label>Search</label>
          <input type="text" id="cb-search" class="select-base" style="min-width:180px;" placeholder="${isCarrier?'PRO, lane...':'PRO, customer, lane...'}" value="${escapeHtml(state.cbSearch)}" />
        </div>
        <div class="cb-view-mode">
          <button class="${state.cbDisplay==='table'?'active':''}" id="cb-disp-table">Table</button>
          <button class="${state.cbDisplay==='cards'?'active':''}" id="cb-disp-cards">Cards</button>
        </div>
        ${!isCarrier && canPost ? `<button class="btn btn-primary" id="cb-post-new">+ Post a load</button>` : ""}
      </div>
    </div>

    ${filtered.length === 0
      ? `<div class="card card-pad" style="text-align:center;padding:40px;color:var(--muted);font-size:13px">No loads match the current filters.</div>`
      : state.cbDisplay === "table"
        ? renderCarrierBoardTable(filtered, isCarrier)
        : `<div class="cb-grid">${filtered.map(l => renderCarrierBoardCard(l, isCarrier)).join("")}</div>`
    }
  `;

  // Event bindings
  $("#cb-mode-broker") && $("#cb-mode-broker").addEventListener("click", () => { state.cbViewAs = "broker"; renderAll(); });
  $("#cb-mode-carrier") && $("#cb-mode-carrier").addEventListener("click", () => { state.cbViewAs = "carrier"; renderAll(); });
  const asSel = $("#cb-as-carrier"); if(asSel) asSel.addEventListener("change", e => { state.cbAsCarrierId = e.target.value; renderAll(); });
  $$('[data-cb-tab]').forEach(b => b.addEventListener("click", () => { state.cbTab = b.dataset.cbTab; renderAll(); }));
  $("#cb-equip") && $("#cb-equip").addEventListener("change", e => { state.cbEquip = e.target.value; renderAll(); });
  const srch = $("#cb-search"); if(srch){
    srch.addEventListener("input", e => {
      state.cbSearch = e.target.value;
      renderAll();
      const r = $("#cb-search"); if(r){ r.focus(); r.setSelectionRange(r.value.length,r.value.length); }
    });
  }
  $("#cb-disp-table") && $("#cb-disp-table").addEventListener("click", () => { state.cbDisplay = "table"; renderAll(); });
  $("#cb-disp-cards") && $("#cb-disp-cards").addEventListener("click", () => { state.cbDisplay = "cards"; renderAll(); });
  $("#cb-post-new") && $("#cb-post-new").addEventListener("click", openNewLoadModal);
  $$('.cb-table th[data-sort]').forEach(th => th.addEventListener("click", () => {
    const k = th.dataset.sort;
    if(state.cbSort.key === k) state.cbSort.dir = state.cbSort.dir === "asc" ? "desc" : "asc";
    else { state.cbSort.key = k; state.cbSort.dir = "asc"; }
    renderAll();
  }));
  $$('[data-cb-load]').forEach(b => b.addEventListener("click", () => {
    if(isCarrier) openLoadModal(b.dataset.cbLoad, "carrier");
    else openLoadModal(b.dataset.cbLoad, "broker");
  }));
  $$('[data-cb-bid]').forEach(b => b.addEventListener("click", e => { e.stopPropagation(); openBidModal(b.dataset.cbBid, isCarrier); }));
}

function renderCarrierBoardTable(loads, isCarrier){
  const sortIcon = key => state.cbSort.key === key ? `<span class="sort-ind">${state.cbSort.dir==='asc'?'↑':'↓'}</span>` : '';
  return `
    <div class="table-wrap">
      <table class="cb-table data-table">
        <thead>
          <tr>
            <th data-sort="pro">PRO ${sortIcon("pro")}</th>
            ${!isCarrier ? `<th data-sort="customer">Customer ${sortIcon("customer")}</th>` : ""}
            <th data-sort="lane">Lane ${sortIcon("lane")}</th>
            <th data-sort="pickupDate">Pickup ${sortIcon("pickupDate")}</th>
            <th>Delivery</th>
            <th data-sort="equipment">Equipment ${sortIcon("equipment")}</th>
            <th data-sort="distance">Miles ${sortIcon("distance")}</th>
            ${!isCarrier ? `
              <th data-sort="customerRate" class="num">Cust rate ${sortIcon("customerRate")}</th>
              <th data-sort="threshold" class="num">Auto-book ≤ ${sortIcon("threshold")}</th>
              <th data-sort="bids" class="num">Bids ${sortIcon("bids")}</th>
              <th data-sort="status">Status ${sortIcon("status")}</th>
            ` : `
              <th>Weight</th>
              <th>Commodity</th>
              <th class="num">Auto-book ≤</th>
              <th>Your bid</th>
            `}
          </tr>
        </thead>
        <tbody>
          ${loads.map(l => renderCarrierBoardRow(l, isCarrier)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCarrierBoardRow(l, isCarrier){
  const c = customerById(l.customerId);
  const carrierAcc = l.acceptedBidId ? carrierById(l.bids.find(b => b.id === l.acceptedBidId).carrierId) : null;
  const myBid = isCarrier ? l.bids.find(b => b.carrierId === state.cbAsCarrierId) : null;
  const wouldAuto = l.bids.some(b => b.status === "pending" && b.rate <= l.autoBookThreshold);
  const statusEl = loadIsBidding(l) ? pillRender("Bidding", "#E0A130", "#FBF3DF") : loadStatusPill(l.status);
  return `<tr data-cb-load="${l.id}" style="cursor:pointer;">
    <td><span class="mono">${escapeHtml(l.proNumber)}</span></td>
    ${!isCarrier ? `<td>${escapeHtml(c.commercialName || c.name)}</td>` : ""}
    <td><span class="lane-pair">${escapeHtml(l.pickupCity)}, ${escapeHtml(l.pickupState)} → ${escapeHtml(l.deliveryCity)}, ${escapeHtml(l.deliveryState)}</span></td>
    <td style="font-size:12px;">${escapeHtml(l.pickupDate)}</td>
    <td style="font-size:12px;">${escapeHtml(l.deliveryDate||"—")}</td>
    <td><span class="chip-eq">${escapeHtml(l.equipment)}</span></td>
    <td class="num" style="font-size:12px;">${l.distance}</td>
    ${!isCarrier ? `
      <td class="num">${l.customerRate?fmt(l.customerRate):"—"}</td>
      <td class="num">${l.autoBookThreshold?fmt(l.autoBookThreshold):"—"} ${wouldAuto ? '<span class="bolt-tag">auto-ready</span>' : ''}</td>
      <td class="num">${l.bids.length}</td>
      <td>${statusEl}</td>
    ` : `
      <td style="font-size:12px;">${escapeHtml(l.weight||"—")}</td>
      <td style="font-size:12px;">${escapeHtml(l.commodity||"—")}</td>
      <td class="num">${l.autoBookThreshold?fmt(l.autoBookThreshold):"—"}</td>
      <td>${myBid
        ? (myBid.status === "accepted" ? pillRender("Won @ "+fmt(myBid.rate), "#3FA876", "#E8F5EE")
           : myBid.status === "lost"   ? pillRender("Lost", "#9CA3AF", "#F1F3F5")
           : pillRender("Pending @ "+fmt(myBid.rate), "#E0A130", "#FBF3DF"))
        : (l.status === "posted"
            ? '<button class="btn-link" data-cb-bid="'+l.id+'">+ Submit bid</button>'
            : '<span style="color:var(--muted);">—</span>')}</td>
    `}
  </tr>`;
}

function renderCarrierBoardCard(l, isCarrier){
  const c = customerById(l.customerId);
  const myBid = isCarrier ? l.bids.find(b => b.carrierId === state.cbAsCarrierId) : null;
  const wouldAuto = l.bids.some(b => b.status === "pending" && b.rate <= l.autoBookThreshold);
  return `<div class="cb-card" data-cb-load="${l.id}">
    <div class="cb-card-h">
      <div>
        <div class="mono" style="font-size:12px;color:var(--muted);">${escapeHtml(l.proNumber)}</div>
        <div style="font-weight:600;color:var(--blue-50);font-size:13px;margin-top:2px;">${isCarrier ? '<span style="color:var(--muted);">Customer hidden</span>' : escapeHtml(c.commercialName||c.name)}</div>
      </div>
      <div>${loadIsBidding(l) ? pillRender("Bidding", "#E0A130", "#FBF3DF") : loadStatusPill(l.status)}</div>
    </div>
    <div class="cb-card-lane">
      <div><strong>${escapeHtml(l.pickupCity)}, ${escapeHtml(l.pickupState)}</strong> <span style="color:var(--muted);">${escapeHtml(l.pickupDate)}</span></div>
      <div style="color:var(--blue-30);text-align:center;margin:2px 0;">↓ ${l.distance} mi</div>
      <div><strong>${escapeHtml(l.deliveryCity)}, ${escapeHtml(l.deliveryState)}</strong> <span style="color:var(--muted);">${escapeHtml(l.deliveryDate||"—")}</span></div>
    </div>
    <div class="cb-card-meta">
      <div><span>Equipment</span><strong>${escapeHtml(l.equipment)}</strong></div>
      <div><span>Weight</span><strong>${escapeHtml(l.weight||"—")}</strong></div>
      <div><span>Commodity</span><strong>${escapeHtml(l.commodity||"—")}</strong></div>
      ${!isCarrier ? `
        <div><span>Customer rate</span><strong>${l.customerRate?fmt(l.customerRate):"—"}</strong></div>
        <div><span>Auto-book ≤</span><strong>${l.autoBookThreshold?fmt(l.autoBookThreshold):"—"} ${wouldAuto?'<span class="bolt-tag">ready</span>':''}</strong></div>
        <div><span>Bids</span><strong>${l.bids.length}</strong></div>
      ` : `
        <div><span>Auto-book ≤</span><strong>${l.autoBookThreshold?fmt(l.autoBookThreshold):"—"}</strong></div>
        <div><span>Your bid</span><strong>${myBid ? (myBid.status+" @ "+fmt(myBid.rate)) : "—"}</strong></div>
        <div></div>
      `}
    </div>
    ${isCarrier && l.status === "posted" && !myBid ? `
      <div style="margin-top:10px;text-align:right;">
        <button class="btn btn-primary" data-cb-bid="${l.id}" style="padding:6px 14px;font-size:12px;">+ Submit bid</button>
      </div>
    ` : ""}
  </div>`;
}

function openCarrierLoadModal(loadId, isCarrier){
  // For prototype just reuse the existing load modal in broker mode;
  // in carrier mode show anonymized version
  const l = loadById(loadId);
  if(!l) return;
  if(!isCarrier){ openLoadModal(loadId); return; }
  // Carrier-anonymized view
  const myBid = l.bids.find(b => b.carrierId === state.cbAsCarrierId);
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h"><span class="mono">${escapeHtml(l.proNumber)}</span></div>
        <div class="section-sub">${escapeHtml(l.pickupCity)}, ${escapeHtml(l.pickupState)} → ${escapeHtml(l.deliveryCity)}, ${escapeHtml(l.deliveryState)} · ${l.distance} mi</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="form-grid" style="margin-top:6px;">
      <div class="form-field"><label>Pickup</label><div>${escapeHtml(l.pickupDate)}</div></div>
      <div class="form-field"><label>Delivery</label><div>${escapeHtml(l.deliveryDate||"—")}</div></div>
      <div class="form-field"><label>Equipment</label><div>${escapeHtml(l.equipment)}</div></div>
      <div class="form-field"><label>Weight</label><div>${escapeHtml(l.weight||"—")}</div></div>
      <div class="form-field"><label>Pallets / Pieces</label><div>${escapeHtml(l.pieces||"—")}</div></div>
      <div class="form-field"><label>Commodity</label><div>${escapeHtml(l.commodity||"—")}</div></div>
      <div class="form-field"><label>Requirements</label><div>${escapeHtml(l.requirements||"—")}</div></div>
      <div class="form-field"><label>Auto-book threshold</label><div><strong style="color:var(--green-dk);">${fmt(l.autoBookThreshold)}</strong></div></div>
    </div>
    <div class="card card-soft" style="margin-top:14px;">
      <div class="section-sub" style="color:var(--muted);">Customer name, customer rate and other carriers' bids are hidden from carrier-side view.</div>
    </div>
    ${myBid ? `
      <div class="card card-soft" style="margin-top:14px;">
        <div class="section-h">Your bid</div>
        <div class="kv">
          <div><span>Rate</span><strong>${fmt(myBid.rate)}</strong></div>
          <div><span>Submitted</span><strong>${escapeHtml(myBid.at)}</strong></div>
          <div><span>Status</span><strong>${escapeHtml(myBid.status)}</strong></div>
        </div>
      </div>
    ` : (l.status === "posted" ? `
      <div class="btn-row" style="margin-top:14px;justify-content:flex-end;">
        <button class="btn btn-primary" id="bid-from-modal">+ Submit bid</button>
      </div>
    ` : "")}
  `, "wide");
  if($("#bid-from-modal")) $("#bid-from-modal").addEventListener("click", () => { closeModal(); openBidModal(loadId, true); });
}

// Override openBidModal to support carrier-view (preselects the cbAsCarrier)
function openBidModal(loadId, isCarrierView){
  const l = loadById(loadId);
  if(!l) return;
  const lockedCarrier = isCarrierView ? state.cbAsCarrierId : null;
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">Submit bid · ${escapeHtml(l.proNumber)}</div>
        <div class="section-sub">${escapeHtml(l.pickupCity)}, ${escapeHtml(l.pickupState)} → ${escapeHtml(l.deliveryCity)}, ${escapeHtml(l.deliveryState)} · Auto-book ≤ ${fmt(l.autoBookThreshold)}</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="form-section">
      <div class="form-grid">
        <div class="form-field"><label>Carrier <span class="req">*</span></label>
          <select id="bid-carrier" ${lockedCarrier?'disabled':''}>
            ${CARRIERS.filter(c => c.fmcsaOk).map(c => `<option value="${c.id}" ${lockedCarrier===c.id?'selected':''}>${escapeHtml(c.name)} · ${escapeHtml(c.mc)}</option>`).join("")}
          </select>
        </div>
        <div class="form-field"><label>Bid rate ($) <span class="req">*</span></label><input type="number" id="bid-rate" value="${l.autoBookThreshold}"/></div>
        ${!isCarrierView ? `<div class="form-field full"><label>Internal note</label><input type="text" id="bid-note" placeholder="Truck location, equipment notes..."/></div>` : `<div class="form-field full"><label>Note to broker (optional)</label><input type="text" id="bid-note" placeholder="Truck location, ETA, etc."/></div>`}
      </div>
    </div>
    <div class="autobook-hint">
      ⚡ If your bid ≤ ${fmt(l.autoBookThreshold)}, the load is assigned to this carrier automatically. Notifications go to broker, carrier, customer-rep and ops.
    </div>
    <div class="btn-row" style="margin-top:16px;justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="submit-bid">Submit bid</button>
    </div>
  `);

  $("#submit-bid").addEventListener("click", () => {
    const rate = parseInt($("#bid-rate").value, 10);
    const carrierId = lockedCarrier || $("#bid-carrier").value;
    const note = ($("#bid-note") && $("#bid-note").value) || "";
    const bidId = "bid" + Date.now();
    const wouldAuto = rate <= l.autoBookThreshold;
    l.bids.push({ id:bidId, carrierId, rate, note, at:"just now", status: wouldAuto ? "accepted" : "pending" });
    if(wouldAuto){
      l.acceptedBidId = bidId;
      l.actualBuyRate = rate;
      l.grossProfit = (l.customerRate || 0) - rate;
      l.status = "booked";
      l.autoBooked = true;
      l.bids.filter(b => b.id !== bidId).forEach(b => b.status = "lost");
      const car = carrierById(carrierId);
      closeModal();
      showToast("⚡ Auto-booked " + l.proNumber + " to " + car.name + " at " + fmt(rate) + ". Notifications sent to all participants.");
    } else {
      closeModal();
      showToast("Bid submitted at " + fmt(rate) + ". Awaiting Carrier Rep review.");
    }
    renderAll();
  });
}


/* ============================================================
   v8.2 CUSTOMER OPEN BOARD (rewrite — symmetric to Carrier Board)
   Two view modes:
   - Customer Sales view: WE see incoming customer requests,
     quote them, on accept → spawn Load on Load Board
   - Customer view: a CUSTOMER posts a load request, sees
     status of their posts, can accept/decline our quote.
   OTR-blocked customers cannot post (no access).
   ============================================================ */

state.cuViewAs = "sales";              // sales | customer
state.cuActAsId = "cu1";               // when in customer view, which customer
state.cuTab = "all";                   // all | awaiting_quote | quoted | confirmed
state.cuSearch = "";

// Get requests filtered to exclude any from OTR-blocked customers (system invariant).
function safeRequests(){
  return CUSTOMER_REQUESTS.filter(r => {
    const c = customerById(r.customerId);
    return c && CUSTOMER_STATUS[c.status].opsAllowed;
  });
}

function viewCustomerBoard(){
  const isCustomer = state.cuViewAs === "customer";
  if(isCustomer){
    renderCustomerSelfView();
  } else {
    renderCustomerSalesView();
  }
}

/* ---------- Customer Sales view (our broker side) ---------- */
function renderCustomerSalesView(){
  const all = safeRequests();
  const visible = (function(){
    const me = userById(state.me);
    if(me.rbac === "gm") return all;
    if(me.rbac === "manager"){
      return all.filter(r => {
        const rep = userById(r.assignedSalesRepId);
        return rep && rep.branchId === me.branchId;
      });
    }
    return all.filter(r => r.assignedSalesRepId === me.id);
  })();

  const counts = {
    all:            visible.length,
    awaiting_quote: visible.filter(r => r.status === "awaiting_quote").length,
    quoted:         visible.filter(r => r.status === "quoted").length,
    confirmed:      visible.filter(r => r.status === "confirmed").length
  };

  let filtered = visible.filter(r => {
    if(state.cuTab !== "all" && r.status !== state.cuTab) return false;
    if(state.cuSearch){
      const c = customerById(r.customerId);
      const hay = (c.commercialName||c.name) + " " + r.pickupCity + " " + r.deliveryCity + " " + r.id;
      if(!hay.toLowerCase().includes(state.cuSearch.toLowerCase())) return false;
    }
    return true;
  });

  $("#content").innerHTML = `
    <div class="cb-view-banner">
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
        <div class="role-toggle">
          <button class="active" id="cu-mode-sales">Customer Sales view</button>
          <button id="cu-mode-customer">Customer view</button>
        </div>
        <span style="font-size:12px;color:var(--muted);">You see all incoming load requests from verified customers. Quote them and on confirm the load is created on Load Board.</span>
      </div>
      ${rbacBadge()}
    </div>

    <div class="cb-toolbar">
      <div class="cb-tabs">
        ${[["all","All"],["awaiting_quote","Awaiting quote"],["quoted","Quoted"],["confirmed","Confirmed"]].map(([k,lab]) => `
          <button class="cb-tab ${state.cuTab===k?'active':''}" data-cu-tab="${k}">
            ${lab} <span class="count">${counts[k]}</span>
          </button>`).join("")}
      </div>
      <div class="cb-filters">
        <div class="field-inline">
          <label>Search</label>
          <input type="text" id="cu-search" class="select-base" style="min-width:220px;" placeholder="Customer, lane, request ID..." value="${escapeHtml(state.cuSearch)}" />
        </div>
      </div>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Posted</th>
            <th>Customer</th>
            <th>Lane</th>
            <th>Pickup</th>
            <th>Equipment</th>
            <th>Weight</th>
            <th class="num">Customer expected</th>
            <th class="num">Our quote</th>
            <th>Sales Rep</th>
            <th>Status</th>
            <th style="width:170px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(r => {
            const c = customerById(r.customerId);
            const rep = userById(r.assignedSalesRepId);
            const statusEl =
              r.status === "awaiting_quote" ? pillRender("Awaiting quote", "#E0A130", "#FBF3DF") :
              r.status === "quoted"         ? pillRender("Quoted", "#5A96CC", "#E5EFF8") :
              r.status === "confirmed"      ? pillRender("Confirmed", "#3FA876", "#E8F5EE") :
                                              pillRender(r.status, "#6B7280", "#F1F3F5");
            return `<tr>
              <td style="font-size:11.5px;">${escapeHtml(r.postedAt)}</td>
              <td>
                <strong style="color:var(--blue-50);font-size:12.5px;">${escapeHtml(c.commercialName||c.name)}</strong>
                <div style="font-size:10px;color:var(--muted);margin-top:2px;">${escapeHtml(c.customerType||"")} · Credit ${c.creditLimit?fmt(c.creditLimit):"—"}</div>
              </td>
              <td><span class="lane-pair">${escapeHtml(r.pickupCity)}, ${escapeHtml(r.pickupState)} → ${escapeHtml(r.deliveryCity)}, ${escapeHtml(r.deliveryState)}</span></td>
              <td style="font-size:11.5px;">${escapeHtml(r.pickupDate)}</td>
              <td><span class="chip-eq">${escapeHtml(r.equipment)}</span></td>
              <td style="font-size:11.5px;">${escapeHtml(r.weight)}</td>
              <td class="num">${fmt(r.customerExpectedRate)}</td>
              <td class="num">${r.quotedRate ? fmt(r.quotedRate) : "—"}</td>
              <td style="font-size:11.5px;">${rep ? escapeHtml(userName(rep)) : "—"}</td>
              <td>${statusEl}</td>
              <td>
                <button class="btn-link" data-cu-open="${r.id}">View</button>
                ${r.status === "awaiting_quote" ? `<button class="btn-link" style="color:var(--green-dk);" data-cu-quote="${r.id}">Send quote</button>` : ""}
                ${r.status === "quoted" ? `<button class="btn-link" data-cu-quote="${r.id}">Edit quote</button>` : ""}
              </td>
            </tr>`;
          }).join("")}
          ${filtered.length === 0 ? `<tr><td colspan="11" style="text-align:center;color:var(--muted);padding:32px;">No requests match the current filters.</td></tr>`:""}
        </tbody>
      </table>
    </div>
  `;

  $("#cu-mode-customer").addEventListener("click", () => { state.cuViewAs = "customer"; renderAll(); });
  $$('[data-cu-tab]').forEach(b => b.addEventListener("click", () => { state.cuTab = b.dataset.cuTab; renderAll(); }));
  const srch = $("#cu-search"); if(srch){
    srch.addEventListener("input", e => {
      state.cuSearch = e.target.value;
      renderAll();
      const r = $("#cu-search"); if(r){ r.focus(); r.setSelectionRange(r.value.length,r.value.length); }
    });
  }
  $$('[data-cu-open]').forEach(b => b.addEventListener("click", () => openRequestModal(b.dataset.cuOpen, "sales")));
  $$('[data-cu-quote]').forEach(b => b.addEventListener("click", () => openQuoteModal(b.dataset.cuQuote)));
}

/* ---------- Customer view (the customer's own side) ---------- */
function renderCustomerSelfView(){
  // List of customers the user can "act as"
  const eligible = CUSTOMERS;
  const actAs = customerById(state.cuActAsId) || eligible[0];
  state.cuActAsId = actAs.id;
  const otrOk = CUSTOMER_STATUS[actAs.status].opsAllowed;

  // Their own requests
  const myReqs = CUSTOMER_REQUESTS.filter(r => r.customerId === actAs.id);

  $("#content").innerHTML = `
    <div class="cb-view-banner carrier">
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
        <div class="role-toggle">
          <button id="cu-mode-sales" class="${state.cuViewAs==='sales'?'active':''}">Customer Sales view</button>
          <button id="cu-mode-customer" class="${state.cuViewAs!=='sales'?'active':''}">Customer view</button>
        </div>
        <span style="font-size:12px;color:var(--muted);">You see the board as the customer. You can post a load and see our broker's quotes on your posts.</span>
      </div>
      <div class="field-inline">
        <label>Acting as customer</label>
        <select id="cu-act-as" class="select-base" style="min-width:240px;">
          ${eligible.map(c => `<option value="${c.id}" ${actAs.id===c.id?'selected':''}>${escapeHtml(c.commercialName||c.name)} ${CUSTOMER_STATUS[c.status].opsAllowed?'':'(blocked)'}</option>`).join("")}
        </select>
      </div>
    </div>

    ${!otrOk ? `
      <div class="otr-block" style="margin-bottom:18px;">
        ${ICONS.warn}
        <div>
          <strong>Account ${CUSTOMER_STATUS[actAs.status].label}.</strong>
          You cannot post loads or interact with the board. Please contact our team to complete OTR verification and credit assessment. Until your status changes, you will not see the posting interface.
        </div>
      </div>
    ` : `
      <div class="card card-pad" style="margin-bottom:14px;">
        <div class="row" style="justify-content:space-between;">
          <div>
            <div class="section-h">Hello, ${escapeHtml(actAs.commercialName||actAs.name)}</div>
            <div class="section-sub">Credit limit ${fmt(actAs.creditLimit)} · Available ${fmt(Math.max(0, actAs.creditLimit - actAs.openInvoices))} · OTR verified ${escapeHtml(actAs.otrVerifiedAt||"—")}</div>
          </div>
          <button class="btn btn-primary" id="cu-post-load">+ Post a load request</button>
        </div>
      </div>

      <div class="card card-pad">
        <div class="section-h">Your load requests (${myReqs.length})</div>
        <div class="section-sub" style="margin-bottom:12px;">Status updates as our broker quotes and confirms.</div>
        ${myReqs.length === 0
          ? `<div style="text-align:center;color:var(--muted);padding:24px;font-size:13px;">You have no posted load requests yet. Click "+ Post a load request" above to start.</div>`
          : `<table class="data-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Lane</th>
                  <th>Pickup</th>
                  <th>Equipment</th>
                  <th class="num">Weight</th>
                  <th class="num">Your expected</th>
                  <th class="num">Our quote</th>
                  <th>Status</th>
                  <th style="width:120px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${myReqs.map(r => {
                  const statusEl =
                    r.status === "awaiting_quote" ? pillRender("Awaiting quote", "#E0A130", "#FBF3DF") :
                    r.status === "quoted"         ? pillRender("Quote received", "#5A96CC", "#E5EFF8") :
                    r.status === "confirmed"      ? pillRender("Confirmed", "#3FA876", "#E8F5EE") :
                                                    pillRender(r.status, "#6B7280", "#F1F3F5");
                  return `<tr>
                    <td><span class="mono">${escapeHtml(r.id)}</span></td>
                    <td><span class="lane-pair">${escapeHtml(r.pickupCity)}, ${escapeHtml(r.pickupState)} → ${escapeHtml(r.deliveryCity)}, ${escapeHtml(r.deliveryState)}</span></td>
                    <td>${escapeHtml(r.pickupDate)}</td>
                    <td><span class="chip-eq">${escapeHtml(r.equipment)}</span></td>
                    <td class="num">${escapeHtml(r.weight)}</td>
                    <td class="num">${fmt(r.customerExpectedRate)}</td>
                    <td class="num">${r.quotedRate ? fmt(r.quotedRate) : "—"}</td>
                    <td>${statusEl}</td>
                    <td>
                      <button class="btn-link" data-cu-open="${r.id}">View</button>
                      ${r.status === "quoted" ? `<button class="btn-link" data-cu-accept="${r.id}">Accept</button>` : ""}
                    </td>
                  </tr>`;
                }).join("")}
              </tbody>
            </table>`
        }
      </div>
    `}
  `;

  $("#cu-mode-sales").addEventListener("click", () => { state.cuViewAs = "sales"; renderAll(); });
  $("#cu-mode-customer").addEventListener("click", () => { state.cuViewAs = "customer"; renderAll(); });
  $("#cu-act-as").addEventListener("change", e => { state.cuActAsId = e.target.value; renderAll(); });
  const postBtn = $("#cu-post-load");
  if(postBtn) postBtn.addEventListener("click", () => openCustomerPostModal(actAs.id));
  $$('[data-cu-open]').forEach(b => b.addEventListener("click", () => openRequestModal(b.dataset.cuOpen, state.cuViewAs || "customer")));
  $$('[data-cu-accept]').forEach(b => b.addEventListener("click", () => {
    const r = requestById(b.dataset.cuAccept);
    r.status = "confirmed";
    // Spawn a Load on Load Board
    const sr = userById(r.assignedSalesRepId);
    const newLoadId = "L" + (17517 + LOADS.length);
    LOADS.push({
      id: newLoadId, customerId: r.customerId,
      salesRepId: r.assignedSalesRepId,
      carrierRepId: sr.branchId === "br_il" ? "u_linda" : "u_alex",
      opsId: sr.branchId === "br_il" ? "u_eli" : "u_olivia",
      pickupCity: r.pickupCity, pickupState: r.pickupState,
      deliveryCity: r.deliveryCity, deliveryState: r.deliveryState,
      pickupDate: r.pickupDate, deliveryDate: "—",
      equipment: r.equipment, weight: r.weight, pieces: "—", commodity: r.commodity, distance: 0,
      requirements: r.customerNote,
      customerRate: r.quotedRate, recommendedRate: Math.round(r.quotedRate*0.82), autoBookThreshold: Math.round(r.quotedRate*0.80),
      actualBuyRate: null, grossProfit: null, status: "posted",
      bids: [], acceptedBidId: null, rateConSent: false, autoBooked: false, collectedAt: null, chats: {},
      proNumber: "PRO-NEW-" + LOADS.length, truckNumber:"—", driverName:"—", carrierName:"—",
      customerRef:"REF-NEW", checkCallLast:"Posted to board."
    });
    showToast("Quote accepted. Load " + newLoadId + " created on Load Board.");
    renderAll();
  }));
  $$('[data-cu-decline]').forEach(b => b.addEventListener("click", () => {
    const r = requestById(b.dataset.cuDecline);
    r.status = "declined";
    showToast("Quote declined.");
    renderAll();
  }));
}

function openQuoteModal(reqId){
  const r = requestById(reqId);
  const c = customerById(r.customerId);
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">Quote request ${escapeHtml(r.id)}</div>
        <div class="section-sub">${escapeHtml(c.commercialName||c.name)} · ${escapeHtml(r.pickupCity)}, ${escapeHtml(r.pickupState)} → ${escapeHtml(r.deliveryCity)}, ${escapeHtml(r.deliveryState)}</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="form-grid" style="margin-top:6px;">
      <div class="form-field"><label>Customer expected</label><div>${fmt(r.customerExpectedRate)}</div></div>
      <div class="form-field"><label>Equipment</label><div>${escapeHtml(r.equipment)}</div></div>
      <div class="form-field"><label>Weight</label><div>${escapeHtml(r.weight)}</div></div>
      <div class="form-field"><label>Commodity</label><div>${escapeHtml(r.commodity)}</div></div>
      <div class="form-field full"><label>Customer note</label><div>${escapeHtml(r.customerNote)}</div></div>
    </div>
    <div class="form-section">
      <div class="form-grid">
        <div class="form-field"><label>Our quote to customer ($)</label><input type="number" id="q-quote" value="${r.quotedRate || Math.round(r.customerExpectedRate*0.98)}"></div>
        <div class="form-field"><label>Internal target buy rate ($)</label><input type="number" id="q-target" value="${Math.round(r.customerExpectedRate*0.80)}"></div>
      </div>
    </div>
    <div class="btn-row" style="margin-top:14px;justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-outline" id="q-save">Save quote</button>
      <button class="btn btn-primary" id="q-confirm">Send quote to customer</button>
    </div>
  `);

  $("#q-save").addEventListener("click", () => {
    r.quotedRate = parseInt($("#q-quote").value, 10);
    r.status = "quoted";
    r.quotedAt = "just now";
    closeModal();
    showToast("Quote saved. Customer will be notified.");
    renderAll();
  });
  $("#q-confirm").addEventListener("click", () => {
    r.quotedRate = parseInt($("#q-quote").value, 10);
    r.status = "quoted";
    r.quotedAt = "just now";
    closeModal();
    showToast("Quote sent to " + (c.commercialName||c.name) + " at " + fmt(r.quotedRate) + ".");
    renderAll();
  });
}

function openCustomerPostModal(customerId){
  const c = customerById(customerId);
  if(!CUSTOMER_STATUS[c.status].opsAllowed){
    showToast("Account not verified. Cannot post.");
    return;
  }
  modal(`
    <div class="modal-h">
      <div>
        <div class="section-h">Post a new load request</div>
        <div class="section-sub">As ${escapeHtml(c.commercialName||c.name)}</div>
      </div>
      <button class="icon-btn" onclick="closeModal()">${ICONS.close}</button>
    </div>
    <div class="form-section">
      <h4>Pickup</h4>
      <div class="form-grid">
        <div class="form-field"><label>Pickup City <span class="req">*</span></label><input type="text" id="p-city" placeholder="Laredo"></div>
        <div class="form-field"><label>State <span class="req">*</span></label><input type="text" id="p-state" placeholder="TX" maxlength="3"></div>
        <div class="form-field"><label>Pickup Date & Time <span class="req">*</span></label><input type="text" id="p-date" placeholder="Jun 22, 08:00"></div>
        <div class="form-field"><label></label><div></div></div>
      </div>
    </div>
    <div class="form-section">
      <h4>Delivery</h4>
      <div class="form-grid">
        <div class="form-field"><label>Delivery City <span class="req">*</span></label><input type="text" id="d-city" placeholder="Las Vegas"></div>
        <div class="form-field"><label>State <span class="req">*</span></label><input type="text" id="d-state" placeholder="NV" maxlength="3"></div>
      </div>
    </div>
    <div class="form-section">
      <h4>Load details</h4>
      <div class="form-grid">
        <div class="form-field"><label>Equipment <span class="req">*</span></label>
          <select id="p-equip">
            <option>53' Dry Van</option><option>53' Reefer</option><option>Reefer -10F</option><option>Reefer -2C</option><option>Flatbed</option>
          </select>
        </div>
        <div class="form-field"><label>Weight <span class="req">*</span></label><input type="text" id="p-weight" placeholder="42,000 lb"></div>
        <div class="form-field"><label>Commodity <span class="req">*</span></label><input type="text" id="p-commodity" placeholder="Food, Auto parts..."></div>
        <div class="form-field"><label>Your expected rate ($) <span class="req">*</span></label><input type="number" id="p-rate" placeholder="3000"></div>
        <div class="form-field full"><label>Note for our team</label><textarea id="p-note" rows="2" placeholder="Special handling, timing constraints..."></textarea></div>
      </div>
    </div>
    <div class="btn-row" style="margin-top:14px;justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="p-submit">Post request</button>
    </div>
  `, "wide");

  $("#p-submit").addEventListener("click", () => {
    const newId = "req" + (CUSTOMER_REQUESTS.length + 100);
    const repId = c.salesRepId || "u_maria";
    CUSTOMER_REQUESTS.push({
      id: newId, customerId: customerId,
      pickupCity: $("#p-city").value || "—", pickupState: $("#p-state").value || "—",
      deliveryCity: $("#d-city").value || "—", deliveryState: $("#d-state").value || "—",
      pickupDate: $("#p-date").value || "TBD",
      equipment: $("#p-equip").value,
      weight: $("#p-weight").value || "—",
      commodity: $("#p-commodity").value || "—",
      customerExpectedRate: parseInt($("#p-rate").value,10) || 0,
      customerNote: $("#p-note").value || "",
      postedAt: "just now",
      status: "awaiting_quote",
      assignedSalesRepId: repId,
      quotedRate: null, quotedAt: null
    });
    closeModal();
    showToast("Request " + newId + " posted. Sierra's Sales Rep will quote shortly.");
    renderAll();
  });
}

