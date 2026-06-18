// ─────────────────────────────────────────────────────────────
// FIREBASE CONFIG — paste your own config object here
// (you get this from Firebase console → Project settings → Your apps)
// ─────────────────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── PASTE YOUR FIREBASE CONFIG HERE ──────────────────────────
// Replace everything inside the {} with your own values from Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3KqP3_d62OZFy3AA0TUu-Zaa0W6W-mmA",
  authDomain: "chp-trainer.firebaseapp.com",
  projectId: "chp-trainer",
  storageBucket: "chp-trainer.firebasestorage.app",
  messagingSenderId: "600819907943",
  appId: "1:600819907943:web:eec1090a5a185f2bf403c2"
};
// ─────────────────────────────────────────────────────────────

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── CHP CODE DATA ─────────────────────────────────────────────
const ALL_CODES = [
  {code:'10-1',   meaning:'Reception poor', cat:'10-codes'},
  {code:'10-2',   meaning:'Reception good', cat:'10-codes'},
  {code:'10-4',   meaning:'Message received', cat:'10-codes'},
  {code:'10-5',   meaning:'Relay message', cat:'10-codes'},
  {code:'10-6',   meaning:'Busy, stand by', cat:'10-codes'},
  {code:'10-7',   meaning:'Out of service', cat:'10-codes'},
  {code:'10-8',   meaning:'In service', cat:'10-codes'},
  {code:'10-9',   meaning:'Repeat transmission', cat:'10-codes'},
  {code:'10-10',  meaning:'Off duty', cat:'10-codes'},
  {code:'10-11',  meaning:'Identify mobile frequency - KA4993 ("S" Channel)', cat:'10-codes'},
  {code:'10-13',  meaning:'Advise road or weather conditions', cat:'10-codes'},
  {code:'10-14',  meaning:'Provide escort', cat:'10-codes'},
  {code:'10-15',  meaning:'Prisoner in custody', cat:'10-codes'},
  {code:'10-17',  meaning:'Relay papers, supplies, etc.', cat:'10-codes'},
  {code:'10-19',  meaning:'Return to ___ (specify location)', cat:'10-codes'},
  {code:'10-20',  meaning:'Location requested', cat:'10-codes'},
  {code:'10-21',  meaning:'Telephone ___', cat:'10-codes'},
  {code:'10-22',  meaning:'Disregard (message or assignment)', cat:'10-codes'},
  {code:'10-23',  meaning:'Stand by', cat:'10-codes'},
  {code:'10-28',  meaning:'Request for registration', cat:'10-codes'},
  {code:'10-29',  meaning:'Check for wants (person, vehicle, or object)', cat:'10-codes'},
  {code:'10-30',  meaning:'Improper radio traffic', cat:'10-codes'},
  {code:'10-31',  meaning:'Suicidal subject', cat:'10-codes'},
  {code:'10-35',  meaning:'Officer needs backup, suspect is present', cat:'10-codes'},
  {code:'10-36',  meaning:'Confidential information', cat:'10-codes'},
  {code:'10-36A', meaning:'Confidential information, subject possibly armed', cat:'10-codes'},
  {code:'10-36F', meaning:'Confidential information, possible felony wants', cat:'10-codes'},
  {code:'10-36M', meaning:'Confidential information, possible misdemeanor wants', cat:'10-codes'},
  {code:'10-36P', meaning:'Confidential information, subject possibly on parole, probation, or post-release community supervision', cat:'10-codes'},
  {code:'10-37',  meaning:'What time is it?', cat:'10-codes'},
  {code:'10-39',  meaning:'Message or item delivered', cat:'10-codes'},
  {code:'10-97',  meaning:'Arrived at scene', cat:'10-codes'},
  {code:'10-98',  meaning:'Assignment completed', cat:'10-codes'},
  {code:'11-10',  meaning:'Take a report', cat:'11-codes'},
  {code:'11-24',  meaning:'Abandoned vehicle', cat:'11-codes'},
  {code:'11-25',  meaning:'Traffic hazard (specify type)', cat:'11-codes'},
  {code:'11-26',  meaning:'Disabled vehicle, occupied', cat:'11-codes'},
  {code:'11-27',  meaning:'DL check', cat:'11-codes'},
  {code:'11-41',  meaning:'Ambulance', cat:'11-codes'},
  {code:'11-44',  meaning:'Fatality', cat:'11-codes'},
  {code:'11-48',  meaning:'Provide transportation (person)', cat:'11-codes'},
  {code:'11-66',  meaning:'Defective traffic signals (describe)', cat:'11-codes'},
  {code:'11-79',  meaning:'Traffic crash - ambulance rolling', cat:'11-codes'},
  {code:'11-80',  meaning:'Traffic crash - major injury', cat:'11-codes'},
  {code:'11-81',  meaning:'Traffic crash - minor injury', cat:'11-codes'},
  {code:'11-82',  meaning:'Traffic crash - no injury', cat:'11-codes'},
  {code:'11-83',  meaning:'Traffic crash - unknown injury', cat:'11-codes'},
  {code:'11-84',  meaning:'Direct traffic', cat:'11-codes'},
  {code:'11-85',  meaning:'Tow truck', cat:'11-codes'},
  {code:'11-86',  meaning:'Bomb threat', cat:'11-codes'},
  {code:'11-87',  meaning:'Bomb found', cat:'11-codes'},
  {code:'11-98',  meaning:'Meet ___', cat:'11-codes'},
  {code:'11-99',  meaning:'Officer requires help, emergency', cat:'11-codes'},
  {code:'Code 2',  meaning:'Urgent', cat:'Codes'},
  {code:'Code 3',  meaning:'Emergency', cat:'Codes'},
  {code:'Code 4',  meaning:'Situation stable, emergency situation no longer exists', cat:'Codes'},
  {code:'Code 5',  meaning:'Law enforcement surveillance', cat:'Codes'},
  {code:'Code 20', meaning:'Notify press', cat:'Codes'},
  {code:'Code 33', meaning:'Clear radio channels for emergency traffic', cat:'Codes'},
  {code:'Mayday',  meaning:'Emergency landing', cat:'Codes'},
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
  {code:'187 PC',   meaning:'Murder', cat:'PC/VC'},
  {code:'207 PC',   meaning:'Kidnapping', cat:'PC/VC'},
  {code:'211 PC',   meaning:'Robbery', cat:'PC/VC'},
  {code:'215 PC',   meaning:'Carjacking', cat:'PC/VC'},
  {code:'242 PC',   meaning:'Battery', cat:'PC/VC'},
  {code:'245 PC',   meaning:'Assault with a deadly weapon', cat:'PC/VC'},
  {code:'261 PC',   meaning:'Rape', cat:'PC/VC'},
  {code:'314 PC',   meaning:'Indecent exposure', cat:'PC/VC'},
  {code:'415 PC',   meaning:'Disturbing the peace', cat:'PC/VC'},
  {code:'417 PC',   meaning:'Brandishing a deadly weapon', cat:'PC/VC'},
  {code:'459 PC',   meaning:'Burglary', cat:'PC/VC'},
  {code:'594 PC',   meaning:'Vandalism', cat:'PC/VC'},
  {code:'602 PC',   meaning:'Trespassing', cat:'PC/VC'},
  {code:'647(f) PC',meaning:'Public intoxication', cat:'PC/VC'},
  {code:'5150 W&I', meaning:'Mental disorder', cat:'Other'},
  {code:'11550 H&S',meaning:'Under the influence of narcotics', cat:'Other'},
];

