<template>
    <div class='behavior'>
        <div id="detailtitle" class="subtitle">
            <p>Major - </p>
        </div>
        <div id="selector">
              <el-radio-group v-model="major_sex">
                <el-radio :label="0">All</el-radio>
                <el-radio :label="1">Male</el-radio>
                <el-radio :label="2">FeMale</el-radio>
            </el-radio-group>
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
            <div id="barcan">
                <div id="barcantitle">
                        <h4 id='averagecount'>Study</h4>
                    </div>
                <div id="barcangraph"></div>
            </div>
            <div id="bartech">
                <div id="bartechtitle">
                        <h4 id='averagecount'>Cost</h4>
                    </div>
                <div id="bartechgraph"></div>
            </div>
            <div id="barshop">
                <div id="barshoptitle">
                        <h4 id='averagecount'>Other</h4>
                    </div>
                <div id="barshopgraph"></div>
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
            ],
            major_sex: 0
        }
    },
    computed: {
        costmatrix () {
                return this.$store.state.costmatrix
            }
    },
    watch: {
        costmatrix: {
            deep: true,
            handler: function(val, oldVal){
                this.watchhandle_costmatrix(val)
            }
        },
        major_sex: {
            handler: function(val, oldVal){
                this.majorsex_handler(val)
            }
        }
    },
    mounted() {
        //this.initComponent()
        this.initData({"config": {'name': '18工业设计', 'sex': 0}, "title": 'COST MATRIX'})
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
            this.$store.commit('nowmajor', config.config.name)
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
                that.DrawBar_studyrank({
                    'data': res.data[0]['study_rank'],
                    'name': res.data[0].name
                })
                that.DrawBar_costrank({
                    'data': res.data[0]['cost_rank'],
                    'name': res.data[0].name
                })
                that.DrawBar_otherrank({
                    'data': res.data[0]['cost_other_rank'],
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
        DrawBar_studyrank(config){
            d3.select('#barcangraph').html('')
            let data = []
            for(let i=0; i<config.data.length; i++){
                if(i<=4){
                    data.push(config.data[i])
                }
            }
            
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

            chart.interval().position('n*v')

            chart.render();
        },
        DrawBar_costrank(config){
            d3.select('#bartechgraph').html('')
            let data = []
            for(let i=0; i<config.data.length; i++){
                if(i<=4){
                    data.push(config.data[i])
                }
            }
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
        DrawBar_otherrank(config){
            d3.select('#barshopgraph').html('')
            
            let data = []
            for(let i=0; i<config.data.length; i++){
                if(i<=4){
                    data.push(config.data[i])
                }
            }
            
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
            this.initData({"config": {"name": val.major, "sex": val.sex}, "title": 'COST MATRIX'})
        },
        majorsex_handler(val){
            this.$store.commit('major_sex', val)
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