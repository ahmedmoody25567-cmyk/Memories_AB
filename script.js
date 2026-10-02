/* ================= عدّل هنا بس ================= */
const PASSCODE = "67255";
const TITLE    = "ذكرياتنا";
const SUBTITLE = "مودي وبوسي";
const ENDING   = "غلطت أحيانًا، بس عمري ما غلطت في حبي ليكي.<br>سامحيني يا بوسي ♥";

const PHOTOS = [
  {src:"images/01.jpg", text:"أبسط لمسة بين صوابعنا، وأكبر أمان حسيته."},
  {src:"images/02.jpg", text:"على سلم السنتر، إيدينا قريبة وقلبي أقرب."},
  {src:"images/03.jpg", text:"مهما الدنيا زحمة، إيدك هي اللي بدور عليها."},
  {src:"images/04.jpg", text:"شهادة تقدير على تعبنا، وأحلى تقدير إني كنت جنبك."},
  {src:"images/05.jpg", text:"ضحكنا ورا الأقنعة، بس قلبي معاكي من غير أي قناع."},
  {src:"images/06.jpg", text:"عصير برتقان وقعدة خفيفة، وكل حاجة معاكي أحلى."},
  {src:"images/07.jpg", text:"كل كوباية معاكي ليها طعم تاني."},
  {src:"images/08.jpg", text:"ابتسامتك الصغيرة دي بتصلّح يومي كله."},
  {src:"images/09.jpg", text:"إيدك على دراعي، والدنيا كلها بتهدى."},
  {src:"images/10.jpg", text:"ماسكة كُم قميصي كأنك بتقوليلي: خليك."},
  {src:"images/11.jpg", text:"قلب صغير من صوابعنا، بيحكي أكتر من أي كلام."},
  {src:"images/12.jpg", text:"حتى لو الدنيا ضلمة، إحنا بنلاقي بعض."},
  {src:"images/13.jpg", text:"وعد صغير بصباعين: مهما حصل، نرجع لبعض."},
  {src:"images/14.jpg", text:"زي ما بحلم بيكي: قريبين، مبسوطين، والبحر وراينا."},
];
/* =============================================== */

const $ = id => document.getElementById(id);
let entered = "";

const sky = $("sky");
for (let i = 0; i < 14; i++) {
  const s = document.createElement("span");
  s.textContent = "♥";
  s.style.left = Math.random() * 100 + "%";
  s.style.fontSize = 14 + Math.random() * 22 + "px";
  s.style.animationDuration = 9 + Math.random() * 10 + "s";
  s.style.animationDelay = Math.random() * 12 + "s";
  sky.appendChild(s);
}

const keys = $("keys"), dots = $("dots");
[1,2,3,4,5,6,7,8,9,"",0,"⌫"].forEach(k => {
  const b = document.createElement("button");
  b.className = "key"; b.textContent = k;
  if (k === "") b.style.visibility = "hidden"; else b.onclick = () => press(k);
  keys.appendChild(b);
});
for (let i = 0; i < PASSCODE.length; i++) dots.appendChild(document.createElement("i"));
const paint = () => [...dots.children].forEach((d, i) => d.classList.toggle("on", i < entered.length));

$("heart").onclick = () => {
  $("lock").classList.add("opened");
  $("hint").textContent = "ادخل الرمز السري";
};
document.addEventListener("keydown", e => {
  if (!$("lock").classList.contains("opened") || $("lock").hidden) return;
  if (/^\d$/.test(e.key)) press(e.key);
  if (e.key === "Backspace") press("⌫");
});

function press(k) {
  if (k === "⌫") entered = entered.slice(0, -1);
  else if (entered.length < PASSCODE.length) entered += k;
  paint();
  if (entered.length < PASSCODE.length) return;
  if (entered === PASSCODE) return unlock();
  $("msg").textContent = "الرمز مش صح، جرب تاني";
  $("pad").classList.add("shake");
  setTimeout(() => {
    $("pad").classList.remove("shake");
    entered = ""; paint(); $("msg").textContent = "";
  }, 800);
}

function unlock() {
  $("lock").hidden = true;
  $("memories").hidden = false;
  window.scrollTo(0, 0);
  $("title").textContent = TITLE;
  $("sub").textContent = SUBTITLE;
  $("end").innerHTML = ENDING;
  PHOTOS.forEach((p, i) => {
    const fig = document.createElement("figure");
    fig.style.setProperty("--r", (i % 2 ? 1.2 : -1.2) + "deg");
    const img = new Image();
    img.src = p.src; img.alt = p.text; img.loading = "lazy";
    img.onerror = () => fig.remove();
    img.onclick = () => openLb(p);
    const cap = document.createElement("figcaption");
    cap.textContent = p.text;
    fig.append(img, cap);
    $("list").appendChild(fig);
  });
}

function openLb(p) {
  $("lb").querySelector("img").src = p.src;
  $("lb").querySelector("p").textContent = p.text;
  $("lb").hidden = false;
}
$("lb").onclick = () => $("lb").hidden = true;
