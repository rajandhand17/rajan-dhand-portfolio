(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  if (!("IntersectionObserver" in window)) {
    return;
  }

  var activeId = "";
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        activeId = entry.target.id;
        links.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + activeId);
        });
      });
    },
    {
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
