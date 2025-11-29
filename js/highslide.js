hs.graphicsDir =
  "https://cdnjs.cloudflare.com/ajax/libs/highslide/4.1.13/graphics/";
hs.align = "center";
hs.transitions = ["expand", "crossfade"];
hs.wrapperClassName = "dark borderless floating-caption";
hs.fadeInOut = true;
hs.dimmingOpacity = 0.75;

// Auto-attach Highslide to all links with class 'highslide'
document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll("a.highslide");
  links.forEach(function (link) {
    link.onclick = function (e) {
      e.preventDefault();
      return hs.expand(this);
    };
  });
});
