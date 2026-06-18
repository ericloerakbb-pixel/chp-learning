// ── CHP CODE DATA ──────────────────────────────────────────────
const ALL_CODES = [
  {code:'10-1', meaning:'Reception poor', cat:'10-codes'},
  {code:'10-2', meaning:'Reception good', cat:'10-codes'},
  {code:'10-4', meaning:'Message received', cat:'10-codes'},
  {code:'10-5', meaning:'Relay message', cat:'10-codes'},
  {code:'10-6', meaning:'Busy, stand by', cat:'10-codes'},
  {code:'10-7', meaning:'Out of service', cat:'10-codes'},
  {code:'10-8', meaning:'In service', cat:'10-codes'},
  {code:'10-9', meaning:'Repeat transmission', cat:'10-codes'},
  {code:'10-10', meaning:'Off duty', cat:'10-codes'},
  {code:'10-11', meaning:'Identify mobile frequency - KA4993 ("S" Channel)', cat:'10-codes'},
  {code:'10-13', meaning:'Advise road or weather conditions', cat:'10-codes'},
  {code:'10-14', meaning:'Provide escort', cat:'10-codes'},
  {code:'10-15', meaning:'Prisoner in custody', cat:'10-codes'},
  {code:'10-17', meaning:'Relay papers, supplies, etc.', cat:'10-codes'},
  {code:'10-19', meaning:'Return to ___ (specify location)', cat:'10-codes'},
  {code:'10-20', meaning:'Location requested', cat:'10-codes'},
  {code:'10-21', meaning:'Telephone ___', cat:'10-codes'},
  {code:'10-22', meaning:'Disregard (message or assignment)', cat:'10-codes'},
  {code:'10-23', meaning:'Stand by', cat:'10-codes'},
  {code:'10-28', meaning:'Request for registration', cat:'10-codes'},
  {code:'10-29', meaning:'Check for wants (person, vehicle, or object)', cat:'10-codes'},
  {code:'10-30', meaning:'Improper radio traffic', cat:'10-codes'},
  {code:'10-31', meaning:'Suicidal subject', cat:'10-codes'},
  {code:'10-35', meaning:'Officer needs backup, suspect is present', cat:'10-codes'},
  {code:'10-36', meaning:'Confidential information', cat:'10-codes'},
  {code:'10-36A', meaning:'Confidential information, subject possibly armed', cat:'10-codes'},
  {code:'10-36F', meaning:'Confidential information, possible felony wants', cat:'10-codes'},
  {code:'10-36M', meaning:'Confidential information, possible misdemeanor wants', cat:'10-codes'},
  {code:'10-36P', meaning:'Confidential information, subject possibly on parole, probation, or post-release community supervision', cat:'10-codes'},
  {code:'10-37', meaning:'What time is it?', cat:'10-codes'},
  {code:'10-39', meaning:'Message or item delivered', cat:'10-codes'},
  {code:'10-97', meaning:'Arrived at scene', cat:'10-codes'},
  {code:'10-98', meaning:'Assignment completed', cat:'10-codes'},
  {code:'11-10', meaning:'Take a report', cat:'11-codes'},
  {code:'11-24', meaning:'Abandoned vehicle', cat:'11-codes'},
  {code:'11-25', meaning:'Traffic hazard (specify type)', cat:'11-codes'},
  {code:'11-26', meaning:'Disabled vehicle, occupied', cat:'11-codes'},
  {code:'11-27', meaning:'DL check', cat:'11-codes'},
  {code:'11-41', meaning:'Ambulance', cat:'11-codes'},
  {code:'11-44', meaning:'Fatality', cat:'11-codes'},
  {code:'11-48', meaning:'Provide transportation (person)', cat:'11-codes'},
  {code:'11-66', meaning:'Defective traffic signals (describe)', cat:'11-codes'},
  {code:'11-79', meaning:'Traffic crash - ambulance rolling', cat:'11-codes'},
  {code:'11-80', meaning:'Traffic crash - major injury', cat:'11-codes'},
  {code:'11-81', meaning:'Traffic crash - minor injury', cat:'11-codes'},
  {code:'11-82', meaning:'Traffic crash - no injury', cat:'11-codes'},
  {code:'11-83', meaning:'Traffic crash - unknown injury', cat:'11-codes'},
  {code:'11-84', meaning:'Direct traffic', cat:'11-codes'},
  {code:'11-85', meaning:'Tow truck', cat:'11-codes'},
  {code:'11-86', meaning:'Bomb threat', cat:'11-codes'},
  {code:'11-87', meaning:'Bomb found', cat:'11-codes'},
  {code:'11-98', meaning:'Meet ___', cat:'11-codes'},
  {code:'11-99', meaning:'Officer requires help, emergency', cat:'11-codes'},
  {code:'Code 2', meaning:'Urgent', cat:'Codes'},
  {code:'Code 3', meaning:'Emergency', cat:'Codes'},
  {code:'Code 4', meaning:'Situation stable, emergency situation no longer exists', cat:'Codes'},
  {code:'Code 5', meaning:'Law enforcement surveillance', cat:'Codes'},
  {code:'Code 20', meaning:'Notify press', cat:'Codes'},
  {code:'Code 33', meaning:'Clear radio channels for emergency traffic', cat:'Codes'},
  {code:'Mayday', meaning:'Emergency landing', cat:'Codes'},
  {code:'10851 VC', meaning:'Vehicle theft', cat:'PC/VC'},
  {code:'20001 VC', meaning:'Felony hit and run', cat:'PC/VC'},
  {code:'20002 VC', meaning:'Misdemeanor hit and run', cat:'PC/VC'},
  {code:'23103 VC', meaning:'Reckless driving', cat:'PC/VC'},
  {code:'23109 VC', meaning:'Speed contest', cat:'PC/VC'},
  {code:'23110 VC', meaning:'Throwing objects at vehicles', cat:'PC/VC'},
  {code:'23111 VC', meaning:'Throwing cigarette', cat:'PC/VC'},
  {code:'23114 VC', meaning:'Objects falling from vehicles', cat:'PC/VC'},
  {code:'23152 VC', meaning:'Misdemeanor drunk driving', cat:'PC/VC'},
  {code:'23153 VC', meaning:'Felony drunk driving', cat:'PC/VC'},
  {code:'187 PC', meaning:'Murder', cat:'PC/VC'},
  {code:'207 PC', meaning:'Kidnapping', cat:'PC/VC'},
  {code:'211 PC', meaning:'Robbery', cat:'PC/VC'},
  {code:'215 PC', meaning:'Carjacking', cat:'PC/VC'},
  {code:'242 PC', meaning:'Battery', cat:'PC/VC'},
  {code:'245 PC', meaning:'Assault with a deadly weapon', cat:'PC/VC'},
  {code:'261 PC', meaning:'Rape', cat:'PC/VC'},
  {code:'314 PC', meaning:'Indecent exposure', cat:'PC/VC'},
  {code:'415 PC', meaning:'Disturbing the peace', cat:'PC/VC'},
  {code:'417 PC', meaning:'Brandishing a deadly weapon', cat:'PC/VC'},
  {code:'459 PC', meaning:'Burglary', cat:'PC/VC'},
  {code:'594 PC', meaning:'Vandalism', cat:'PC/VC'},
  {code:'602 PC', meaning:'Trespassing', cat:'PC/VC'},
  {code:'647(f) PC', meaning:'Public intoxication', cat:'PC/VC'},
  {code:'5150 W&I', meaning:'Mental disorder', cat:'Other'},
  {code:'11550 H&S', meaning:'Under the influence of narcotics', cat:'Other'},
];

