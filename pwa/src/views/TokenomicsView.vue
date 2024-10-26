<template>
  <section id="tokenomics-main">
    <div class="main">
      <!-- <div class="tokenomics-header">
        <div class="tokenomics-banner">
          <img src="../assets/images/Grasp-Banner.png" />
        </div>
      </div> -->
      <Tokenomics />
      <FooterSection />
    </div>
  </section>
</template>

<script setup lang="ts">
import Tokenomics from "@/components/Home/Tokenomics.vue";
import FooterSection from "@/components/Home/FooterSection.vue";
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#tokenomics-main {
  position: relative;
  height: 100%;
  background: $grasp-blue;

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0;

    .tokenomics-header {
      width: 100%;
      height: 220px;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      background: $grey-60;
      border-bottom: 0.5px solid $grey-50;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      margin: 0 auto 20px;
      padding: 0;
      transition: all 0.5s linear;
      overflow: hidden;

      .tokenomics-banner {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;

        img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          object-position: center;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      }
    }

    .tokenomics-details-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
      margin: 0 0 8px 0;

      @include breakpoint($break-sm) {
        flex-direction: column;
        align-items: flex-start;
      }

      h1.tokenomics-title {
        width: 100%;
        font-family: "Poppins", sans-serif;
        color: $grasp-blue;
        font-size: 34px;
        font-weight: 600;
        line-height: 40px;
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: flex-end;
        align-items: flex-end;
        margin: 0;

        @include breakpoint($break-sm) {
          font-size: 24px;
          line-height: 30px;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .tokenomics {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
