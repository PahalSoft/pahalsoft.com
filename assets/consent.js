/*
 * Cookie consent for pahalsoft.com.
 *
 * Every page starts with Google Analytics switched off (Consent Mode "denied", set in
 * the page <head> before Tag Manager loads). This banner asks once; "Accept" turns
 * analytics on and is remembered, "Decline" keeps it off. Ad storage is always off:
 * the site shows no ads. Any element with data-cookie-settings reopens the banner.
 */
(function () {
  var KEY = "ps-consent";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function remember(choice) {
    try { localStorage.setItem(KEY, choice); } catch (e) { /* private mode: ask again next time */ }
  }

  function apply(choice) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag("consent", "update", { analytics_storage: choice === "granted" ? "granted" : "denied" });
  }

  var css =
    ".ps-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:2000;max-width:560px;margin:0 auto;" +
    "padding:16px 18px;border-radius:16px;background:var(--bs-body-bg,#fff);color:var(--bs-body-color,#212529);" +
    "border:1px solid var(--bs-border-color,rgba(0,0,0,.12));box-shadow:0 12px 40px rgba(0,0,0,.18);" +
    "font-size:.95rem;line-height:1.45}" +
    ".ps-consent p{margin:0 0 12px}" +
    ".ps-consent a{color:inherit;text-decoration:underline}" +
    ".ps-consent .ps-row{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}" +
    ".ps-consent button{border-radius:999px;padding:8px 18px;font-weight:600;border:1px solid var(--bs-border-color,rgba(0,0,0,.2));" +
    "background:transparent;color:inherit;cursor:pointer}" +
    ".ps-consent button.ps-yes{background:#3fb77a;border-color:#3fb77a;color:#06281a}" +
    ".ps-consent button:focus-visible{outline:2px solid #3fb77a;outline-offset:2px}";

  function show() {
    if (document.querySelector(".ps-consent")) return;
    if (!document.getElementById("ps-consent-css")) {
      var style = document.createElement("style");
      style.id = "ps-consent-css";
      style.textContent = css;
      document.head.appendChild(style);
    }
    var box = document.createElement("div");
    box.className = "ps-consent";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Cookie choice");
    box.innerHTML =
      "<p>May we use Google Analytics cookies to count visits and see which pages are useful? " +
      "It's anonymous and only for this website, never our apps. " +
      "<a href=\"/legal/privacy.html\">Website privacy</a></p>" +
      "<div class=\"ps-row\"><button type=\"button\" class=\"ps-no\">Decline</button>" +
      "<button type=\"button\" class=\"ps-yes\">Accept</button></div>";
    function choose(choice) {
      remember(choice);
      apply(choice);
      box.remove();
    }
    box.querySelector(".ps-yes").addEventListener("click", function () { choose("granted"); });
    box.querySelector(".ps-no").addEventListener("click", function () { choose("denied"); });
    document.body.appendChild(box);
  }

  window.psCookieSettings = show;
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-cookie-settings]");
    if (t) { e.preventDefault(); show(); }
  });
  if (!stored()) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", show);
    else show();
  }
})();
