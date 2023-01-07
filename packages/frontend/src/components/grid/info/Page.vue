<script setup lang="ts">
import TitleBar from '@/components/grid/info/TitleBar.vue';
</script>

<template>
  <div class="InfoPage">
    <div class="Description">
      <p>
        This is an archive of Terrace, Co.
        <a href="https://hunterlarco.com" target="blank">Hunter</a> and
        <a href="https://www.linkedin.com/in/jimmyyue/" target="blank">Jimmy</a
        >'s first startup.
      </p>
      <p>
        With "Sadboi TV", we explored new formats for watching stuff online. We
        aimed for an experience that has the quality and novelty of a film
        festival, but feels as intimate as watching shows on the couch with
        friends.
      </p>
      <p>
        This product Alpha features our core experience: a curated show with
        intermissions, commentary, and a social chat system.
      </p>
      <p>Desired features for launch:</p>
      <ul>
        <li>
          Consistent show schedule with weekly content (airing twice a week from
          8pm-2am)
        </li>
        <li>
          Improved social systems (i.e. direct messaging, profile customization,
          room details)
        </li>
        <li>Matchmaking to help fill the rooms to capacity (20-30 people)</li>
        <li>Smoother transitions in-between content</li>
      </ul>
      <p>
        <a href="mailto:hunter@larcolabs.com" target="blank"
          >hunter@larcolabs.com</a
        >
      </p>
    </div>
    <TitleBar class="TitleBar" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.InfoPage {
  @include layout-vertical;

  height: 100%;
}

.Description {
  background: var(--primary-background);
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;

  & > p {
    @include fonts-collapsed-body;

    margin: 10px;

    & > a {
      color: #d3b7ff;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  & > ul {
    @include fonts-collapsed-body;

    margin: 10px 10px 10px 30px;
  }
}

.TitleBar {
  flex-shrink: 0;
}
</style>