const CATS = ['10-codes','11-codes','Codes','PC/VC','Other'];
const CAT_CLASS = {'10-codes':'active-10','11-codes':'active-11','Codes':'active-codes','PC/VC':'active-pc','Other':'active-other'};

// ── AUTH & STORAGE ─────────────────────────────────────────────
const ACCOUNT_KEY = 'chp_account';
const DATA_KEY    = 'chp_data';

function getAccount() {
  try { return JSON.parse(localStorage.getItem(ACCOUNT_KEY)) || null; } catch { return null; }
}
function saveAccount(obj) { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(obj)); }

function getData() {
  try { return JSON.parse(localStorage.getItem(DATA_KEY)) || makeEmptyData(); } catch { return makeEmptyData(); }
}
function makeEmptyData() {
  return { scores: { correct: 0, attempts: 0 }, codeStats: {} };
}
function saveData(d) { localStorage.setItem(DATA_KEY, JSON.stringify(d)); }

// codeStats[code] = { correct: N, attempts: N }
function getCodeStat(code) {
  const d = getData();
  return d.codeStats[code] || { correct: 0, attempts: 0 };
}
function recordCodeResult(code, correct) {
  const d = getData();
  if (!d.codeStats[code]) d.codeStats[code] = { correct: 0, attempts: 0 };
  d.codeStats[code].attempts++;
  if (correct) d.codeStats[code].correct++;
  d.scores.attempts++;
  if (correct) d.scores.correct++;
  saveData(d);
}
function isMastered(code) {
  const s = getCodeStat(code);
  return s.attempts >= 3 && (s.correct / s.attempts) >= 0.8;
}

