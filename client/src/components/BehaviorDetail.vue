<template>
    <div>
        <div id='trajectory' style="height:200px">
            <div id="trajectorytitle">
                <h4>Frequent Items</h4>
            </div>
            <div id="trajectorygraph">

            </div>
        </div>
        <div id="hall" style="height:200px">
            <div id="halltitle">
                <h4>Hall Condition</h4>
            </div>
            <div id="hallgraph">

            </div>
        </div>
    </div>
</template>
<script>
import DataManager from './DataManager'
import DataSet from '@antv/data-set'
import * as d3 from 'd3'
export default {
    name: '',
    data(){
        return{
            
        }
    },
    computed: {},
    watch: {},
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
                forceFit: true,
                height: 300,
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
            
        }
    },
    mounted(){
        this.initFrequentItem({'config': {'steps': 1}})
        this.initHall({'config': {'table': 'hall_weekday'}})
    }
}
</script>
<style scoped>

</style>