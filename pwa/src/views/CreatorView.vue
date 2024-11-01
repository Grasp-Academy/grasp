<template>
  <section id="creator">
    <div class="main">
      <CreatorHeader :creator="creator" />
      <section id="page">
        <div class="creator-details-row">
          <h1 class="creator-title">
            {{ creator.name ? creator.name : "" }}
          </h1>
          <div class="creator-socials">
            <!-- <a
              v-if="creator.mobile"
              :href="creator.mobile"
              alt="Mobile"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/Call.svg" alt="Call"
            /></a>
            <a
              v-if="creator.email"
              :href="`mail:to${creator.email}`"
              alt="Email"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/Mail.svg" alt="Email"
            /></a> -->
            <a
              v-if="creator.website"
              :href="creator.website"
              alt="Website"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/website.svg" alt="Website"
            /></a>
            <a
              v-if="creator.twitter"
              :href="creator.twitter"
              alt="Twitter"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/twitter.svg" alt="Twitter"
            /></a>
            <a
              v-if="creator.facebook"
              :href="creator.facebook"
              alt="Facebook"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/facebook.svg" alt="Facebook"
            /></a>
            <a
              v-if="creator.linkedin"
              :href="creator.linkedin"
              alt="LinkedIn"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/linkedin.svg" alt="LinkedIn"
            /></a>
            <a
              v-if="creator.instagram"
              :href="creator.instagram"
              alt="Instagram"
              target="_blank"
              rel="noopener"
              ><img src="../assets/svgs/socials/instagram.svg" alt="Instagram"
            /></a>
          </div>
        </div>

        <div class="creator-details-row">
          <div class="creator-category">
            <template v-for="(category, index) in creator.categories" :key="index">
              <span class="category-indicator">{{
                category.name ? category.name : ""
              }}</span>
            </template>
          </div>
          <div class="creator-followers">
            <span class="creator-followers-icon">
              <button class="creator-followers-button" @click="followCreator()">
                <img src="../assets/svgs/Person.svg" />
              </button>
            </span>
            {{ creator.followers ? creator.followers : "" }}
            <span class="creator-followers-icon">
              <button class="creator-followers-button" @click="likeCreator()">
                <img src="../assets/svgs/Thumb_Up.svg" />
              </button>
            </span>
            {{ creator.likes ? creator.likes : "" }}
          </div>
        </div>

        <div class="creator-location-row">
          <div class="creator-location">
            <img src="../assets/svgs/Location.svg" alt="Location" />
            <span class="creator-location-label"
              >{{ creator.city ? creator.city : "" }},
              {{ creator.country ? creator.country : "" }}</span
            >
          </div>
          <div class="creator-date">
            <span class="creator-date-label">Joined</span>
            {{ creator.created_date ? creator.created_date : "" }}
          </div>
        </div>

        <div class="line-divider"></div>

        <div class="creator-description">
          {{ creator.description ? creator.description : "" }}
        </div>

        <div class="line-divider"></div>
        <h2>Creators Courses</h2>

        <div class="creator-course-list">
          <template v-for="(course, i) in testCourses.data" :key="i">
            <div class="course">
              <div class="course-image">
                <img :src="course.image ? `../../${course.image}` : 'rectangle.svg'" />
              </div>
              <div class="course-column">
                <div class="course-title">
                  {{ course.title ? course.title : "" }}
                </div>
                <div class="course-excerpt">
                  {{ course.excerpt ? course.excerpt : "" }}
                </div>
              </div>
              <div class="course-card-row">
                <div class="course-category">
                  <div class="course-date">
                    {{ course.created_date ? course.created_date : "" }}
                  </div>
                  <div class="category-indicator">
                    {{ course.category ? course.category : "" }}
                  </div>
                </div>
                <div class="button-column">
                  <BuyButton
                    :btn-size="'small'"
                    :color="'blue'"
                    :course-id="course.id"
                    :price="course.price"
                    :discount="course.discount"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { creatorObject } from "src/models/creator";

/* Components */
import CreatorHeader from "@/components/Creators/CreatorHeader.vue";
import BuyButton from "@/components/Buttons/BuyButton.vue";

/* All Posts stored in a JSON */
import testUsers from "../data/users.json";
import testCourses from "../data/courses.json";

const store = useStore();
const route = useRoute();
const { creator } = storeToRefs(store);

async function followCreator() {
  // let filteredCreator = testUsers.data.filter((creator) => {
  //   return creator.id === route.params.id;
  // });
  // store.setCreator((filteredCreator[0] as unknown) as creatorObject);
}

async function likeCreator() {
  // let filteredCreator = testUsers.data.filter((creator) => {
  //   return creator.id === route.params.id;
  // });
  // store.setCreator((filteredCreator[0] as unknown) as creatorObject);
}

async function fetchCreator() {
  let filteredCreator = testUsers.data.filter((creator) => {
    return creator.id === route.params.id;
  });
  store.setCreator((filteredCreator[0] as unknown) as creatorObject);
}

