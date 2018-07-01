<template>
  <div ref="mapContainer" class="map-container">
    <p>Loading map...</p>
  </div>
</template>

<script>
export default {
  props: [ "areaList" ],
  methods: {
    createScript(url) {
      return new Promise((res, rej) => {
        let script = document.createElement("script");
        script.onerror = rej;
        script.onload = res;
        script.async = true;
        script.src = url;
        document.head.appendChild(script);
      });
    }
  },
  mounted() {
    this.createScript("/js/ammap.combo.js").then(() => {
      var map = AmCharts.makeChart(this.$refs.mapContainer, {
        type: "map",
        theme: "light",
        dataProvider: {
          map: "usaLow",
          areas: this.areaList
        },

        areasSettings: {
          rollOverOutlineColor: "#FFFFFF",
          rollOverColor: "#CC0000",
          alpha: 0.8,
          unlistedAreasAlpha: 0.1,
          balloonText: "[[title]]: [[customData]]"
        },


        legend: {
          width: "100%",
          marginRight: 27,
          marginLeft: 27,
          equalWidths: false,
          backgroundAlpha: 0.5,
          backgroundColor: "#FFFFFF",
          borderColor: "#ffffff",
          borderAlpha: 1,
          top: 450,
          left: 0,
          horizontalGap: 10,
          data: [
            { title: "July 5", color: "#67b7dc" },
            { title: "July 6", color: "#ebdb8b" },
            { title: "July 7", color: "#83c2ba" },
            { title: "July 8", color: "#db8383" },
            { title: "July 9", color: "#7289d0" }
          ]
        }

      });
    }).catch((err) => {
      console.error(err);
    });
  }
}
</script>

<style>
.map-container {
  width: 100%;
  height: 500px;
}
</style>
