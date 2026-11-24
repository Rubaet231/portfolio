/* ===== Rubaet Khandokar Portfolio – main script (jQuery) ===== */
$(function () {

  /* 1. Mobile menu toggle */
  $(".menu-toggle").on("click", function () {
    $(".nav-links").toggleClass("open");
  });

  /* 2. Highlight the current page in the navigation */
  var page = location.pathname.split("/").pop() || "index.html";
  $(".nav-links a").each(function () {
    if ($(this).attr("href") === page) $(this).addClass("active");
  });

  /* 3. Typing effect on the home page */
  var roles = ["Software Developer", "Computer Vision Researcher", "CSE Undergraduate @ DIU"];
  var $typed = $(".typed"), r = 0, c = 0, deleting = false;
  function type() {
    if (!$typed.length) return;
    var word = roles[r];
    $typed.text(word.substring(0, c));
    if (!deleting && c < word.length) c++;
    else if (deleting && c > 0) c--;
    else { deleting = !deleting; if (!deleting) r = (r + 1) % roles.length; setTimeout(type, 1200); return; }
    setTimeout(type, deleting ? 45 : 90);
  }
  type();

  /* 4. Scroll reveal + skill bar animation */
  function reveal() {
    var bottom = $(window).scrollTop() + $(window).height() - 60;
    $(".reveal").each(function () {
      if ($(this).offset().top < bottom) $(this).addClass("visible");
    });
    $(".bar span").each(function () {
      if ($(this).offset().top < bottom) $(this).css("width", $(this).data("level") + "%");
    });
  }
  $(window).on("scroll resize", reveal);
  reveal();

  /* 5. AJAX: load projects from data/projects.json */
  var $grid = $("#project-grid");
  if ($grid.length) {
    $.ajax({ url: "data/projects.json", dataType: "json" })
      .done(function (projects) {
        $grid.empty();
        $.each(projects, function (i, p) {
          var tags = $.map(p.tech, function (t) { return '<span class="tag">' + t + "</span>"; }).join("");
          var link = p.link ? '<p><a href="' + p.link + '" target="_blank" rel="noopener">View project &rarr;</a></p>' : "";
          $grid.append(
            '<article class="card reveal" data-category="' + p.category + '">' +
              "<h3>" + p.title + "</h3>" +
              '<p class="lead">' + p.year + " &middot; " + p.role + "</p>" +
              "<p>" + p.description + "</p>" + tags + link +
            "</article>"
          );
        });
        reveal();
      })
      .fail(function () {
        $grid.html("<p>Sorry, projects could not be loaded. Please try again later.</p>");
      });

    /* Project filter buttons */
    $(".filter-btn").on("click", function () {
      var cat = $(this).data("filter");
      $(".filter-btn").removeClass("active");
      $(this).addClass("active");
      $("#project-grid .card").each(function () {
        $(this).toggle(cat === "all" || $(this).data("category") === cat);
      });
    });
  }

  /* 6. Certificate lightbox */
  $(".gallery figure").on("click", function () {
    $("#lightbox img").attr("src", $(this).find("img").attr("src"));
    $("#lightbox").css("display", "flex").hide().fadeIn(200);
  });
  $("#lightbox").on("click", function () { $(this).fadeOut(200); });

  /* 7. Contact form validation + AJAX submit (Netlify Forms) */
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    var ok = true, $f = $(this);
    $f.find(".error").hide();

    if ($.trim($("#name").val()).length < 3) { $("#name-err").show(); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#email").val())) { $("#email-err").show(); ok = false; }
    if (!$("input[name=purpose]:checked").length) { $("#purpose-err").show(); ok = false; }
    if (!$("#subject").val()) { $("#subject-err").show(); ok = false; }
    if ($.trim($("#message").val()).length < 10) { $("#message-err").show(); ok = false; }
    if (!ok) return;

    $.ajax({ url: "/", type: "POST", data: $f.serialize() })
      .done(function () {
        $("#form-msg").css("color", "#16a34a").text("Thank you! Your message has been sent.");
        $f[0].reset();
      })
      .fail(function () {
        $("#form-msg").css("color", "#dc2626").text("Something went wrong. Please email me directly.");
      });
  });

  /* Footer year */
  $("#year").text(new Date().getFullYear());
});
