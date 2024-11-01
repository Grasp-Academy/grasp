<template>
  <section id="marketplace">
    <div class="main">
      <MarketplacesBanner />
      <section id="page">
        <div v-if="showFilter" class="left">
          <MarketplaceSidebarIntro :collection="collection" />
          <section id="footer">
            <SidebarSponsors />
            <SidebarCollections />
            <MarketplaceSidebar
              :attributes="attributes"
              @update-attribute="updateAttributeSidebar"
            />
            <SidebarIntro />
          </section>
        </div>
        <div class="right">
          <MarketplaceSearch />
          <MarketplacesList v-if="tokens && tokens.length > 0" :tokens="tokens" />
          <MarketplacesNoReults v-else-if="!tokens && !loading" />
          <MarketplacesPagination
            v-if="tokens && tokens.length > 0"
            :pagination="pagination"
            :total="tokensTotal"
            :last-page="lastPage"
          />
        </div>
        <section id="mobile-footer">
          <SidebarSponsors />
          <SidebarCollections />
          <SidebarIntro />
        </section>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { collectionObject } from "src/models/collection";
import { tokenWrapperObject } from "@/models/tokenWrapper";
import { attributeSidebarObject } from "src/models/attributeSidebar";

/* Components */
import MarketplacesBanner from "@/components/Marketplace/MarketplacesBanner.vue";
import MarketplaceSidebarIntro from "@/components/Marketplace/MarketplaceSidebarIntro.vue";
import MarketplaceSidebar from "@/components/Marketplace/MarketplaceSidebar.vue";
import SidebarCollections from "@/components/Sidebar/SidebarCollections.vue";
import SidebarIntro from "@/components/Sidebar/SidebarIntro.vue";
import SidebarSponsors from "@/components/Sidebar/SidebarSponsors.vue";
import MarketplaceSearch from "@/components/Marketplace/MarketplaceSearch.vue";
import MarketplacesList from "@/components/Marketplace/MarketplacesList.vue";
import MarketplacesNoReults from "@/components/Marketplace/MarketplacesNoReults.vue";
import MarketplacesPagination from "@/components/Marketplace/MarketplacesPagination.vue";

/* Init Pinia Store Values and Methods */
const route = useRoute();
const store = useStore();

const { loading, showFilter, filter, pagination } = storeToRefs(store);

/* Open Campus Education NFT Contract Addresses */
const tinytapAddress = process.env.VUE_APP_TINYTAP_CONTRACT_ADDRESS;
/* Open Campus Season 2 Publisher NFT */
const publisherAddress = process.env.VUE_APP_PUBLISHER_SEASON_2_CONTRACT_ADDRESS;

const tinytapContractAddress = tinytapAddress?.toLowerCase();
const publisherContractAddress = publisherAddress?.toLowerCase();

const attributes = ref();
const contract = ref();
const collection = ref();
const tokens = ref([]);
const tokensTotal = ref();
const lastPage = ref();
const lastRefresh = ref(route.params.name);

const collectionRouteName = computed(() => {
  return route.params.name as string;
});

const shouldGetData = computed(() => {
  return collectionRouteName.value !== lastRefresh.value;
});

/* Get Collection Attributes for Sidebar */
async function fetchAttributes() {
  try {
    const attributesList = await store.retrieveAllAttributes(contract.value);
    const updatedArray = attributesList.map((element: object) => ({
      ...element,
      isDropped: false,
    }));
    attributes.value = updatedArray;
  } catch (error) {
    console.log(error);
  }
}

/* Find our Object index in Sidebar Attributes Array */
function updateAttributeSidebar(value: string) {
  const index = attributes.value.findIndex((attribute: attributeSidebarObject) => {
    return attribute.key === value;
  });
  attributes.value[index].isDropped = !attributes.value[index].isDropped;
}

/* Get Collection Data */
async function fetchCollections() {
  try {
    const collectionData = await store.retrieveCollections(
      contract.value,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "false",
      "false",
      "false",
      "false",
      "false",
      pagination.value.sortBy,
      pagination.value.limit,
      pagination.value.continuation ? pagination.value.continuation : null,
      null
    );
    collection.value = collectionData.collection as collectionObject;
  } catch (error) {
    console.log("Error fetching Collection :", error);
  }
}