// ── SCREENS ────────────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
}

// ── LOGIN ──────────────────────────────────────────────────────
function handleLogin() {
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  const err  = document.getElementById('login-error');
  const acct = getAccount();

  if (!user || !pass) { showError(err, 'Please enter your username and password.'); return; }
  if (!acct)          { showError(err, 'No account found. Please create one first.'); return; }
  if (acct.username !== user || acct.password !== btoa(pass)) {
    showError(err, 'Incorrect username or password.'); return;
  }
  err.style.display = 'none';
  launchApp(user);
}

function handleSetup() {
  const user  = document.getElementById('setup-user').value.trim();
  const pass  = document.getElementById('setup-pass').value;
  const pass2 = document.getElementById('setup-pass2').value;
  const err   = document.getElementById('setup-error');

  if (!user)           { showError(err, 'Please choose a username.'); return; }
  if (pass.length < 4) { showError(err, 'Password must be at least 4 characters.'); return; }
  if (pass !== pass2)  { showError(err, 'Passwords do not match.'); return; }

  saveAccount({ username: user, password: btoa(pass) });
  err.style.display = 'none';
  launchApp(user);
}

function showError(el, msg) { el.textContent = msg; el.style.display = 'block'; }

function signOut() {
  showScreen('login');
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
}

// ── APP LAUNCH ─────────────────────────────────────────────────
function launchApp(username) {
  document.getElementById('header-username').textContent = username;
  showScreen('app');
  buildCatBar();
  buildRefTable();
  updateStats();
  fcDeck = shuffle(getFiltered());
  fcIdx = 0;
  updateCard();
  loadMC();
  loadFitb();
}

// On page load: auto-login if account exists and session flag set
window.addEventListener('DOMContentLoaded', () => {
  const acct = getAccount();
  if (acct && sessionStorage.getItem('chp_session')) {
    launchApp(acct.username);
  }
});

// ── STATS ──────────────────────────────────────────────────────
function updateStats() {
  const d = getData();
  const pct = d.scores.attempts > 0 ? Math.round(d.scores.correct / d.scores.attempts * 100) + '%' : '—';
  const mastered = ALL_CODES.filter(c => isMastered(c.code)).length;
  document.getElementById('stat-attempts').textContent = d.scores.attempts;
  document.getElementById('stat-correct').textContent  = d.scores.correct;
  document.getElementById('stat-pct').textContent      = pct;
  document.getElementById('stat-mastered').textContent = mastered;
}

// ── CATEGORY FILTER ────────────────────────────────────────────
let activeCat = 'all';

function buildCatBar() {
  const bar = document.getElementById('cat-bar');
  bar.innerHTML = '';
  const all = makeBtn('All codes', 'all', 'active-all');
  bar.appendChild(all);
  CATS.forEach(cat => bar.appendChild(makeBtn(cat, cat, CAT_CLASS[cat])));
  all.classList.add('active-all');
}

function makeBtn(label, cat, cls) {
  const b = document.createElement('button');
  b.className = 'cat-btn';
  b.textContent = label;
  b.dataset.cat = cat;
  b.onclick = () => setCat(cat, cls);
  return b;
}

function setCat(cat, cls) {
  activeCat = cat;
  document.querySelectorAll('.cat-btn').forEach(b => {
    b.classList.remove('active-all','active-10','active-11','active-pc','active-codes','active-other');
  });
  const active = [...document.querySelectorAll('.cat-btn')].find(b => b.dataset.cat === cat);
  if (active) active.classList.add(cls || (cat === 'all' ? 'active-all' : CAT_CLASS[cat]));
  fcDeck = shuffle(getFiltered());
  fcIdx = 0;
  updateCard();
  loadMC();
  loadFitb();
}

