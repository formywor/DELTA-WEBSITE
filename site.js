(function(){
  const DISCORD_INVITE = "https://discord.gg/4s9KjQexbS";

  // Modal elements (same on every page)
  const overlay = document.getElementById("modalOverlay");
  const bodyText = document.getElementById("modalBodyText");
  const noBtn = document.getElementById("noBtn");
  const joinBtn = document.getElementById("joinBtn");

  // If a page doesn’t include the modal, just stop.
  if(!overlay || !bodyText || !noBtn || !joinBtn) return;

  joinBtn.href = DISCORD_INVITE;

  let pendingUrl = null;

  function openModal(text){
    bodyText.textContent = text;
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
  }
  function closeModal(){
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
  }

  noBtn.addEventListener("click", () => {
    if(pendingUrl){
      const url = pendingUrl;
      pendingUrl = null;
      closeModal();
      window.location.href = url;
      return;
    }
    closeModal();
  });

  overlay.addEventListener("click", (e) => {
    if(e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeModal();
  });

  // Intercept only download buttons
  document.querySelectorAll(".downloadBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      pendingUrl = btn.href;
      openModal("Join our Discord server for updates and support before downloading?");
    });
  });

  // Optional OS badge (safe + simple)
  const badge = document.getElementById("osBadge");
  if(badge){
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";
    const touchMac = (platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const isIOS = /iPhone|iPad|iPod/i.test(ua) || touchMac;
    const isAndroid = /Android/i.test(ua);
    const isMac = /Macintosh|Mac OS X/i.test(ua) && !isIOS;

    const os = isIOS ? "iOS" : isAndroid ? "Android" : isMac ? "macOS" : "your device";
    badge.style.display = "inline-flex";
    badge.textContent = "✓ " + os + " detected";
  }
})();
