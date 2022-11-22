<template>
  <div class="home">
    <section class="header">
      <div class="login-box">
        <h2>Prijava</h2>
        <form method="POST" class="login_form" action="">
          <div class="user-box">
            <input type="text" id="username" name="username" class="form-control" required="">
            <label>Korisničko ime</label>
          </div>
          <div class="user-box">
            <input type="password" id="password" name="password" class="form-control" required="">
            <label>Lozinka</label>
          </div>
          <div class="label"><input type="submit" name="login" class="login" id="login" value="PRIJAVA" /></div>
        </form>
        <p>Nemaš račun? <router-link to="/registracija" target="self">Registriraj se</router-link></p>
      </div> 
    </section>
    
    <section>
      <div class="wrapper">
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'HomeView',
  mounted() {
    $("#signup").click(function() {
      $(".message").css("transform", "translateX(100%)");
      if ($(".message").hasClass("login")) {
        $(".message").removeClass("login");
      }
      $(".message").addClass("signup");
    });

    $("#login").click(function() {
      $(".message").css("transform", "translateX(0)");
      if ($(".message").hasClass("login")) {
        $(".message").removeClass("signup");
      }
      $(".message").addClass("login");
    });
  }
}
</script>

<style>
@import "../style.css";
</style>
