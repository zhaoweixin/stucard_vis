<template>
    <div>
        <div id="overviewtitle" class="subtitle">
            <p>Overview</p>
        </div>
        <div id="row1">
            <div id="hall">
                <div id="halltitle">
                    <h4>Hall Condition</h4>
                </div>
                <div id="hallgraph">
                </div>
            </div>
        </div>

        <div id="row2">
            <div id="row21">
                <div id="clusterscatter">
                    <div id="clusterscattertitle">
                        <h4>Cluster scatter</h4>
                    </div>
                    <div id="clusterscattergraph"></div>
                </div>
            </div>
            <div id="row22">
                <div id='trajectory'>
                    <div id="trajectorytitle">
                        <h4>Frequent Items</h4>
                    </div>
                    <div id="trajectorygraph">

                    </div>
                </div>
            </div>
        </div>
        <div id="row3">
            <div id="clusterbar">
                    <div id="clusterbartitle">
                        <h4>Cluster bar</h4>
                    </div>
                    <div id="clusterbargraph"></div>
                </div>

            <div id="clusterbox">
                    <div id="clusterboxtitle">
                        <h4>Cluster Money Item</h4>
                    </div>
                    <div id="clusterboxgraph"></div>
                </div>
        </div>
    </div>
</template>
<script>
import DataManager from './DataManager'
import DataSet from '@antv/data-set'
import * as d3 from 'd3'
import { DataView } from '@antv/data-set';
export default {
    name: '',
    data(){
        return{

        }
    },
    computed: {
            // costmatrix () {
            //     return this.$store.state.costmatrix
            // },
            hallcondition () {
                return this.$store.state.hallcondition
            },
            frequentpattern () {
                return this.$store.state.frequentpattern
            },
            cluster () {
                return this.$store.state.cluster
            }
    },
    watch: {
        hallcondition: function(val, oldVal){
            console.log('watch-hallcondition', val)
            this.watchhandle_hallcondition(val)
        },
        frequentpattern: function(val, oldVal){
            console.log('watch-frequentpattern', val)
            this.watchhandle_frequentpattern(val)
        },
        cluster: function(val, oldVal){
            console.log('watch-cluster', val)
            this.watchhandle_cluster(val)
        }
    },
    methods:{
        initFrequentItem(config){
            let that = this;
            DataManager.getfrequentpattern(config).then((res) => {
                that.drawfrequentgraph({'steps': config.config.steps, "data": res.data[0]})
            })
        },
        initHall(config){
            let that = this;
            DataManager.getHall(config).then((res) => {
                that.drawHallGraph({"data": res.data[0].value.data, "steps": res.data[0].value.steps})
            })
        },
        initCluster(){
            let that = this;
            DataManager.getCluster().then((res) => {
                that.drawCluster({"data": res.data[0].data})
            })
        },
        initClusterDescribe(config){
            let that = this
            DataManager.getVector(config).then((res) => {
                that.drawClusterDescribe({"data": res.data})
                that.drawClusterBox({"data": res.data.box})
            })
        },
        drawfrequentgraph(config){
            // arc diagram layout
            let data = config.data
            d3.select('#trajectorytitle').select('h4').html('Frequent Patterns: ' + config.steps + '-item-sets')
            const lineValue = data.links.map(v => v.value)
            const lineValue_Scale = d3.scaleLinear().domain([d3.min(lineValue), d3.max(lineValue)]).range([1,5])
            data.links.forEach((d,i) => {
                d['linewidth'] = lineValue_Scale(d.value)
            })
            
            const ds = new DataSet();
            const dv = ds.createView().source(data, {
                type: 'graph',
                edges: d => d.links
            });
            dv.transform({
                type: 'diagram.arc',
                marginRatio: 0.5
            });

            const chart = new G2.Chart({
                container: 'trajectorygraph',
                forceFit: true,
                height: 300,
                padding: 120
            });
            chart.legend(false);
            chart.tooltip({
                showTitle: false
            });

            const edgeView = chart.view();
            edgeView.coord('polar').reflect('y');
            edgeView.source(dv.edges);
            edgeView.axis(false);
            edgeView.edge()
                .position('x*y')
                .shape('arc')
                .color('color')
                .style('linewidth', {
                    lineWidth: (v) => {return v}
                })
                .opacity(0.5)
                .tooltip('value');

            const nodeView = chart.view();
            nodeView.coord('polar').reflect('y');
            nodeView.source(dv.nodes);
            nodeView.axis(false);
            nodeView.point()
                .position('x*y')
                .shape('circle')
                .size(3)
                .color('grey')
                .opacity(0.5)
                .style({
                    stroke: 'grey'
                })
                .label('name', {
                    labelEmit: true
                });

            chart.render();
        },
        drawHallGraph(config){
            d3.select('#halltitle').select('h4').html('Hall Condition: ' + config.steps)
            const data = []
            config.data.forEach( (d,i) => {
                d.data.forEach( (v,j) => {
                    v['time'] = '2019-01-01 ' + v['time']
                    v['name'] = d.name
                    data.push(v)
                })
            })
            const chart = new G2.Chart({
                container: 'hallgraph',
                height: 280,
                width: 750,
                padding: [ 20, 110, 70, 35 ]
            });
            chart.source(data);
            chart.scale('time', {
                range: [ 0, 1 ],
                tickCount: 10,
                type: 'timeCat',
                mask: 'HH:mm:ss'
            });
            chart.axis('time', {
                label: {
                    textStyle: {
                    fill: '#aaaaaa'
                    }
                }
            });
            chart.axis('value', {
                label: {
                    textStyle: {
                    fill: '#aaaaaa'
                    }
                }
            });
            chart.tooltip({
                crosshairs: 'y',
                share: true
            });
            chart.legend({
                attachLast: true
            });
            chart.line().position('time*value')
            .color('name');

            chart.render();
            
        },
        drawCluster(config){
            config.data.forEach((d,v) => {
                d.label = ' ' + d.label + ' '
            })
            const chart = new G2.Chart({
                container: 'clusterscattergraph',
                width: 350,
                height: 300
            });

            // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
            chart.source(config.data);
            chart.tooltip({
                showTitle: false,
                crosshairs: {
                type: 'cross'
                }
            });
            chart.point().position('x*y')
                .color('label')
                .size(3)
                .opacity(0.65)
                .shape('circle')
                .tooltip('label*x*y', (label, x, y) => {
                    return {
                    name: label,
                    value: x + '(cm), ' + y + '(kg)'
                    };
                });
            chart.legend('label', {
                position: 'bottom',
            });
            chart.render();  
        },
        drawClusterDescribe(config){
            let chart_box = config['data']['box'],
                bar_data = []
            for(let i=0; i<9; i++){
                bar_data.push(config['data']['bar'][i])
            }
            
            const chart_bar = new G2.Chart({
                container: 'clusterbargraph',
                forceFit: true,
                height: 200
            });

            chart_bar.source(bar_data);
            chart_bar.scale('value', {
                label: {
                    offset: 12
                }
            });
            chart_bar.interval().position('dept*value');
            chart_bar.render();
        },
        drawClusterBox(config){
            let chart_box = config.data

            
            let scale_list = {}
            chart_box.forEach((d,i) => {
                scale_list[d.x] = {'pos': d3.scaleLinear().domain([d.low, d.high]).range([0.5, 1.5]),
                    'neg': d3.scaleLinear().domain([0.5, 1.5]).range([d.low, d.high])}
                d.low = +scale_list[d.x]['pos'](d.low).toFixed(4)
                d.q1 = +scale_list[d.x]['pos'](d.q1).toFixed(4)
                d.median = +scale_list[d.x]['pos'](d.median).toFixed(4)
                d.q3 = +scale_list[d.x]['pos'](d.q3).toFixed(4)
                d.high = +scale_list[d.x]['pos'](d.high).toFixed(4)
            })


            const dv = new DataView().source(chart_box);
            dv.transform({
            type: 'map',
            callback: obj => {
                obj.range = [ obj.low, obj.q1, obj.median, obj.q3, obj.high ];
                return obj;
            }
            });
            const chart = new G2.Chart({
            container: 'clusterboxgraph',
            forceFit: true,
            height: 200
            // padding: [ 20, 120, 95 ]
            });
            chart.source(dv, {
            range: {
                max: 1.5
            }
            });
            chart.tooltip({
            showTitle: false,
            crosshairs: {
                type: 'rect'
            },
            itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
                + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
                + '{name}<br/>'
                + '<span style="padding-left: 16px">最大值：{high}</span><br/>'
                + '<span style="padding-left: 16px">上四分位数：{q3}</span><br/>'
                + '<span style="padding-left: 16px">中位数：{median}</span><br/>'
                + '<span style="padding-left: 16px">下四分位数：{q1}</span><br/>'
                + '<span style="padding-left: 16px">最小值：{low}</span><br/>'
                + '</li>'
            });
            chart.schema().position('x*range')
            .shape('box')
            .tooltip('x*low*q1*median*q3*high', (x, low, q1, median, q3, high) => {
                        low = +scale_list[x]['neg'](low).toFixed(4)
                        q1 = +scale_list[x]['neg'](q1).toFixed(4)
                        median = +scale_list[x]['neg'](median).toFixed(4)
                        q3 = +scale_list[x]['neg'](q3).toFixed(4)
                        high = +scale_list[x]['neg'](high).toFixed(4)
                    return {name: x, low, q1, median, q3, high}
            })
            .style({
                stroke: '#545454',
                fill: '#1890FF',
                fillOpacity: 0.3
            });
            chart.render();
        },
        watchhandle_hallcondition(val){

        },
        watchhandle_frequentpattern(val){

        },
        watchhandle_cluster(val){

        }
    },
    mounted(){
        this.initFrequentItem({'config': {'steps': 1}})
        this.initHall({'config': {'table': 'hall_weekday'}})
        this.initCluster()
        this.initClusterDescribe({'config': {'label': -1}})
        //this.testGraph()
    }
}
</script>
<style scoped>
#row1{
    height: 255px;
}
#row2{
    height: 350px;
}
#row21{
    width:50%;
    float: left;
}
#row22{
    width:50%;
    float: left;
}

#trajectory{
    float: left;
    width: 100%;
}
#hall{
    width: 100%;
}

#clusterbar{
    height:200px;
    width:50%;
    float:left;
}
#clusterbox{
    height:200px;
    width:50%;
    float:left;
}


</style>