onBeforeMount(async () => {
  await fetchCreator();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#creator {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

  #page {
    padding-bottom: 30px;

    @include breakpoint($break-sm) {
      width: 94%;
      padding: 0 3%;
    }
  }

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0 0 30px 0;

    .creator-details-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
      margin: 0;

      @include breakpoint($break-sm) {
        flex-direction: column;
        align-items: flex-start;
      }

      h1.creator-title {
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
          font-size: 26px;
          line-height: 30px;
        }
      }

      .creator-socials {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: center;
        align-items: center;
        margin: 0 0 8px 0;

        @include breakpoint($break-sm) {
          justify-content: flex-start;
          margin: 12px 0 8px 0;
        }

        a {
          color: $grasp-blue;
          text-decoration: none;
          margin: 0 12px 0 0;

          img,
          svg {
            width: 20px;
            @include breakpoint($break-sm) {
              width: 20px;
            }
          }
        }
      }

      .creator-followers {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: center;
        align-items: center;

        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-70;
        font-size: 15px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        text-align: right;
        margin: -8px 8px 0 0;

        .creator-followers-icon {
          width: 20px;
          margin: 0 4px;
          .creator-followers-button {
            width: 20px;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            align-items: center;
            background: $white;
            border: 0;
            padding: 0;
            cursor: pointer;

            img,
            svg {
              width: 20px;
            }
          }
        }

        @include breakpoint($break-sm) {
          justify-content: flex-start;
          margin: 8px 8px 8px 0;
        }
      }

      .creator-category {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;

        color: $black;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        margin: 2px 0 2px 0;

        .category-indicator {
          width: auto;
          outline: transparent solid 2px;
          outline-offset: 2px;
          border-radius: 9999px;
          transition: background-color 0.2s ease-out 0s;
          background: $grasp-cyan;
          font-size: 13px;
          text-align: center;
          text-wrap: nowrap;
          padding-inline: 8px;
          padding-top: 1px;
          padding-bottom: 1px;
          --badge-color: $grey-40;
          color: $grey-90;
          box-shadow: none;
          border-width: 1.5px;
          border-style: solid;
          border-image: initial;
          border-color: #4d5358;
          margin-right: 8px;
        }
      }
    }

    .creator-location-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
      margin: 0;

      .creator-location {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-90;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        text-align: left;
        margin: 6px 8px 6px 0;

        img,
        svg {
          width: 20px;
          height: 20px;
          object-fit: contain;
          overflow: hidden;
          background: transparent;
        }

        .creator-location-label {
          color: $grey-90;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          text-transform: capitalize;
        }

        @include breakpoint($break-sm) {
          width: 60%;
        }
      }

      .creator-date {
        width: 100%;
        font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        color: $grey-90;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        text-align: right;
        margin: 0 8px 6px 0;

        .creator-date-label {
          color: $grey-90;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          text-transform: capitalize;
        }

        @include breakpoint($break-sm) {
          width: 40%;
        }
      }
    }

    .creator-description {
      width: 100%;
      color: $black;
      font-size: 15px;
      font-weight: normal;
      text-align: left;
      margin: 0;
    }

    .line-divider {
      width: 98%;
      margin: 16px auto;
      border-bottom: 1px solid $grey-30;
    }

    h2 {
      width: 100%;
      font-family: "Poppins", sans-serif;
      color: $grasp-blue;
      font-size: 30px;
      font-weight: 600;
      line-height: 32px;
      text-align: left;
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin: 0 0 16px 0;
    }

    .creator-course-list {
      width: 100%;
      max-width: $max-width;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      align-content: center;
      justify-content: center;
      align-items: flex-start;
      margin: 10px auto 0;

      @include breakpoint($break-lg) {
        grid-template-columns: repeat(3, 1fr);
      }
      @include breakpoint($break-md) {
        grid-template-columns: repeat(2, 1fr);
      }
      @include breakpoint($break-sm) {
        grid-template-columns: repeat(1, 1fr);
      }
      @include breakpoint($break-xs) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .course-card-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
    }
    .course {
      display: inline;
      float: left;
      box-sizing: border-box;
      width: 100%;
      background: $cream;
      border: 0.5px solid $grey-50;
      border-radius: 8px;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
      margin: 0 auto;
      padding: 16px;
      transition: all 0.5s linear;
      overflow: hidden;

      .course-image {
        position: relative;
        width: 100%;
        margin: 0 auto;
        padding: 0;
        overflow: hidden;
        background: transparent;

        img,
        svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
          overflow: hidden;
          background: transparent;
        }
      }

      .course-title {
        font-family: "Poppins", sans-serif;
        color: $grasp-blue;
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        margin: 0 0 5px 0;
      }

      .course-excerpt {
        width: 100%;
        min-height: 77.5px;
        color: $black;
        font-size: 13px;
        font-weight: normal;
        text-align: left;
        margin: 0 0 16px;
      }

      .course-category {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;

        color: $black;
        font-size: 13px;
        font-weight: 500;
        text-transform: uppercase;
        margin: 0;

        .course-date {
          font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
          color: $grey-60;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          text-transform: uppercase;
          margin: 0 0 4px 0;
        }

        .category-indicator {
          width: 80%;
          outline: transparent solid 2px;
          outline-offset: 2px;
          border-radius: 9999px;
          transition: background-color 0.2s ease-out 0s;
          background: $grasp-cyan;
          font-size: 12px;
          text-align: center;
          text-wrap: nowrap;
          padding-inline: 8px;
          padding-top: 1px;
          padding-bottom: 1px;
          --badge-color: $grey-40;
          color: $grey-90;
          box-shadow: none;
          border-width: 1.5px;
          border-style: solid;
          border-image: initial;
          border-color: #4d5358;
        }
      }
      .button-column {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
      }
    }
  }
}

@media (min-width: 1024px) {
  .creator {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
