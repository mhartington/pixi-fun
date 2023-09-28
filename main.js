import './style.css';

import { Application, Graphics, Container, Sprite, Texture } from 'pixi.js';
import { AdjustmentFilter, KawaseBlurFilter, TwistFilter } from 'pixi-filters';

const shuffleButton = document.querySelector('#shuffleButton');
const albumsToRender = [
  'https://upload.wikimedia.org/wikipedia/en/4/48/SleepTokenTMBTE.jpg',
  'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg',
  'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/57/be/19/57be194f-7b85-86ed-f59b-afc86806b6e5/16UMGIM35664.rgb.jpg/40x40bb.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/The_Dark_Side_of_the_Moon_Cover.svg/1280px-The_Dark_Side_of_the_Moon_Cover.svg.png',
  'https://upload.wikimedia.org/wikipedia/en/2/2f/Aenima.jpg'
]
shuffleButton.addEventListener('click', () => {
  const newArtwork = albumsToRender[Math.floor(Math.random() * albumsToRender.length)];
  updateArtwork(newArtwork);
});

const root = document.getElementById('app');
const { width, height } = root.getBoundingClientRect();

const app = new Application({
  width,
  height,
  view: root,
  powerPreference: 'low-power',
  backgroundAlpha: 0,
});

const graphics = new Graphics();
const container = new Container();

graphics.beginFill(16777215);
graphics.drawRect(0, 0, app.renderer.width, app.renderer.height);
graphics.endFill();
app.stage.addChild(graphics);
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
app.ticker.maxFPS = 15;
initAnimation();

updateArtwork(albumsToRender[Math.floor(Math.random() * albumsToRender.length)]);

function addSpriteToContainer(t, s, i, r) {
  t.anchor.set(0.5, 0.5);
  s.anchor.set(0.5, 0.5);
  i.anchor.set(0.5, 0.5);
  r.anchor.set(0.5, 0.5);
  t.position.set(app.screen.width / 2, app.screen.height / 2);
  s.position.set(app.screen.width / 2.5, app.screen.height / 2.5);
  i.position.set(app.screen.width / 2, app.screen.height / 2);
  r.position.set(app.screen.width / 2, app.screen.height / 2);
  t.width = app.screen.width * 1.25;
  t.height = t.width;
  s.width = app.screen.width * 0.8;
  s.height = s.width;
  i.width = app.screen.width * 0.5;
  i.height = i.width;
  r.width = app.screen.width * 0.25;
  r.height = r.width;
  container.addChild(t, s, i, r);
};

function initAnimation(){
  app.stage.addChild(container);
  const sprite1 = new Sprite();
  const sprite2 = new Sprite();
  const sprite3 = new Sprite();
  const sprite4 = new Sprite();

  addSpriteToContainer(sprite1, sprite2, sprite3, sprite4);

  const n = new KawaseBlurFilter();
  const o = new KawaseBlurFilter();
  const h = new KawaseBlurFilter();
  const a = new KawaseBlurFilter();
  const l = new KawaseBlurFilter();
  n.blur = 5;
  o.blur = 10;
  h.blur = 20;
  a.blur = 40;
  l.blur = 80;
  n.quality = 1;
  o.quality = 1;
  h.quality = 2;
  a.quality = 2;
  l.quality = 2;

  const u = new TwistFilter();
  u.angle = -3.25;
  u.radius = 900;
  u.offset.x = app.renderer.screen.width / 2;
  u.offset.y = app.renderer.screen.height / 2;

  const c = new AdjustmentFilter();
  c.saturation = 2.75;
  c.brightness = 0.7;
  c.contrast = 1.9;

  container.filters = [ u, n, o, h, a, l, c];

  const d = new Sprite();
  d.width = app.screen.width;
  d.height = app.screen.height;

  const p = new Graphics();
  p.beginFill(0, 0.5);
  p.drawRect(0, 0, app.screen.width, app.screen.height);
  p.endFill(),
    //  New sprite container
    d.addChild(p),
    app.stage.addChild(d);

  const f = new Sprite();
  f.width = app.screen.width;
  f.height = app.screen.height;
  const _ = new Graphics();
  _.beginFill(16777215, 0.05);
  _.drawRect(0, 0, app.screen.width, app.screen.height);
  _.endFill();
  d.addChild(_);
  app.stage.addChild(f);
};

async function updateArtwork(t){
  if (app) {
    const s = await Texture.fromURL(t);
    const i = [];

    for (let h = 0; h < 4; h++) {
      const a = new Sprite(s);
      a.alpha = 0;
      i.push(a);
    }
    container.children.length > 4 && container.removeChildren(4);
    addSpriteToContainer.apply(this, i);

    const r = container.children.slice(0, 4);

    let n = 1;
    const o = r.map((h) => h.rotation);
    app.ticker.add(() => {
      let h = app.ticker.deltaMS / 33.333333;
      n -= 0.02 * h;
      n < 0 && container.removeChild(...r);
      r.forEach((a) => a.alpha = n);
      i.forEach((a) => a.alpha = 1 - n);


reduceMotionQuery.matches 
        ? (o[0] += .001 * h, o[1] += .001 * h, o[2] += .001 * h, o[3] += .001 * h) 
        : (o[0] += .003 * h, o[1] -= .008 * h, o[2] -= .006 * h, o[3] += .004 * h);

                i[0] && (i[0].rotation = o[0]);
                i[1] && (i[1].rotation = o[1]);

                i[2] && (i[2].rotation = -o[2], i[2].x = app.screen.width / 2 + app.screen.width / 4 * Math.cos(o[2] * .75), i[2].y = app.screen.height / 2 + app.screen.width / 4 * Math.sin(o[2] * .75));
                i[3] && (i[3].rotation = -o[3], i[3].x = app.screen.width / 2 + app.screen.width / 2 * .1 + app.screen.width / 4 * Math.cos(o[3] * .75), i[3].y = app.screen.height / 2 + app.screen.width / 2 * .1 + app.screen.width / 4 * Math.sin(o[3] * .75));

    });

  }
};
