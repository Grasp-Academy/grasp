import { defineStore } from "pinia";
import { userObject } from 'src/models/user';
import { organisationObject } from 'src/models/organisation';
import { courseObject } from "src/models/course";
import { lessonObject } from "src/models/lesson";
import { creatorObject } from "src/models/creator";
import { metadataObject } from "src/models/metadata";
import { tokenWrapperObject } from "src/models/tokenWrapper";
import { Filter } from 'src/models/filter';
import { getBlankFilter } from '@/models/getBlankFilter';
import { paginationObject } from 'src/models/pagination';
import { initialPagination } from '@/models/initialPagination';
import { transactionObject } from 'src/models/transaction';

import reservoirApi from "@/services/reservoirApi";

/* Open Campus Education NFT Contract Addresses */
const tinytapAddress = process.env.VUE_APP_TINYTAP_CONTRACT_ADDRESS;
/* Open Campus Season 2 Publisher NFT */
const publisherAddress = process.env.VUE_APP_PUBLISHER_SEASON_2_CONTRACT_ADDRESS;

const tinytapContractAddress = tinytapAddress?.toLowerCase();
const publisherContractAddress = publisherAddress?.toLowerCase();

export const useStore = defineStore({
  id: "store",
  state: () => ({
    chainId: "",
    loggedIn: false,
    web3AuthLoggedIn: false,
    account: "",
    balance: "",
    web3AuthAccount: "",
    web3AuthBalance: "",
    ethBalance: "",
    wethBalance: "",
    accountNfts: [] as tokenWrapperObject[],
    tinytapNfts: [] as tokenWrapperObject[],
    publisherNfts: [] as tokenWrapperObject[],
    user: <userObject>{},
    organisation: <organisationObject>{},
    eduUsername: "",
    eduEthAddress: "",
    ocid: "",
    ocConnected: false,
    ocAccessToken: "",
    errorCode: 0,
    errorStatus: "",
    errorMessage: "",
    loading: false,
    approved: false,
    searchChainId: "all",
    searchContract: "",
    searchName: "",
    searchImage: "",
    searchResults: [] as metadataObject[],
    gridView: "grid",
    showFilter: true,
    refreshFilter: {
      token_id: "" as string | undefined,
      search_term: "" as string | undefined,
      search_categories: [] as string[] | undefined,
      search_traits: [] as string[] | undefined,
      time_frame: "" as string | undefined,
      updated_date: "" as string | undefined,
      start_date: "" as string | undefined,
      end_date: "" as string | undefined,
      state: "" as string | undefined,
      dates: [] as string[] | undefined,
    },
    filter: getBlankFilter() as Filter,
    pagination: initialPagination() as paginationObject,
    courses: [] as courseObject[],
    course: <courseObject>{},
    lessons: [] as lessonObject[],
    lesson: <lessonObject>{},
    creators: [] as userObject[],
    creator: <userObject>{},
    members: [] as userObject[],
    member: <userObject>{},
    transactions: [] as transactionObject[],
    transaction: <transactionObject>{},
    marketplace: [] as metadataObject[],
    nfts: [] as metadataObject[],
    nft: <metadataObject>{},
    tinytapTokens: [] as tokenWrapperObject[],
    publisherTokens: [] as tokenWrapperObject[],
    nftView: <tokenWrapperObject>{},
  }),
  getters: {
    getChainId(state) {
      return state.chainId;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
    getWeb3AuthLoggedIn(state) {
      return state.web3AuthLoggedIn;
    },
    getAccount(state) {
      return state.account;
    },
    getWeb3AuthAccount(state) {
      return state.web3AuthAccount;
    },
    getBalance(state) {
      return state.balance;
    },
    getWeb3AuthBalance(state) {
      return state.web3AuthBalance;
    },
    getEthBalance(state) {
      return state.ethBalance;
    },
    getWethBalance(state) {
      return state.wethBalance;
    },
    getAccountNfts(state) {
      return state.accountNfts;
    },
    getTinytapNfts(state) {
      return state.tinytapNfts;
    },
    getPublisherNfts(state) {
      return state.publisherNfts;
    },
    getUser(state) {
      return state.user;
    },
    getOrganisation(state) {
      return state.organisation;
    },
    getEduUsername(state) {
      return state.eduUsername;
    },
    getEduEthAddress(state) {
      return state.eduEthAddress;
    },
    getOcid(state) {
      return state.ocid;
    },
    getOcConnected(state) {
      return state.ocConnected;
    },
    getOcAccessToken(state) {
      return state.ocAccessToken;
    },
    getErrorCode(state) {
      return state.errorCode;
    },
    getErrorStatus(state) {
      return state.errorStatus;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
    isLoading(state) {
      return state.loading;
    },
    isApproved(state) {
      return state.approved;
    },
    getSearchChainId(state) {
      return state.searchChainId;
    },
    getSearchContract(state) {
      return state.searchContract;
    },
    getSearchName(state) {
      return state.searchName;
    },
    getSearchImage(state) {
      return state.searchImage;
    },
    getSearchResults(state) {
      return state.searchResults;
    },
    getGridView(state) {
      return state.gridView;
    },
    getShowFilter(state) {
      return state.showFilter;
    },
    getFilter(state) {
      return state.filter as Filter;
    },
    getPagination(state) {
      return state.pagination as paginationObject;
    },
    getPage(state) {
      return state.pagination.page;
    },
    getPageSize(state) {
      return state.pagination.pageSize;
    },
    getSortSelect(state) {
      return state.pagination.sortSelect;
    },
    getSortBy(state) {
      return state.pagination.sortBy;
    },
    getSortDirection(state) {
      return state.pagination.sortDirection;
    },
    getLimit(state) {
      return state.pagination.limit;
    },
    getContinuation(state) {
      return state.pagination.continuation;
    },
    getTinytapTokens(state) {
      return state.tinytapTokens;
    },
    getPublisherTokens(state) {
      return state.publisherTokens;
    },
    getCourses(state) {
      return state.courses;
    },
    getLessons(state) {
      return state.lessons;
    },
    getCreators(state) {
      return state.creators;
    },
    getMembers(state) {
      return state.members;
    },
    getMarketplace(state) {
      return state.marketplace;
    },
    getNfts(state) {
      return state.nfts;
    },
    getCourse(state) {
      return state.course;
    },
    getLesson(state) {
      return state.lesson;
    },
    getCreator(state) {
      return state.creator;
    },
    getMember(state) {
      return state.member;
    },
    getNft(state) {
      return state.nft;
    },
    getNftView(state) {
      return state.nftView;
    },
    getTransactions(state) {
      return state.transactions;
    },
    getTransaction(state) {
      return state.transaction;
    },
  },
  actions: {
    setChainId(chainId: string) {
      this.chainId = chainId;
    },
    setLoggedIn(value: boolean) {
      this.loggedIn = value;
    },
    setWeb3AuthLoggedIn(value: boolean) {
      this.web3AuthLoggedIn = value;
    },
    setAccount(account: string) {
      this.account = account;
    },
    setWeb3AuthAccount(account: string) {
      this.web3AuthAccount = account;
    },
    setBalance(balance: string) {
      this.balance = balance;
    },
    setWeb3AuthBalance(balance: string) {
      this.web3AuthBalance = balance;
    },
    updateEthBalance(balance: string) {
      this.ethBalance = balance;
    },
    updateWethBalance(balance: string) {
      this.wethBalance = balance;
    },
    addAccountNfts(tokens: tokenWrapperObject[]) {
      this.accountNfts = tokens;
    },
    addTinytapNfts(tokens: tokenWrapperObject[]) {
      this.tinytapNfts = tokens;
    },
    addPublisherNfts(tokens: tokenWrapperObject[]) {
      this.publisherNfts = tokens;
    },
    setUser(user: userObject) {
      this.user = user;
    },
    setOrganisation(organisation: organisationObject) {
      this.organisation = organisation;
    },
    setEduUsername(value: string) {
      this.eduUsername = value;
    },
    setEduEthAddress(value: string) {
      this.eduEthAddress = value;
    },
    setOcid(value: string) {
      this.ocid = value;
    },
    setOcConnected(value: boolean) {
      this.ocConnected = value;
    },
    setOcAccessToken(value: string) {
      this.ocAccessToken = value;
    },
    setErrorCode(value: number) {
      this.errorCode = value;
    },
    setErrorStatus(value: string) {
      this.errorStatus = value;
    },
    setErrorMessage(value: string) {
      this.errorMessage = value;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setApproved(value: boolean) {
      this.approved = value;
    },
    updateSearchChainId(searchChainId: string) {
      this.searchChainId = searchChainId;
    },
    updateSearchContract(searchContract: string) {
      this.searchContract = searchContract;
    },
    updateSearchName(searchName: string) {
      this.searchName = searchName;
    },
    updateSearchImage(searchImage: string) {
      this.searchImage = searchImage;
    },
    addSearchResults(tokens: metadataObject[]) {
      this.searchResults = tokens;
    },
    clearSearchResults() {
      this.searchChainId = "all";
      this.searchContract = "";
      this.searchName = "";
      this.searchImage = "";
      this.searchResults = [];
    },
    setGridView(view: string) {
      this.gridView = view;
    },
    setShowFilter(value: boolean) {
      this.showFilter = value;
    },
    setFilterValue<K extends keyof Filter>(key: K, value: Filter[K]) {
      this.filter[key] = value;
    },
    setTokenId(value: string) {
      this.filter.token_id = value;
    },
    setSearchTerm(value: string) {
      this.filter.search_term = value;
    },
    setSearchDate(value: string) {
      this.filter.time_frame = value;
    },
    setSearchTypes(value: string) {
      if (!this.filter.search_types) {
        this.filter.search_types = [];
      }
      const result = this.filter.search_types.includes(value);
      if (!result) {
        /* Value not found in our Array, so add it */
        this.filter.search_types.push(value);
      } else {
        /* Find and Remove item from the Array by Index */
        const index = this.filter.search_types.indexOf(value);
        this.filter.search_types.splice(index, 1);
      }
    },
    setSearchCategories(value: string) {
      if (!this.filter.search_categories) {
        this.filter.search_categories = [];
      }
      const result = this.filter.search_categories.includes(value);
      if (!result) {
        /* Value not found in our Array, so add it */
        this.filter.search_categories.push(value);
      } else {
        /* Find and Remove item from the Array by Index */
        const index = this.filter.search_categories.indexOf(value);
        this.filter.search_categories.splice(index, 1);
      }
    },
    setSearchTraits(value: string) {
      if (!this.filter.search_traits) {
        this.filter.search_traits = [];
      }
      const result = this.filter.search_traits.includes(value);
      if (!result) {
        /* Value not found in our Array, so add it */
        this.filter.search_traits.push(value);
      } else {
        /* Find and Remove item from the Array by Index */
        const index = this.filter.search_traits.indexOf(value);
        this.filter.search_traits.splice(index, 1);
      }
    },
    setPriceMinInput(value: string) {
      this.filter.price_min_input = value;
    },
    setPriceMaxInput(value: string) {
      this.filter.price_max_input = value;
    },
    setRarityMinInput(value: string) {
      this.filter.rarity_min_input = value;
    },
    setRarityMaxInput(value: string) {
      this.filter.rarity_max_input = value;
    },
    resetFilter() {
      this.filter = <Filter>getBlankFilter();
      this.refreshFilter.token_id = "";
      this.refreshFilter.search_term = "";
      this.refreshFilter.search_categories = [];
      this.refreshFilter.search_traits = [];
      this.refreshFilter.time_frame = "";
      this.refreshFilter.updated_date = "";
      this.refreshFilter.start_date = "";
      this.refreshFilter.end_date = "";
      this.refreshFilter.state = "";
      this.refreshFilter.dates = ["", ""];
    },
    setPage(value: number) {
      this.pagination.page = value;
    },
    setPageSize(value: number) {
      this.pagination.pageSize = value;
    },
    setSortSelect(value: string) {
      this.pagination.sortSelect = value;
    },
    setSortBy(value: string) {
      this.pagination.sortBy = value;
    },
    setSortDirection(value: string) {
      this.pagination.sortDirection = value;
    },
    setLimit(value: number) {
      this.pagination.limit = value;
    },
    setContinuation(value: string) {
      this.pagination.continuation = value;
    },
    resetPagination() {
      this.pagination = <paginationObject>initialPagination();
    },
    addTinytapTokens(tokens: tokenWrapperObject[]) {
      this.tinytapTokens = tokens;
    },
    addPublisherTokens(tokens: tokenWrapperObject[]) {
      this.publisherTokens = tokens;
    },
    setCourses(courses: courseObject[]) {
      this.courses = courses;
    },
    setLessons(lessons: lessonObject[]) {
      this.lessons = lessons;
    },
    setCreators(creators: userObject[]) {
      this.creators = creators;
    },
    setMembers(members: userObject[]) {
      this.members = members;
    },
    setNfts(nfts: metadataObject[]) {
      this.nfts = nfts;
    },
    setMarketplace(nfts: metadataObject[]) {
      this.marketplace = nfts;
    },
    setCourse(course: courseObject) {
      this.course = course;
    },
    setLesson(lesson: lessonObject) {
      this.lesson = lesson;
    },
    setCreator(creator: userObject) {
      this.creator = creator;
    },
    setMember(member: userObject) {
      this.member = member;
    },
    setTransactions(transactions: transactionObject[]) {
      this.transactions = transactions;
    },
    setTransaction(transaction: transactionObject) {
      this.transaction = transaction;
    },
    setNft(nft: metadataObject) {
      this.nft = nft;
    },
    addNftView(nft: tokenWrapperObject) {
      this.nftView = nft;
    },

    /**
     * Reservoir API - Search Collections by Contract Address
     */
    async retrieveAllCollections() {
      const contracts = ["", ""];
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.retrieveAllCollections(contracts);
      return results;
    },

    /**
     * Reservoir API - Search Collections by Contract Address
     */
    async retrieveCollections(
      collection: string,
      slug?: string | null,
      collectionsSetId?: string | null,
      community?: string | null,
      contract?: Array<string> | null,
      name?: string | null,
      maxFloorAskPrice?: number | null,
      minFloorAskPrice?: number | null,
      includeAttributes?: string | null,
      includeSalesCount?: string | null,
      includeMintStages?: string | null,
      normalizeRoyalties?: string | null,
      useNonFlaggedFloorAsk?: string | null,
      sortBy?: string | null,
      limit?: number | null,
      continuation?: string | null,
      displayCurrency?: string | null
    ) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.retrieveCollections(
        collection,
        slug,
        collectionsSetId,
        community,
        contract,
        name,
        maxFloorAskPrice,
        minFloorAskPrice,
        includeAttributes,
        includeSalesCount,
        includeMintStages,
        normalizeRoyalties,
        useNonFlaggedFloorAsk,
        sortBy,
        limit,
        continuation,
        displayCurrency
      );
      return results;
    },

     /**
     * Reservoir API - Search Collections by Contract Address
     */
     async retrievePolygonCollections(
      collection: string,
    ) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.retrievePolygonCollections(
        collection,
      );
      return results;
    },

    /**
     * Reservoir API - Tokens
     */
    async retrieveTokens(
      collection: string,
      collectionsSetId?: string | null,
      community?: string | null,
      contract?: Array<string> | null,
      tokenName?: string | null,
      tokens?: string | null,
      tokenSetId?: string | null,
      attributes?: object | null,
      source?: string | null,
      nativeSource?: string | null,
      minRarityRank?: string | null,
      maxRarityRank?: string | null,
      minFloorAskPrice?: string | null,
      maxFloorAskPrice?: string | null,
      flagStatus?: number | null,
      sortBy?: string | null,
      sortDirection?: string | null,
      currencies?: Array<string> | null,
      limit?: number | null,
      includeTopBid?: string | null,
      includeAttributes?: string | null,
      includeQuantity?: string | null,
      includeDynamicPricing?: string | null,
      includeLastSale?: string | null,
      normalizeRoyalties?: string | null,
      continuation?: string | null,
      displayCurrency?: string | null,
      blockchain?: string | null
    ) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.retrieveTokens(
        collection,
        collectionsSetId,
        community,
        contract,
        tokenName,
        tokens,
        tokenSetId,
        attributes,
        source,
        nativeSource,
        minRarityRank,
        maxRarityRank,
        minFloorAskPrice,
        maxFloorAskPrice,
        flagStatus,
        sortBy,
        sortDirection,
        currencies,
        limit,
        includeTopBid,
        includeAttributes,
        includeQuantity,
        includeDynamicPricing,
        includeLastSale,
        normalizeRoyalties,
        continuation,
        displayCurrency
      );
      return results;
    },

    /**
     * Reservoir Polygon API - Tokens
     */
    async retrievePolygonTokens(
      collection: string,
    ) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.retrievePolygonTokens(collection);
      return results;
    },

    /**
     * Reservoir API - Retrieve Users Tokens
     */
    async fetchUserTokens(account: string) {
      if (account) {
        try {
          const reservoirAPI = new reservoirApi();
          const results = await reservoirAPI.retrieveUserTokens(account);
          console.log("fetchUserTokens", results);
          this.addAccountNfts(results);

          /* TinyTap NFTS users holds currently */
          const tinytaps = results.filter(function (nft: tokenWrapperObject) {
            return nft.token.contract.toLowerCase() === tinytapContractAddress;
          });
          if (tinytaps && tinytaps.length > 0) {
            this.addTinytapNfts(tinytaps);
            /* We have an approved Holders here folks, let them win */
            this.setApproved(true);
          }
          /* Open Campus Publisher Season 2 on Polygon */
          const publisher = results.filter(function (nft: tokenWrapperObject) {
            return nft.token.contract.toLowerCase() === publisherContractAddress;
          });
          if (publisher && publisher.length > 0) {
            this.addPublisherNfts(publisher);
            /* We have an approved Holders here folks, let them win */
            this.setApproved(true);
          }
        } catch (error) {
          console.log(`Error fetching tokens, please refresh to try again!`);
        }
      }
    },

    /**
     * Reservoir API - Retrieve Single Token
     */
    async retrieveToken(
      collection: string,
      collectionsSetId?: string | null,
      community?: string | null,
      contract?: Array<string> | null,
      tokenName?: string | null,
      tokenId?: string | null,
      tokenSetId?: string | null,
      attributes?: object | null,
      source?: string | null,
      nativeSource?: string | null,
      minRarityRank?: string | null,
      maxRarityRank?: string | null,
      minFloorAskPrice?: string | null,
      maxFloorAskPrice?: string | null,
      flagStatus?: number | null,
      sortBy?: string | null,
      sortDirection?: string | null,
      currencies?: Array<string> | null,
      limit?: number | null,
      includeTopBid?: string | null,
      includeAttributes?: string | null,
      includeQuantity?: string | null,
      includeDynamicPricing?: string | null,
      includeLastSale?: string | null,
      normalizeRoyalties?: string | null,
      continuation?: string | null,
      displayCurrency?: string | null
    ) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.retrieveToken(
        collection,
        collectionsSetId,
        community,
        contract,
        tokenName,
        tokenId,
        tokenSetId,
        attributes,
        source,
        nativeSource,
        minRarityRank,
        maxRarityRank,
        minFloorAskPrice,
        maxFloorAskPrice,
        flagStatus,
        sortBy,
        sortDirection,
        currencies,
        limit,
        includeTopBid,
        includeAttributes,
        includeQuantity,
        includeDynamicPricing,
        includeLastSale,
        normalizeRoyalties,
        continuation,
        displayCurrency
      );
      return results;
    },

    async retrievePolygonToken(
      collection: string,
      tokenId: string,
    ) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.retrievePolygonToken(
        collection,
        tokenId
      );
      return results;
    },

    /**
     * Reservoir API - Search All Attributes by Contract Address
     * Use this API to see all possible attributes within a collection.
     * floorAskPrice for all attributes might not be returned on collections with more than 10k tokens.
     * Attributes are case sensitive.
     * @param {String} collection Filter to a particular collection with collection-id. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
     * @param {String} displayCurrency Return result in given currency
     */
    async retrieveAllAttributes(
      collection: string,
      displayCurrency?: string | null
    ) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.retrieveAllAttributes(
        collection,
        displayCurrency
      );
      return results;
    },

    /**
     * Reservoir API - Explore Attributes
     * Use this API to see stats on a specific attribute within a collection. This endpoint will return tokenCount, onSaleCount, sampleImages, and floorAskPrices by default.
     * floorAskPrices will not be returned on attributes with more than 10k tokens.
     * https://docs.reservoir.tools/reference/getcollectionscollectionattributesexplorev5
     * @param {String} collection Filter to a particular collection with collection-id. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
     * @param {String} contract Results will only include NFTs from this contract address.
     * @param {String} tokenId Filter to a particular token-id. Example: 1
     * @param {Boolean} includeTopBid If true, top bid will be returned in the response. defaults to false
     * @param {Boolean} excludeRangeTraits If true, range traits will be excluded from the response. defaults to false
     * @param {Boolean} excludeNumberTraits If true, number traits will be excluded from the response. defaults to false
     * @param {String} attributeKey Filter to a particular attribute key. Example: Composition
     * @param {Number} maxFloorAskPrices Max number of items returned in the response. defaults to 1
     * @param {Number} maxLastSells Max number of items returned in the response. defaults to 0
     * @param {String} continuation Use continuation token to request next offset of items.
     * @param {Number} limit Amount of items returned in response. Default limit is 20. Max limit is 5000. defaults to 20
     */
    async exploreAttribute(
      collection: string,
      tokenId: string,
      includeTopBid?: boolean,
      excludeRangeTraits?: boolean,
      excludeNumberTraits?: boolean,
      attributeKey?: string,
      maxFloorAskPrices?: number,
      maxLastSells?: number,
      continuation?: string,
      limit?: number
    ) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.exploreAttribute(
        collection,
        tokenId,
        includeTopBid,
        excludeRangeTraits,
        excludeNumberTraits,
        attributeKey,
        maxFloorAskPrices,
        maxLastSells,
        continuation,
        limit
      );
      return results;
    },

    /**
     * Reservoir API - Buy Now
     */
    async buyNow(collection: string, tokenId: string, account: string) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.buyNow(collection, tokenId, account);
      return results;
    },

    /**
     * Reservoir API - Make Offer
     */
    async makeOffer(collection: string, tokenId: string, account: string) {
      const reservoirAPI = new reservoirApi();
      const results = await reservoirAPI.makeOffer(
        collection,
        tokenId,
        account
      );
      return results;
    },
  },
});
