/* ============================================================
   Empire National — Sales Tool
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

/* ---------- App state ---------- */
const state = {
  view: "workspace",
  me: "b1",
  deals: SEED_DEALS.slice(),
  activities: SEED_ACTIVITIES.slice(),
  tasks: SEED_TASKS.slice(),
  filterBroker: "all",
  filterCustomer: "all",
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
  const myMargin = myWon.reduce((s,d) => s + dealMargin(d), 0);
  const myQuota  = userById(me).quota;
  const attain   = Math.round(myMargin/myQuota*100);

  const contacted = myDeals.filter(d => ["contacted","qualified","quoted","won"].includes(d.stage)).length;
  const conv = contacted ? Math.round(myWon.length/contacted*100) : 0;

  const myTasks    = state.tasks.filter(t => t.broker === me);
  const myOpenOpps = myDeals.filter(d => d.stage !== "won").slice(0,5);

  return `
    <div class="grid grid-4" style="margin-bottom:18px">
      ${kpiCard("Margin (won)",     fmt(myMargin),       "this month",                  "good",   ICONS.trend)}
      ${kpiCard("Won deals",        String(myWon.length),"this month",                  "accent", ICONS.pkg)}
      ${kpiCard("Contact → won",    conv + "%",          "conversion",                  "accent", ICONS.target)}
      ${kpiCard("Quota attainment", attain + "%",        `${fmt(myMargin)} of ${fmt(myQuota)}`, attain>=80?"good":attain>=60?"warn":"danger", ICONS.target)}
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
    return { id:u.id, name:u.name.split(" ")[0], v:m };
  });
  const maxBroker = Math.max(...brokerEntries.map(x=>x.v), 1);

  // summary line
  const summaryParts = [];
  summaryParts.push(state.filterBroker === "all" ? "All brokers" : userById(state.filterBroker).name);
  summaryParts.push(state.filterCustomer === "all" ? "all customers" : state.filterCustomer);

  return `
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

  const board = USERS.map(u => {
    const my = deals.filter(d => d.broker===u.id);
    const won = my.filter(d => d.stage==="won");
    const m = won.reduce((s,d)=>s+dealMargin(d), 0);
    const contacted = my.filter(d => ["contacted","qualified","quoted","won"].includes(d.stage)).length;
    const conv = contacted ? Math.round(won.length/contacted*100) : 0;
    return { id:u.id, name:u.name, initials:u.initials, margin:m, loads:won.length*6, conv, quota:Math.round(m/u.quota*100) };
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
      ${cardBox("Rep leaderboard", "this period", `
        <div class="lb-head">
          <span>Rep</span><span>Margin</span><span>Loads</span><span>Conv</span><span>Quota</span>
        </div>
        ${board.map(r => `
          <div class="lb-row ${r.id===state.me?'me':''}">
            <span class="rep"><span class="avatar ${r.id===state.me?'me':''}">${r.initials}</span><span class="nm">${r.name}</span></span>
            <span class="mono">${fmtK(r.margin)}</span>
            <span class="muted">${r.loads}</span>
            <span class="muted">${r.conv}%</span>
            <span class="quota">
              <span class="qtrack"><span class="qfill" style="width:${Math.min(100,r.quota)}%;background:${r.quota>=80?'var(--green)':r.quota>=60?'var(--amber)':'var(--coral)'}"></span></span>
              <span class="qval">${r.quota}%</span>
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
}

renderAll();
