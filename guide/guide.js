(function () {
  var KEY = "fade_guide_v1", state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }
  var boxes = Array.prototype.slice.call(document.querySelectorAll("ul.tasks input[type=checkbox]"));
  var steps = Array.prototype.slice.call(document.querySelectorAll("[data-step]"));
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function render() {
    var done = 0;
    boxes.forEach(function (b) { b.checked = !!state[b.id]; b.closest("li").classList.toggle("checked", b.checked); if (b.checked) done++; });
    var stepsDone = steps.filter(function (s) { var bs = s.querySelectorAll("ul.tasks input"); return bs.length && Array.prototype.every.call(bs, function (b) { return b.checked; }); });
    steps.forEach(function (s) { s.classList.toggle("done", stepsDone.indexOf(s) > -1); });
    document.getElementById("count").textContent = stepsDone.length + " / " + steps.length + " étapes terminées";
    document.getElementById("bar").style.width = (boxes.length ? Math.round(done / boxes.length * 100) : 0) + "%";
  }
  boxes.forEach(function (b) { b.addEventListener("change", function () { state[b.id] = b.checked; save(); render(); }); });
  document.getElementById("reset").addEventListener("click", function () { state = {}; save(); render(); });
  render();
})();