const CATS = ['10-codes','11-codes','Codes','PC/VC','Other'];
const CAT_CLASS = {'10-codes':'active-10','11-codes':'active-11','Codes':'active-codes','PC/VC':'active-pc','Other':'active-other'};

// ── USER DATA ─────────────────────────────────────────────────
let currentUser = null;
let userData = { scores: { correct: 0, attempts: 0 }, codeStats: {} };
let saveTimeout = null;

async function loadUserData(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      userData = snap.data();
      if (!userData.scores) userData.scores = { correct: 0, attempts: 0 };
      if (!userData.codeStats) userData.codeStats = {};
    } else {
      userData = { scores: { correct: 0, attempts: 0 }, codeStats: {} };
      await setDoc(doc(db, 'users', uid), userData);
    }
  } catch (e) {
    console.error('Load error:', e);
  }
}

function scheduleSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), userData);
      } catch (e) { console.error('Save error:', e); }
    }
  }, 1500);
}

function recordCodeResult(code, correct) {
  if (!userData.codeStats[code]) userData.codeStats[code] = { correct: 0, attempts: 0 };
  userData.codeStats[code].attempts++;
  if (correct) userData.codeStats[code].correct++;
  userData.scores.attempts++;
  if (correct) userData.scores.correct++;
  scheduleSave();
}

