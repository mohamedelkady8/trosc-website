"use strict";

$(function () {
  // password visibility toggle
  $("input[type='password'][data-eye]").each(function (i) {
    var $this = $(this),
      id = "eye-password-" + i,
      el = $("#" + id);

    $this.wrap(
      $("<div/>", {
        style: "position:relative",
        id: id,
      })
    );

    $this.css({
      paddingRight: 60,
    });
    $this.after(
      $("<div/>", {
        html: "Show",
        class: "btn btn-primary btn-sm",
        id: "passeye-toggle-" + i,
      }).css({
        position: "absolute",
        right: 10,
        top: $this.outerHeight() / 2 - 12,
        padding: "2px 7px",
        fontSize: 12,
        cursor: "pointer",
      })
    );

    $this.after(
      $("<input/>", {
        type: "hidden",
        id: "passeye-" + i,
      })
    );

    var invalid_feedback = $this.parent().parent().find(".invalid-feedback");

    if (invalid_feedback.length) {
      $this.after(invalid_feedback.clone());
    }

    $this.on("keyup paste", function () {
      $("#passeye-" + i).val($(this).val());
    });
    $("#passeye-toggle-" + i).on("click", function () {
      if ($this.hasClass("show")) {
        $this.attr("type", "password");
        $this.removeClass("show");
        $(this).removeClass("btn-outline-primary");
      } else {
        $this.attr("type", "text");
        $this.val($("#passeye-" + i).val());
        $this.addClass("show");
        $(this).addClass("btn-outline-primary");
      }
    });
  });

  // Function to validate login
  function validateLogin(email, password) {
    // Check if the provided credentials match the hardcoded values
    if (email === "elkady@trosc.com" && password === "123") {
      // Redirect to home.html upon successful login
      window.location.href = "../home/home.html";
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }

  // Form submission handler
  $(".my-login-validation").submit(function (event) {
    event.preventDefault();
    event.stopPropagation();

    var form = $(this);
    if (form[0].checkValidity() === false) {
      // Form validation failed
      form.addClass("was-validated");
    } else {
      // Form validation passed, proceed to login validation
      var email = $("#email").val();
      var password = $("#password").val();
      validateLogin(email, password);
    }
  });
});