/* Get Collection Tokens/NFTs */
async function fetchNfts() {
  try {
    const tokenResults = await store.retrieveTokens(
      contract.value,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      filter.value.rarity_min_input,
      filter.value.rarity_max_input,
      filter.value.price_min_input,
      filter.value.price_max_input,
      0,
      pagination.value.sortBy,
      pagination.value.sortDirection,
      null,
      pagination.value.limit,
      "false",
      "true",
      "false",
      "false",
      "false",
      "false",
      pagination.value.continuation ? pagination.value.continuation : null,
      null
    );

    // console.log("tokenResults.nfts", tokenResults.nfts);

    if (tokenResults && tokenResults.nfts) {
      /* Load our NFT Token results */
      tokens.value = tokenResults.nfts;
      tokensTotal.value = tokenResults.nfts.length;
      lastPage.value = tokenResults.nfts.length / pagination.value.limit;

      /* Set next continuation results */
      if (tokenResults.continuation) {
        store.setContinuation(tokenResults.continuation);
      }

      /* 3. Load our Store Collection */
      store.addTinytapTokens(tokenResults.nfts as tokenWrapperObject[]);
    }
    store.setLoading(false);
  } catch (error) {
    console.log("Error :", error);
    store.setLoading(false);
  }
}

/* Get fetchPolygonNfts Collection Tokens/NFTs */
async function fetchPolygonNfts() {
  try {
    const tokenResults = await store.retrievePolygonTokens(contract.value);

    if (tokenResults && tokenResults.nfts) {
      /* Load our NFT Token results */
      tokens.value = tokenResults.nfts;
      tokensTotal.value = tokenResults.nfts.length;
      lastPage.value = tokenResults.nfts.length / pagination.value.limit;

      /* Set next continuation results */
      if (tokenResults.continuation) {
        store.setContinuation(tokenResults.continuation);
      }
      /* 3. Load our Store Collection */
      store.addPublisherTokens(tokenResults.nfts as tokenWrapperObject[]);
    }
    store.setLoading(false);
  } catch (error) {
    console.log("Error :", error);
    store.setLoading(false);
  }
}

/* Get Polygon Collection Data */
async function fetchPolygonCollections() {
  try {
    const collectionData = await store.retrievePolygonCollections(contract.value);
    collection.value = collectionData.collection as collectionObject;
  } catch (error) {
    console.log("Error fetching Polygon Collection :", error);
  }
}

async function fetchData() {
  /* 1. Load our Contract to Query based on Collection param in URL */
  switch (route.params.name) {
    case "tinytap":
      contract.value = tinytapContractAddress;
      break;
    case "publisher":
      contract.value = publisherContractAddress;
      break;
    default:
      contract.value = tinytapContractAddress;
      break;
  }

  /* 2. Query by Contract with Sanity check for a Route Param Name */
  if (route.params.name === "publisher") {
    await fetchPolygonCollections();
    await fetchPolygonNfts();
    await fetchAttributes();
  } else {
    await fetchCollections();
    await fetchNfts();
    await fetchAttributes();
  }
}

watch(shouldGetData, (newValue) => {
  if (newValue) {
    fetchData();
  }
  lastRefresh.value = collectionRouteName.value as string;
});

onMounted(async () => {
  await fetchData();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#marketplace {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

  .main {
    max-width: $max-width;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;

    section#page {
      width: 100%;
      height: calc(100vh - 40px);
      display: flex;
      flex-direction: row;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: space-between;
      margin: 0;
      padding: 0;

      @include breakpoint($break-sm) {
        height: auto;
        flex-direction: column;
        justify-content: flex-start;
        overflow: visible;
      }

      .left {
        width: 20%;
        min-width: 280px;
        height: inherit;
        display: flex;
        flex-direction: column;
        align-content: center;
        padding: 10px 20px 0 0;

        @include breakpoint($break-sm) {
          width: 96%;
          height: auto;
          padding: 2%;
          overflow: visible;
        }
      }

      section#footer {
        display: flex;
        height: inherit;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        @include breakpoint($break-sm) {
          display: none !important;
        }
      }

      .right {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: flex-start;
        padding: 0 1% 1% 1%;

        @include breakpoint($break-sm) {
          width: 96%;
          padding: 2% 2% 0 2%;
          height: auto;
          justify-content: flex-start;
          align-content: flex-start;
          align-items: flex-start;
        }
      }
    }
    section#mobile-footer {
      display: none;
      @include breakpoint($break-sm) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 96%;
        padding: 2% 2% 0 2%;
        overflow: visible;
      }
    }
  }
}
</style>
