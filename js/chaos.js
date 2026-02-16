// === CHAOS ENGINE v3 — GRAVITY + COLLISIONS + ELASTIC LINKS ===
// Self-wiring: include on any page with .chaos-toggle / .debug-toggle / .light-toggle.
// Persists toggle states across pages via localStorage.

(function() {

  // --- Chaos engine setup (must be defined BEFORE restore logic) ---

  // All verified images from across the whole site (no .avif, all confirmed on disk)
  var SITE_IMAGES = [
    // Nike (3)
    '../nike/nike-ronaldo.jpg', '../nike/nike-mbappe.jpg', '../nike/nike-neymar.jpg',
    // DAZN (9)
    '../dazn/dazn1.jpg', '../dazn/dazn2.jpg', '../dazn/dazn3.gif', '../dazn/dazn4.gif', '../dazn/dazn5.jpg', '../dazn/dazn6.gif', '../dazn/dazn7.jpg', '../dazn/dazn8.jpg', '../dazn/dazn9.png',
    // Voco (7)
    '../voco/voco1.jpg', '../voco/voco2.jpg', '../voco/voco3.jpg', '../voco/voco4.jpg', '../voco/voco5.jpg', '../voco/voco6.jpg', '../voco/voco7.jpg',
    // Goal (9)
    '../goal/goal1.png', '../goal/goal2.png', '../goal/goal3.png', '../goal/goal4.png', '../goal/goal5.png', '../goal/goal6.png', '../goal/goal7.png', '../goal/goal8.png', '../goal/goal9.png',
    // Skaters (1)
    '../skaters/skaters1.jpg',
    // Kanye (5)
    '../kanye/k1.jpeg', '../kanye/k2.jpeg', '../kanye/k3.jpeg', '../kanye/k4.jpeg', '../kanye/k5.jpeg',
    // HBR (1)
    '../hbr/ifyoulookhardenough.jpg',
    // BJM (4)
    '../bjm/amsterdam.jpg', '../bjm/barcelona.jpg', '../bjm/malmo.jpg', '../bjm/paris.jpg',
    // Moodboards (13)
    '../moodboards/moodboard1.png', '../moodboards/moodboard2.png', '../moodboards/moodboard3.png', '../moodboards/moodboard4.png', '../moodboards/moodboard5.png', '../moodboards/moodboard6.png', '../moodboards/moodboard7.png', '../moodboards/moodboard8.png', '../moodboards/moodboard9.png', '../moodboards/moodboard10.png', '../moodboards/moodboard11.png', '../moodboards/moodboard12.png', '../moodboards/moodboard13.png',
    // BTC.ART (10)
    '../btc.art/var-gradient-light.png', '../btc.art/var-gradient-dark.png', '../btc.art/var-mono-white.png', '../btc.art/var-mono-black.png', '../btc.art/btc-art-5.png', '../btc.art/btc-art2.png', '../btc.art/btc-art4.png', '../btc.art/btc-art5.png', '../btc.art/btcart-6.png', '../btc.art/logo-gradient-cropped.png',
    // OGs (7)
    '../ogs/og1.png', '../ogs/og2.png', '../ogs/og3.png', '../ogs/og4.png', '../ogs/og5.png', '../ogs/ogs-1.gif', '../ogs/ogstest.gif',
    // FAR / Paralax (14)
    '../paralax/hero.jpg', '../paralax/blank1.jpg', '../paralax/blank2.jpg', '../paralax/blank3.jpg', '../paralax/blank4.jpg', '../paralax/blank5.jpg', '../paralax/blank6.jpg', '../paralax/blank7.jpg', '../paralax/Untitled-3.jpg', '../paralax/Untitled-4.jpg', '../paralax/Untitled-5.jpg', '../paralax/Untitled-6.jpg', '../paralax/Untitled-7.jpg', '../paralax/untitled-0.png',
    // Irn-Bru (1)
    '../irn-bru/ib-1.jpg',
    // Wuthering Heights (1)
    '../wuthering heights/wuth.jpg',
    // Thingdoms (11)
    '../thingdoms/icon.png', '../thingdoms/floaty/125.png', '../thingdoms/floaty/127.png', '../thingdoms/floaty/129.png', '../thingdoms/floaty/131.png', '../thingdoms/floaty/133.png', '../thingdoms/remaster/125.png', '../thingdoms/remaster/127.png', '../thingdoms/remaster/129.png', '../thingdoms/remaster/131.png', '../thingdoms/remaster/133.png',
    // Selected Works (40)
    '../selected works/tumblr_ma8r9ezzMo1qfwoa1o1_1280.jpg', '../selected works/tumblr_ma8rapeXXE1qfwoa1o1_1280.jpg', '../selected works/tumblr_ma8rcfJU8X1qfwoa1o1_1280.jpg', '../selected works/tumblr_ng4shgIKQt1qfwoa1o1_1280.jpg', '../selected works/tumblr_ng4slwnydJ1qfwoa1o1_1280.png', '../selected works/tumblr_ng4ssbyIvy1qfwoa1o1_1280.png', '../selected works/tumblr_ng4sz4jQcb1qfwoa1o1_1280.jpg', '../selected works/tumblr_ng4tfif5Xb1qfwoa1o1_1280.jpg', '../selected works/tumblr_ngf1ivB1GZ1qfwoa1o1_500.jpg', '../selected works/tumblr_nmllpyV0rD1qfwoa1o1_1280.jpg', '../selected works/tumblr_nmutvi9muR1qfwoa1o1_1280.jpeg', '../selected works/tumblr_nmutvi9muR1qfwoa1o2_1280.jpeg', '../selected works/tumblr_nmuurtoYtr1qfwoa1o1_1280.jpg', '../selected works/tumblr_nnvdhxMn2t1qfwoa1o1_1280.jpeg', '../selected works/tumblr_nnvdjkCnXf1qfwoa1o1_1280.jpeg', '../selected works/tumblr_nnxnebtlxI1qfwoa1o1_1280.jpeg', '../selected works/tumblr_nnxnf7Chny1qfwoa1o1_1280.jpeg', '../selected works/tumblr_nnxngiv2p71qfwoa1o1_640.jpeg', '../selected works/tumblr_npwrfm0r401qfwoa1o3_1280.jpeg', '../selected works/tumblr_nqm4jlWprE1qfwoa1o2_1280.jpeg', '../selected works/tumblr_o3myxs4hSA1qfwoa1o1_1280.jpg', '../selected works/tumblr_n6tpi71ZX51qfwoa1o1_1280.jpg', '../selected works/tumblr_n7mi13f3LN1qfwoa1o1_1280.jpg', '../selected works/tumblr_ncb3d3YgDS1qfwoa1o1_1280.jpg', '../selected works/tumblr_ngbi6qxryj1qfwoa1o1_1280.jpg', '../selected works/tumblr_ngqjupoTo81qfwoa1o1_1280.jpg', '../selected works/tumblr_ngqkst5lv81qfwoa1o1_1280.jpg', '../selected works/tumblr_nmpmmxXs9H1qfwoa1o1_1280.jpg', '../selected works/tumblr_nmucpmUrIv1qfwoa1o1_1280.jpg', '../selected works/tumblr_noew1em3WI1qfwoa1o1_540.jpg', '../selected works/tumblr_noji0hwmZ91qfwoa1o1_1280.jpg', '../selected works/tumblr_ng9q7b3Y7G1qfwoa1o1_640.jpg', '../selected works/tumblr_ngmm8r6nWX1qfwoa1o1_640.jpg', '../selected works/22.png', '../selected works/33.jpg', '../selected works/tpo2.png', '../selected works/wuth.jpg', '../selected works/wuh.jpg', '../selected works/wuh4.jpg', '../selected works/wuh5.jpg'
  ];

  // Images that always appear in chaos mode
  var PINNED_IMAGES = [
    '../selected works/catch.png',
    '../hireme.png'
  ];

  var C = {
    raf: null, trail: [], history: [], glow: null, cursorEl: null, mx: 0, my: 0,
    TRAIL_N: 20, HIST_N: 8, RADIUS: 250, FORCE: 30,
    floaters: [], dragging: null, dragOffX: 0, dragOffY: 0,
    // Gravity
    gravity: false, GRAVITY_ACCEL: 0.18, FLOOR_BOUNCE: 0.6,
    // Collision sounds — only the last touched floater, for a short window after release
    audioCtx: null, lastBumpTime: 0, lastWallTime: 0, lastTouched: null, releaseTime: 0, SOUND_WINDOW: 2000,
    // DOM distortion — cached elements, refreshed every ~60 frames
    cachedEls: null, elFrame: 0, EL_REFRESH: 60,
    SEL: 'h1,h2,h3,p,li,span:not(.chaos-trail-dot):not(.chaos-floater),tr,th,td,a,button,.btn,label,summary,img:not(.chaos-floater),video,figure,details,hr,nav,pre,code,div.grid,strong,em,table'
  };

  // --- Web Audio collision sounds ---

  function ensureAudio() {
    if (!C.audioCtx) {
      try {
        C.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch(e) { /* no audio support */ }
    }
    // Always try to resume if suspended
    if (C.audioCtx && C.audioCtx.state === 'suspended') {
      C.audioCtx.resume();
    }
  }

  // Unlock audio on ANY user interaction, not just floater clicks
  function unlockAudio() {
    ensureAudio();
    // Remove after first successful unlock
    if (C.audioCtx && C.audioCtx.state === 'running') {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    }
  }
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);
  document.addEventListener('keydown', unlockAudio);

  function soundAllowed() {
    // Only play sounds while dragging, or within SOUND_WINDOW ms after release
    if (C.dragging) return 1;
    if (!C.releaseTime) return 0;
    var elapsed = Date.now() - C.releaseTime;
    if (elapsed > C.SOUND_WINDOW) return 0;
    // Fade volume as window expires
    return 1 - (elapsed / C.SOUND_WINDOW);
  }

  function playCollisionSound(force) {
    var fade = soundAllowed();
    if (!fade || !C.audioCtx || C.audioCtx.state !== 'running') return;
    var now = C.audioCtx.currentTime;
    // Own throttle — doesn't block wall sounds
    if (now - C.lastBumpTime < 0.045) return;
    C.lastBumpTime = now;

    // Scale: soft bumps = quiet high ping, hard hits = loud low thud — fades after release
    var vol = Math.min(force * 0.08, 0.4) * fade;
    if (vol < 0.005) return;
    var baseFreq = 800 - force * 60;
    if (baseFreq < 120) baseFreq = 120;

    // Oscillator — short boing sweep
    var osc = C.audioCtx.createOscillator();
    var gain = C.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, now + 0.15);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(C.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.2);

    // Second harmonic for richness
    var osc2 = C.audioCtx.createOscillator();
    var gain2 = C.audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.12);
    gain2.gain.setValueAtTime(vol * 0.4, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc2.connect(gain2);
    gain2.connect(C.audioCtx.destination);
    osc2.start(now);
    osc2.stop(now + 0.16);
  }

  function playWallSound(speed) {
    var fade = soundAllowed();
    if (!fade || !C.audioCtx || C.audioCtx.state !== 'running') return;
    var now = C.audioCtx.currentTime;
    // Own throttle — doesn't block collision sounds
    if (now - C.lastWallTime < 0.03) return;
    C.lastWallTime = now;

    var vol = Math.min(Math.abs(speed) * 0.03, 0.2) * fade;
    if (vol < 0.005) return;

    var osc = C.audioCtx.createOscillator();
    var gain = C.audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(C.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }


  // --- Floating images system ---

  function spawnFloaters() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    // Shuffle and pick 25, but always include pinned images
    var shuffled = SITE_IMAGES.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[r]; shuffled[r] = tmp;
    }
    var count = Math.min(shuffled.length, 25 - PINNED_IMAGES.length);
    // Remove any pinned images from the shuffled pool so they don't appear twice
    shuffled = shuffled.filter(function(src) { return PINNED_IMAGES.indexOf(src) === -1; });
    // Prepend pinned images so they always appear
    shuffled = PINNED_IMAGES.concat(shuffled);
    count = Math.min(shuffled.length, 25);

    for (var n = 0; n < count; n++) {
      var img = document.createElement('img');
      img.className = 'chaos-floater';
      img.src = shuffled[n];
      img.draggable = false;
      // Remove if it fails to load
      img.onerror = function() {
        // Remove from floaters array too
        var el = this;
        for (var k = C.floaters.length - 1; k >= 0; k--) {
          if (C.floaters[k].el === el) { C.floaters.splice(k, 1); break; }
        }
        this.remove();
      };
      document.body.appendChild(img);

      var w = 80 + Math.random() * 140;
      C.floaters.push({
        el: img, w: w,
        x: Math.random() * (vw - w),
        y: Math.random() * (vh - w * 0.7),
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 0.5,
        sx: 1, sy: 1,
        hueOff: Math.random() * 360,
        opacity: 1,
        mass: w * w * 0.001 // mass proportional to area
      });
    }
  }

  function destroyFloaters() {
    C.floaters.forEach(function(f) { f.el.remove(); });
    C.floaters = [];
    C.dragging = null;
  }

  // --- Floater-to-floater collision detection ---

  function resolveCollisions() {
    for (var i = 0; i < C.floaters.length; i++) {
      var a = C.floaters[i];
      var ar = a.w * 0.35; // approximate radius
      var ax = a.x + a.w / 2;
      var ay = a.y + a.w * 0.35;

      for (var j = i + 1; j < C.floaters.length; j++) {
        var b = C.floaters[j];
        var br = b.w * 0.35;
        var bx = b.x + b.w / 2;
        var by = b.y + b.w * 0.35;

        var dx = bx - ax;
        var dy = by - ay;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var minDist = ar + br;

        if (dist < minDist && dist > 0) {
          // Push apart
          var overlap = minDist - dist;
          var nx = dx / dist;
          var ny = dy / dist;

          // Separate proportional to inverse mass
          var totalMass = a.mass + b.mass;
          var aRatio = b.mass / totalMass;
          var bRatio = a.mass / totalMass;

          if (a !== C.dragging) {
            a.x -= nx * overlap * aRatio;
            a.y -= ny * overlap * aRatio;
          }
          if (b !== C.dragging) {
            b.x += nx * overlap * bRatio;
            b.y += ny * overlap * bRatio;
          }

          // Elastic velocity exchange along collision normal
          var dvx = a.vx - b.vx;
          var dvy = a.vy - b.vy;
          var dvDotN = dvx * nx + dvy * ny;

          // Only resolve if objects are moving toward each other
          if (dvDotN > 0) {
            var restitution = 0.7;
            var impulse = dvDotN * restitution;

            if (a !== C.dragging) {
              a.vx -= impulse * aRatio * nx;
              a.vy -= impulse * aRatio * ny;
            }
            if (b !== C.dragging) {
              b.vx += impulse * bRatio * nx;
              b.vy += impulse * bRatio * ny;
            }

            // Spin from collision
            a.vr += (Math.random() - 0.5) * dvDotN * 0.08;
            b.vr += (Math.random() - 0.5) * dvDotN * 0.08;

            // Squash on impact
            var squash = Math.min(dvDotN * 0.04, 0.3);
            a.sx = 1 + squash; a.sy = 1 - squash * 0.5;
            b.sx = 1 + squash; b.sy = 1 - squash * 0.5;

            // Sound — only if the last touched image is involved
            if (a === C.lastTouched || b === C.lastTouched) {
              playCollisionSound(dvDotN);
            }
          }
        }
      }
    }
  }

  // Drag handlers
  function floaterDown(e) {
    if (!document.body.classList.contains('chaos')) return;
    var target = e.target;
    if (!target.classList.contains('chaos-floater')) return;
    e.preventDefault();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;
    for (var i = 0; i < C.floaters.length; i++) {
      if (C.floaters[i].el === target) {
        C.dragging = C.floaters[i];
        C.lastTouched = C.floaters[i];
        C.dragOffX = clientX - C.dragging.x;
        C.dragOffY = clientY - C.dragging.y;
        C.dragging.vx = 0;
        C.dragging.vy = 0;
        C.dragging._lastX = clientX;
        C.dragging._lastY = clientY;
        break;
      }
    }
  }

  function floaterMove(e) {
    if (!C.dragging) return;
    e.preventDefault();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;
    C.dragging.x = clientX - C.dragOffX;
    C.dragging.y = clientY - C.dragOffY;
    // Track velocity for flick
    C.dragging.vx = (clientX - C.dragging._lastX) * 0.5;
    C.dragging.vy = (clientY - C.dragging._lastY) * 0.5;
    C.dragging._lastX = clientX;
    C.dragging._lastY = clientY;
    // Stretch based on drag speed
    var speed = Math.sqrt(C.dragging.vx * C.dragging.vx + C.dragging.vy * C.dragging.vy);
    var angle = Math.atan2(C.dragging.vy, C.dragging.vx);
    var stretch = Math.min(speed * 0.05, 0.6);
    C.dragging.sx = 1 + Math.abs(Math.cos(angle)) * stretch;
    C.dragging.sy = 1 + Math.abs(Math.sin(angle)) * stretch;
  }

  function floaterUp() {
    if (C.dragging) {
      // Start the sound fade-out window
      C.releaseTime = Date.now();
      C.dragging = null;
    }
  }

  function initChaos() {
    if (C.raf) return; // already running
    for (var i = 0; i < C.TRAIL_N; i++) {
      var d = document.createElement('span');
      d.className = 'chaos-trail-dot';
      document.body.appendChild(d);
      C.trail.push({ el: d, x: 0, y: 0 });
    }
    for (var j = 0; j < C.HIST_N; j++) C.history.push({ x: 0, y: 0 });
    document.documentElement.classList.add('chaos-active');
    C.glow = document.createElement('div');
    C.glow.className = 'chaos-glow';
    document.body.appendChild(C.glow);
    C.cursorEl = document.createElement('div');
    C.cursorEl.className = 'chaos-cursor';
    C.cursorEl.textContent = '💀';
    document.body.appendChild(C.cursorEl);
    spawnFloaters();
    // Init audio on first interaction (browser requires user gesture)
    ensureAudio();
    document.addEventListener('mousemove', chaosMove);
    document.addEventListener('mousedown', floaterDown);
    document.addEventListener('mousemove', floaterMove);
    document.addEventListener('mouseup', floaterUp);
    document.addEventListener('touchstart', floaterDown, { passive: false });
    document.addEventListener('touchmove', floaterMove, { passive: false });
    document.addEventListener('touchend', floaterUp);
    C.raf = requestAnimationFrame(chaosFrame);
  }

  function destroyChaos() {
    document.removeEventListener('mousemove', chaosMove);
    document.removeEventListener('mousedown', floaterDown);
    document.removeEventListener('mousemove', floaterMove);
    document.removeEventListener('mouseup', floaterUp);
    document.removeEventListener('touchstart', floaterDown);
    document.removeEventListener('touchmove', floaterMove);
    document.removeEventListener('touchend', floaterUp);
    if (C.raf) cancelAnimationFrame(C.raf);
    C.raf = null;
    C.trail.forEach(function(t) { t.el.remove(); });
    C.trail = [];
    C.history = [];
    document.documentElement.classList.remove('chaos-active');
    if (C.glow) { C.glow.remove(); C.glow = null; }
    if (C.cursorEl) { C.cursorEl.remove(); C.cursorEl = null; }
    C.cachedEls = null;
    C.elFrame = 0;
    destroyFloaters();
    document.querySelectorAll('[data-cd]').forEach(function(el) {
      el.style.transform = '';
      el.style.filter = '';
      el.removeAttribute('data-cd');
    });
  }

  function chaosMove(e) { C.mx = e.clientX; C.my = e.clientY; }

  function chaosFrame() {
    if (!document.body.classList.contains('chaos')) return;

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var hue = (C.mx / vw) * 360;
    document.body.style.setProperty('--chaos-hue', hue);

    // === FLOATING IMAGES PHYSICS ===
    for (var fi = 0; fi < C.floaters.length; fi++) {
      var f = C.floaters[fi];
      if (f === C.dragging) {
        // Stretch eases back while dragging stops
      } else {
        // Apply velocity
        f.x += f.vx;
        f.y += f.vy;
        f.rot += f.vr;

        // Gravity — pulls everything downward
        if (C.gravity) {
          f.vy += C.GRAVITY_ACCEL;
        }

        // Friction (slightly less in gravity mode so things stay lively)
        f.vx *= C.gravity ? 0.998 : 0.997;
        f.vy *= C.gravity ? 0.999 : 0.997;
        f.vr *= 0.98;

        // Bounce off viewport edges
        var fh = f.w * 0.7; // approximate height
        var isActive = (f === C.lastTouched);
        if (f.x < 0) {
          f.x = 0; var oldVx = f.vx; f.vx = Math.abs(f.vx) * 0.8; f.vr += (Math.random() - 0.5) * 0.5;
          if (isActive) playWallSound(oldVx);
        }
        if (f.x + f.w > vw) {
          f.x = vw - f.w; var oldVx2 = f.vx; f.vx = -Math.abs(f.vx) * 0.8; f.vr += (Math.random() - 0.5) * 0.5;
          if (isActive) playWallSound(oldVx2);
        }
        if (f.y < 0) {
          f.y = 0; var oldVy = f.vy; f.vy = Math.abs(f.vy) * 0.8; f.vr += (Math.random() - 0.5) * 0.5;
          if (isActive) playWallSound(oldVy);
        }
        if (f.y + fh > vh) {
          f.y = vh - fh;
          var oldVy2 = f.vy;
          f.vy = -Math.abs(f.vy) * C.FLOOR_BOUNCE;
          f.vr += (Math.random() - 0.5) * 0.5;
          // Floor friction — slow horizontal movement when on ground
          if (C.gravity) f.vx *= 0.95;
          if (isActive) playWallSound(oldVy2);
        }

        // Cursor proximity — push away
        var fcx = f.x + f.w / 2;
        var fcy = f.y + f.w * 0.35;
        var fdx = C.mx - fcx;
        var fdy = C.my - fcy;
        var fdist = Math.sqrt(fdx * fdx + fdy * fdy);
        if (fdist < 200 && fdist > 0) {
          var fforce = (1 - fdist / 200) * 1.5;
          f.vx -= (fdx / fdist) * fforce;
          f.vy -= (fdy / fdist) * fforce;
          f.vr += (fdx > 0 ? 1 : -1) * fforce * 0.08;
        }

        // Stretch eases back to 1
        f.sx += (1 - f.sx) * 0.15;
        f.sy += (1 - f.sy) * 0.15;
      }

      var fHue = (hue + f.hueOff) % 360;
      f.el.style.cssText =
        'position:fixed;z-index:-1;margin:0!important;' +
        'left:' + f.x.toFixed(0) + 'px;top:' + f.y.toFixed(0) + 'px;' +
        'width:' + f.w.toFixed(0) + 'px;height:auto;' +
        'opacity:' + f.opacity.toFixed(2) + ';' +
        'filter:hue-rotate(' + fHue.toFixed(0) + 'deg) saturate(1.4) brightness(0.9);' +
        'transform:rotate(' + f.rot.toFixed(1) + 'deg) scaleX(' + f.sx.toFixed(3) + ') scaleY(' + f.sy.toFixed(3) + ');' +
        'pointer-events:auto;user-select:none;-webkit-user-drag:none;will-change:transform,filter;';
    }

    // === COLLISIONS ===
    resolveCollisions();

    C.history.unshift({ x: C.mx, y: C.my });
    if (C.history.length > C.HIST_N) C.history.pop();

    if (C.cursorEl) {
      C.cursorEl.style.left = C.mx + 'px';
      C.cursorEl.style.top = C.my + 'px';
    }

    for (var i = 0; i < C.trail.length; i++) {
      var t = C.trail[i];
      var target = i === 0 ? { x: C.mx, y: C.my } : C.trail[i - 1];
      var ease = 0.45 - (i * 0.015);
      t.x += (target.x - t.x) * ease;
      t.y += (target.y - t.y) * ease;
      var dotHue = (hue + i * 18) % 360;
      var scale = 1 - (i / C.trail.length) * 0.6;
      var opacity = 1 - (i / C.trail.length);
      t.el.style.cssText =
        'position:fixed;pointer-events:none;z-index:9999;mix-blend-mode:difference;margin:0!important;' +
        'left:' + t.x + 'px;top:' + t.y + 'px;' +
        'width:2ch;height:calc(var(--line-height,1.2rem)*1.5);' +
        'background:hsl(' + dotHue + ',100%,55%);' +
        'opacity:' + opacity.toFixed(2) + ';' +
        'transform:translate(-50%,-50%) scale(' + scale.toFixed(2) + ') rotate(' + (i * 8) + 'deg);';
    }

    // Refresh cached elements every ~60 frames instead of querying every frame
    C.elFrame++;
    if (!C.cachedEls || C.elFrame >= C.EL_REFRESH) {
      C.cachedEls = document.body.querySelectorAll(C.SEL);
      C.elFrame = 0;
    }
    var els = C.cachedEls;
    for (var j = 0; j < els.length; j++) {
      var el = els[j];
      if (el.closest('.chaos-trail-dot') || el.closest('.chaos-glow') || el.classList.contains('chaos-floater')) continue;

      var rect = el.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = C.mx - cx;
      var dy = C.my - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < C.RADIUS) {
        var intensity = 1 - (dist / C.RADIUS);
        var i2 = intensity * intensity;
        var angle = Math.atan2(dy, dx);
        var pushX = -Math.cos(angle) * C.FORCE * i2;
        var pushY = -Math.sin(angle) * C.FORCE * i2;
        var skew = intensity * 4;
        var rotDeg = intensity * 3 * (dx > 0 ? 1 : -1);
        var scl = 1 + intensity * 0.08;

        var tag = el.tagName;
        var isClickable = tag === 'A' || tag === 'BUTTON' || el.classList.contains('btn') || el.closest('a') || el.closest('button');

        if (tag === 'IMG' || tag === 'VIDEO' || tag === 'FIGURE') {
          var imgHue = hue + intensity * 120;
          var sat = 1 + intensity * 3;
          el.style.filter = 'hue-rotate(' + imgHue.toFixed(0) + 'deg) saturate(' + sat.toFixed(1) + ') brightness(' + (1 + intensity * 0.3).toFixed(2) + ')';
          el.style.transform = 'translate(' + pushX.toFixed(1) + 'px,' + pushY.toFixed(1) + 'px) scale(' + scl.toFixed(3) + ')';
        } else if (isClickable) {
          var bigSkew = intensity * 12;
          var bigRot = intensity * 8 * (dx > 0 ? 1 : -1);
          var bigScl = 1 + intensity * 0.15;
          el.style.transform = 'skew(' + bigSkew.toFixed(1) + 'deg) rotate(' + bigRot.toFixed(1) + 'deg) scale(' + bigScl.toFixed(3) + ')';
          el.style.filter = 'hue-rotate(' + (hue + intensity * 180).toFixed(0) + 'deg) brightness(' + (1 + intensity * 0.8).toFixed(2) + ') contrast(' + (1 + intensity * 0.5).toFixed(2) + ')';
        } else {
          el.style.transform = 'translate(' + pushX.toFixed(1) + 'px,' + pushY.toFixed(1) + 'px) skew(' + skew.toFixed(1) + 'deg) rotate(' + rotDeg.toFixed(1) + 'deg) scale(' + scl.toFixed(3) + ')';
          el.style.filter = 'hue-rotate(' + (hue + intensity * 90).toFixed(0) + 'deg) brightness(' + (1 + intensity * 0.5).toFixed(2) + ')';
        }
        el.setAttribute('data-cd', '1');
      } else if (el.hasAttribute('data-cd')) {
        el.style.transform = '';
        el.style.filter = '';
        el.removeAttribute('data-cd');
      }
    }

    C.raf = requestAnimationFrame(chaosFrame);
  }

  // --- Persist toggle states across pages ---

  var modes = [
    { key: 'mode-debug', cls: 'debug', sel: '.debug-toggle', apply: null },
    { key: 'mode-light', cls: null, sel: '.light-toggle', apply: function(on) {
      var r = document.documentElement.style;
      if (on) {
        r.setProperty('--text-color', '#000');
        r.setProperty('--text-color-alt', '#555');
        r.setProperty('--background-color', '#fff');
        r.setProperty('--background-color-alt', '#f0f0f0');
      } else {
        r.removeProperty('--text-color');
        r.removeProperty('--text-color-alt');
        r.removeProperty('--background-color');
        r.removeProperty('--background-color-alt');
      }
    }},
    { key: 'mode-chaos', cls: 'chaos', sel: '.chaos-toggle', apply: function(on) {
      if (on) initChaos(); else destroyChaos();
    }}
  ];

  modes.forEach(function(m) {
    var cb = document.querySelector(m.sel);
    if (!cb) return;

    // Restore saved state on page load
    if (localStorage.getItem(m.key) === '1') {
      cb.checked = true;
      if (m.cls) document.body.classList.add(m.cls);
      if (m.apply) m.apply(true);
    }

    // Save on change (overrides any inline listener)
    cb.addEventListener('change', function() {
      localStorage.setItem(m.key, this.checked ? '1' : '0');
      if (m.cls) document.body.classList.toggle(m.cls, this.checked);
      if (m.apply) m.apply(this.checked);
    });
  });

})();
