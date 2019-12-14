<template>
    <div class='behavior'>
        <div id="detailtitle" class="subtitle">
            <p>Major - </p>
        </div>
        <div>
            <h4 id='matrix'>cost matrix</h4>
            <div id='heatmap'></div>
        </div>
        
        <div style="height:200px">
                <div id="barcost">
                    <div id="barcosttilte">
                        <h4 id='averagecount'>Average Cost</h4>
                    </div>
                    <div id="barcostgraph"></div>
                </div>
                <div id="barfund">
                    <div id="barcosttitle">
                        <h4 id='averagecount'>Average Fund</h4>
                    </div>
                    <div id="barfundgraph"></div>
                </div>
        </div>
        <div >
            <div id="barshop">
                <div id="barshoptitle">
                        <h4 id='averagecount'>Shop</h4>
                    </div>
                <div id="barshopgraph"></div>
            </div>
            <div id="barcan">
                <div id="barcantitle">
                        <h4 id='averagecount'>Canteen</h4>
                    </div>
                <div id="barcangraph"></div>
            </div>
            <div id="bartech">
                <div id="bartechtitle">
                        <h4 id='averagecount'>Tech</h4>
                    </div>
                <div id="bartechgraph"></div>
            </div>
        </div>
    </div>
</template>
<script>
import DataManager from './DataManager.js'
import * as d3 from 'd3'

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
    computed: {
        costmatrix () {
                return this.$store.state.costmatrix
            }
    },
    watch: {
        costmatrix: function(val, oldVal){
            this.watchhandle_costmatrix(val)
        }
    },
    mounted() {
        //this.initComponent()
        this.initData({"config": {'name': '18工业设计'}, "title": 'COST MATRIX'})
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
        },
        initData(config){
            let that = this
            d3.select('#detailtitle').select('p').html('Major - ' + config.config.name)
            DataManager.test(config).then((res) => {
                that.DrawHeatMap({
                    'title': config.title,
                    'data': res.data[0]['cost_matrix']
                })
                that.DrawBarCost({
                    'data': res.data[0]['cost'],
                    'name': res.data[0].name
                })
                that.DrawBarFund({
                    'data': res.data[0]['fund'],
                    'name': res.data[0].name
                })
                that.DrawBarCan({
                    'data': res.data[0]['can'],
                    'name': res.data[0].name
                })
                that.DrawBarTech({
                    'data': res.data[0]['techbuild'],
                    'name': res.data[0].name
                })
                that.DrawBarShop({
                    'data': res.data[0]['shop'],
                    'name': res.data[0].name
                })
            }).catch(err => {
                if(err){
                    console.log(err)
                return;
                }
            })
        },
        DrawHeatMap(config){
            const source = [];
            const data = config.data
            d3.select('#matrix').html(config.title)
            d3.select('#heatmap').html('')
            for (let i = 0; i <data.length; i++) {
                for(let j = 0; j < data[i].length; j++){
                    const obj = {};
                    obj.Hour = i;
                    obj.Minute = j;
                    obj.value = data[i][j]
                    source.push(obj)
                }
            }
            const chart = new G2.Chart({
                container: 'heatmap',
                height: 350,
                width: 700,
                padding: [ 20, 80, 120, 50 ]
            });
            const x_value = []
            const x_value_ticks = []
            const y_value = []
            const y_value_ticks = []
            
            for(let i=1;i<=60;i++){
                x_value.push(i)
                if(i<=24){
                    y_value.push(i)
                }
                if(i%2 == 0){
                    y_value_ticks.push(i)
                }
                if(i%4 == 0){
                    x_value_ticks.push(i)
                }
            }
            chart.source(source, {
                Hour: {
                    type: 'cat',
                    values: y_value,
                    ticks: y_value_ticks
                    
                },
                Minute: {
                    type: 'cat',
                    values: x_value,
                    ticks: x_value_ticks
                }
            });

            chart.axis('Hour', {
                tickLine: 'hour',
                tickLine: null,
                grid: {
                        align: 'center',
                        lineStyle: {
                            lineWidth: 0.5,
                            lineDash: null,
                            stroke: '#f0f0f0'
                        },
                        hideFirstLine: true,
                        hideLastLine: true
                    }
            });

            chart.axis('Minute', {
                title: 'minute',
                tickLine: null,
                grid: {
                    align: 'center',
                    lineStyle: {
                        lineWidth: 1,
                        lineDash: null,
                        stroke: '#f0f0f0'
                    },
                    hideFirstLine: true,
                    hideLastLine: true
                }
            });

            chart.polygon()
                .position('Minute*Hour')
                .color('value', '#BAE7FF-#1890FF-#0050B3')
                .style({
                    lineWidth: 1,
                    stroke: '#fff'
                });
            chart.render();
        },
        DrawBarCost(config){
            d3.select('#barcostgraph').html('')
            const data = [
                {'major': 'All', 'count': config.data[2]},
                {'major': config.name, 'count': config.data[1]},
            ]
            const chart = new G2.Chart({
                container: 'barcostgraph',
                forceFit: true,
                height: 150
            });
            chart.source(data);
            chart.axis('major', {
                label: {
                    offset: 12
                }
            });
            chart.coord().transpose();
            chart.interval().position('major*count');
            chart.render();
        },
        DrawBarFund(config){
            d3.select('#barfundgraph').html('')
            const data = [
                {'major': 'All', 'count': config.data[2]},
                {'major': config.name, 'count': config.data[1]},
            ]
            const chart = new G2.Chart({
                container: 'barfundgraph',
                forceFit: true,
                height: 150
            });
            chart.source(data);
            chart.axis('major', {
                label: {
                    offset: 12
                }
            });
            chart.coord().transpose();
            chart.interval().position('major*count');
            chart.render();
        },
        DrawBarCan(config){
            d3.select('#barcangraph').html('')
            const data = config.data
            const valuelist = data.map(x => x.v)
            const ticks = Math.floor((Math.max(...valuelist) - Math.min(...valuelist)) / 5)
            const chart = new G2.Chart({
                container: 'barcangraph',
                forceFit: true,
                height: 250
            });
            chart.source(data);
            chart.scale('v', {
                tickInterval: ticks
            });
            chart.interval().position('n*v');
            chart.render();
        },
        DrawBarTech(config){
            d3.select('#bartechgraph').html('')
            const data = config.data
            const valuelist = data.map(x => x.v)
            let ticks = 0
            if(valuelist.length <= 4){
                ticks = valuelist.length
            } else {
                ticks = Math.floor((Math.max(...valuelist) - Math.min(...valuelist)) / 5)
            }
            const chart = new G2.Chart({
                container: 'bartechgraph',
                forceFit: true,
                height: 250
            });
            chart.source(data);
            chart.scale('v', {
            tickInterval: ticks
            });
            chart.interval().position('n*v');
            chart.render();
        },
        DrawBarShop(config){
            d3.select('#barshopgraph').html('')
            const data = config.data
            const valuelist = data.map(x => x.v)
            const ticks = Math.floor((Math.max(...valuelist) - Math.min(...valuelist)) / 5)
            const chart = new G2.Chart({
                container: 'barshopgraph',
                forceFit: true,
                height: 250
            });
            chart.source(data);
            chart.scale('v', {
                tickInterval: ticks
            });
            chart.interval().position('n*v');
            chart.render();
        },
        watchhandle_costmatrix(val){
            this.initData({"config": {"name": val}, "title": 'COST MATRIX'})
        }
    }
}
</script>
<style>
.behavior{
    height: 900px !important
}
.subtitle p{
    color: lightslategrey;
    font-size: 22px;
    font-family: fantasy;
}

#barcost{
    height:200px;
    width: 400px;
    float: left;
}
#barfund{
    height:200px;
    width: 400px;
    float: left;
}

#barshop{
    height:250px;
    width: 270px;
    float: left;
}

#barcan{
    height:250px;
    width: 270px;
    float: left;
}

#bartech{
    height:250px;
    width: 270px;
    float: left;
}
</style>