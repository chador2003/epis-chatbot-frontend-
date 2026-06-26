(function () {
  "use strict";

  var WIDGET_URL = "https://epis.huddymerrabuddy2003.workers.dev/chat-ui.html";
  var BUBBLE_SIZE = 45;
  var BUBBLE_TOP = "90%";
  var INTERFACE_RIGHT = 20;
  var PRIMARY_COLOR = "#19b2ee";
  var PRIMARY_DARK = "#0d8abf";

  if (document.getElementById("epis-chat-root")) return;

  // Defer until <body> exists, so the snippet works in <head> too.
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", init);
    return;
  }
  init();

  function init() {
    if (document.getElementById("epis-chat-root")) return;

    var style = document.createElement("style");
    style.textContent = [
      "#epis-chat-bubble{",
      "position:fixed;top:" + BUBBLE_TOP + ";right:-10px;",
      "transform:translateY(-50%);",
      "width:" + BUBBLE_SIZE + "px;height:" + BUBBLE_SIZE + "px;",
      "background:linear-gradient(135deg," + PRIMARY_COLOR + "," + PRIMARY_DARK + ");",
      "border-radius:" + BUBBLE_SIZE + "px 0 0 " + BUBBLE_SIZE + "px;",
      "display:flex;align-items:center;justify-content:center;",
      "cursor:pointer;z-index:2147483646;",
      "box-shadow:-4px 0 12px rgba(25,178,238,.3);",
      "transition:all .3s cubic-bezier(.4,0,.2,1);",
      "padding-right:6px;",
      "}",
      "#epis-chat-bubble:hover{",
      "width:" + (BUBBLE_SIZE + 8) + "px;",
      "box-shadow:-6px 0 20px rgba(25,178,238,.4);",
      "}",
      "#epis-chat-bubble.epis-active{",
      "background:linear-gradient(135deg,#e05555,#b83030);",
      "box-shadow:-4px 0 12px rgba(224,85,85,.3);",
      "}",
      "#epis-chat-bubble.epis-active:hover{",
      "box-shadow:-6px 0 20px rgba(224,85,85,.4);",
      "}",
      "#epis-chat-bubble svg{",
      "width:24px;height:24px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;",
      "transition:transform .3s ease;",
      "}",
      "#epis-chat-bubble.epis-active svg{transform:rotate(180deg);}",
      "#epis-chat-frame{",
      "position:fixed;top:50%;right:" + INTERFACE_RIGHT + "px;",
      "transform:translateY(-50%) translateX(20px) scale(.95);",
      "width:400px;height:650px;max-height:82vh;",
      "border:none;border-radius:16px;",
      "box-shadow:0 20px 60px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.05);",
      "z-index:2147483645;",
      "opacity:0;pointer-events:none;",
      "transition:all .35s cubic-bezier(.4,0,.2,1);",
      "background:#fff;",
      "}",
      "#epis-chat-frame.epis-open{",
      "opacity:1;transform:translateY(-50%) translateX(0) scale(1);pointer-events:auto;",
      "}",
      "@media(max-width:768px){",
      "#epis-chat-bubble{width:48px;height:48px;border-radius:48px 0 0 48px;}",
      "#epis-chat-bubble svg{width:20px;height:20px;}",
      "#epis-chat-bubble:hover{width:52px;}",
      "#epis-chat-frame{",
      "width:100vw;height:100vh;max-height:100%;top:0;right:0;",
      "transform:translateY(100%);border-radius:0;",
      "}",
      "#epis-chat-frame.epis-open{transform:translateY(0);}",
      "}",
    ].join("");
    document.head.appendChild(style);

    var root = document.createElement("div");
    root.id = "epis-chat-root";
    document.body.appendChild(root);

    var bubble = document.createElement("div");
    bubble.id = "epis-chat-bubble";
    bubble.setAttribute("role", "button");
    bubble.setAttribute("aria-label", "Open ePIS chat assistant");
    bubble.setAttribute("tabindex", "0");
    bubble.innerHTML = chatIcon();
    root.appendChild(bubble);

    var frame = document.createElement("iframe");
    frame.id = "epis-chat-frame";
    frame.src = WIDGET_URL;
    frame.title = "ePIS Chat Assistant";
    root.appendChild(frame);

    var isOpen = false;
    function toggle() {
      isOpen = !isOpen;
      if (isOpen) {
        frame.classList.add("epis-open");
        bubble.classList.add("epis-active");
        bubble.innerHTML = closeIcon();
        bubble.setAttribute("aria-label", "Close ePIS chat assistant");
      } else {
        frame.classList.remove("epis-open");
        bubble.classList.remove("epis-active");
        bubble.innerHTML = chatIcon();
        bubble.setAttribute("aria-label", "Open ePIS chat assistant");
      }
    }

    bubble.addEventListener("click", toggle);
    bubble.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    window.addEventListener("message", function (e) {
      if (e.data === "epis:close") toggle();
    });
  }

  function chatIcon() {
    return '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  }

  function closeIcon() {
    return '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  }
})();
