<template>
  <nav>
    <img src="@/assets/logo_v1.svg" />
    <div class="nav-right">
      <router-link to="/">Novosti</router-link>
      <router-link to="/o-nama">O nama</router-link>
      <router-link to="/odjeli">Odjeli</router-link>
      <router-link to="/programi">Programi</router-link>
      <router-link to="/katalog">Katalog</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  display: flex;
  width: 100vw;
  height: 75px;
  /*background-color: #E6E6E6;*/
}
nav img {
  width: 10vw;
  height: 75px;
  margin-left: 5vw;
}
.nav-right {
  display: flex;
  width: 80vw;
  float: right;
  justify-content: right;
}
nav a {
  display: block;
  font-size: 19px;
  line-height: 100%;
  font-weight: 600;
  color: #2c3e50;
  padding: 9px 10px 0 10px;
  margin: 21px 0 16px 16px;
  text-decoration: none;
  text-transform: uppercase;
}
nav a:hover {
  
}
nav a.router-link-exact-active {
  color: #c14e2e;
}
</style>
