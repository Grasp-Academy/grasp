<template>
  <section id="content">
    <SidebarView />
    <div class="page-layout">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">Admin Panel</div>
          <div class="title-actions">
            <button class="back-button">Back</button>
            <button class="create-button">Edit</button>
          </div>
        </div>
        <p></p>
      </div>

      <div class="tab-switcher">
        <div
          :class="tab === 'reporting' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('reporting')"
        >
          Reporting
        </div>
        <div
          :class="tab === 'users' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('users')"
        >
          Users
        </div>
        <div
          :class="tab === 'courses' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('courses')"
        >
          Courses
        </div>
        <div
          :class="tab === 'lessons' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('lessons')"
        >
          Lessons
        </div>
        <div
          :class="tab === 'nfts' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('nfts')"
        >
          NFTs
        </div>
        <div
          :class="tab === 'activity' ? 'active' : ''"
          class="tab-button"
          @click="loadTab('activity')"
        >
          Activity
        </div>
      </div>

      <ReportingStats v-if="tab === 'reporting'" />
      <UsersList v-if="tab === 'users'" :label="'User'" />
      <ActivityList v-if="tab === 'activity'" />
      <CoursesList v-if="tab === 'courses'" :label="'All'" />
      <LessonsList v-if="tab === 'lessons'" :label="'All'" />
      <NftsList v-if="tab === 'nfts'" :label="'All'" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

/* Components */
import SidebarView from "@/components/SidebarView.vue";
import ReportingStats from "@/components/Admin/ReportingStats.vue";
import UsersList from "@/components/Admin/UsersList.vue";
import CoursesList from "@/components/Admin/CoursesList.vue";
import LessonsList from "@/components/Admin/LessonsList.vue";
import NftsList from "@/components/Admin/NftsList.vue";
import ActivityList from "@/components/Admin/ActivityList.vue";

/* All Posts stored in a JSON */
import testUsers from "../data/users.json";

const store = useStore();
const { user } = storeToRefs(store);

const tab = ref("reporting");
const adminApproved = ref(false);

const loadTab = (value: string) => {
  tab.value = value;
};

async function fetchAdmin() {
  let filteredUser = testUsers.data.filter((user) => {
    return (
      user.id === "1" && user.wallet === "0xA1FCD7B2F6f36e6C14EbF77413bbE65DCEe97792"
    );
  });
  console.log("Admin Profile", filteredUser[0]);

  if (filteredUser[0]) {
    store.setUser(filteredUser[0] as any);
    adminApproved.value = true;
  }
}

onBeforeMount(async () => {
  await fetchAdmin();
});
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.box-header {
  font-family: "Poppins", sans-serif;
  color: $grey-100;
  width: 99%;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin: 0 0 4px 8px;
}
.box {
  width: 99%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0 0 24px 0;
  padding: 12px 0 4px 12px;
}

.box-value {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;

  .box-label {
    width: 120px;
    display: inline-block;
    color: $grey-100;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
}

.user-excerpt {
  width: 100%;
  color: $grey-100;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  margin: 0 0 16px;
}

.user-description {
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
</style>
