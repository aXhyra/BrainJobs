<template>
  <div>
    <vs-navbar
    v-model="activeItem"
    color="#7CC1CF"
    text-color="#FFEEFF"
    active-text-color="#FFFFFF"
    outline-colot="#FFEEFF"
    class="nabarx"  name="BrainJobs">
      <div slot="title">
        <vs-navbar-title>
          BrainJobs
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">News</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">Update</a>
      </vs-navbar-item>
      <vs-navbar-item dropdown index="3">
        <a href="#">Group items</a>

        <div slot="submenu">
            <vs-dropdown>
                <vs-dropdown-item index="3.1">
                    <a href="#">Home</a>
                </vs-dropdown-item>
                <vs-dropdown-item index="3.2">
                    <a href="#">News</a>
                </vs-dropdown-item>
                <vs-dropdown-item index="3.3">
                    <a href="#">Update</a>
                </vs-dropdown-item>
            </vs-dropdown>
        </div>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>
<script>
export default {
  data:()=>({
    activeItem: 0
  })
}
</script>

<style lang="stylus">
.input-color
  margin-bottom 10px
  position relative
  display block
.myNavbar
  color rgb(255,255,255)
</style>