function getCodeStat(code) {
  return userData.codeStats[code] || { correct: 0, attempts: 0 };
}

function isMastered(code) {
  const s = getCodeStat(code);
  return s.attempts >= 3 && (s.correct / s.attempts) >= 0.8;
}

// ── AUTH STATE ────────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    showScreen('loading');
    await loadUserData(user.uid);
    launchApp(user.displayName || user.email);
  } else {
    currentUser = null;
    showScreen('login');
  }
});

// ── AUTH ACTIONS ──────────────────────────────────────────────
async function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  const err   = document.getElementById('login-error');
  err.style.display = 'none';
  if (!email || !pass) { showErr(err, 'Please enter your email and password.'); return; }
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (e) {
    showErr(err, friendlyError(e.code));
  }
}

async function handleSignup() {
  const name  = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass  = document.getElementById('signup-pass').value;
  const err   = document.getElementById('signup-error');
  const suc   = document.getElementById('signup-success');
  err.style.display = 'none';
  suc.style.display = 'none';
  if (!name)          { showErr(err, 'Please enter a display name.'); return; }
  if (!email)         { showErr(err, 'Please enter your email.'); return; }
  if (pass.length < 6){ showErr(err, 'Password must be at least 6 characters.'); return; }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name });
  } catch (e) {
    showErr(err, friendlyError(e.code));
  }
}

async function handleForgotPassword() {
  const email = document.getElementById('login-email').value.trim();
  const err   = document.getElementById('login-error');
  if (!email) { showErr(err, 'Enter your email above first, then click Forgot password.'); return; }
  try {
    await sendPasswordResetEmail(auth, email);
    err.style.display = 'none';
    showErr(document.getElementById('login-error'), '✓ Password reset email sent! Check your inbox.', true);
  } catch (e) {
    showErr(err, friendlyError(e.code));
  }
}

async function signOut() {
  await fbSignOut(auth);
}