function getFiltered() {
  return activeCat === 'all' ? ALL_CODES : ALL_CODES.filter(c => c.cat === activeCat);
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── MODE TABS ──────────────────────────────────────────────────
function switchMode(name) {
  document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('mode-' + name).classList.add('active');
  [...document.querySelectorAll('.mode-tab')].find(t => t.textContent.toLowerCase().includes(name.substring(0,4))).classList.add('active');
  if (name === 'progress') buildProgress();
  if (name === 'ref') buildRefTable();
}

// ── FLASHCARD ──────────────────────────────────────────────────
let fcDeck = [], fcIdx = 0, fcFlipped = false;

function updateCard() {
  const deck = fcDeck.length ? fcDeck : getFiltered();
  if (!deck.length) return;
  const c = deck[fcIdx % deck.length];
  document.getElementById('fc-cat').textContent  = c.cat;
  document.getElementById('fc-code').textContent = c.code;
  document.getElementById('fc-meaning').textContent = c.meaning;
  document.getElementById('fc-counter').textContent = (fcIdx % deck.length + 1) + ' / ' + deck.length;
  document.getElementById('card-inner').classList.remove('flipped');
  document.getElementById('fc-result-row').style.display = 'none';
  fcFlipped = false;
}

function flipCard() {
  fcFlipped = !fcFlipped;
  document.getElementById('card-inner').classList.toggle('flipped', fcFlipped);
  document.getElementById('fc-result-row').style.display = fcFlipped ? 'flex' : 'none';
}

function markFlash(correct) {
  const deck = fcDeck.length ? fcDeck : getFiltered();
  const c = deck[fcIdx % deck.length];
  recordCodeResult(c.code, correct);
  updateStats();
  nextCard();
}

function nextCard() {
  if (!fcDeck.length) fcDeck = shuffle(getFiltered());
  fcIdx = (fcIdx + 1) % fcDeck.length;
  updateCard();
}
function prevCard() {
  if (!fcDeck.length) fcDeck = shuffle(getFiltered());
  fcIdx = (fcIdx - 1 + fcDeck.length) % fcDeck.length;
  updateCard();
}

// ── MULTIPLE CHOICE ────────────────────────────────────────────
let mcCurrent = null, mcAnswered = false;

function loadMC() {
  mcAnswered = false;
  document.getElementById('mc-feedback').style.display = 'none';
  document.getElementById('mc-next').style.display = 'none';
  const pool = getFiltered();
  if (pool.length < 2) return;
  mcCurrent = pool[Math.floor(Math.random() * pool.length)];
  const flip = Math.random() > 0.5;
  document.getElementById('mc-question').textContent = flip
    ? 'Which code means: "' + mcCurrent.meaning + '"?'
    : 'What does ' + mcCurrent.code + ' mean?';
  const wrong = shuffle(pool.filter(c => c.code !== mcCurrent.code)).slice(0, 3);
  const options = shuffle([mcCurrent, ...wrong]);
  const container = document.getElementById('mc-options');
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'mc-option';
    btn.textContent = flip ? opt.code : opt.meaning;
    btn.onclick = () => answerMC(opt.code === mcCurrent.code, btn, options, container, flip);
    container.appendChild(btn);
  });
}

function answerMC(correct, btn, options, container, flip) {
  if (mcAnswered) return;
  mcAnswered = true;
  recordCodeResult(mcCurrent.code, correct);
  updateStats();
  [...container.children].forEach((b, i) => {
    b.disabled = true;
    if (b === btn) b.classList.add(correct ? 'correct' : 'wrong');
    if (!correct && options[i].code === mcCurrent.code) b.classList.add('correct');
  });
  const fb = document.getElementById('mc-feedback');
  fb.style.display = '';
  fb.className = 'feedback ' + (correct ? 'good' : 'bad');
  fb.textContent = correct
    ? '✓ Correct!'
    : '✗ Correct answer: ' + (flip ? mcCurrent.code : mcCurrent.meaning);
  document.getElementById('mc-next').style.display = '';
}

function nextMC() { loadMC(); }

// ── FILL IN BLANK ──────────────────────────────────────────────
let fitbCurrent = null, fitbAnswered = false;

function loadFitb() {
  fitbAnswered = false;
  document.getElementById('fitb-feedback').style.display = 'none';
  document.getElementById('fitb-next').style.display = 'none';
  const inp = document.getElementById('fitb-input');
  inp.value = '';
  inp.disabled = false;
  const pool = getFiltered();
  fitbCurrent = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('fitb-prompt').textContent = 'What does ' + fitbCurrent.code + ' mean?';
}

function checkFitb() {
  if (fitbAnswered) return;
  const inp = document.getElementById('fitb-input');
  const answer = inp.value.trim().toLowerCase();
  if (!answer) return;
  fitbAnswered = true;
  inp.disabled = true;
  const target = fitbCurrent.meaning.toLowerCase();
  const keywords = target.replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 3);
  const correct = keywords.some(kw => answer.includes(kw)) || answer.includes(target.substring(0, 5).toLowerCase());
  recordCodeResult(fitbCurrent.code, correct);
  updateStats();
  const fb = document.getElementById('fitb-feedback');
  fb.style.display = '';
  fb.className = 'feedback ' + (correct ? 'good' : 'bad');
  fb.textContent = correct
    ? '✓ Good! Full answer: ' + fitbCurrent.meaning
    : '✗ Correct answer: ' + fitbCurrent.meaning;
  document.getElementById('fitb-next').style.display = '';
}

