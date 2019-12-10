<template>
    <div class='behavior'>
        <div id="c1"></div>
    </div>
</template>
<script>
//import DataManager from './DataManager.js'
export default {
    name : 'behavior',
    components:{},
    data() {
        return{
            data: [
                { genre: "Sports", sold: 275 },
                { genre: "Strategy", sold: 115 },
                { genre: "Action", sold: 120 },
                { genre: "Shooter", sold: 350 },
                { genre: "Other", sold: 150 }
            ]
        }
    },
    computed: {},
    watch: {},
    mounted() {
        this.initComponent()
    },
    methods: {
        initComponent(){
            this.msg = "vue-cli案例";
            const chart = new G2.Chart({
                container: "c1",
                forceFit: true,
                height: 300
            })
            chart.source(this.data);
            chart
                .interval()
                .position("genre*sold")
                .color("genre");
            this.chart = chart
            this.chart.render()
            this.chart.on('click', ev=> {console.log('click', ev)})
            this.chart.on('plotclick', ev => {console.log('click', ev)});
        }
    }
}
</script>
<style>

</style>>