function friendlyError(code) {
  const map = {
    'auth/user-not-found':     'No account found with that email.',
    'auth/wrong-password':     'Incorrect password.',
    'auth/email-already-in-use': 'An account with that email already exists.',
    'auth/invalid-email':      'Please enter a valid email address.',
    'auth/weak-password':      'Password must be at least 6 characters.',
    'auth/too-many-requests':  'Too many attempts. Try again later.',
    'auth/invalid-credential': 'Incorrect email or password.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

function showErr(el, msg, isSuccess = false) {
  el.textContent = msg;
  el.className = isSuccess ? 'success-msg' : 'error-msg';
  el.style.display = 'block';
}

// ── SCREENS ───────────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
}

// ── APP LAUNCH ────────────────────────────────────────────────
function launchApp(displayName) {
  const short = displayName.split(' ')[0];
  document.getElementById('header-username').textContent = short;
  showScreen('app');
  buildCatBar();
  updateStats();
  fcDeck = shuffle(getFiltered());
  fcIdx = 0;
  updateCard();
  loadMC();
  loadFitb();
  refBuilt = false;
  document.getElementById('ref-content').innerHTML = '';
}

// ── STATS ─────────────────────────────────────────────────────
function updateStats() {
  const s = userData.scores;
  const pct = s.attempts > 0 ? Math.round(s.correct / s.attempts * 100) + '%' : '—';
  const mastered = ALL_CODES.filter(c => isMastered(c.code)).length;
  document.getElementById('stat-attempts').textContent = s.attempts;
  document.getElementById('stat-correct').textContent  = s.correct;
  document.getElementById('stat-pct').textContent      = pct;
  document.getElementById('stat-mastered').textContent = mastered;
}

// ── CATEGORY FILTER ───────────────────────────────────────────
let activeCat = 'all';

function buildCatBar() {
  const bar = document.getElementById('cat-bar');
  bar.innerHTML = '';
  const all = makeCatBtn('All codes', 'all', 'active-all');
  all.classList.add('active-all');
  bar.appendChild(all);
  CATS.forEach(cat => bar.appendChild(makeCatBtn(cat, cat, CAT_CLASS[cat])));
}

function makeCatBtn(label, cat, cls) {
  const b = document.createElement('button');
  b.className = 'cat-btn';
  b.textContent = label;
  b.dataset.cat = cat;
  b.dataset.cls = cls;
  b.onclick = () => {
    document.querySelectorAll('.cat-btn').forEach(x => {
      x.classList.remove('active-all','active-10','active-11','active-pc','active-codes','active-other');
    });
    b.classList.add(cls);
    activeCat = cat;
    fcDeck = shuffle(getFiltered());
    fcIdx = 0;
    updateCard();
    loadMC();
    loadFitb();
  };
  return b;
}

function getFiltered() {
  return activeCat === 'all' ? ALL_CODES : ALL_CODES.filter(c => c.cat === activeCat);
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── MODE TABS ─────────────────────────────────────────────────
function switchMode(name) {
  document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('mode-' + name).classList.add('active');
  const tabs = [...document.querySelectorAll('.mode-tab')];
  const map = {flash:0, mc:1, fitb:2, ref:3, progress:4};
  if (tabs[map[name]]) tabs[map[name]].classList.add('active');
  if (name === 'progress') buildProgress();
  if (name === 'ref') buildRefTable();
}
window.switchMode = switchMode;

// ── FLASHCARD ─────────────────────────────────────────────────
let fcDeck = [], fcIdx = 0, fcFlipped = false;

function updateCard() {
  const deck = fcDeck.length ? fcDeck : getFiltered();
  if (!deck.length) return;
  const c = deck[fcIdx % deck.length];
  document.getElementById('fc-cat').textContent     = c.cat;
  document.getElementById('fc-code').textContent    = c.code;
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
  recordCodeResult(deck[fcIdx % deck.length].code, correct);
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

window.flipCard = flipCard;
window.markFlash = markFlash;
window.nextCard = nextCard;
window.prevCard = prevCard;

// ── MULTIPLE CHOICE ───────────────────────────────────────────
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
    btn.onclick = () => {
      if (mcAnswered) return;
      mcAnswered = true;
      const correct = opt.code === mcCurrent.code;
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
      fb.textContent = correct ? '✓ Correct!' : '✗ Answer: ' + (flip ? mcCurrent.code : mcCurrent.meaning);
      document.getElementById('mc-next').style.display = '';
    };
    container.appendChild(btn);
  });
}

function nextMC() { loadMC(); }
window.nextMC = nextMC;

// ── FILL IN BLANK ─────────────────────────────────────────────
let fitbCurrent = null, fitbAnswered = false;

function loadFitb() {
  fitbAnswered = false;
  document.getElementById('fitb-feedback').style.display = 'none';
  document.getElementById('fitb-next').style.display = 'none';
  const inp = document.getElementById('fitb-input');
  inp.value = ''; inp.disabled = false;
  const pool = getFiltered();
  fitbCurrent = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('fitb-prompt').textContent = 'What does ' + fitbCurrent.code + ' mean?';
}