function nextFitb() { loadFitb(); }

// ── REFERENCE TABLE ────────────────────────────────────────────
let refBuilt = false;
function buildRefTable() {
  if (refBuilt) return;
  refBuilt = true;
  const div = document.getElementById('ref-content');
  CATS.forEach(cat => {
    const items = ALL_CODES.filter(c => c.cat === cat);
    const sec = document.createElement('div');
    sec.className = 'ref-section';
    const title = document.createElement('div');
    title.className = 'ref-section-title';
    title.textContent = cat;
    sec.appendChild(title);
    items.forEach(c => {
      const row = document.createElement('div');
      row.className = 'ref-row';
      row.innerHTML = `<span class="ref-code">${c.code}</span><span class="ref-meaning">${c.meaning}</span>`;
      if (isMastered(c.code)) {
        const dot = document.createElement('div');
        dot.className = 'mastered-dot';
        dot.title = 'Mastered';
        row.appendChild(dot);
      }
      sec.appendChild(row);
    });
    div.appendChild(sec);
  });
}

// ── PROGRESS ──────────────────────────────────────────────────
function buildProgress() {
  const div = document.getElementById('progress-content');
  div.innerHTML = '';
  const attempted = ALL_CODES.filter(c => getCodeStat(c.code).attempts > 0);
  if (!attempted.length) {
    div.innerHTML = '<div class="empty-state">No quiz attempts yet — start with flashcards or multiple choice!</div>';
    return;
  }
  const mastered = attempted.filter(c => isMastered(c.code));
  const learning = attempted.filter(c => !isMastered(c.code));
  const untouched = ALL_CODES.filter(c => getCodeStat(c.code).attempts === 0);

  if (mastered.length) renderProgressSection(div, 'Mastered (' + mastered.length + ')', mastered, 'mastered');
  if (learning.length) renderProgressSection(div, 'Still learning (' + learning.length + ')', learning, 'learning');
  if (untouched.length) renderProgressSection(div, 'Not yet attempted (' + untouched.length + ')', untouched, 'new');
}

function renderProgressSection(parent, title, codes, status) {
  const sec = document.createElement('div');
  sec.className = 'progress-section';
  const t = document.createElement('div');
  t.className = 'progress-section-title';
  t.textContent = title;
  sec.appendChild(t);
  codes.forEach(c => {
    const s = getCodeStat(c.code);
    const pct = s.attempts > 0 ? Math.round(s.correct / s.attempts * 100) : 0;
    const item = document.createElement('div');
    item.className = 'progress-item';
    item.innerHTML = `
      <span class="progress-code">${c.code}</span>
      <span class="progress-meaning">${c.meaning}</span>
      ${s.attempts > 0 ? `
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        <span class="progress-pct">${pct}%</span>
      ` : ''}
      <span class="badge-${status}">${status === 'mastered' ? '✓ Mastered' : status === 'learning' ? 'Learning' : 'New'}</span>
    `;
    sec.appendChild(item);
  });
  parent.appendChild(sec);
}

function resetProgress() {
  if (!confirm('Reset all your progress? This cannot be undone.')) return;
  saveData(makeEmptyData());
  updateStats();
  refBuilt = false;
  document.getElementById('ref-content').innerHTML = '';
  buildRefTable();
  buildProgress();
}

// ── SESSION PERSISTENCE ────────────────────────────────────────
// Keep user logged in during browser session
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-pass').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('login-user').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-pass').focus();
  });
});

function launchApp(username) {
  sessionStorage.setItem('chp_session', '1');
  document.getElementById('header-username').textContent = username;
  showScreen('app');
  buildCatBar();
  updateStats();
  fcDeck = shuffle(getFiltered());
  fcIdx = 0;
  updateCard();
  loadMC();
  loadFitb();
  // Set first cat button active
  const allBtn = document.querySelector('.cat-btn[data-cat="all"]');
  if (allBtn) allBtn.classList.add('active-all');
}

window.addEventListener('DOMContentLoaded', () => {
  const acct = getAccount();
  if (acct && sessionStorage.getItem('chp_session')) {
    launchApp(acct.username);
  }
});