function checkFitb() {
  if (fitbAnswered) return;
  const inp = document.getElementById('fitb-input');
  const answer = inp.value.trim().toLowerCase();
  if (!answer) return;
  fitbAnswered = true; inp.disabled = true;
  const target = fitbCurrent.meaning.toLowerCase();
  const keywords = target.replace(/[^a-z0-9 ]/g,'').split(' ').filter(w => w.length > 3);
  const correct = keywords.some(kw => answer.includes(kw)) || answer.includes(target.substring(0,5));
  recordCodeResult(fitbCurrent.code, correct);
  updateStats();
  const fb = document.getElementById('fitb-feedback');
  fb.style.display = '';
  fb.className = 'feedback ' + (correct ? 'good' : 'bad');
  fb.textContent = correct ? '✓ Good! Full answer: ' + fitbCurrent.meaning : '✗ Answer: ' + fitbCurrent.meaning;
  document.getElementById('fitb-next').style.display = '';
}

function nextFitb() { loadFitb(); }
window.checkFitb = checkFitb;
window.nextFitb = nextFitb;

// ── REFERENCE ─────────────────────────────────────────────────
let refBuilt = false;
function buildRefTable() {
  if (refBuilt) return;
  refBuilt = true;
  const div = document.getElementById('ref-content');
  CATS.forEach(cat => {
    const items = ALL_CODES.filter(c => c.cat === cat);
    const sec = document.createElement('div');
    sec.className = 'ref-section';
    sec.innerHTML = '<div class="ref-section-title">' + cat + '</div>';
    items.forEach(c => {
      const row = document.createElement('div');
      row.className = 'ref-row';
      row.innerHTML = `<span class="ref-code">${c.code}</span><span class="ref-meaning">${c.meaning}</span>`;
      if (isMastered(c.code)) {
        const dot = document.createElement('div');
        dot.className = 'mastered-dot'; dot.title = 'Mastered';
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
    div.innerHTML = '<div class="empty-state">No attempts yet — start with flashcards or multiple choice!</div>';
    return;
  }
  const mastered  = attempted.filter(c => isMastered(c.code));
  const learning  = attempted.filter(c => !isMastered(c.code));
  const untouched = ALL_CODES.filter(c => getCodeStat(c.code).attempts === 0);
  if (mastered.length)  renderSection(div, 'Mastered (' + mastered.length + ')',  mastered,  'mastered');
  if (learning.length)  renderSection(div, 'Still learning (' + learning.length + ')', learning, 'learning');
  if (untouched.length) renderSection(div, 'Not yet attempted (' + untouched.length + ')', untouched, 'new');
}

function renderSection(parent, title, codes, status) {
  const sec = document.createElement('div');
  sec.className = 'progress-section';
  sec.innerHTML = '<div class="progress-section-title">' + title + '</div>';
  codes.forEach(c => {
    const s = getCodeStat(c.code);
    const pct = s.attempts > 0 ? Math.round(s.correct / s.attempts * 100) : 0;
    const item = document.createElement('div');
    item.className = 'progress-item';
    item.innerHTML = `
      <span class="progress-code">${c.code}</span>
      <span class="progress-meaning">${c.meaning}</span>
      ${s.attempts > 0 ? `<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div><span class="progress-pct">${pct}%</span>` : ''}
      <span class="badge-${status}">${status === 'mastered' ? '✓ Mastered' : status === 'learning' ? 'Learning' : 'New'}</span>
    `;
    sec.appendChild(item);
  });
  parent.appendChild(sec);
}

async function resetProgress() {
  if (!confirm('Reset all your progress? This cannot be undone.')) return;
  userData = { scores: { correct: 0, attempts: 0 }, codeStats: {} };
  if (currentUser) await setDoc(doc(db, 'users', currentUser.uid), userData);
  updateStats();
  refBuilt = false;
  document.getElementById('ref-content').innerHTML = '';
  buildProgress();
}

// ── EXPOSE GLOBALS FOR HTML onclick ──────────────────────────
window.handleLogin          = handleLogin;
window.handleSignup         = handleSignup;
window.handleForgotPassword = handleForgotPassword;
window.signOut              = signOut;
window.resetProgress        = resetProgress;
window.showScreen           = showScreen;
